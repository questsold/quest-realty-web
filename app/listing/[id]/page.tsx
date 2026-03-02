import { MapPin, Bed, Bath, Square, Calendar, Heart, Share2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { LeadCaptureModal } from "@/components/ui/LeadCaptureModal";
import { getPropertyBySlug } from "@/lib/realcomp";
import { LeadForm } from "./LeadForm";

export default async function ListingDetailsPage({ params }: { params: { id: string } }) {
    let realcompData = null;
    try {
        realcompData = await getPropertyBySlug(params.id);
    } catch (e) {
        console.error("Failed to load Realcomp property details:", e);
    }

    // Map Realcomp Data or fall back to mock
    const property = realcompData ? {
        id: realcompData.ListingId || params.id,
        address: realcompData.UnparsedAddress || [realcompData.StreetNumber, realcompData.StreetName, realcompData.StreetSuffix].filter(Boolean).join(' ') || 'Address Withheld',
        city: realcompData.OriginalCity || realcompData.City || 'Metro Detroit',
        state: "MI",
        zip: realcompData.PostalCode || '',
        price: realcompData.ListPrice || 0,
        beds: realcompData.BedroomsTotal || 0,
        baths: (realcompData.BathroomsFull || 0) + (realcompData.BathroomsHalf ? 0.5 : 0),
        sqft: realcompData.LivingArea || 0,
        yearBuilt: 0, // Realcomp may have YearBuilt
        status: realcompData.StandardStatus || 'Active',
        daysOnMarket: 0,
        description: realcompData.PublicRemarks || 'No description available for this property.',
        features: [
            `${realcompData.PropertySubType || realcompData.PropertyType || 'Residential'}`,
            "Updates coming soon"
        ],
        agent: {
            name: "Ali Berry",
            role: "Broker/Owner",
            phone: "(248) 955-1403",
            image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/Ali-Berry-900x900.fit.png"
        },
        images: realcompData.Media ? realcompData.Media.sort((a: any, b: any) => a.Order - b.Order).map((m: any) => m.MediaURL) : [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
        ]
    } : {
        id: params.id,
        address: "1042 Waddington Rd",
        city: "Birmingham",
        state: "MI",
        zip: "48009",
        price: 1850000,
        beds: 5,
        baths: 4.5,
        sqft: 4200,
        yearBuilt: 2018,
        status: "Active",
        daysOnMarket: 14,
        description: "Welcome to this stunning new construction masterpiece in the heart of Birmingham. Designed by an award-winning architect, this home blends modern luxury with timeless elegance. The chef's kitchen features top-of-the-line appliances, custom cabinetry, and a massive waterfall island. The primary suite is a true retreat with a spa-like bathroom and an expansive walk-in closet. The fully finished basement adds versatile living space, perfect for entertaining.",
        features: [
            "Hardwood Floors Throughout",
            "Smart Home Technology Integration",
            "3-Car Attached Garage",
            "Heated Primary Bathroom Floors",
            "Outdoor Kitchen & Entertaining Space",
            "Custom Wine Cellar"
        ],
        agent: {
            name: "Ali Berry",
            role: "Broker/Owner",
            phone: "(248) 955-1403",
            image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/Ali-Berry-900x900.fit.png"
        },
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
            "https://images.unsplash.com/photo-1600607687931-cebfad2114ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
            "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
        ]
    };

    return (
        <main className="min-h-screen bg-slate-50 pt-[88px] pb-24">
            {/* Top Navigation Bar */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/properties" className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors font-medium">
                        <span className="w-4 h-4 flex"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg></span> Back to Search
                    </Link>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium">
                            <Share2 className="w-4 h-4" /> Share
                        </button>
                        <button className="flex items-center gap-2 text-slate-600 hover:text-red-500 transition-colors font-medium">
                            <Heart className="w-4 h-4" /> Save
                        </button>
                    </div>
                </div>
            </div>

            {/* Image Gallery Grid */}
            <div className="container mx-auto px-6 mt-8 mb-12">
                <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[60vh] min-h-[500px] rounded-3xl overflow-hidden shadow-lg">
                    {/* Main Image */}
                    <div className="col-span-4 lg:col-span-2 row-span-2 relative group cursor-pointer">
                        <img
                            src={property.images[0]}
                            alt="Main listing view"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-6 left-6 flex gap-2">
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                {property.status}
                            </span>
                            <span className="bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                {property.daysOnMarket} DOM
                            </span>
                        </div>
                    </div>

                    {/* Smaller Images */}
                    {property.images.slice(1).map((img, idx) => (
                        <div key={idx} className="hidden lg:block relative group overflow-hidden cursor-pointer">
                            <img
                                src={img}
                                alt={`Property view ${idx + 2}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Show 'View All' overlay on the last image */}
                            {idx === 3 && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/50">
                                    <span className="text-white font-bold tracking-widest uppercase border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
                                        View All Photos
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">

                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Header Details */}
                        <div className="border-b border-slate-200 pb-8">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-8">
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-2">
                                        ${property.price.toLocaleString()}
                                    </h1>
                                    <h2 className="text-xl text-slate-600 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-primary" />
                                        {property.address}, {property.city}, {property.state} {property.zip}
                                    </h2>
                                </div>
                                <div className="flex gap-4">
                                    <div className="text-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm min-w-[100px]">
                                        <span className="block text-2xl font-bold text-slate-900">{property.beds}</span>
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Beds</span>
                                    </div>
                                    <div className="text-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm min-w-[100px]">
                                        <span className="block text-2xl font-bold text-slate-900">{property.baths}</span>
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Baths</span>
                                    </div>
                                    <div className="text-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm min-w-[100px]">
                                        <span className="block text-2xl font-bold text-slate-900">{property.sqft.toLocaleString()}</span>
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sq Ft</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">About This Home</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {property.description}
                            </p>
                        </div>

                        {/* Features */}
                        <div>
                            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6">Home Features</h3>
                            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                                {property.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <span className="text-slate-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Location / Map Placeholder */}
                        <div>
                            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6">Location</h3>
                            <div className="h-[400px] bg-slate-200 rounded-3xl overflow-hidden relative">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center brightness-90 grayscale" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                                        <div className="w-6 h-6 bg-primary rounded-full shadow-lg border-2 border-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-8">

                            {/* Contact Card */}
                            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                                <LeadForm city={property.city} address={property.address} />
                            </div>

                            {/* Quick Facts */}
                            <div className="bg-slate-900 rounded-3xl p-8 text-white">
                                <h4 className="font-heading font-bold text-lg mb-6">Property Facts</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-slate-800">
                                        <span className="text-slate-400">Year Built</span>
                                        <span className="font-medium">{property.yearBuilt}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-slate-800">
                                        <span className="text-slate-400">Property Type</span>
                                        <span className="font-medium">Single Family</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-slate-800">
                                        <span className="text-slate-400">HOA</span>
                                        <span className="font-medium">None</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-slate-400">Price / SqFt</span>
                                        <span className="font-medium">${Math.round(property.price / property.sqft)}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <LeadCaptureModal />
        </main>
    );
}
