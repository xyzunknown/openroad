"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface FavoritesContextType {
    favorites: Set<number>;
    toggleFavorite: (productId: number) => void;
    isFavorite: (productId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Set<number>>(new Set());
    const [mounted, setMounted] = useState(false);

    // Load favorites from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setFavorites(new Set(parsed));
            } catch (e) {
                console.error("Failed to parse favorites", e);
            }
        }
        setMounted(true);
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        if (mounted) {
            localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
        }
    }, [favorites, mounted]);

    const toggleFavorite = (productId: number) => {
        setFavorites((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(productId)) {
                newSet.delete(productId);
            } else {
                newSet.add(productId);
            }
            return newSet;
        });
    };

    const isFavorite = (productId: number) => favorites.has(productId);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within FavoritesProvider");
    }
    return context;
}
