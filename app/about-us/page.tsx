import { PageHero } from "@/components/ui/PageHero";
import Link from "next/link";
import { ArrowRight, Target, Shield, Heart } from "lucide-react";

export default function AboutUsPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <PageHero
                title="About Quest Realty"
                description="Redefining the real estate experience in Metro Detroit."
                imageUrl="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            />

            {/* Our Story Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <div className="relative">
                                <img
                                    src="/images/hero-modern-house.png"
                                    alt="Quest Realty Office"
                                    className="rounded-3xl shadow-2xl z-10 relative"
                                />
                                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
                                <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
                            </div>
                        </div>

                        <div className="lg:w-1/2">
                            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Our Story</h2>
                            <h3 className="text-4xl font-heading font-bold text-slate-900 mb-6">Built on Trust and Proven Results</h3>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                Quest Realty was founded with a singular mission: to provide an elevated, modern, and transparent real estate experience for buyers and sellers across the Metro Detroit area.
                            </p>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                We believe that buying or selling a home is one of life's most significant financial and emotional decisions. From high-end luxury estates in Bloomfield Hills to charming bungalows in Royal Oak, our team of dedicated advisors brings unparalleled market knowledge, sharp negotiation skills, and a white-glove approach to every single transaction.
                            </p>

                            <div className="flex gap-4">
                                <Link href="/our-team" className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
                                    Meet Our Team <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link href="/contact" className="px-8 py-4 border-2 border-slate-200 text-slate-700 rounded-full font-bold hover:bg-slate-50 transition-colors">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">What Drives Us</h2>
                        <h3 className="text-4xl font-heading font-bold mb-6">Our Core Values</h3>
                        <p className="text-lg text-slate-400">
                            These principles guide everything we do, from how we interact with our clients to how we support our community.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="bg-slate-800 rounded-2xl p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full transition-all duration-500 group-hover:scale-150" />
                            <Target className="w-12 h-12 text-primary mb-6 relative z-10" />
                            <h4 className="text-2xl font-heading font-bold mb-4 relative z-10">Client-First Focus</h4>
                            <p className="text-slate-400 leading-relaxed relative z-10">
                                Your goals are our goals. We listen intently, strategize carefully, and execute flawlessly to ensure your success.
                            </p>
                        </div>

                        <div className="bg-slate-800 rounded-2xl p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full transition-all duration-500 group-hover:scale-150" />
                            <Shield className="w-12 h-12 text-primary mb-6 relative z-10" />
                            <h4 className="text-2xl font-heading font-bold mb-4 relative z-10">Unwavering Integrity</h4>
                            <p className="text-slate-400 leading-relaxed relative z-10">
                                We operate with the highest ethical standards. Honesty, transparency, and doing the right thing are non-negotiable.
                            </p>
                        </div>

                        <div className="bg-slate-800 rounded-2xl p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full transition-all duration-500 group-hover:scale-150" />
                            <Heart className="w-12 h-12 text-primary mb-6 relative z-10" />
                            <h4 className="text-2xl font-heading font-bold mb-4 relative z-10">Community Passion</h4>
                            <p className="text-slate-400 leading-relaxed relative z-10">
                                We don't just work here; we live here. We are deeply committed to giving back and strengthening the neighborhoods we serve.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-primary text-white text-center">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Ready to Start Your Real Estate Journey?</h2>
                    <p className="text-xl mb-10 text-white/90">
                        Whether you're looking to buy your dream home or sell your current property for top dollar, our experts are here to guide you every step of the way.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors text-lg">
                            Get in Touch
                        </Link>
                        <Link href="/properties" className="px-8 py-4 bg-white text-primary rounded-full font-bold hover:bg-slate-50 transition-colors text-lg">
                            View Listings
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
