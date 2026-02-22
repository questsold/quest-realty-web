import { PageHero } from "@/components/ui/PageHero";
import Link from "next/link";
import { Users, Building2, BarChart3, CircleDollarSign } from "lucide-react";

export default function Communities() {
    const communities = [
        {
            name: "Troy",
            slug: "troy",
            image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/troy-500x360.png",
            stats: { pop: "87,294", rentOwn: "28/72", avgPrice: "$475,000", recentSales: "412" }
        },
        {
            name: "Birmingham",
            slug: "birmingham",
            image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/birmingham-500x360.png",
            stats: { pop: "21,813", rentOwn: "25/75", avgPrice: "$850,000", recentSales: "185" }
        },
        {
            name: "Bloomfield Hills",
            slug: "bloomfield-hills",
            image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/bloomfield-hills-500x360.png",
            stats: { pop: "4,460", rentOwn: "9/91", avgPrice: "$1,200,000", recentSales: "45" }
        },
        {
            name: "Rochester Hills",
            slug: "rochester-hills",
            image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/rochester-hills-500x360.png",
            stats: { pop: "76,300", rentOwn: "22/78", avgPrice: "$510,000", recentSales: "350" }
        },
        {
            name: "Royal Oak",
            slug: "royal-oak",
            image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/royal-oak-500x360.png",
            stats: { pop: "58,211", rentOwn: "35/65", avgPrice: "$395,000", recentSales: "420" }
        },
        {
            name: "Clarkston",
            slug: "clarkston",
            image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/clarkston-500x360.png",
            stats: { pop: "47,765", rentOwn: "17/83", avgPrice: "$444,611", recentSales: "265" }
        },
        {
            name: "Waterford",
            slug: "waterford",
            image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/bloomfield-hills-500x360.png",
            stats: { pop: "70,565", rentOwn: "29/71", avgPrice: "$315,000", recentSales: "380" }
        },
    ];

    return (
        <>
            <PageHero
                eyebrow="Explore Metro Detroit"
                title="Communities"
                description="From the bustling streets of Troy to the scenic avenues of Bloomfield Hills, Quest Realty's community guides deliver insider insights, market trends, and local highlights. Explore each neighborhood with confidence and find the perfect place to call home."
                imageAlt="Metro Detroit Communities"
                imageUrl="https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
            />

            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-semibold">Explore Local Neighborhoods</h2>
                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-16">
                        Learn everything you need to know about our local neighborhoods to align with your real estate needs.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1400px] mx-auto">
                        {communities.map((community) => (
                            <Link
                                href={`/communities/${community.slug}`}
                                key={community.name}
                                className="group relative aspect-[500/360] bg-zinc-900 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block"
                            >
                                {/* Background Image Layer */}
                                <div className="absolute inset-0 z-0 bg-zinc-200">
                                    <img
                                        src={community.image}
                                        alt={`${community.name} Map`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Overlay Layers */}
                                <div className="absolute inset-0 bg-slate-900/40 z-10 transition-colors duration-300 group-hover:bg-zinc-950/95" />

                                {/* Default State (Visible initially, hidden on hover) */}
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                                    <h3 className="text-4xl md:text-5xl font-heading font-medium text-white">{community.name}</h3>
                                    <span className="text-sm font-medium text-white tracking-widest mt-2 bg-primary/80 px-4 py-1 rounded-full backdrop-blur-sm">View Guide</span>
                                </div>

                                {/* Hover State Data Overlay (Hidden initially, visible on hover) */}
                                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <div className="w-full">
                                        {/* Top Row Stats */}
                                        <div className="flex justify-between w-full mb-8">
                                            <div className="flex flex-col items-center text-center w-1/2 px-2">
                                                <Users className="w-8 h-8 text-primary mb-3" strokeWidth={1.5} />
                                                <span className="text-[10px] font-bold text-white tracking-widest uppercase mb-1">Population</span>
                                                <span className="text-sm font-medium text-white">{community.stats.pop}</span>
                                            </div>
                                            <div className="flex flex-col items-center text-center w-1/2 px-2">
                                                <Building2 className="w-8 h-8 text-primary mb-3" strokeWidth={1.5} />
                                                <span className="text-[10px] font-bold text-white tracking-widest uppercase mb-1">Rent vs Ownership</span>
                                                <span className="text-sm font-medium text-white">{community.stats.rentOwn}</span>
                                            </div>
                                        </div>

                                        {/* Middle Pill */}
                                        <div className="flex justify-center mb-8 relative z-40">
                                            <div className="bg-zinc-800 border-2 border-zinc-700 text-white text-xs px-4 py-1 rounded-sm tracking-wide">
                                                {community.name}
                                            </div>
                                        </div>

                                        {/* Bottom Row Stats */}
                                        <div className="flex justify-between w-full">
                                            <div className="flex flex-col items-center text-center w-1/2 px-2">
                                                <BarChart3 className="w-8 h-8 text-primary mb-3" strokeWidth={1.5} />
                                                <span className="text-[10px] font-bold text-white tracking-widest uppercase mb-1">Avg. Selling Price<br /><span className="text-[9px] lowercase font-normal tracking-wide text-white/80">(180 days)</span></span>
                                                <span className="text-sm font-medium text-white">{community.stats.avgPrice}</span>
                                            </div>
                                            <div className="flex flex-col items-center text-center w-1/2 px-2">
                                                <CircleDollarSign className="w-8 h-8 text-primary mb-3" strokeWidth={1.5} />
                                                <span className="text-[10px] font-bold text-white tracking-widest uppercase mb-1">Recent Sales<br /><span className="text-[9px] lowercase font-normal tracking-wide text-white/80">(180 days)</span></span>
                                                <span className="text-sm font-medium text-white">{community.stats.recentSales}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
