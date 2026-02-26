"use client";

import { PageHero } from "@/components/ui/PageHero";
import { Counter } from "@/components/ui/Counter";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Buyers() {
    return (
        <>
            <PageHero
                title="Experience"
                imageAlt="Buying a home"
                imageUrl="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
            />

            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-semibold">Home-Buying Journey</h2>
                        <h3 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-8">
                            Empowering Your Decisions
                        </h3>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            At Quest Realty, we empower buyers with the latest market insights, real-time search tools, and one-on-one guidance—from neighborhood selection through closing. Our agents leverage aggressive digital marketing and precise demographic data to uncover the best opportunities, while transparent communication keeps you informed every step of the way. Whether you’re a first-time buyer or seasoned investor, Quest Realty ensures a seamless, confident path to finding and securing your ideal Metro Detroit home.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/contact" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium transition-colors">
                                Get Started
                            </Link>
                            <Link href="/properties" className="bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-8 py-4 rounded-full font-medium transition-colors">
                                View Latest Properties
                            </Link>
                        </div>
                    </div>

                    <div className="my-24 grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-semibold">Full-Service</h2>
                            <h3 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6">
                                Buying Experience
                            </h3>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                Quest Realty is committed to offering you personalized guidance every step of the way. We take the time to understand your needs and preferences so you can find a home that fits your lifestyle - and we’ll support you through a smooth, stress-free buying journey.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xl font-bold font-heading mb-2">Buyer Insights</h4>
                                    <p className="text-slate-600">Quest Realty brings deep expertise in Metro Detroit markets. From Troy to Bloomfield Hills, we analyze trends and neighborhood dynamics to help you make well-informed decisions.</p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold font-heading mb-2">VIP Home Search</h4>
                                    <p className="text-slate-600">Quest Realty delivers a customized home-search experience. By focusing on your goals and priorities, we guide you toward properties that align perfectly with your vision.</p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold font-heading mb-2">Expert Negotiation</h4>
                                    <p className="text-slate-600">Quest Realty leverages skilled negotiation on your behalf. We advocate tirelessly for your interests, ensuring you secure the best possible terms and a seamless transaction.</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-[600px] rounded-2xl overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Buying Experience" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-slate-50 border-y border-slate-100">
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
