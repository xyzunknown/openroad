"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bell, Shield, Globe, Moon, Sun, Mail, Lock, Trash2, Download, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const [notifications, setNotifications] = useState({
        orderUpdates: true,
        priceAlerts: false,
        newMessages: true,
        newsletter: false,
    });

    return (
        <div className="min-h-screen bg-background pt-20 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <Link href="/account" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
                        <ArrowLeft size={20} />
                        <span>Back to Account</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                    <p className="text-muted-foreground mt-1">Manage your account preferences and security.</p>
                </div>

                {/* Appearance */}
                <div className="glass-panel p-6 rounded-3xl space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                            <Moon size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-foreground">Appearance</h2>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-3">Theme</label>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                onClick={() => setTheme("light")}
                                className={`p-4 rounded-xl border-2 transition-all ${theme === "light" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                    }`}
                            >
                                <Sun className="mx-auto mb-2 text-foreground" size={24} />
                                <div className="text-sm font-medium text-foreground">Light</div>
                            </button>
                            <button
                                onClick={() => setTheme("dark")}
                                className={`p-4 rounded-xl border-2 transition-all ${theme === "dark" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                    }`}
                            >
                                <Moon className="mx-auto mb-2 text-foreground" size={24} />
                                <div className="text-sm font-medium text-foreground">Dark</div>
                            </button>
                            <button
                                onClick={() => setTheme("system")}
                                className={`p-4 rounded-xl border-2 transition-all ${theme === "system" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                    }`}
                            >
                                <Globe className="mx-auto mb-2 text-foreground" size={24} />
                                <div className="text-sm font-medium text-foreground">System</div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="glass-panel p-6 rounded-3xl space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                            <Bell size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-foreground">Notifications</h2>
                    </div>

                    <div className="space-y-4">
                        {/* Order Updates */}
                        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                            <div>
                                <div className="font-semibold text-foreground">Order Updates</div>
                                <div className="text-sm text-muted-foreground">Get notified about your orders and deliveries</div>
                            </div>
                            <button
                                onClick={() => setNotifications(prev => ({ ...prev, orderUpdates: !prev.orderUpdates }))}
                                className={`relative w-14 h-8 rounded-full transition-colors ${notifications.orderUpdates ? "bg-primary" : "bg-secondary"
                                    }`}
                            >
                                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${notifications.orderUpdates ? "translate-x-7" : "translate-x-1"
                                    }`} />
                            </button>
                        </div>

                        {/* Price Alerts */}
                        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                            <div>
                                <div className="font-semibold text-foreground">Price Alerts</div>
                                <div className="text-sm text-muted-foreground">Notify when favorited items go on sale</div>
                            </div>
                            <button
                                onClick={() => setNotifications(prev => ({ ...prev, priceAlerts: !prev.priceAlerts }))}
                                className={`relative w-14 h-8 rounded-full transition-colors ${notifications.priceAlerts ? "bg-primary" : "bg-secondary"
                                    }`}
                            >
                                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${notifications.priceAlerts ? "translate-x-7" : "translate-x-1"
                                    }`} />
                            </button>
                        </div>

                        {/* New Messages */}
                        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                            <div>
                                <div className="font-semibold text-foreground">New Messages</div>
                                <div className="text-sm text-muted-foreground">Chat notifications from sellers</div>
                            </div>
                            <button
                                onClick={() => setNotifications(prev => ({ ...prev, newMessages: !prev.newMessages }))}
                                className={`relative w-14 h-8 rounded-full transition-colors ${notifications.newMessages ? "bg-primary" : "bg-secondary"
                                    }`}
                            >
                                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${notifications.newMessages ? "translate-x-7" : "translate-x-1"
                                    }`} />
                            </button>
                        </div>

                        {/* Newsletter */}
                        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                            <div>
                                <div className="font-semibold text-foreground">Newsletter</div>
                                <div className="text-sm text-muted-foreground">Weekly digest and platform updates</div>
                            </div>
                            <button
                                onClick={() => setNotifications(prev => ({ ...prev, newsletter: !prev.newsletter }))}
                                className={`relative w-14 h-8 rounded-full transition-colors ${notifications.newsletter ? "bg-primary" : "bg-secondary"
                                    }`}
                            >
                                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${notifications.newsletter ? "translate-x-7" : "translate-x-1"
                                    }`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="glass-panel p-6 rounded-3xl space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-green-500/10 text-green-500">
                            <Shield size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-foreground">Security</h2>
                    </div>

                    <div className="space-y-3">
                        {/* Wallet Sessions */}
                        <button className="w-full flex items-center justify-between p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors group">
                            <div className="flex items-center gap-3">
                                <Lock className="text-muted-foreground" size={20} />
                                <div className="text-left">
                                    <div className="font-semibold text-foreground">Active Wallet Sessions</div>
                                    <div className="text-sm text-muted-foreground">Manage connected devices</div>
                                </div>
                            </div>
                            <ChevronRight className="text-muted-foreground group-hover:text-foreground transition-colors" size={20} />
                        </button>

                        {/* Two-Factor */}
                        <button className="w-full flex items-center justify-between p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors group">
                            <div className="flex items-center gap-3">
                                <Shield className="text-muted-foreground" size={20} />
                                <div className="text-left">
                                    <div className="font-semibold text-foreground">Two-Factor Authentication</div>
                                    <div className="text-sm text-muted-foreground">Add extra security to your account</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full">Recommended</span>
                                <ChevronRight className="text-muted-foreground group-hover:text-foreground transition-colors" size={20} />
                            </div>
                        </button>

                        {/* Email Verification */}
                        <button className="w-full flex items-center justify-between p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors group">
                            <div className="flex items-center gap-3">
                                <Mail className="text-muted-foreground" size={20} />
                                <div className="text-left">
                                    <div className="font-semibold text-foreground">Email Verification</div>
                                    <div className="text-sm text-muted-foreground">Verify your email for recovery</div>
                                </div>
                            </div>
                            <ChevronRight className="text-muted-foreground group-hover:text-foreground transition-colors" size={20} />
                        </button>
                    </div>
                </div>

                {/* Data & Privacy */}
                <div className="glass-panel p-6 rounded-3xl space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
                            <Download size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-foreground">Data & Privacy</h2>
                    </div>

                    <div className="space-y-3">
                        {/* Export Data */}
                        <button className="w-full flex items-center justify-between p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors group">
                            <div className="flex items-center gap-3">
                                <Download className="text-muted-foreground" size={20} />
                                <div className="text-left">
                                    <div className="font-semibold text-foreground">Export Your Data</div>
                                    <div className="text-sm text-muted-foreground">Download all your marketplace data</div>
                                </div>
                            </div>
                            <ChevronRight className="text-muted-foreground group-hover:text-foreground transition-colors" size={20} />
                        </button>

                        {/* Delete Account */}
                        <button className="w-full flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors group">
                            <div className="flex items-center gap-3">
                                <Trash2 className="text-red-500" size={20} />
                                <div className="text-left">
                                    <div className="font-semibold text-red-500">Delete Account</div>
                                    <div className="text-sm text-muted-foreground">Permanently remove your account and data</div>
                                </div>
                            </div>
                            <ChevronRight className="text-red-500" size={20} />
                        </button>
                    </div>
                </div>

                {/* Platform Info */}
                <div className="text-center text-sm text-muted-foreground space-y-1">
                    <p>Web3 Marketplace v1.0.0</p>
                    <div className="flex items-center justify-center gap-4">
                        <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                        <span>•</span>
                        <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                        <span>•</span>
                        <a href="#" className="hover:text-foreground transition-colors">Help Center</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
