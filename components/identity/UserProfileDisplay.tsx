"use client";

import { useIdentity } from "@/components/identity/IdentityContext";

export function UserProfileDisplay() {
    const { profile, isLoading } = useIdentity();

    if (isLoading) {
        return <div className="animate-pulse h-10 w-32 bg-white/10 rounded-lg"></div>;
    }

    if (!profile) return null;

    return (
        <div className="flex items-center gap-3 bg-secondary/50 hover:bg-secondary/80 transition-colors px-3 py-1.5 rounded-full border border-border/50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                {profile.reputationScore}
            </div>
            <div className="flex flex-col">
                <div className="font-semibold text-sm text-foreground leading-tight">Anonymous</div>
                <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <span className="font-mono">{profile.id.slice(0, 6)}...{profile.id.slice(-4)}</span>
                </div>
            </div>
        </div>
    );
}
