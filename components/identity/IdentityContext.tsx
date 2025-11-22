"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";

interface UserProfile {
    id: string; // Anonymous ID
    address: string;
    chain: "EVM" | "SOL";
    reputationScore: number;
    joinDate: string;
    tags: string[]; // e.g. "NFT Collector", "DeFi User"
    isVerified: boolean;
}

interface IdentityContextType {
    profile: UserProfile | null;
    isLoading: boolean;
}

const IdentityContext = createContext<IdentityContextType>({
    profile: null,
    isLoading: false,
});

export function useIdentity() {
    return useContext(IdentityContext);
}

export function IdentityProvider({ children }: { children: React.ReactNode }) {
    const { address: evmAddress } = useAccount();
    const { publicKey } = useWallet();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const address = evmAddress || publicKey?.toString();

        if (address) {
            setIsLoading(true);
            // SIMULATION: Fetch profile or generate one based on address
            // In a real app, this would call an API to check DB or indexer
            setTimeout(() => {
                const mockProfile: UserProfile = {
                    id: `user_${address.slice(0, 6)}`,
                    address: address,
                    chain: evmAddress ? "EVM" : "SOL",
                    reputationScore: Math.floor(Math.random() * 40) + 60, // Random score 60-100
                    joinDate: new Date().toISOString(),
                    tags: ["Early Adopter", "Trader"],
                    isVerified: true,
                };
                setProfile(mockProfile);
                setIsLoading(false);
            }, 1000);
        } else {
            setProfile(null);
        }
    }, [evmAddress, publicKey]);

    return (
        <IdentityContext.Provider value={{ profile, isLoading }}>
            {children}
        </IdentityContext.Provider>
    );
}
