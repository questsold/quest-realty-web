import { PageHero } from "@/components/ui/PageHero";
import { CheckCircle2 } from "lucide-react";

export default function JoinUsPage() {
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
                            <h3 className="text-2xl font-bold font-heading text-white mb-2">Take the Next Step</h3>
                            <p className="text-slate-400 mb-8">Confidential inquiries only. Let's grab coffee and talk about your future.</p>

                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="experience" className="block text-sm font-medium text-slate-300 mb-2">Real Estate Experience</label>
                                    <select
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

                                <button
                                    type="button"
                                    className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary/90 transition-colors mt-4"
                                >
                                    Submit Inquiry
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
