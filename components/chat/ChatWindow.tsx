"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Globe, X, Minimize2, Maximize2, Paperclip, Image as ImageIcon, File } from "lucide-react";

interface FileAttachment {
    name: string;
    type: string;
    url: string;
}

interface Message {
    id: string;
    sender: "me" | "other";
    text: string;
    originalText?: string; // If translated
    timestamp: number;
    isTranslated?: boolean;
    attachment?: FileAttachment;
}

export function ChatWindow({ onClose }: { onClose?: () => void }) {
    const [isOpen, setIsOpen] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            sender: "other",
            text: "Xin chào, tôi quan tâm đến dịch vụ này.",
            originalText: "Xin chào, tôi quan tâm đến dịch vụ này.",
            timestamp: Date.now() - 100000,
            isTranslated: false
        }
    ]);
    const [autoTranslate, setAutoTranslate] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Simulate receiving a message
    useEffect(() => {
        const timer = setTimeout(() => {
            if (messages.length === 1) {
                // Auto translate the first message after a bit
                handleTranslateMessage("1");
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            sender: "me",
            text: input,
            timestamp: Date.now(),
        };

        setMessages(prev => [...prev, newMessage]);
        setInput("");

        // Simulate reply
        setTimeout(() => {
            const reply: Message = {
                id: (Date.now() + 1).toString(),
                sender: "other",
                text: "Bạn có thể giao hàng trong bao lâu?", // Vietnamese: How long for delivery?
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, reply]);

            if (autoTranslate) {
                setTimeout(() => handleTranslateMessage(reply.id), 800);
            }
        }, 2000);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Create a preview URL for the file
        const fileUrl = URL.createObjectURL(file);

        const newMessage: Message = {
            id: Date.now().toString(),
            sender: "me",
            text: `Sent ${file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'file'}: ${file.name} `,
            timestamp: Date.now(),
            attachment: {
                name: file.name,
                type: file.type,
                url: fileUrl
            }
        };

        setMessages(prev => [...prev, newMessage]);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleTranslateMessage = (msgId: string) => {
        setMessages(prev => prev.map(msg => {
            if (msg.id === msgId && !msg.isTranslated) {
                // Mock Translation Logic
                let translatedText = msg.text;
                if (msg.text.includes("Xin chào")) translatedText = "Hello, I am interested in this service. (Translated from Vietnamese)";
                if (msg.text.includes("bao lâu")) translatedText = "How long can you deliver? (Translated from Vietnamese)";

                return {
                    ...msg,
                    originalText: msg.text,
                    text: translatedText,
                    isTranslated: true
                };
            }
            return msg;
        }));
    };

    if (!isOpen) return null;

    if (isMinimized) {
        return (
            <div
                className="fixed bottom-4 right-4 bg-card border border-border p-4 rounded-xl shadow-2xl cursor-pointer flex items-center gap-3 hover:bg-secondary/50 transition z-50"
                onClick={() => setIsMinimized(false)}
            >
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-bold text-foreground">Chat with Seller</span>
            </div>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-card border border-border rounded-xl shadow-2xl flex flex-col z-50">
            {/* Header */}
            <div className="p-4 border-b border-border flex justify-between items-center bg-secondary/20 rounded-t-xl">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="font-bold text-foreground">Seller (0x123...)</span>
                </div>
                <div className="flex gap-2 text-muted-foreground">
                    <button onClick={() => setAutoTranslate(!autoTranslate)} className={`hover: text - foreground ${autoTranslate ? 'text-primary' : ''} `} title="Auto Translate">
                        <Globe size={16} />
                    </button>
                    <button onClick={() => setIsMinimized(true)} className="hover:text-foreground">
                        <Minimize2 size={16} />
                    </button>
                    <button onClick={() => { setIsOpen(false); onClose?.(); }} className="hover:text-foreground">
                        <X size={16} />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} `}>
                        <div className={`max - w - [80 %] p - 3 rounded - xl ${msg.sender === "me"
                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                : "bg-secondary text-secondary-foreground rounded-tl-none"
                            } `}>
                            {msg.attachment && (
                                <div className="mb-2">
                                    {msg.attachment.type.startsWith('image/') && (
                                        <img
                                            src={msg.attachment.url}
                                            alt={msg.attachment.name}
                                            className="rounded-lg max-w-full max-h-48 object-cover"
                                        />
                                    )}
                                    {msg.attachment.type.startsWith('video/') && (
                                        <video
                                            src={msg.attachment.url}
                                            controls
                                            className="rounded-lg max-w-full max-h-48"
                                        />
                                    )}
                                    {msg.attachment.type === 'application/pdf' && (
                                        <div className="flex items-center gap-2 p-2 bg-background/20 rounded-lg">
                                            <File size={20} />
                                            <span className="text-xs truncate">{msg.attachment.name}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="text-sm">{msg.text}</div>
                            {msg.isTranslated && (
                                <div className="text-[10px] opacity-70 mt-1 border-t border-white/10 pt-1">
                                    Original: {msg.originalText}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-secondary/10 rounded-b-xl">
                <div className="flex gap-2 items-center">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*,.pdf"
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 hover:bg-secondary rounded-lg transition text-muted-foreground hover:text-foreground"
                        title="Attach file"
                    >
                        <Paperclip size={18} />
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
                    />
                    <button
                        onClick={handleSend}
                        className="p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
