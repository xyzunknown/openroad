"use client";

import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import { UserProfileDisplay } from "@/components/identity/UserProfileDisplay";
import { X, ChevronRight, Wallet } from "lucide-react";
import Image from "next/image";

// Wallet Logos (User Uploaded Images)
const LOGOS: Record<string, React.ReactNode> = {
    MetaMask: (
        <div className="relative w-8 h-8">
            <Image src="/images/metamask.png" alt="MetaMask" fill className="object-contain" />
        </div>
    ),
    Phantom: (
        <div className="relative w-8 h-8">
            <Image src="/images/phantom.png" alt="Phantom" fill className="object-contain" />
        </div>
    ),
    "Binance Wallet": (
        <div className="relative w-8 h-8">
            <Image src="/images/binance.png" alt="Binance Wallet" fill className="object-contain" />
        </div>
    ),
    "OKX Wallet": (
        <div className="relative w-8 h-8">
            <Image src="/images/okx.png" alt="OKX Wallet" fill className="object-contain" />
        </div>
    ),
    "Bitget Wallet": (
        <div className="relative w-8 h-8">
            <Image src="/images/bitget.png" alt="Bitget Wallet" fill className="object-contain" />
        </div>
    ),
    Coinbase: (
        <div className="relative w-8 h-8">
            <Image src="/images/coinbase.png" alt="Coinbase" fill className="object-contain" />
        </div>
    ),
    Default: (
        <div className="w-8 h-8 bg-gray-500/10 rounded-full flex items-center justify-center">
            <Wallet size={16} className="text-gray-500" />
        </div>
    )
};

export function WalletConnectModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // EVM Hooks
    const { isConnected: isEvmConnected } = useAccount();
    const { connectors, connect } = useConnect();
    const { disconnect: disconnectEvm } = useDisconnect();

    // Solana Hooks
    const { publicKey, disconnect: disconnectSol, select, wallets } = useWallet();

    useEffect(() => setMounted(true), []);

    const isConnected = isEvmConnected || !!publicKey;

    const handleDisconnect = () => {
        if (isEvmConnected) disconnectEvm();
        if (publicKey) disconnectSol();
    };

    const handleConnect = (walletName: string, type: 'evm' | 'solana') => {
        if (type === 'evm') {
            const connector = connectors.find(c =>
                c.name.toLowerCase() === walletName.toLowerCase() ||
                c.name.toLowerCase().includes(walletName.toLowerCase())
            ) || connectors[0];

            if (connector) connect({ connector });
        } else {
            const wallet = wallets.find(w => w.adapter.name.toLowerCase().includes(walletName.toLowerCase()));
            if (wallet) {
                select(wallet.adapter.name);
            }
        }
        setIsOpen(false);
    };

    if (!mounted) return null;

    if (isConnected) {
        return (
            <div className="flex items-center gap-4">
                <UserProfileDisplay />
                <button
                    onClick={handleDisconnect}
                    className="text-sm text-gray-500 hover:text-primary transition border border-border px-4 py-2 rounded-lg hover:bg-surface-hover"
                >
                    Disconnect
                </button>
            </div>
        );
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="glass-panel px-6 py-3 rounded-xl font-semibold hover:bg-surface-hover transition border border-border hover:border-primary/50 hover:shadow-lg flex items-center gap-2 text-foreground"
            >
                <span>Connect Wallet</span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end items-start pt-24 pr-6 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsOpen(false)}>
                    <div
                        className="glass-panel p-0 rounded-3xl w-full max-w-sm relative overflow-hidden border border-border shadow-2xl flex flex-col bg-[var(--background)]"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Header */}
                        <div className="p-5 border-b border-border flex justify-between items-center bg-[var(--surface)] shrink-0">
                            <h2 className="text-lg font-bold text-foreground">Connect Wallet</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-foreground transition p-1 hover:bg-surface-hover rounded-full"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* List Content */}
                        <div className="p-4 overflow-y-auto custom-scrollbar max-h-[70vh]">
                            <div className="space-y-2">
                                {[
                                    { name: 'Phantom', type: 'solana', label: 'Solana' },
                                    { name: 'Binance Wallet', type: 'evm', label: 'BSC' },
                                    { name: 'MetaMask', type: 'evm', label: 'EVM' },
                                    { name: 'Bitget Wallet', type: 'evm', label: 'Multi-Chain' },
                                    { name: 'OKX Wallet', type: 'evm', label: 'Multi-Chain' },
                                    { name: 'Coinbase', type: 'evm', label: 'EVM' },
                                ].map((wallet) => (
                                    <button
                                        key={wallet.name}
                                        onClick={() => handleConnect(wallet.name, wallet.type as 'evm' | 'solana')}
                                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-[var(--surface)] hover:bg-surface-hover border border-border hover:border-primary/50 transition-all group shadow-sm"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                                                {LOGOS[wallet.name] || LOGOS.Default}
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{wallet.name}</p>
                                                <p className="text-xs text-gray-500">{wallet.label}</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-3 bg-[var(--surface)] text-center text-[10px] text-gray-400 border-t border-border shrink-0">
                            By connecting, you agree to our Terms & Privacy Policy.
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
