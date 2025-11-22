"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { ChatWindow } from "@/components/chat/ChatWindow";

export function FloatingChatButton() {
    const [showChat, setShowChat] = useState(false);

    return (
        <>
            {showChat ? (
                <ChatWindow onClose={() => setShowChat(false)} />
            ) : (
                <button
                    onClick={() => setShowChat(true)}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl hover:scale-110 transition-transform z-40 flex items-center justify-center group"
                    aria-label="Open Chat"
                >
                    <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </button>
            )}
        </>
    );
}
