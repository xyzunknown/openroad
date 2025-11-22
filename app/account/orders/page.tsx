"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, ChevronRight, Package, AlertCircle, CheckCircle, Clock, Calendar, X, ChevronDown } from "lucide-react";

// Mock Data
const MOCK_ORDERS = [
    {
        id: "ORD-7829-XJ",
        product: "ChatGPT Plus Shared Account (1 Month)",
        amount: "5.00 USDT",
        date: "2023-11-20",
        status: "Completed",
        seller: "AI_Reseller_Pro",
        image: "from-green-500 to-emerald-700"
    },
    {
        id: "ORD-9921-MC",
        product: "Windows 11 Pro Retail Key",
        amount: "3.50 USDT",
        date: "2023-11-19",
        status: "In Escrow",
        seller: "SoftKey_Global",
        image: "from-blue-500 to-cyan-500"
    },
    {
        id: "ORD-1102-PP",
        product: "Netflix Premium 4K (1 Year)",
        amount: "25.00 USDT",
        date: "2023-11-15",
        status: "Disputed",
        seller: "StreamMaster",
        image: "from-red-600 to-rose-900"
    },
    {
        id: "ORD-3321-AZ",
        product: "Midjourney V6 API Key",
        amount: "15.00 USDT",
        date: "2023-11-10",
        status: "Completed",
        seller: "ArtGen_Bot",
        image: "from-purple-600 to-blue-600"
    }
];

const STATUS_STYLES = {
    "Completed": "bg-green-500/10 text-green-500 border-green-500/20",
    "In Escrow": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    "Disputed": "bg-red-500/10 text-red-500 border-red-500/20",
    "Cancelled": "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

const STATUS_ICONS = {
    "Completed": CheckCircle,
    "In Escrow": Clock,
    "Disputed": AlertCircle,
    "Cancelled": Package,
};

export default function OrdersPage() {
    const [statusFilter, setStatusFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [dateFilter, setDateFilter] = useState("All");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [customDateRange, setCustomDateRange] = useState({ from: "", to: "" });

    // Filter orders based on all criteria
    const filteredOrders = useMemo(() => {
        let result = MOCK_ORDERS;

        // Status filter
        if (statusFilter !== "All") {
            result = result.filter(o => o.status === statusFilter);
        }

        // Search filter (order ID, product name, seller)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(o =>
                o.id.toLowerCase().includes(query) ||
                o.product.toLowerCase().includes(query) ||
                o.seller.toLowerCase().includes(query)
            );
        }

        // Date filter
        if (dateFilter !== "All") {
            const now = new Date();
            const orderDate = (dateStr: string) => new Date(dateStr);

            if (dateFilter === "custom" && customDateRange.from && customDateRange.to) {
                const fromDate = new Date(customDateRange.from);
                const toDate = new Date(customDateRange.to);
                result = result.filter(o => {
                    const date = orderDate(o.date);
                    return date >= fromDate && date <= toDate;
                });
            } else {
                result = result.filter(o => {
                    const date = orderDate(o.date);
                    const daysDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

                    switch (dateFilter) {
                        case "7days":
                            return daysDiff <= 7;
                        case "30days":
                            return daysDiff <= 30;
                        case "90days":
                            return daysDiff <= 90;
                        default:
                            return true;
                    }
                });
            }
        }

        return result;
    }, [statusFilter, searchQuery, dateFilter, customDateRange]);

    const getDateFilterLabel = () => {
        if (dateFilter === "custom" && customDateRange.from && customDateRange.to) {
            return `${customDateRange.from} ~ ${customDateRange.to}`;
        }
        switch (dateFilter) {
            case "7days": return "Last 7 Days";
            case "30days": return "Last 30 Days";
            case "90days": return "Last 90 Days";
            default: return "All Time";
        }
    };

    const handleCustomDateApply = () => {
        if (customDateRange.from && customDateRange.to) {
            setDateFilter("custom");
            setShowDatePicker(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pt-20 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
                    <p className="text-muted-foreground mt-1">Manage your purchases and track deliveries.</p>
                </div>

                {/* Filters Section */}
                <div className="space-y-4">
                    {/* Search Bar & Date Filter */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                            <input
                                type="text"
                                placeholder="Search by order ID, product, or seller..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>

                        {/* Enhanced Date Filter */}
                        <div className="relative w-full md:w-64">
                            <button
                                onClick={() => setShowDatePicker(!showDatePicker)}
                                className="w-full pl-10 pr-10 py-3 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground transition-all flex items-center justify-between"
                            >
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                                <span className="truncate text-sm">{getDateFilterLabel()}</span>
                                <ChevronDown className={`transition-transform ${showDatePicker ? 'rotate-180' : ''}`} size={18} />
                            </button>

                            {/* Date Picker Dropdown */}
                            {showDatePicker && (
                                <div className="absolute top-full mt-2 w-96 bg-card border border-border rounded-xl shadow-2xl z-50 p-4 space-y-4">
                                    {/* Quick Options - Horizontal Pills */}
                                    <div className="flex gap-2">
                                        {[
                                            { value: "7days", label: "Last 7 Days" },
                                            { value: "30days", label: "Last 30 Days" },
                                            { value: "90days", label: "Last 90 Days" },
                                        ].map(option => (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    setDateFilter(option.value);
                                                    setShowDatePicker(false);
                                                }}
                                                className={`flex-1 px-3 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${dateFilter === option.value
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-border"></div>

                                    {/* Custom Date Range */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-foreground mb-3">Custom Range</h3>
                                        <div className="space-y-3">
                                            {/* From Date */}
                                            <div>
                                                <label className="text-xs text-muted-foreground mb-1.5 block">From</label>
                                                <div className="relative">
                                                    <input
                                                        type="date"
                                                        lang="en"
                                                        value={customDateRange.from}
                                                        onChange={(e) => setCustomDateRange(prev => ({ ...prev, from: e.target.value }))}
                                                        className="w-full px-4 py-2.5 rounded-xl bg-background border-2 border-border focus:border-primary focus:outline-none text-foreground text-sm transition-colors cursor-pointer"
                                                    />
                                                    {!customDateRange.from && (
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                                                            Year/Month/Day
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {/* To Date */}
                                            <div>
                                                <label className="text-xs text-muted-foreground mb-1.5 block">To</label>
                                                <div className="relative">
                                                    <input
                                                        type="date"
                                                        lang="en"
                                                        value={customDateRange.to}
                                                        onChange={(e) => setCustomDateRange(prev => ({ ...prev, to: e.target.value }))}
                                                        className="w-full px-4 py-2.5 rounded-xl bg-background border-2 border-border focus:border-primary focus:outline-none text-foreground text-sm transition-colors cursor-pointer"
                                                    />
                                                    {!customDateRange.to && (
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                                                            Year/Month/Day
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            onClick={() => setShowDatePicker(false)}
                                            className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/50 text-foreground hover:bg-secondary text-sm font-medium transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleCustomDateApply}
                                            disabled={!customDateRange.from || !customDateRange.to}
                                            className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 text-sm font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Status Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        <span className="text-sm text-muted-foreground shrink-0">Status:</span>
                        <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-xl border border-border/50">
                            {["All", "In Escrow", "Completed", "Disputed"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setStatusFilter(f)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${statusFilter === f
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Active Filters Summary */}
                    {(searchQuery || dateFilter !== "All" || statusFilter !== "All") && (
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">Active filters:</span>
                            {searchQuery && (
                                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full flex items-center gap-1">
                                    Search: "{searchQuery}"
                                    <X size={14} className="cursor-pointer hover:opacity-70" onClick={() => setSearchQuery("")} />
                                </span>
                            )}
                            {dateFilter !== "All" && (
                                <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full flex items-center gap-1">
                                    {getDateFilterLabel()}
                                    <X size={14} className="cursor-pointer hover:opacity-70" onClick={() => {
                                        setDateFilter("All");
                                        setCustomDateRange({ from: "", to: "" });
                                    }} />
                                </span>
                            )}
                            {statusFilter !== "All" && (
                                <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full flex items-center gap-1">
                                    Status: {statusFilter}
                                    <X size={14} className="cursor-pointer hover:opacity-70" onClick={() => setStatusFilter("All")} />
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="text-sm text-muted-foreground">
                    Showing <span className="font-bold text-foreground">{filteredOrders.length}</span> of <span className="font-bold text-foreground">{MOCK_ORDERS.length}</span> orders
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => {
                            const StatusIcon = STATUS_ICONS[order.status as keyof typeof STATUS_ICONS] || Package;
                            return (
                                <Link
                                    href={`/account/orders/${order.id}`}
                                    key={order.id}
                                    className="glass-panel p-0 rounded-2xl flex flex-col md:flex-row items-center overflow-hidden hover:border-primary/50 transition-all group"
                                >
                                    {/* Product Image Placeholder */}
                                    <div className={`h-32 md:h-full w-full md:w-32 bg-gradient-to-br ${order.image} shrink-0`} />

                                    <div className="flex-1 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-1">
                                                <span>{order.id}</span>
                                                <span>•</span>
                                                <span>{order.date}</span>
                                            </div>
                                            <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                                                {order.product}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">Seller: {order.seller}</p>
                                        </div>

                                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                            <div className="text-right">
                                                <div className="font-bold text-foreground">{order.amount}</div>
                                                <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border mt-1 ${STATUS_STYLES[order.status as keyof typeof STATUS_STYLES]}`}>
                                                    <StatusIcon size={12} />
                                                    {order.status}
                                                </div>
                                            </div>
                                            <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="text-center py-20 glass-panel rounded-3xl">
                            <Package size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                            <h3 className="text-lg font-bold text-foreground">No orders found</h3>
                            <p className="text-muted-foreground mb-4">Try adjusting your search or filters.</p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setDateFilter("All");
                                    setStatusFilter("All");
                                    setCustomDateRange({ from: "", to: "" });
                                }}
                                className="px-6 py-2.5 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
