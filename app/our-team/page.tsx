import { PageHero } from "@/components/ui/PageHero";

const teamMembers = [
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Ali-Berry-900x900.fit.png', name: 'Ali Berry', role: 'Broker/Owner' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Matthew-Berney-900x900.fit.jpeg', name: 'Matthew Berney', role: 'Presidents Club Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Drew-Knobloch-900x900.fit.jpeg', name: 'Drew Knobloch', role: 'Senior Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Billy-Miller-900x900.fit.jpeg', name: 'Billy Miller', role: 'Senior Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Brittany-Valensky-900x900.fit.jpeg', name: 'Brittany Valensky', role: 'Senior Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Avery-Z-Evans-900x900.fit.jpg', name: 'Avery Zyniewicz Evans', role: 'Senior Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Nick-Kalte-900x900.fit.jpeg', name: 'Nick Kalte', role: 'Executive Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Jessica-Gladys-900x900.fit.jpg', name: 'Jessica Gladys', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Patti-Ray-900x900.fit.jpg', name: 'Patti Ray', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Kachi-Aguwa-900x900.fit.jpg', name: 'Kachi Aguwa', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Laura-Cutajar-900x900.fit.jpeg', name: 'Laura Cutajar', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Alexandra-Hannum-900x900.fit.jpeg', name: 'Alexandra Hannum', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Brittany-Schreck-900x900.fit.jpg', name: 'Brittany Schreck', role: 'Senior Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Nadeen-Greek-900x900.fit.png', name: 'Nadeen Greek', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Ronya-Naimi-900x900.fit.png', name: 'Ronya Naimi', role: 'Transaction Coordinator' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Samantha-Plonka-900x900.fit.jpeg', name: 'Samantha Plonka', role: 'Agent Success Manager' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/07/Screenshot-2025-07-14-at-93855PM-900x900.fit.png', name: 'Matt Cook', role: 'Senior Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/07/aragonai-d48b0a67-f3a2-410f-9a13-48d35de1bd8d-900x900.fit.jpeg', name: 'Jeremy LePage', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Rob-Sinishtaj-900x900.fit.jpg', name: 'Robert Sinishtaj', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/11/329E1506-900x900.fit.jpg', name: 'Owen Smith', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Headshot-900x900.fit.png', name: 'Neil Dobson', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Gabbi-Dubuque-900x900.fit.png', name: 'Gabbi Dubuque', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Marci-Foglietta-900x900.fit.jpeg', name: 'Marci Foglietta', role: 'Real Estate Advisor' }
];

export default function OurTeamPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <PageHero
                title="Meet Our Team"
                description="The experts dedicated to helping you achieve your real estate goals."
                imageUrl="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
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
