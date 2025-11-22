"use client";

import Link from "next/link";
import { useFavorites } from "@/components/favorites/FavoritesContext";
import { Heart, ShoppingBag } from "lucide-react";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";

// Import the same mock data
const MOCK_PRODUCTS = [
    { id: 1, title: "ChatGPT Plus Shared Account (1 Month)", category: "AI Tools", price: "5.00 USDT", rating: 4.9, sales: 1205, gradient: "from-green-500 to-emerald-700" },
    { id: 2, title: "Midjourney V6 Fast Mode API Key", category: "AI Tools", price: "15.00 USDT", rating: 4.8, sales: 850, gradient: "from-purple-600 to-blue-600" },
    { id: 3, title: "Windows 11 Pro Retail Key (Global)", category: "SaaS Keys", price: "3.50 USDT", rating: 4.9, sales: 3400, gradient: "from-blue-500 to-cyan-500" },
    { id: 4, title: "Netflix Premium 4K UHD (1 Year)", category: "Accounts", price: "25.00 USDT", rating: 4.7, sales: 560, gradient: "from-red-600 to-rose-900" },
    { id: 5, title: "Adobe Creative Cloud All Apps (3 Months)", category: "SaaS Keys", price: "45.00 USDT", rating: 4.9, sales: 210, gradient: "from-orange-500 to-red-500" },
    { id: 6, title: "Telegram Premium 6 Months Gift Link", category: "Crypto Utilities", price: "18.00 USDT", rating: 5.0, sales: 150, gradient: "from-sky-400 to-blue-600" },
    { id: 7, title: "Twitter/X Gold Checkmark Account (Aged)", category: "Accounts", price: "500.00 USDT", rating: 4.5, sales: 12, gradient: "from-gray-700 to-black" },
    { id: 8, title: "TradingView Premium 1 Year", category: "Crypto Utilities", price: "60.00 USDT", rating: 4.8, sales: 89, gradient: "from-indigo-500 to-purple-900" },
];

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    const favoriteProducts = MOCK_PRODUCTS.filter(p => favorites.has(p.id));

    return (
        <div className="min-h-screen bg-background pt-20 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                            <Heart className="text-red-500" fill="currentColor" />
                            My Favorites
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'} saved
                        </p>
                    </div>
                </div>

                {/* Favorites Grid */}
                {favoriteProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {favoriteProducts.map((product) => (
                            <Link href={`/market/${product.id}`} key={product.id} className="group">
                                <div className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                                    {/* Image Area */}
                                    <div className={`h-48 w-full bg-gradient-to-br ${product.gradient} relative p-6 flex items-start justify-end`}>
                                        <FavoriteButton productId={product.id} size={18} className="bg-white/20 backdrop-blur-md hover:bg-white/30" />
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-2">
                                            {product.title}
                                        </h3>

                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground">
                                                {product.category}
                                            </span>
                                            <span className="text-xs text-muted-foreground">⭐ {product.rating}</span>
                                        </div>

                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-lg font-bold text-foreground">{product.price}</span>
                                                <span className="text-xs text-muted-foreground">USDT</span>
                                            </div>
                                            <button className="p-2 rounded-full bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                                                <ShoppingBag size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 glass-panel rounded-3xl">
                        <Heart size={64} className="mx-auto text-muted-foreground mb-6 opacity-20" />
                        <h3 className="text-2xl font-bold text-foreground mb-2">No favorites yet</h3>
                        <p className="text-muted-foreground mb-8">Start exploring and save items you love!</p>
                        <Link
                            href="/market"
                            className="inline-block px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                        >
                            Browse Market
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
