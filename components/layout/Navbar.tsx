"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletConnectModal } from "@/components/wallet/WalletConnectModal";
import { useTheme } from "next-themes";
import { Sun, Moon, Plus } from "lucide-react";

export function Navbar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    const navLinks = [
        { name: "Browse", href: "/market" },
        { name: "Categories", href: "/market/categories" }, // Placeholder
        { name: "My Orders", href: "/account/orders" }, // Placeholder
        { name: "Account", href: "/account" }, // Placeholder
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 tracking-tight">
                            Web3 Market
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors duration-200 ${pathname === link.href
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Wallet Connection & Theme Toggle */}
                    <div className="flex items-center gap-4">
                        {/* Sell Button */}
                        <Link
                            href="/market/create"
                            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium text-sm flex items-center gap-2"
                        >
                            <Plus size={18} />
                            <span className="hidden sm:inline">Sell</span>
                        </Link>

                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <WalletConnectModal />
                    </div>
                </div>
            </div>
        </nav>
    );
}
