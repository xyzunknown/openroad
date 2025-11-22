"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/components/favorites/FavoritesContext";
import { useState } from "react";

interface FavoriteButtonProps {
    productId: number;
    size?: number;
    className?: string;
}

export function FavoriteButton({ productId, size = 20, className = "" }: FavoriteButtonProps) {
    const { toggleFavorite, isFavorite } = useFavorites();
    const [isAnimating, setIsAnimating] = useState(false);
    const favorited = isFavorite(productId);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(productId);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
    };

    return (
        <button
            onClick={handleClick}
            className={`p-2 rounded-full hover:bg-secondary/50 transition-all group ${className} ${isAnimating ? "scale-125" : ""
                }`}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
            <Heart
                size={size}
                className={`transition-all ${favorited
                        ? "fill-red-500 text-red-500"
                        : "text-muted-foreground group-hover:text-red-500"
                    }`}
            />
        </button>
    );
}
