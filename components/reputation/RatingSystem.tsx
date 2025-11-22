"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export function RatingSystem({ productId }: { productId: string }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (rating === 0) return;
        setSubmitted(true);
        // Simulate submission
    };

    if (submitted) {
        return (
            <div className="glass-panel p-6 rounded-xl text-center animate-fade-in">
                <div className="text-green-400 text-4xl mb-2">✓</div>
                <h3 className="font-bold text-lg">Review Submitted!</h3>
                <p className="text-gray-400 text-sm">Your reputation score has increased by +5 points.</p>
            </div>
        );
    }

    return (
        <div className="glass-panel p-6 rounded-xl">
            <h3 className="font-bold mb-4 text-lg">Rate this Transaction</h3>

            <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        className="transition transform hover:scale-110"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <Star
                            size={32}
                            fill={(hover || rating) >= star ? "#eab308" : "transparent"}
                            color={(hover || rating) >= star ? "#eab308" : "#4b5563"}
                        />
                    </button>
                ))}
            </div>

            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write an anonymous review... (AI will auto-translate this for the seller)"
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none h-24 mb-4"
            />

            <button
                onClick={handleSubmit}
                disabled={rating === 0}
                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Submit Anonymous Review
            </button>
        </div>
    );
}
