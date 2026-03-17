import { MapPin, Bed, Bath, Square, Calendar, Heart, Share2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { LeadCaptureModal } from "@/components/ui/LeadCaptureModal";
import { getPropertyBySlug } from "@/lib/realcomp";
import { LeadForm } from "./LeadForm";
import { ListingGallery } from "./ListingGallery";
import { CommuteWidget } from "@/components/ui/CommuteWidget";

export default async function ListingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;

    let realcompData = null;
    try {
        realcompData = await getPropertyBySlug(resolvedParams.id);
    } catch (e) {
        console.error("Failed to load Realcomp property details:", e);
    }

    // Map Realcomp Data or fall back to mock
    const property = realcompData ? {
        id: realcompData.ListingId || resolvedParams.id,
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
        daysOnMarket: realcompData.DaysOnMarket || 0,
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
        ],
        lat: realcompData.Latitude,
        lng: realcompData.Longitude
    } : {
        id: resolvedParams.id,
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
            "Smart Home Technology"
        ],
        agent: {
            name: "Ali Berry",
            role: "Broker/Owner",
            phone: "(248) 955-1403",
            image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/Ali-Berry-900x900.fit.png"
        },
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
            "https://images.unsplash.com/photo-1600607687931-cecebd80d0d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
        ],
        lat: 42.5467,
        lng: -83.2113
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
                <ListingGallery
                    images={property.images}
                    status={property.status}
                    daysOnMarket={property.daysOnMarket}
                />
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">

                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Header Details */}
                        <div className="border-b border-slate-200 pb-8">
                            <div className="flex flex-col xl:flex-row xl:justify-between xl:items-end gap-6 mb-8">
                                <div className="w-full xl:w-auto">
                                    <h1 className="text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-2">
                                        ${property.price.toLocaleString()}
                                    </h1>
                                    <h2 className="text-xl text-slate-600 flex items-center gap-2 flex-wrap">
                                        <MapPin className="w-5 h-5 text-primary shrink-0" />
                                        <span>{property.address}, {property.city}, {property.state} {property.zip}</span>
                                    </h2>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 xl:flex gap-3 w-full xl:w-auto">
                                    <div className="text-center bg-white p-3 md:p-4 rounded-xl border border-slate-100 shadow-sm xl:min-w-[100px]">
                                        <span className="block text-2xl font-bold text-slate-900">{property.beds}</span>
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Beds</span>
                                    </div>
                                    <div className="text-center bg-white p-3 md:p-4 rounded-xl border border-slate-100 shadow-sm xl:min-w-[100px]">
                                        <span className="block text-2xl font-bold text-slate-900">{property.baths}</span>
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Baths</span>
                                    </div>
                                    <div className="text-center bg-white p-3 md:p-4 rounded-xl border border-slate-100 shadow-sm xl:min-w-[100px]">
                                        <span className="block text-2xl font-bold text-slate-900">{property.sqft.toLocaleString()}</span>
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sq Ft</span>
                                    </div>
                                    <div className="text-center bg-white p-3 md:p-4 rounded-xl border border-slate-100 shadow-sm xl:min-w-[100px]">
                                        <span className="block text-2xl font-bold text-slate-900">{property.daysOnMarket}</span>
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">DOM</span>
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

                        {/* Location / Map */}
                        <div>
                            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6">Location</h3>
                            <div className="h-[400px] bg-slate-200 rounded-3xl overflow-hidden relative shadow-inner border border-slate-100">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(`${property.address}, ${property.city}, ${property.state} ${property.zip}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                    allowFullScreen
                                    title="Property Map Location"
                                />
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

                            {/* Commute Widget */}
                            <CommuteWidget 
                                propertyAddress={`${property.address}, ${property.city}, MI ${property.zip}`}
                                propertyLat={property.lat}
                                propertyLng={property.lng}
                            />

                        </div>
                    </div>

                </div>
            </div>
            <LeadCaptureModal />
        </main>
    );
}
