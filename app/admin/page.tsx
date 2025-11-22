"use client";

import { useState } from "react";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("disputes");

    return (
        <main className="min-h-screen p-8 pt-24">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold neon-text mb-8">Admin Dashboard</h1>

                <div className="flex gap-6 mb-8">
                    {["Disputes", "Content Moderation", "User Risk", "Platform Stats"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase().split(" ")[0])}
                            className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === tab.toLowerCase().split(" ")[0]
                                    ? "bg-primary text-white"
                                    : "glass-panel hover:bg-white/5 text-gray-400"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="glass-panel p-8 rounded-xl min-h-[500px]">
                    {activeTab === "disputes" && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Active Disputes (2)</h2>
                            <div className="space-y-4">
                                {[1, 2].map(i => (
                                    <div key={i} className="bg-white/5 p-6 rounded-lg border border-white/10 flex justify-between items-center">
                                        <div>
                                            <div className="font-bold text-red-400 mb-1">Dispute #{202400 + i}</div>
                                            <div className="text-sm text-gray-400">Buyer: 0xabc... • Seller: 0xdef...</div>
                                            <div className="mt-2 text-sm">Reason: Item not received after 48h. Seller claims sent.</div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30">
                                                Release to Buyer
                                            </button>
                                            <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30">
                                                Release to Seller
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "content" && (
                        <div className="text-center text-gray-500 mt-20">
                            AI Auto-Moderation Active. No flagged content pending manual review.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
