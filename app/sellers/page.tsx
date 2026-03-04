"use client";

import { PageHero } from "@/components/ui/PageHero";
import { Counter } from "@/components/ui/Counter";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Sellers() {
    return (
        <>
            <PageHero
                title="Confidence and Clarity"
                imageAlt="Selling a home"
                imageUrl="/images/hero-modern-house.png"
            />

            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-semibold">To Sell</h2>
                        <h3 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-8">
                            Seamless & Successful
                        </h3>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            At Quest Realty, we combine cutting-edge digital marketing, precise demographic targeting, and a team of dedicated agents to ensure your home stands out in Metro Detroit. From professional staging and high-impact visuals to aggressive online campaigns and proactive customer support, we work tirelessly to connect with qualified buyers. With transparent communication at every juncture and a proven track record of swift, top-dollar results, Quest Realty makes selling your property simple, seamless, and successful.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/home-valuation" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium transition-colors">
                                Get Started
                            </Link>
                        </div>
                    </div>

                    <div className="my-24 grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1 h-[600px] rounded-2xl overflow-hidden relative">
                            <img src="/images/closing-keys.png" alt="Selling Experience" className="w-full h-full object-cover" />
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-semibold">Full-Service</h2>
                            <h3 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6">
                                Selling Experience
                            </h3>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                We will work tirelessly to ensure that your property sells quickly and at the best possible price. Our team is dedicated to providing exceptional service and support throughout the entire selling process, and we will be there for you every step of the way.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xl font-bold font-heading mb-2">Trend Forecasting</h4>
                                    <p className="text-slate-600">Our team boasts extensive expertise in real estate markets. We continually monitor trends, analyze data, and understand buyer behavior, ensuring your valuation reflects the latest market dynamics.</p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold font-heading mb-2">White-Glove Service</h4>
                                    <p className="text-slate-600">Your property receives individualized attention. We prioritize your goals, crafting strategies tailored precisely to your vision. Expect dedicated support throughout the valuation process.</p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold font-heading mb-2">Innovative Marketing</h4>
                                    <p className="text-slate-600">We excel in presenting your property effectively. Utilizing modern marketing strategies, we highlight its strengths through professional visuals and targeted campaigns, maximizing its appeal.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-semibold">Expert Support</h2>
                    <h3 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-8">
                        You Can Rely On
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed mb-10">
                        From your initial consultation through closing day, Quest Realty’s specialists stand ready to guide you with personalized insights and proactive communication. We combine deep market analysis, tailored marketing strategies, and skilled negotiation to showcase your home’s best features and reach qualified buyers. With a dedicated point of contact and 24/7 accessibility, our experts ensure you feel informed, confident, and fully supported at every stage of your selling journey.
                    </p>
                    <Link href="/our-team" className="inline-block border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-8 py-4 rounded-full font-medium transition-colors">
                        Connect With An Agent
                    </Link>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-white border-b border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-sm uppercase tracking-widest text-primary mb-2 font-semibold">Experience Matters</h2>
                        <h3 className="text-3xl md:text-5xl font-heading font-bold text-slate-900">Why Clients Choose Us</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-5xl lg:text-7xl font-heading font-bold text-primary mb-4">
                                <Counter value={1} suffix="%" />
                            </div>
                            <div className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">Nationwide</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Top Realtors</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="text-5xl lg:text-7xl font-heading font-bold text-primary mb-4">
                                <Counter value={920} prefix="$" suffix="M+" />
                            </div>
                            <div className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">Closed Volume</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Over $920M+ Million</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="text-5xl lg:text-7xl font-heading font-bold text-primary mb-4">
                                <Counter value={3800} suffix="+" />
                            </div>
                            <div className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">Properties Sold</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Over 3,800+ Transactions</div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
