"use client";

import { PageHero } from "@/components/ui/PageHero";
import { useState } from "react";
import { Home, AreaChart, MapPin, Calculator, CheckCircle2 } from "lucide-react";
import { submitLeadAction } from "@/app/actions/leads";

export default function HomeValuationPage() {
    const [step, setStep] = useState(1);
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (address.trim().length > 5) {
            setStep(2);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            message: `Valuation Requested for: ${address}`,
            source: "Home Valuation Page",
            tags: ["Valuation Requested", "Seller Lead"]
        };

        try {
            const result = await submitLeadAction(data);
            if (result.success) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHero
                title="What is Your Home Worth?"
                description="Get a free, data-driven estimate of your property's current market value."
                imageUrl="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            />

            <section className="py-24">
                <div className="container mx-auto px-6 max-w-5xl">

                    <div className="grid lg:grid-cols-5 gap-16 items-start">

                        {/* Left: Interactive Form */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sm:p-12 relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />

                                {status === "success" ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in zoom-in-95 duration-500">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-slate-900 mb-2">Report Requested!</h3>
                                        <p className="text-slate-500">We are processing the analysis for {address}. You will receive your detailed report via email shortly.</p>
                                        <button
                                            onClick={() => { setStatus("idle"); setStep(1); setAddress(""); }}
                                            className="mt-8 text-primary font-bold hover:underline"
                                        >
                                            Check another address
                                        </button>
                                    </div>
                                ) : step === 1 ? (
                                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <h3 className="text-3xl font-heading font-bold text-slate-900 mb-4">Start Your Valuation</h3>
                                        <p className="text-slate-600 mb-8">
                                            Enter your home's address below to receive an instant analysis based on recent Metro Detroit neighborhood sales and market trends.
                                        </p>

                                        <form onSubmit={handleNext} className="space-y-6">
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                                                <input
                                                    type="text"
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    placeholder="e.g. 1042 Waddington Rd, Birmingham"
                                                    className="w-full pl-14 pr-4 py-5 rounded-xl border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg transition-all"
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={address.length < 5}
                                                className="w-full bg-slate-900 text-white font-bold py-5 rounded-xl hover:bg-slate-800 transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Get My Estimate
                                            </button>
                                        </form>
                                        <p className="text-sm text-slate-400 text-center mt-6">
                                            By proceeding, you agree to our terms of service and privacy policy. We will never sell your data.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                                        <h3 className="text-3xl font-heading font-bold text-slate-900 mb-4">Almost There!</h3>
                                        <p className="text-slate-600 mb-8">
                                            We've located <strong className="text-slate-900">{address}</strong>. Where should we send your comprehensive valuation report?
                                        </p>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                                                    <input required name="firstName" type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                                                    <input required name="lastName" type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                                <input required name="email" type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number (Optional)</label>
                                                <input name="phone" type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent" />
                                            </div>

                                            {status === "error" && <p className="text-red-500 text-sm font-medium">Something went wrong. Please try again.</p>}

                                            <div className="flex gap-4 pt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setStep(1)}
                                                    className="px-6 py-4 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    disabled={status === "loading"}
                                                    type="submit"
                                                    className="flex-1 bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
                                                >
                                                    {status === "loading" ? "Processing..." : (
                                                        <>
                                                            <AreaChart className="w-5 h-5" /> Send My Report
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Info Column */}
                        <div className="lg:col-span-2 space-y-10">
                            <div>
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                    <AreaChart className="w-6 h-6 text-primary" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-2">Accurate Market Data</h4>
                                <p className="text-slate-600 leading-relaxed">
                                    Our tool pulls from live MLS data, assessing recent sales, active listings, and market velocity in your specific neighborhood to generate an accurate baseline estimate.
                                </p>
                            </div>

                            <div>
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                    <Home className="w-6 h-6 text-primary" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-2">Comprehensive Analysis</h4>
                                <p className="text-slate-600 leading-relaxed">
                                    You'll receive a detailed PDF report outlining comparable properties, pricing trends over the last 12 months, and buyer demand metrics for your zip code.
                                </p>
                            </div>

                            <div className="bg-slate-900 rounded-2xl p-8 text-white mt-8">
                                <h4 className="font-heading font-bold text-xl mb-4">Want a precise number?</h4>
                                <p className="text-slate-400 mb-6 text-sm">
                                    Automated tools are great starting points, but they can't see the renovations you've made. Connect with an agent for a full comparative market analysis (CMA).
                                </p>
                                <button className="w-full border border-slate-700 hover:bg-slate-800 py-3 rounded-lg font-bold text-sm transition-colors">
                                    Request In-Person Valuation
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
