import Link from "next/link";
import { WalletConnectModal } from "@/components/wallet/WalletConnectModal";

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-8 md:p-24 relative overflow-hidden bg-background">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px]"></div>
            </div>

            <div className="z-10 text-center max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
                    The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Digital Trade</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Anonymous. Cross-border. AI-Driven.
                    <br />
                    The ultimate marketplace for virtual goods.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Link
                        href="/market"
                        className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:scale-105 active:scale-95"
                    >
                        Enter Marketplace
                    </Link>
                    <div className="hidden sm:block">
                        <WalletConnectModal />
                    </div>
                </div>
            </div>

            <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                {[
                    { title: "Multi-Chain", desc: "Support for BSC, SOL, Base, TRC, and ETH. Trade seamlessly across networks.", color: "text-primary" },
                    { title: "AI Powered", desc: "Auto-translation, content generation, and smart pricing for global reach.", color: "text-purple-500" },
                    { title: "Escrow Secure", desc: "Smart contract based escrow ensures safe delivery and payments.", color: "text-teal-500" }
                ].map((feature, i) => (
                    <div key={i} className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                        <h3 className={`text-2xl font-bold mb-4 ${feature.color}`}>{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
