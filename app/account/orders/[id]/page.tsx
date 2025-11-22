"use client";

import Link from "next/link";
import { ArrowLeft, Package, Clock, CheckCircle, AlertTriangle, X, Download, MessageCircle, Shield } from "lucide-react";

// Mock order data (in real app, fetch by ID)
const MOCK_ORDER_DATA: Record<string, any> = {
    "ORD-7829-XJ": {
        id: "ORD-7829-XJ",
        product: {
            title: "ChatGPT Plus Shared Account (1 Month)",
            image: "from-green-500 to-emerald-700"
        },
        amount: "5.00 USDT",
        date: "2023-11-20",
        status: "Completed",
        seller: "AI_Reseller_Pro",
        deliveryData: {
            email: "shared.acc.123@gptplus.com",
            password: "SecurePass2023!",
            note: "Login anytime. Don't change password."
        },
        timeline: [
            { label: "Order Created", date: "2023-11-20 10:30", completed: true },
            { label: "Payment Confirmed", date: "2023-11-20 10:31", completed: true },
            { label: "In Escrow", date: "2023-11-20 10:31", completed: true },
            { label: "Delivered", date: "2023-11-20 10:45", completed: true },
            { label: "Completed", date: "2023-11-20 12:00", completed: true }
        ]
    },
    "ORD-9921-MC": {
        id: "ORD-9921-MC",
        product: {
            title: "Windows 11 Pro Retail Key",
            image: "from-blue-500 to-cyan-500"
        },
        amount: "3.50 USDT",
        date: "2023-11-19",
        status: "In Escrow",
        seller: "SoftKey_Global",
        escrowRelease: "2023-11-22 14:00",
        timeline: [
            { label: "Order Created", date: "2023-11-19 14:00", completed: true },
            { label: "Payment Confirmed", date: "2023-11-19 14:01", completed: true },
            { label: "In Escrow", date: "2023-11-19 14:01", completed: true },
            { label: "Awaiting Delivery", date: "Pending", completed: false }
        ]
    },
    "ORD-1102-PP": {
        id: "ORD-1102-PP",
        product: {
            title: "Netflix Premium 4K (1 Year)",
            image: "from-red-600 to-rose-900"
        },
        amount: "25.00 USDT",
        date: "2023-11-15",
        status: "Disputed",
        seller: "StreamMaster",
        dispute: {
            reason: "Account credentials not working",
            opened: "2023-11-16",
            status: "Under Review",
            evidence: ["Screenshot showing login error"]
        },
        timeline: [
            { label: "Order Created", date: "2023-11-15 09:00", completed: true },
            { label: "Payment Confirmed", date: "2023-11-15 09:01", completed: true },
            { label: "In Escrow", date: "2023-11-15 09:01", completed: true },
            { label: "Dispute Opened", date: "2023-11-16 11:30", completed: true },
            { label: "Admin Review", date: "In Progress", completed: false }
        ]
    }
};

export default function OrderDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const order = MOCK_ORDER_DATA[id];

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <Package size={64} className="mx-auto text-muted-foreground opacity-50" />
                    <h2 className="text-2xl font-bold text-foreground">Order Not Found</h2>
                    <Link href="/account/orders" className="text-primary hover:underline">
                        ← Back to Orders
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-20 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Back Button */}
                <Link href="/account/orders" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft size={20} />
                    <span>Back to Orders</span>
                </Link>

                {/* Order Header */}
                <div className="glass-panel p-8 rounded-3xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-2xl font-bold text-foreground">Order {order.id}</h1>
                                <OrderStatusBadge status={order.status} />
                            </div>
                            <p className="text-muted-foreground text-sm">Placed on {order.date}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-foreground">{order.amount}</div>
                            <p className="text-muted-foreground text-sm">Total Amount</p>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-2xl">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${order.product.image}`} />
                        <div className="flex-1">
                            <h3 className="font-bold text-foreground">{order.product.title}</h3>
                            <p className="text-sm text-muted-foreground">Seller: {order.seller}</p>
                        </div>
                    </div>
                </div>

                {/* Status-Specific Content */}
                {order.status === "In Escrow" && <InEscrowView order={order} />}
                {order.status === "Completed" && <CompletedView order={order} />}
                {order.status === "Disputed" && <DisputedView order={order} />}

                {/* Timeline */}
                <div className="glass-panel p-8 rounded-3xl">
                    <h2 className="text-xl font-bold text-foreground mb-6">Order Timeline</h2>
                    <div className="space-y-4">
                        {order.timeline.map((step: any, index: number) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${step.completed ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                                    }`}>
                                    {step.completed ? <CheckCircle size={16} /> : <Clock size={16} />}
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-foreground">{step.label}</div>
                                    <div className="text-sm text-muted-foreground">{step.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Status Badge Component
function OrderStatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        "Completed": "bg-green-500/10 text-green-500 border-green-500/20",
        "In Escrow": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        "Disputed": "bg-red-500/10 text-red-500 border-red-500/20",
        "Cancelled": "bg-gray-500/10 text-gray-500 border-gray-500/20",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || ""}`}>
            {status}
        </span>
    );
}

// In Escrow View
function InEscrowView({ order }: { order: any }) {
    return (
        <div className="glass-panel p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-3 text-yellow-500">
                <Clock size={24} />
                <h2 className="text-xl font-bold text-foreground">Waiting for Delivery</h2>
            </div>
            <p className="text-muted-foreground">
                Your payment is held in escrow. The seller has until <span className="font-bold text-foreground">{order.escrowRelease}</span> to deliver the product.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
                    <CheckCircle size={18} />
                    Confirm Delivery
                </button>
                <button className="px-6 py-3 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 font-semibold hover:bg-red-500/20 transition-colors flex items-center gap-2 justify-center">
                    <AlertTriangle size={18} />
                    Open Dispute
                </button>
                <button className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors flex items-center gap-2 justify-center">
                    <MessageCircle size={18} />
                    Contact Seller
                </button>
            </div>
        </div>
    );
}

// Completed View
function CompletedView({ order }: { order: any }) {
    return (
        <div className="glass-panel p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-3 text-green-500">
                <CheckCircle size={24} />
                <h2 className="text-xl font-bold text-foreground">Order Completed</h2>
            </div>
            {order.deliveryData && (
                <div className="bg-secondary/30 p-6 rounded-2xl space-y-3">
                    <div className="font-bold text-foreground mb-4">📦 Delivery Details:</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="text-xs text-muted-foreground mb-1">Email/Username</div>
                            <div className="font-mono bg-background px-3 py-2 rounded-lg text-foreground">{order.deliveryData.email}</div>
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground mb-1">Password</div>
                            <div className="font-mono bg-background px-3 py-2 rounded-lg text-foreground">{order.deliveryData.password}</div>
                        </div>
                    </div>
                    {order.deliveryData.note && (
                        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <div className="text-xs text-yellow-600 dark:text-yellow-500 font-semibold mb-1">⚠️ Important Note</div>
                            <div className="text-sm text-foreground">{order.deliveryData.note}</div>
                        </div>
                    )}
                </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
                    <Download size={18} />
                    Download Receipt
                </button>
                <button className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors flex items-center gap-2 justify-center">
                    ⭐ Rate Transaction
                </button>
            </div>
        </div>
    );
}

// Disputed View
function DisputedView({ order }: { order: any }) {
    return (
        <div className="glass-panel p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-3 text-red-500">
                <AlertTriangle size={24} />
                <h2 className="text-xl font-bold text-foreground">Dispute Opened</h2>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl space-y-3">
                <div>
                    <div className="text-xs text-muted-foreground mb-1">Reason</div>
                    <div className="font-semibold text-foreground">{order.dispute.reason}</div>
                </div>
                <div>
                    <div className="text-xs text-muted-foreground mb-1">Opened</div>
                    <div className="text-foreground">{order.dispute.opened}</div>
                </div>
                <div>
                    <div className="text-xs text-muted-foreground mb-1">Status</div>
                    <div className="flex items-center gap-2">
                        <Shield size={16} className="text-blue-500" />
                        <span className="font-semibold text-blue-500">{order.dispute.status}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
                    📎 Add Evidence
                </button>
                <button className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors flex items-center gap-2 justify-center">
                    <MessageCircle size={18} />
                    Contact Admin
                </button>
            </div>
        </div>
    );
}
