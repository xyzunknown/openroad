"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Plus, X, Sparkles, AlertCircle, Check } from "lucide-react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
    "SaaS Accounts",
    "Software Licenses",
    "Digital Art & NFTs",
    "AI Services",
    "Gaming Accounts",
    "Educational Courses",
    "E-books & Documents",
    "API Keys & Credits",
    "VPN & Proxies",
    "Music & Audio",
    "Video Content",
    "3D Models",
    "Other Digital Goods"
];

const DELIVERY_METHODS = [
    "Instant - Automated Delivery",
    "Manual - Within 1 hour",
    "Manual - Within 24 hours",
    "Manual - Within 3 days"
];

export default function CreateListingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        // Basic Information
        title: "",
        category: "SaaS Accounts",
        shortDescription: "",
        fullDescription: "",

        // Pricing & Delivery
        price: "",
        currency: "USDT",
        deliveryMethod: "Instant - Automated Delivery",
        stockQuantity: "",

        // Product Details
        features: [""],
        requirements: "",
        validityPeriod: "",

        // Images & Files
        images: [] as string[],
        sampleFiles: [] as string[],

        // Terms
        refundPolicy: "No refunds on digital goods",
        termsAndConditions: "",
        autoRelist: true
    });

    const [validation, setValidation] = useState({
        title: true,
        price: true,
        description: true,
        stock: true
    });

    const handleAIGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const templates: Record<string, any> = {
                "SaaS Accounts": {
                    title: "Premium ChatGPT Plus Account - Shared Access (1 Month)",
                    shortDescription: "Access GPT-4 and advanced AI features with our verified shared account",
                    fullDescription: "Get instant access to ChatGPT Plus with all premium features including:\n\n• GPT-4 model access\n• Faster response times\n• Priority access during peak hours\n• DALL-E 3 image generation\n• Advanced data analysis\n\nAccount Details:\n• Shared account (3-5 users)\n• Guaranteed uptime\n• Instant delivery\n• 24/7 support",
                    price: "5.99",
                    features: ["GPT-4 Access", "DALL-E 3 Included", "Faster Responses", "24/7 Support"],
                    validityPeriod: "30 days",
                    stockQuantity: "50"
                },
                "Software Licenses": {
                    title: "Windows 11 Pro Retail License Key - Lifetime Activation",
                    shortDescription: "Genuine Windows 11 Pro license key with lifetime activation guarantee",
                    fullDescription: "Official Windows 11 Professional retail license key for 1 PC.\n\n• Lifetime activation\n• Genuine Microsoft product\n• Supports all Windows 11 Pro features\n• Instant email delivery\n• Activation support included\n\nWhat You Get:\n• 25-character product key\n• Download link for Windows 11\n• Activation instructions\n• Lifetime validity",
                    price: "12.99",
                    features: ["Lifetime License", "Retail Key", "1 PC Activation", "Instant Delivery"],
                    validityPeriod: "Lifetime",
                    stockQuantity: "100"
                }
            };

            const template = templates[formData.category] || templates["SaaS Accounts"];
            setFormData(prev => ({ ...prev, ...template }));
            setIsGenerating(false);
        }, 1500);
    };

    const addFeature = () => {
        setFormData(prev => ({
            ...prev,
            features: [...prev.features, ""]
        }));
    };

    const removeFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const validateForm = () => {
        const newValidation = {
            title: formData.title.length >= 10,
            price: parseFloat(formData.price) > 0,
            description: formData.fullDescription.length >= 50,
            stock: parseInt(formData.stockQuantity) > 0
        };
        setValidation(newValidation);
        return Object.values(newValidation).every(v => v);
    };

    const handleSubmit = () => {
        if (validateForm()) {
            setIsSubmitting(true);
            // Simulate submission
            setTimeout(() => {
                // Show success and navigate
                alert('✅ Product listing created successfully!');
                router.push('/market');
            }, 1000);
        } else {
            // Scroll to first error
            alert('❌ Please fill in all required fields correctly');
        }
    };

    const nextStep = () => {
        if (currentStep === 1 && formData.title && formData.category) {
            setCurrentStep(2);
        } else if (currentStep === 2 && formData.price && formData.stockQuantity) {
            setCurrentStep(3);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    return (
        <div className="min-h-screen bg-background pt-20 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <Link href="/market" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
                        <ArrowLeft size={20} />
                        <span>Back to Market</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-foreground">Create Product Listing</h1>
                    <p className="text-muted-foreground mt-1">List your digital products on the marketplace</p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-between">
                    {[
                        { num: 1, label: "Basic Info" },
                        { num: 2, label: "Pricing & Stock" },
                        { num: 3, label: "Details & Review" }
                    ].map((step, idx) => (
                        <div key={step.num} className="flex items-center flex-1">
                            <div className="flex flex-col items-center flex-1">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${currentStep >= step.num
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-muted-foreground"
                                    }`}>
                                    {currentStep > step.num ? <Check size={20} /> : step.num}
                                </div>
                                <span className={`text-xs mt-2 ${currentStep >= step.num ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                                    {step.label}
                                </span>
                            </div>
                            {idx < 2 && (
                                <div className={`h-0.5 flex-1 transition-colors ${currentStep > step.num ? "bg-primary" : "bg-secondary"
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* AI Assistant */}
                <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-purple-500/10">
                            <Sparkles className="text-purple-500" size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">AI Assistant</h3>
                            <p className="text-sm text-muted-foreground">Auto-fill listing details based on your category</p>
                        </div>
                    </div>
                    <button
                        onClick={handleAIGenerate}
                        disabled={isGenerating}
                        className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 font-medium text-sm"
                    >
                        {isGenerating ? "Generating..." : "✨ Magic Fill"}
                    </button>
                </div>

                {/* Form Content */}
                <div className="glass-panel p-6 rounded-3xl space-y-6">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-foreground">Basic Information</h2>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Product Category *
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none text-foreground"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Product Title * <span className="text-muted-foreground font-normal">(min 10 characters)</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl bg-secondary/50 border ${!validation.title && formData.title.length > 0
                                        ? "border-red-500"
                                        : "border-border"
                                        } focus:border-primary focus:outline-none text-foreground`}
                                    placeholder="e.g., Premium ChatGPT Plus Account - Shared Access"
                                />
                                {!validation.title && formData.title.length > 0 && (
                                    <p className="text-red-500 text-xs mt-1">Title must be at least 10 characters</p>
                                )}
                            </div>

                            {/* Short Description */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Short Description
                                </label>
                                <input
                                    type="text"
                                    value={formData.shortDescription}
                                    onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none text-foreground"
                                    placeholder="Brief one-line description (shown in listings)"
                                    maxLength={100}
                                />
                                <p className="text-xs text-muted-foreground mt-1">{formData.shortDescription.length}/100</p>
                            </div>

                            {/* Full Description */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Full Description * <span className="text-muted-foreground font-normal">(min 50 characters)</span>
                                </label>
                                <textarea
                                    value={formData.fullDescription}
                                    onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl bg-secondary/50 border ${!validation.description && formData.fullDescription.length > 0
                                        ? "border-red-500"
                                        : "border-border"
                                        } focus:border-primary focus:outline-none text-foreground`}
                                    placeholder="Detailed product description, features, what's included, etc."
                                    rows={8}
                                />
                                <p className="text-xs text-muted-foreground mt-1">{formData.fullDescription.length} characters</p>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Pricing & Stock */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-foreground">Pricing & Inventory</h2>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Price *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-xl bg-secondary/50 border ${!validation.price && formData.price.length > 0
                                            ? "border-red-500"
                                            : "border-border"
                                            } focus:border-primary focus:outline-none text-foreground`}
                                        placeholder="0.00"
                                    />
                                </div>

                                {/* Currency */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Currency
                                    </label>
                                    <select
                                        value={formData.currency}
                                        onChange={e => setFormData({ ...formData, currency: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none text-foreground"
                                    >
                                        <option value="USDT">USDT</option>
                                        <option value="USDC">USDC</option>
                                        <option value="ETH">ETH</option>
                                    </select>
                                </div>
                            </div>

                            {/* Stock Quantity */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Stock Quantity * <span className="text-muted-foreground font-normal">(available units)</span>
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={formData.stockQuantity}
                                    onChange={e => setFormData({ ...formData, stockQuantity: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl bg-secondary/50 border ${!validation.stock && formData.stockQuantity.length > 0
                                        ? "border-red-500"
                                        : "border-border"
                                        } focus:border-primary focus:outline-none text-foreground`}
                                    placeholder="e.g., 50"
                                />
                            </div>

                            {/* Delivery Method */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Delivery Method
                                </label>
                                <select
                                    value={formData.deliveryMethod}
                                    onChange={e => setFormData({ ...formData, deliveryMethod: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none text-foreground"
                                >
                                    {DELIVERY_METHODS.map(method => (
                                        <option key={method} value={method}>{method}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Validity Period */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Validity Period <span className="text-muted-foreground font-normal">(optional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.validityPeriod}
                                    onChange={e => setFormData({ ...formData, validityPeriod: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none text-foreground"
                                    placeholder="e.g., 30 days, Lifetime, 1 year"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Details & Review */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-foreground">Product Details</h2>

                            {/* Key Features */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Key Features
                                </label>
                                <div className="space-y-2">
                                    {formData.features.map((feature, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={e => updateFeature(index, e.target.value)}
                                                className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none text-foreground"
                                                placeholder="e.g., Instant delivery, 24/7 support"
                                            />
                                            {formData.features.length > 1 && (
                                                <button
                                                    onClick={() => removeFeature(index)}
                                                    className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                                                >
                                                    <X size={20} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        onClick={addFeature}
                                        className="w-full px-4 py-2.5 rounded-xl border-2 border-dashed border-border hover:border-primary text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Plus size={18} />
                                        Add Feature
                                    </button>
                                </div>
                            </div>

                            {/* Requirements */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Requirements <span className="text-muted-foreground font-normal">(optional)</span>
                                </label>
                                <textarea
                                    value={formData.requirements}
                                    onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none text-foreground"
                                    placeholder="Any requirements from the buyer (e.g., email address, device info)"
                                    rows={3}
                                />
                            </div>

                            {/* Refund Policy */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Refund Policy
                                </label>
                                <select
                                    value={formData.refundPolicy}
                                    onChange={e => setFormData({ ...formData, refundPolicy: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none text-foreground"
                                >
                                    <option value="No refunds on digital goods">No refunds on digital goods</option>
                                    <option value="7-day money-back guarantee">7-day money-back guarantee</option>
                                    <option value="Refund if product doesn't work">Refund if product doesn't work</option>
                                    <option value="Custom policy">Custom policy</option>
                                </select>
                            </div>

                            {/* Auto Re-list */}
                            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                                <div>
                                    <div className="font-semibold text-foreground">Auto Re-list</div>
                                    <div className="text-sm text-muted-foreground">Automatically re-list when stock is replenished</div>
                                </div>
                                <button
                                    onClick={() => setFormData({ ...formData, autoRelist: !formData.autoRelist })}
                                    className={`relative w-14 h-8 rounded-full transition-colors ${formData.autoRelist ? "bg-primary" : "bg-secondary"
                                        }`}
                                >
                                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${formData.autoRelist ? "translate-x-7" : "translate-x-1"
                                        }`} />
                                </button>
                            </div>

                            {/* Preview */}
                            <div className="border-t border-border pt-6">
                                <h3 className="font-semibold text-foreground mb-4">Listing Preview</h3>
                                <div className="glass-panel p-6 rounded-2xl space-y-4">
                                    <div>
                                        <div className="text-xs text-primary font-medium mb-1">{formData.category}</div>
                                        <h3 className="text-xl font-bold text-foreground">{formData.title || "Product Title"}</h3>
                                        <p className="text-muted-foreground mt-2">{formData.shortDescription || "Short description will appear here"}</p>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-foreground">{formData.price || "0.00"}</span>
                                        <span className="text-muted-foreground">{formData.currency}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.features.filter(f => f.trim()).map((feature, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-border">
                        {currentStep > 1 && (
                            <button
                                onClick={prevStep}
                                className="flex-1 px-6 py-3 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 font-medium transition-colors"
                            >
                                Previous
                            </button>
                        )}
                        {currentStep < 3 ? (
                            <button
                                onClick={nextStep}
                                className="flex-1 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 font-medium transition-opacity"
                            >
                                Next Step
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Publishing..." : "Publish Listing"}
                            </button>
                        )}
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="glass-panel p-4 rounded-xl flex gap-3">
                        <AlertCircle className="text-blue-500 shrink-0" size={20} />
                        <div>
                            <h4 className="font-semibold text-foreground text-sm">Tips for Success</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                                Clear descriptions, competitive pricing, and instant delivery lead to more sales
                            </p>
                        </div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl flex gap-3">
                        <Check className="text-green-500 shrink-0" size={20} />
                        <div>
                            <h4 className="font-semibold text-foreground text-sm">Escrow Protection</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                                All payments are held in escrow until buyer confirms delivery
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
