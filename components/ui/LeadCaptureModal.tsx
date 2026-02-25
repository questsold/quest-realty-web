"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { submitLeadAction } from "@/app/actions/leads";

export function LeadCaptureModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        // Check local storage for view count
        const storedCount = parseInt(localStorage.getItem("property_view_count") || "0");
        const isRegistered = localStorage.getItem("is_registered") === "true";

        // Increment count
        const newCount = storedCount + 1;
        localStorage.setItem("property_view_count", newCount.toString());
        setViewCount(newCount);

        // Trigger modal on 4th view if not registered
        if (newCount >= 4 && !isRegistered) {
            setIsOpen(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            source: "Website Registration Gate",
            tags: ["Website Registration", "AdWords Target"]
        };

        try {
            const result = await submitLeadAction(data);

            if (result.success) {
                setIsSubmitted(true);
                localStorage.setItem("is_registered", "true");
                setTimeout(() => {
                    setIsOpen(false);
                }, 2000);
            }
        } catch (error) {
            console.error("Submission failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => { }} // Non-closable by design or at least difficult
                        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-xl bg-white rounded-[2rem] shadow-2xl overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row h-full">
                            {/* Left Side: Brand/Hook */}
                            <div className="hidden md:flex md:w-2/5 bg-slate-900 p-10 flex-col justify-between text-white border-r border-slate-800">
                                <div>
                                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-8">
                                        <Lock className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-heading font-bold leading-tight mb-4">
                                        Unlock Premium Content
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Register now to gain unlimited access to listing details, price history, and market analytics.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                        Save your favorite homes
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                        Get early access to listings
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Form */}
                            <div className="flex-1 p-10">
                                {isSubmitted ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                                        </div>
                                        <h4 className="text-2xl font-bold text-slate-900 mb-2">Access Granted!</h4>
                                        <p className="text-slate-500">Unlocking premium listing details now...</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-8 md:hidden">
                                            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">Continue Browsing</h3>
                                            <p className="text-slate-500 text-sm">Create your free account to view this listing and others.</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">First Name</label>
                                                    <input
                                                        required
                                                        name="firstName"
                                                        type="text"
                                                        placeholder="Jane"
                                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50 transition-all outline-none text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Last Name</label>
                                                    <input
                                                        required
                                                        name="lastName"
                                                        type="text"
                                                        placeholder="Doe"
                                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50 transition-all outline-none text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                                                <input
                                                    required
                                                    name="email"
                                                    type="email"
                                                    placeholder="jane@example.com"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50 transition-all outline-none text-sm"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone Number</label>
                                                <input
                                                    required
                                                    name="phone"
                                                    type="tel"
                                                    placeholder="(555) 000-0000"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50 transition-all outline-none text-sm"
                                                />
                                            </div>

                                            <button
                                                disabled={isLoading}
                                                type="submit"
                                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-4"
                                            >
                                                {isLoading ? (
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <>
                                                        View Listing Info <ArrowRight className="w-4 h-4" />
                                                    </>
                                                )}
                                            </button>

                                            <p className="text-[10px] text-slate-400 text-center leading-relaxed px-4">
                                                By clicking register, you agree to being contacted by Quest Realty regarding your real estate needs.
                                            </p>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
