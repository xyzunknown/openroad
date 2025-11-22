"use client";

import { useState } from "react";
import { Plus, Package, DollarSign, BarChart3, Settings } from "lucide-react";
import Link from "next/link";

export default function SellerCenterPage() {
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <main className="min-h-screen p-6 md:p-12 pt-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Seller Center</h1>
                    <Link href="/market/create" className="btn-primary flex items-center gap-2">
                        <Plus size={18} /> New Listing
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="glass-panel p-4 rounded-xl h-fit space-y-2">
                        <button
                            onClick={() => setActiveTab("dashboard")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === "dashboard" ? "bg-primary text-white" : "text-gray-400 hover:bg-white/5"}`}
                        >
                            <BarChart3 size={18} /> Dashboard
                        </button>
                        <button
                            onClick={() => setActiveTab("listings")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === "listings" ? "bg-primary text-white" : "text-gray-400 hover:bg-white/5"}`}
                        >
                            <Package size={18} /> My Listings
                        </button>
                        <button
                            onClick={() => setActiveTab("earnings")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === "earnings" ? "bg-primary text-white" : "text-gray-400 hover:bg-white/5"}`}
                        >
                            <DollarSign size={18} /> Earnings
                        </button>
                        <button
                            onClick={() => setActiveTab("settings")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === "settings" ? "bg-primary text-white" : "text-gray-400 hover:bg-white/5"}`}
                        >
                            <Settings size={18} /> Settings
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="glass-panel p-6 rounded-xl">
                                <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
                                <h3 className="text-2xl font-bold text-white">$1,240.50</h3>
                                <p className="text-green-400 text-xs mt-2 flex items-center gap-1">
                                    +12% <span className="text-gray-500">vs last month</span>
                                </p>
                            </div>
                            <div className="glass-panel p-6 rounded-xl">
                                <p className="text-gray-400 text-sm mb-1">Active Orders</p>
                                <h3 className="text-2xl font-bold text-white">8</h3>
                                <p className="text-blue-400 text-xs mt-2">2 pending delivery</p>
                            </div>
                            <div className="glass-panel p-6 rounded-xl">
                                <p className="text-gray-400 text-sm mb-1">Reputation</p>
                                <h3 className="text-2xl font-bold text-white">98%</h3>
                                <p className="text-gray-500 text-xs mt-2">Level 3 Seller</p>
                            </div>
                        </div>

                        {/* Recent Activity / Listings Table */}
                        <div className="glass-panel p-6 rounded-xl">
                            <h3 className="text-lg font-bold text-white mb-4">Active Listings</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-gray-500 text-sm border-b border-white/10">
                                            <th className="pb-3">Product</th>
                                            <th className="pb-3">Price</th>
                                            <th className="pb-3">Stock</th>
                                            <th className="pb-3">Sales</th>
                                            <th className="pb-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-300 text-sm">
                                        <tr className="border-b border-white/5 hover:bg-white/5 transition">
                                            <td className="py-4 font-medium">ChatGPT Plus Shared Account</td>
                                            <td className="py-4">5.00 USDT</td>
                                            <td className="py-4">42</td>
                                            <td className="py-4">1,205</td>
                                            <td className="py-4"><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Active</span></td>
                                        </tr>
                                        <tr className="border-b border-white/5 hover:bg-white/5 transition">
                                            <td className="py-4 font-medium">Windows 11 Pro Key</td>
                                            <td className="py-4">3.50 USDT</td>
                                            <td className="py-4">15</td>
                                            <td className="py-4">3,400</td>
                                            <td className="py-4"><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Active</span></td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition">
                                            <td className="py-4 font-medium">Netflix Premium 1 Year</td>
                                            <td className="py-4">25.00 USDT</td>
                                            <td className="py-4">0</td>
                                            <td className="py-4">560</td>
                                            <td className="py-4"><span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">Out of Stock</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
