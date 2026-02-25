"use client";

import { useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { CheckCircle2 } from "lucide-react";
import { submitLeadAction } from "@/app/actions/leads";

export default function JoinUsPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const benefits = [
        "Industry-Leading Commission Splits",
        "Cutting-Edge Marketing & Tech Stack",
        "Dedicated Transaction Coordination",
        "Continuous Mentorship & Training",
        "Collaborative Office Culture",
        "Lead Generation Support",
        "Premium Brand Association",
        "No Hidden Desk Fees"
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: (formData.get("name") as string).split(" ")[0] || "Recruit",
            lastName: (formData.get("name") as string).split(" ").slice(1).join(" ") || "Lead",
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            message: `Experience Level: ${formData.get("experience")}`,
            source: "Join Us Page",
            tags: ["Recruitment Lead", "Potential Agent"]
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
                title="Elevate Your Career"
                description="Join Metro Detroit's most dynamic and forward-thinking real estate brokerage."
                imageUrl="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            />

            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Value Proposition */}
                        <div>
                            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Why Quest Realty?</h2>
                            <h3 className="text-4xl font-heading font-bold text-slate-900 mb-6">Built for Agent Success</h3>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                We believe that our agents are our greatest asset. That's why we've built a brokerage designed from the ground up to support your growth, maximize your earnings, and streamline your workflow.
                            </p>

                            <div className="space-y-4 mb-10">
                                {benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                                        <span className="text-slate-700 font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Application Form */}
                        <div className="bg-slate-900 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />

                            {status === "success" ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Inquiry Received!</h3>
                                    <p className="text-slate-400">Thank you for your interest. Ali Berry will contact you shortly for a confidential conversation.</p>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="mt-8 text-primary font-bold hover:underline"
                                    >
                                        Back to Form
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold font-heading text-white mb-2">Take the Next Step</h3>
                                    <p className="text-slate-400 mb-8">Confidential inquiries only. Let's grab coffee and talk about your future.</p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                                            <input
                                                required
                                                name="name"
                                                type="text"
                                                id="name"
                                                className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                                            <input
                                                required
                                                name="email"
                                                type="email"
                                                id="email"
                                                className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                                            <input
                                                required
                                                name="phone"
                                                type="tel"
                                                id="phone"
                                                className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="experience" className="block text-sm font-medium text-slate-300 mb-2">Real Estate Experience</label>
                                            <select
                                                required
                                                name="experience"
                                                id="experience"
                                                className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
                                            >
                                                <option value="">Select your experience...</option>
                                                <option value="new">Not yet licensed / Newly licensed</option>
                                                <option value="1-3">1 - 3 Years</option>
                                                <option value="4-7">4 - 7 Years</option>
                                                <option value="8+">8+ Years</option>
                                            </select>
                                        </div>

                                        {status === "error" && <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>}

                                        <button
                                            disabled={status === "loading"}
                                            type="submit"
                                            className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary/90 transition-colors mt-4 disabled:opacity-50"
                                        >
                                            {status === "loading" ? "Submitting..." : "Submit Inquiry"}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
