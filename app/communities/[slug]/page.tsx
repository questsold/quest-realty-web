import { PageHero } from "@/components/ui/PageHero";
import Link from "next/link";
import { ArrowRight, MapPin, Home, Trees, Utensils, GraduationCap } from "lucide-react";
import { getProperties } from "@/lib/realcomp";
import { PropertyCard } from "@/components/ui/PropertyCard";

export default async function CommunityDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    // Format slug to readable name (e.g., 'bloomfield-hills' -> 'Bloomfield Hills')
    const communityName = resolvedParams.slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const officeIds = ['368625', '6505368625'];
    const officeFilterStr = `(${officeIds.map(id => `ListOfficeMlsId eq '${id}'`).join(' or ')})`;
    const cityFilterStr = `(OriginalCity eq '${communityName}')`;

    let realcompProperties = await getProperties({
        filter: `${cityFilterStr} and ${officeFilterStr}`,
        orderby: 'ListPrice desc',
        top: 4
    });

    if (!realcompProperties || realcompProperties.length === 0) {
        realcompProperties = await getProperties({
            filter: cityFilterStr,
            orderby: 'ModificationTimestamp desc',
            top: 4
        });
    }

    const featuredListings = (realcompProperties || []).map((p, idx) => ({
        id: p.ListingId || `featured-${idx}`,
        address: (p as any).InternetAddressDisplayYN === false ? 'Address Withheld' : (p.UnparsedAddress || [p.StreetNumber, p.StreetName, p.StreetSuffix].filter(Boolean).join(' ') || 'Address Withheld'),
        city: `${p.OriginalCity || p.City || ''}, MI ${p.PostalCode || ''}`.trim(),
        price: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p.ListPrice || 0),
        beds: p.BedroomsTotal || 0,
        baths: (p.BathroomsFull || 0) + (p.BathroomsHalf ? 0.5 : 0),
        sqft: p.LivingArea ? p.LivingArea.toLocaleString() : 'N/A',
        type: p.PropertySubType || p.PropertyType || 'Single Family',
        image: (p.Media && p.Media.length > 0) ? [...p.Media].sort((a: any, b: any) => (a.Order || 999) - (b.Order || 999))[0].MediaURL : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        status: p.StandardStatus
    }));

    // Mock data for the layout structure
    const stats = [
        { label: "Median Home Price", value: "$850,000" },
        { label: "Average Days on Market", value: "24 Days" },
        { label: "Population", value: "4,200" },
        { label: "School District Rating", value: "A+" }
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHero
                title={`Living in ${communityName}`}
                description="Discover the history, lifestyle, and real estate market of this premier Metro Detroit community."
                imageUrl="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                imageAlt={`${communityName} Hero Image`}
                eyebrow="Neighborhood Guide"
            />

            {/* Quick Stats Banner */}
            <div className="bg-slate-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-800">
                        {stats.map((stat, i) => (
                            <div key={i} className="py-8 text-center px-4">
                                <div className="text-3xl font-heading font-bold text-primary mb-2">{stat.value}</div>
                                <div className="text-sm text-slate-400 uppercase tracking-widest font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <section className="py-24">
                <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-3 gap-16 items-start">

                    {/* Left Main Content */}
                    <div className="lg:col-span-2 space-y-16">

                        {/* Introduction */}
                        <div>
                            <h2 className="text-3xl font-heading font-bold text-slate-900 mb-6">Welcome to {communityName}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                Nestled in the heart of Oakland County, {communityName} offers a unique blend of historic charm, modern luxury, and unparalleled community spirit. Known for its tree-lined streets, exceptional schools, and vibrant downtown areas, it's no wonder this area is one of the most sought-after real estate markets in Metro Detroit.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Whether you're looking for a sprawling historic estate, a modern new build, or a charming mid-century home, the architectural diversity here ensures there is something to fit every luxury lifestyle.
                            </p>
                        </div>

                        {/* Area Highlights Grid */}
                        <div>
                            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-8">What Locals Love</h3>
                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
                                    <Utensils className="w-8 h-8 text-primary shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Dining & Shopping</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">Award-winning restaurants, boutique shopping, and charming local cafes dot the walkable downtown areas.</p>
                                    </div>
                                </div>
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
                                    <Trees className="w-8 h-8 text-primary shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Parks & Recreation</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">Hundreds of acres of pristine parkland, nature trails, and premier country clubs provide endless outdoor activities.</p>
                                    </div>
                                </div>
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
                                    <GraduationCap className="w-8 h-8 text-primary shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Education</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">Home to some of the highest-rated public and private educational institutions in the state of Michigan.</p>
                                    </div>
                                </div>
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
                                    <MapPin className="w-8 h-8 text-primary shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Location</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">Convenient access to major highways makes commuting to Downtown Detroit or Detroit Metro Airport a breeze.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Featured Properties Preview */}
                        <div>
                            <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
                                <h3 className="text-2xl font-heading font-bold text-slate-900">Featured Homes in {communityName}</h3>
                                <Link href={`/properties?city=${resolvedParams.slug}`} className="text-primary font-bold hover:text-slate-900 transition-colors flex items-center gap-1 text-sm">
                                    View All <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {featuredListings.map((property) => (
                                    <PropertyCard key={property.id} {...property} />
                                ))}
                                {featuredListings.length === 0 && (
                                    <div className="col-span-2 text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                        <p className="text-slate-500 font-medium">No active listings found in {communityName} at the moment.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-1 space-y-8 sticky top-32">

                        {/* CTA Card */}
                        <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full pointer-events-none" />
                            <h4 className="text-2xl font-heading font-bold mb-4">Moving to {communityName}?</h4>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                Our local experts have the inside scoop on off-market properties and upcoming listings in this area.
                            </p>
                            <form className="space-y-4 relative z-10">
                                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-slate-800 border-none text-white focus:ring-2 focus:ring-primary" />
                                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl bg-slate-800 border-none text-white focus:ring-2 focus:ring-primary" />
                                <button type="button" className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors">
                                    Connect With an Agent
                                </button>
                            </form>
                        </div>

                        {/* Market Update Card */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Home className="w-6 h-6 text-primary" />
                                <h4 className="font-bold text-slate-900 text-lg">Market Update</h4>
                            </div>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="text-slate-500">Market Temp</span>
                                    <span className="font-bold text-orange-500">Competitive</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="text-slate-500">List to Sale %</span>
                                    <span className="font-bold text-slate-900">98.5%</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-slate-500">Active Listings</span>
                                    <span className="font-bold text-slate-900">42 Homes</span>
                                </div>
                            </div>
                            <button className="w-full border-2 border-slate-900 text-slate-900 font-bold py-3 mt-6 rounded-xl hover:bg-slate-50 transition-colors text-sm">
                                Get Full Market Report
                            </button>
                        </div>

                    </div>

                </div>
            </section>
        </main>
    );
}
