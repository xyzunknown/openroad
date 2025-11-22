"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, Zap, Star, ShoppingCart } from "lucide-react";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";

// Realistic Mock Data based on PRD
const MOCK_PRODUCTS = [
    {
        id: 1,
        title: "ChatGPT Plus Shared Account (1 Month)",
        category: "AI Tools",
        price: "5.00 USDT",
        rating: 4.9,
        sales: 1205,
        autoDelivery: true,
        gradient: "from-green-500 to-emerald-700",
    },
    {
        id: 2,
        title: "Midjourney V6 Fast Mode API Key",
        category: "AI Tools",
        price: "15.00 USDT",
        rating: 4.8,
        sales: 850,
        autoDelivery: true,
        gradient: "from-purple-600 to-blue-600",
    },
    {
        id: 3,
        title: "Windows 11 Pro Retail Key (Global)",
        category: "SaaS Keys",
        price: "3.50 USDT",
        rating: 4.9,
        sales: 3400,
        autoDelivery: true,
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        id: 4,
        title: "Netflix Premium 4K UHD (1 Year)",
        category: "Accounts",
        price: "25.00 USDT",
        rating: 4.7,
        sales: 560,
        autoDelivery: true,
        gradient: "from-red-600 to-rose-900",
    },
    {
        id: 5,
        title: "Adobe Creative Cloud All Apps (3 Months)",
        category: "SaaS Keys",
        price: "45.00 USDT",
        rating: 4.9,
        sales: 210,
        autoDelivery: false,
        gradient: "from-orange-500 to-red-500",
    },
    {
        id: 6,
        title: "Telegram Premium 6 Months Gift Link",
        category: "Crypto Utilities",
        price: "18.00 USDT",
        rating: 5.0,
        sales: 150,
        autoDelivery: true,
        gradient: "from-sky-400 to-blue-600",
    },
    {
        id: 7,
        title: "Twitter/X Gold Checkmark Account (Aged)",
        category: "Accounts",
        price: "500.00 USDT",
        rating: 4.5,
        sales: 12,
        autoDelivery: false,
        gradient: "from-gray-700 to-black",
    },
    {
        id: 8,
        title: "TradingView Premium 1 Year",
        category: "Crypto Utilities",
        price: "60.00 USDT",
        rating: 4.8,
        sales: 89,
        autoDelivery: true,
        gradient: "from-indigo-500 to-purple-900",
    },
];

const CATEGORIES = [
    "All", "AI Tools", "SaaS Keys", "Accounts", "Crypto Utilities", "NFT Art"
];

export default function MarketplacePage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return MOCK_PRODUCTS.filter((product) => {
            const matchesCategory = activeCategory === "All" || product.category === activeCategory;
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    return (
        <main className="min-h-screen bg-background pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                        Discover Digital Goods
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Buy and sell AI tools, software keys, and accounts anonymously with crypto.
                    </p>
                </div>

                {/* Search & Filter Section */}
                <div className="max-w-3xl mx-auto mb-12 space-y-6">
                    {/* Search Bar */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-11 pr-4 py-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm hover:shadow-md"
                            placeholder="Search for 'ChatGPT', 'Windows Key', 'VPN'..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === category
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <Link href={`/market/${product.id}`} key={product.id} className="group">
                                <div className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                                    {/* Image Area */}
                                    <div className={`h-48 w-full bg-gradient-to-br ${product.gradient} relative p-6 flex flex-col justify-between`}>
                                        <div className="flex justify-between items-start">
                                            {product.autoDelivery && (
                                                <span className="px-2 py-1 rounded-md bg-black/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                                    <Zap size={10} className="text-yellow-400" fill="currentColor" />
                                                    Auto
                                                </span>
                                            )}
                                            <div className="ml-auto">
                                                <FavoriteButton productId={product.id} size={18} className="bg-white/20 backdrop-blur-md hover:bg-white/30" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                                {product.title}
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground">
                                                {product.category}
                                            </span>
                                            <div className="flex items-center text-yellow-500 text-xs">
                                                <Star size={12} fill="currentColor" />
                                                <span className="ml-1 font-medium text-muted-foreground">{product.rating}</span>
                                            </div>
                                            <span className="text-[10px] text-muted-foreground">• {product.sales} sold</span>
                                        </div>

                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-lg font-bold text-foreground">{product.price}</span>
                                                <span className="text-xs text-muted-foreground">USDT</span>
                                            </div>
                                            <button className="p-2 rounded-full bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                                                <ShoppingCart size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-muted-foreground">
                        <p className="text-xl">No products found matching your criteria.</p>
                        <button
                            onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                            className="mt-4 text-primary hover:underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
