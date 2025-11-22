"use client";

import { useState } from "react";
import { useIdentity } from "@/components/identity/IdentityContext";
import { Shield, Wallet, Settings, Star, Clock, History, Heart, X } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
    const { profile } = useIdentity();
    const [showEditModal, setShowEditModal] = useState(false);

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Wallet Not Connected</h2>
                    <p className="text-muted-foreground">Please connect your wallet to view your account.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-20 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Profile Header */}
                <div className="glass-panel p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-xl ring-4 ring-background">
                        {profile.reputationScore}
                    </div>
                    <div className="text-center md:text-left space-y-2 flex-1">
                        <h1 className="text-3xl font-bold text-foreground">Anonymous User</h1>
                        <p className="text-muted-foreground font-mono bg-secondary/50 px-3 py-1 rounded-full inline-block text-sm">
                            {profile.id}
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                            <div className="flex items-center gap-1.5 text-sm font-medium text-green-500 bg-green-500/10 px-3 py-1 rounded-full">
                                <Shield size={14} />
                                Verified
                            </div>
                            <div className="flex items-center gap-1.5 text-sm font-medium text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full">
                                <Wallet size={14} />
                                {profile.chain}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="px-6 py-2.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium transition-colors"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 rounded-2xl space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <Star size={18} className="text-yellow-500" />
                            <span className="text-sm font-medium">Reputation</span>
                        </div>
                        <div className="text-3xl font-bold text-foreground">{profile.reputationScore}/100</div>
                        <p className="text-xs text-muted-foreground">Top 5% of traders</p>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <History size={18} className="text-blue-500" />
                            <span className="text-sm font-medium">Total Volume</span>
                        </div>
                        <div className="text-3xl font-bold text-foreground">12.5 USDC</div>
                        <p className="text-xs text-muted-foreground">Across 45 trades (USDT)</p>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <Clock size={18} className="text-purple-500" />
                            <span className="text-sm font-medium">Member Since</span>
                        </div>
                        <div className="text-3xl font-bold text-foreground">24 Days</div>
                        <p className="text-xs text-muted-foreground">Joined Oct 2023</p>
                    </div>
                </div>

                {/* Menu Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/account/orders" className="glass-panel p-6 rounded-2xl hover:bg-secondary/30 transition-colors group cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <History size={24} />
                            </div>
                            <span className="text-xs font-bold bg-secondary px-2 py-1 rounded text-muted-foreground">3 Active</span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-1">My Orders</h3>
                        <p className="text-sm text-muted-foreground">View your purchase history and active escrows.</p>
                    </Link>

                    <Link href="/account/favorites" className="glass-panel p-6 rounded-2xl hover:bg-secondary/30 transition-colors group cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                <Heart size={24} />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-1">Favorites</h3>
                        <p className="text-sm text-muted-foreground">Browse and manage your saved products.</p>
                    </Link>

                    <Link href="/account/settings" className="glass-panel p-6 rounded-2xl hover:bg-secondary/30 transition-colors group cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <Settings size={24} />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-1">Settings</h3>
                        <p className="text-sm text-muted-foreground">Manage notification preferences and security.</p>
                    </Link>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-card rounded-3xl w-full max-w-md border border-border shadow-2xl m-4">
                        {/* Header */}
                        <div className="p-6 border-b border-border flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-foreground">Edit Profile</h2>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Display Name */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Anonymous User"
                                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground transition-all"
                                    placeholder="Enter your display name"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    This is how others will see you on the marketplace.
                                </p>
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Bio (Optional)
                                </label>
                                <textarea
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground transition-all resize-none"
                                    placeholder="Tell others about yourself..."
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Max 200 characters
                                </p>
                            </div>

                            {/* Avatar Color */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Avatar Color
                                </label>
                                <div className="flex gap-3">
                                    {['from-primary to-purple-600', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-700', 'from-red-500 to-pink-600', 'from-orange-500 to-yellow-500'].map((gradient, i) => (
                                        <button
                                            key={i}
                                            className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} hover:scale-110 transition-transform ring-2 ring-offset-2 ring-offset-background ${i === 0 ? 'ring-primary' : 'ring-transparent'}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Wallet Info (Read-only) */}
                            <div className="p-4 bg-secondary/30 rounded-xl">
                                <div className="text-xs text-muted-foreground mb-1">Wallet Address</div>
                                <div className="font-mono text-sm text-foreground">{profile?.id}</div>
                                <div className="text-xs text-muted-foreground mt-2">This cannot be changed</div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-border flex gap-3">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="flex-1 px-6 py-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="flex-1 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 font-medium transition-opacity"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
