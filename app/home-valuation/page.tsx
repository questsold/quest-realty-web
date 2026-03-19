"use client";

import { PageHero } from "@/components/ui/PageHero";
import { Home, AreaChart } from "lucide-react";
import { trackConversion } from "@/components/analytics/GoogleAnalytics";

import RealScoutValuationWidget from "@/components/widgets/RealScoutValuation";

export default function HomeValuationPage() {
    const agentId = "QWdlbnQtMjE0MjQ1";

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHero
                title="What is Your Home Worth?"
                description="Get a free, data-driven estimate of your property's current market value instantly."
                imageUrl="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            />

            <section className="py-24">
                <div className="container mx-auto px-6 max-w-7xl">

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-start">

                        {/* Left: Interactive RealScout Widget */}
                        <div className="md:col-span-7">
                            <RealScoutValuationWidget agentId={agentId} />

                            <p className="text-sm text-slate-400 text-center mt-6">
                                Powered by RealScout & Attom Data. Instant estimates are starting points; for a precise value, connect with an agent for a custom analysis.
                            </p>
                        </div>

                        {/* Right: Info Column */}
                        <div className="md:col-span-5 space-y-10 lg:pl-8">
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
                                <button 
                                    onClick={() => trackConversion("valuation_requested")}
                                    className="w-full border border-slate-700 hover:bg-slate-800 py-3 rounded-lg font-bold text-sm transition-colors"
                                >
                                    Request In-Person Valuation
                                </button>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Hyper-Local SEO Section for Google Ads Relevance */}
                <div className="mt-24 bg-white rounded-[2rem] p-10 lg:p-16 border border-slate-200 shadow-xl overflow-hidden relative">
                    {/* Subtle background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-bl-full blur-[60px] pointer-events-none" />

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h3 className="text-3xl font-heading font-bold text-slate-900 mb-6">
                            Selling in <span className="text-primary">Troy, Birmingham, or Rochester?</span>
                        </h3>
                        <p className="text-lg text-slate-600 leading-relaxed mb-10">
                            The luxury markets in <strong>Birmingham (48009)</strong>, <strong>Bloomfield Hills</strong>, <strong>Troy (48098)</strong>, and <strong>Rochester Hills</strong> are highly nuanced. A basic online calculator cannot fully capture the premium finishes, acclaimed school districts, and exclusive neighborhood amenities that increase your home's value.
                            <br /><br />
                            As Top 1% Metro Detroit Realtors, Quest Realty specializes in properly positioning properties in these affluent zip codes. Get your baseline estimate above, then contact Ali Berry for an aggressive, data-backed marketing strategy designed to attract the most qualified buyers and maximize your final sale price.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 border-t border-slate-100">
                            {["Birmingham", "Troy", "Rochester Hills", "Bloomfield Hills"].map((city) => (
                                <div key={city} className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-900">{city}</span>
                                    <span className="text-xs text-slate-500">Market Expert</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </section>
        </main>
    );
}
