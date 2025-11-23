"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Zap, Star, MessageCircle, CheckCircle, Lock, Truck } from "lucide-react";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { RatingSystem } from "@/components/reputation/RatingSystem";
import { PaymentModal } from "@/components/payment/PaymentModal";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const [step, setStep] = useState<"view" | "locked" | "delivered" | "completed">("view");
    const [showChat, setShowChat] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    // Mock Product Data (In a real app, fetch based on params.id)
    const product = {
        id: params.id,
        title: "ChatGPT Plus Shared Account (1 Month)",
        price: "5.00 USDT",
        description: "Get access to ChatGPT Plus features including GPT-4, DALL-E 3, and faster response times. This is a shared account, fully managed and guaranteed for 30 days. Instant delivery via auto-send system.",
        seller: {
            name: "0x123...abc",
            reputation: 98,
            sales: 1205,
            verified: true,
        },
        autoDelivery: true,
        tags: ["AI Tools", "Account", "Instant"],
        features: [
            "GPT-4 Access",
            "DALL-E 3 Image Generation",
            "Priority Support",
            "30-Day Warranty"
        ]
    };

    const handleBuy = () => {
        // Simulate Wallet Signature & Smart Contract Deposit
        setStep("locked");
        setTimeout(() => {
            // Simulate Auto-delivery logic
            setStep("delivered");
        }, 3000);
    };

    const handleConfirm = () => {
        // Simulate Release Funds
        setStep("completed");
    };

    return (
        <main className="min-h-screen p-6 md:p-12 pb-32">
            <div className="max-w-6xl mx-auto">
                <Link href="/market" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Market
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Image & Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Product Image Placeholder */}
                        <div className="aspect-video rounded-2xl bg-gradient-to-br from-green-500 to-emerald-900 flex items-center justify-center relative overflow-hidden">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold text-white drop-shadow-lg">{product.title}</h1>
                                <p className="text-white/80 mt-2">Instant Delivery • Verified Seller</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="glass-panel p-8 rounded-2xl">
                            <h2 className="text-xl font-bold mb-4">Description</h2>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                {product.description}
                            </p>

                            <h3 className="font-semibold mb-3 text-white">Features:</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {product.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-gray-400 text-sm">
                                        <CheckCircle className="h-4 w-4 text-primary mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Reviews (Placeholder) */}
                        <div className="glass-panel p-8 rounded-2xl">
                            <h2 className="text-xl font-bold mb-4">Reviews</h2>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="text-4xl font-bold text-white">4.9</div>
                                <div className="space-y-1">
                                    <div className="flex text-yellow-400">★★★★★</div>
                                    <p className="text-sm text-gray-500">Based on 120+ reviews</p>
                                </div>
                            </div>
                            {/* Mock Review */}
                            <div className="border-t border-white/10 pt-4">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-300 font-mono text-sm">0x88...29a</span>
                                    <span className="text-gray-500 text-xs">2 days ago</span>
                                </div>
                                <p className="text-gray-400 text-sm">Works perfectly! Instant delivery as promised.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Action Card */}
                    <div className="space-y-6">
                        <div className="glass-panel p-6 rounded-2xl sticky top-24 border border-white/10">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-sm text-gray-400">Current Price</p>
                                    <h2 className="text-3xl font-bold text-white">{product.price}</h2>
                                </div>
                                {product.autoDelivery && (
                                    <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <Zap size={12} fill="currentColor" />
                                        AUTO-DELIVERY
                                    </div>
                                )}
                            </div>

                            {/* Escrow Steps Visualization */}
                            <div className="mb-8 space-y-3">
                                <div className={`flex items-center gap-3 text-sm ${step === 'view' ? 'text-white' : 'text-gray-500'}`}>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 'view' ? 'bg-primary text-white' : 'bg-white/10'}`}>1</div>
                                    <span>Payment Locked in Escrow</span>
                                </div>
                                <div className={`flex items-center gap-3 text-sm ${step === 'locked' ? 'text-white' : 'text-gray-500'}`}>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 'locked' ? 'bg-primary text-white' : 'bg-white/10'}`}>2</div>
                                    <span>Seller Delivers Item</span>
                                </div>
                                <div className={`flex items-center gap-3 text-sm ${step === 'delivered' ? 'text-white' : 'text-gray-500'}`}>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 'delivered' ? 'bg-primary text-white' : 'bg-white/10'}`}>3</div>
                                    <span>Confirm & Release Funds</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {step === "view" && (
                                <button
                                    onClick={() => setShowPaymentModal(true)}
                                    className="w-full btn-primary py-4 text-lg shadow-lg shadow-primary/20 mb-4"
                                >
                                    Buy Now
                                </button>
                            )}

                            {step === "locked" && (
                                <div className="text-center py-4 animate-pulse">
                                    <Lock className="mx-auto h-8 w-8 text-yellow-400 mb-2" />
                                    <p className="text-yellow-400 font-semibold">Funds Locked. Waiting for Delivery...</p>
                                    <p className="text-xs text-gray-500 mt-2">(Simulating Auto-delivery...)</p>
                                </div>
                            )}

                            {step === "delivered" && (
                                <div className="space-y-4">
                                    <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                                        <p className="text-green-400 font-bold flex items-center gap-2 mb-2">
                                            <CheckCircle size={16} /> Item Delivered!
                                        </p>
                                        <div className="bg-black/50 p-3 rounded text-sm font-mono text-gray-300 break-all">
                                            Key: X789-Y123-Z456-W789
                                            <br />
                                            Link: https://example.com/download
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleConfirm}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
                                    >
                                        Confirm & Release Funds
                                    </button>
                                    <button className="w-full text-red-400 text-sm hover:underline">
                                        Report Issue / Dispute
                                    </button>
                                </div>
                            )}

                            {step === "completed" && (
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="h-8 w-8 text-green-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Transaction Complete</h3>
                                    <p className="text-gray-400 text-sm">Funds released to seller.</p>
                                </div>
                            )}

                            {/* Seller Info */}
                            <div className="border-t border-white/10 pt-6 mt-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                                    <div>
                                        <p className="text-sm font-bold text-white flex items-center gap-1">
                                            {product.seller.name}
                                            {product.seller.verified && <ShieldCheck size={14} className="text-blue-400" />}
                                        </p>
                                        <p className="text-xs text-gray-400">{product.seller.reputation}% Positive Reputation</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowChat(!showChat)}
                                    className="w-full border border-white/20 hover:bg-white/5 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition"
                                >
                                    <MessageCircle size={16} /> Chat with Seller
                                </button>
                            </div>
                        </div>

                        <div className="text-center text-xs text-gray-500">
                            <p>Protected by Smart Contract Escrow.</p>
                            <p>Funds are held safely until you confirm receipt.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Window */}
            {showChat && <ChatWindow onClose={() => setShowChat(false)} />}

            {/* Payment Modal */}
            {showPaymentModal && (
                <PaymentModal
                    isOpen={showPaymentModal}
                    onClose={() => setShowPaymentModal(false)}
                    productInfo={{
                        id: parseInt(params.id),
                        title: product.title,
                        price: product.price.replace(" USDT", ""),
                        seller: product.seller.name
                    }}
                />
            )}

            {/* Rating System (Show after completion) */}
            {step === "completed" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md">
                        <RatingSystem productId={params.id} />
                        <button
                            onClick={() => setStep("view")}
                            className="mt-4 w-full text-gray-400 hover:text-white text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
