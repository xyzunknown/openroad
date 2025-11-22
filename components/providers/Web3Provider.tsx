"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, bsc, base, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Solana Imports
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

// Default styles for Solana wallet adapter
require("@solana/wallet-adapter-react-ui/styles.css");

// EVM Config
const config = createConfig({
    chains: [mainnet, bsc, base, sepolia],
    transports: {
        [mainnet.id]: http(),
        [bsc.id]: http(),
        [base.id]: http(),
        [sepolia.id]: http(),
    },
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
    // Solana Config
    const network = "devnet"; // Switch to 'mainnet-beta' for production
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ConnectionProvider endpoint={endpoint}>
                    <WalletProvider wallets={wallets} autoConnect>
                        <WalletModalProvider>
                            {children}
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
