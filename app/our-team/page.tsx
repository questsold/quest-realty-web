import { PageHero } from "@/components/ui/PageHero";
import { teamMembers } from "@/lib/team";

export default function OurTeamPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <PageHero
                title="Meet Our Team"
                description="The experts dedicated to helping you achieve your real estate goals."
                imageUrl="/images/hero-modern-house.png"
            />

            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Quest Realty Experts</h2>
                        <h3 className="text-4xl font-heading font-bold text-slate-900 mb-6">Dedicated Professionals</h3>
                        <p className="text-lg text-slate-600">
                            Our team of experienced advisors brings deep knowledge of the Metro Detroit market,
                            unwavering dedication to our clients, and a proven track record of success.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300">
                                <div className="aspect-[4/5] relative overflow-hidden bg-slate-100">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </div>
                                <div className="p-6 text-center">
                                    <h4 className="text-xl font-heading font-bold text-slate-900 mb-1">{member.name}</h4>
                                    <p className="text-sm font-medium text-primary">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </main>
    );
}
