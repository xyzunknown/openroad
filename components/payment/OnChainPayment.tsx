"use client";

import { useState } from "react";
import { useAccount, useConnect, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { Wallet, ArrowLeft, ExternalLink, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";

interface OnChainPaymentProps {
    productInfo: {
        id: number;
        title: string;
        price: string;
        seller: string;
    };
    onBack: () => void;
    onSuccess: () => void;
}

export function OnChainPayment({ productInfo, onBack, onSuccess }: OnChainPaymentProps) {
    const { isConnected, address } = useAccount();
    const { connectors, connect } = useConnect();
    const { sendTransaction, data: txHash, isPending, isSuccess } = useSendTransaction();
    const [estimatedGas] = useState("~$0.50"); // Mock gas estimate

    const handlePay = () => {
        // Mock escrow contract address
        const escrowAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0" as `0x${string}`;
        const amount = parseEther(productInfo.price);

        sendTransaction({
            to: escrowAddress,
            value: amount,
        });
    };

    if (isSuccess && txHash) {
        return (
            <div className="space-y-6 text-center py-12">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                    <CheckCircle className="text-green-500" size={40} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Payment Submitted!</h3>
                    <p className="text-muted-foreground">
                        Your transaction is being processed on the blockchain.
                    </p>
                </div>

                <div className="bg-secondary/30 p-4 rounded-xl">
                    <div className="text-xs text-muted-foreground mb-1">Transaction Hash</div>
                    <div className="font-mono text-sm text-foreground break-all">{txHash}</div>
                    <Link
                        href={`https://etherscan.io/tx/${txHash}`}
                        target="_blank"
                        className="text-primary hover:underline text-sm mt-2 inline-flex items-center gap-1"
                    >
                        View on Etherscan <ExternalLink size={14} />
                    </Link>
                </div>

                <div className="space-y-3">
                    <Link
                        href="/account/orders"
                        className="block px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                    >
                        View My Orders
                    </Link>
                    <button
                        onClick={onSuccess}
                        className="block w-full px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft size={18} />
                <span>Back to payment options</span>
            </button>

            {!isConnected ? (
                <div className="space-y-4">
                    <div className="text-center p-8 bg-secondary/30 rounded-2xl">
                        <Wallet className="mx-auto mb-4 text-primary" size={48} />
                        <h3 className="text-xl font-bold text-foreground mb-2">Connect Your Wallet</h3>
                        <p className="text-muted-foreground">
                            Please connect your wallet to proceed with on-chain payment.
                        </p>
                    </div>

                    <div className="space-y-2">
                        {connectors.slice(0, 3).map((connector) => (
                            <button
                                key={connector.id}
                                onClick={() => connect({ connector })}
                                className="w-full p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors flex items-center justify-between group"
                            >
                                <span className="font-semibold text-foreground">{connector.name}</span>
                                <Wallet className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Connected Wallet */}
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                        <div className="text-xs text-green-600 dark:text-green-500 font-semibold mb-1">✓ Wallet Connected</div>
                        <div className="font-mono text-sm text-foreground">{address?.slice(0, 6)}...{address?.slice(-4)}</div>
                    </div>

                    {/* Payment Details */}
                    <div className="space-y-3">
                        <div className="flex justify-between p-4 bg-secondary/30 rounded-xl">
                            <span className="text-muted-foreground">Amount</span>
                            <span className="font-bold text-foreground">{productInfo.price} USDT</span>
                        </div>
                        <div className="flex justify-between p-4 bg-secondary/30 rounded-xl">
                            <span className="text-muted-foreground">Platform Fee (2%)</span>
                            <span className="font-bold text-foreground">{(parseFloat(productInfo.price) * 0.02).toFixed(2)} USDT</span>
                        </div>
                        <div className="flex justify-between p-4 bg-secondary/30 rounded-xl">
                            <span className="text-muted-foreground">Estimated Gas</span>
                            <span className="font-bold text-foreground">{estimatedGas}</span>
                        </div>
                        <div className="flex justify-between p-4 bg-primary/10 border border-primary/20 rounded-xl">
                            <span className="font-semibold text-foreground">Total</span>
                            <span className="font-bold text-primary text-lg">
                                {(parseFloat(productInfo.price) * 1.02).toFixed(2)} USDT
                            </span>
                        </div>
                    </div>

                    {/* Escrow Info */}
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm">
                        <div className="font-semibold text-foreground mb-2">🛡️ Escrow Protection</div>
                        <ul className="text-muted-foreground space-y-1 text-xs">
                            <li>• Funds held in smart contract until delivery</li>
                            <li>• Auto-release after you confirm receipt</li>
                            <li>• Dispute resolution available if needed</li>
                        </ul>
                    </div>

                    {/* Pay Button */}
                    <button
                        onClick={handlePay}
                        disabled={isPending}
                        className="w-full px-6 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Processing...
                            </>
                        ) : (
                            <>Pay {(parseFloat(productInfo.price) * 1.02).toFixed(2)} USDT</>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
