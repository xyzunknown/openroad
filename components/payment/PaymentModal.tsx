"use client";

import { useState } from "react";
import { X, Wallet, Zap, Shield, Clock, AlertCircle } from "lucide-react";
import { OnChainPayment } from "./OnChainPayment";
import { BinancePayment } from "./BinancePayment";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    productInfo: {
        id: number;
        title: string;
        price: string;
        seller: string;
    };
}

type PaymentMethod = "selection" | "onchain" | "binance";

export function PaymentModal({ isOpen, onClose, productInfo }: PaymentModalProps) {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("selection");
    const priceValue = parseFloat(productInfo.price);

    if (!isOpen) return null;

    const handleBack = () => {
        setPaymentMethod("selection");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-card rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border shadow-2xl m-4">
                {/* Header */}
                <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card/95 backdrop-blur-xl z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">
                            {paymentMethod === "selection" ? "Choose Payment Method" : "Complete Payment"}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {productInfo.title}
                        </p>
                    </div>
                    <button
                        onClick={paymentMethod === "selection" ? onClose : handleBack}
                        className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {paymentMethod === "selection" && (
                        <div className="space-y-6">
                            {/* Price Display */}
                            <div className="text-center p-6 bg-secondary/30 rounded-2xl">
                                <div className="text-sm text-muted-foreground mb-2">Total Amount</div>
                                <div className="text-4xl font-bold text-foreground">{productInfo.price}</div>
                                <div className="text-sm text-muted-foreground mt-1">USDT</div>
                            </div>

                            {/* Payment Options */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* On-Chain Payment */}
                                <button
                                    onClick={() => setPaymentMethod("onchain")}
                                    className="group relative p-6 rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-purple-600/10 hover:border-purple-500/60 hover:from-purple-500/10 hover:to-purple-600/20 transition-all duration-300 text-left"
                                >
                                    <div className="absolute top-4 right-4">
                                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Shield className="text-purple-500" size={24} />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="text-lg font-bold text-foreground mb-1">Anonymous Payment</div>
                                        <div className="text-xs text-purple-500 font-semibold">ON-CHAIN ESCROW</div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                            <span className="text-muted-foreground">Fully anonymous</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                            <span className="text-muted-foreground">Decentralized & trustless</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                                            <span className="text-muted-foreground">Requires gas fee</span>
                                        </div>
                                    </div>

                                    {priceValue > 10 && (
                                        <div className="px-2 py-1 bg-purple-500/20 rounded-full inline-block">
                                            <span className="text-xs font-semibold text-purple-500">Recommended</span>
                                        </div>
                                    )}
                                </button>

                                {/* Binance Pay */}
                                <button
                                    onClick={() => setPaymentMethod("binance")}
                                    className="group relative p-6 rounded-2xl border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-yellow-600/10 hover:border-yellow-500/60 hover:from-yellow-500/10 hover:to-yellow-600/20 transition-all duration-300 text-left"
                                >
                                    <div className="absolute top-4 right-4">
                                        <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Zap className="text-yellow-500" size={24} fill="currentColor" />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="text-lg font-bold text-foreground mb-1">Fast Payment</div>
                                        <div className="text-xs text-yellow-500 font-semibold">BINANCE PAY</div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                            <span className="text-muted-foreground">Zero fees</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                            <span className="text-muted-foreground">Instant confirmation</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                                            <span className="text-muted-foreground">Requires Binance account</span>
                                        </div>
                                    </div>

                                    {priceValue <= 10 && (
                                        <div className="px-2 py-1 bg-yellow-500/20 rounded-full inline-block">
                                            <span className="text-xs font-semibold text-yellow-500">Recommended</span>
                                        </div>
                                    )}
                                </button>
                            </div>

                            {/* Info Alert */}
                            <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={20} />
                                <div className="text-sm text-foreground">
                                    <span className="font-semibold">Payment Protection: </span>
                                    Your funds are held in escrow until you confirm delivery. Platform fee: 2% for on-chain, variable for Binance Pay.
                                </div>
                            </div>
                        </div>
                    )}

                    {paymentMethod === "onchain" && (
                        <OnChainPayment productInfo={productInfo} onBack={handleBack} onSuccess={onClose} />
                    )}

                    {paymentMethod === "binance" && (
                        <BinancePayment productInfo={productInfo} onBack={handleBack} onSuccess={onClose} />
                    )}
                </div>
            </div>
        </div>
    );
}
