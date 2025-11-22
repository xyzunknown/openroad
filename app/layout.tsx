import type { Metadata } from "next";
import "./globals.css";
import { Web3Provider } from "@/components/providers/Web3Provider";
import { IdentityProvider } from "@/components/identity/IdentityContext";
import { FavoritesProvider } from "@/components/favorites/FavoritesContext";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";

export const metadata: Metadata = {
    title: "Web3 AI Marketplace",
    description: "Anonymous, Cross-border, AI-driven Digital Goods Marketplace",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Web3Provider>
                    <IdentityProvider>
                        <FavoritesProvider>
                            <ThemeProvider>
                                <Navbar />
                                {children}
                                <FloatingChatButton />
                            </ThemeProvider>
                        </FavoritesProvider>
                    </IdentityProvider>
                </Web3Provider>
            </body>
        </html>
    );
}
