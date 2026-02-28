"use client";

import { PageHero } from "@/components/ui/PageHero";
import { Home, AreaChart } from "lucide-react";
import { trackConversion } from "@/components/analytics/GoogleAnalytics";

import RealScoutValuationWidget from "@/components/widgets/RealScoutValuation";

export default function HomeValuationPage() {
    const agentId = process.env.REALSCOUT_AGENT_ID || "214245";

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHero
                title="What is Your Home Worth?"
                description="Get a free, data-driven estimate of your property's current market value instantly."
                imageUrl="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            />

            <section className="py-24">
                <div className="container mx-auto px-6 max-w-6xl">

                    <div className="grid lg:grid-cols-5 gap-16 items-start">

                        {/* Left: Interactive RealScout Widget */}
                        <div className="lg:col-span-3">
                            <RealScoutValuationWidget agentId={agentId} />

                            <p className="text-sm text-slate-400 text-center mt-6">
                                Powered by RealScout & Attom Data. Instant estimates are starting points; for a precise value, connect with an agent for a custom analysis.
                            </p>
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
