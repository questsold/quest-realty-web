import { Search, Map as MapIcon, Filter, List, SlidersHorizontal, ImageOff } from "lucide-react";
import Link from "next/link";
import { getProperties } from "@/lib/realcomp";
import { PropertyFilters } from "./PropertyFilters";

export default async function PropertiesPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    let propertiesToDisplay: any[] = [];
    const q = typeof searchParams.q === 'string' ? searchParams.q : '';

    let filterString = "";
    if (q) {
        // Build OData Filter String for City or PostalCode
        const isNumeric = /^\d+$/.test(q.trim());
        if (isNumeric) {
            filterString = `PostalCode eq '${q.trim()}'`;
        } else {
            // Capitalize first letter of each word to match Realcomp's standard casing
            const city = q.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
            filterString = `City eq '${city}'`;
        }
    }

    try {
        const realcompData = await getProperties({ top: 12, filter: filterString || undefined });
        if (realcompData && realcompData.length > 0) {
            propertiesToDisplay = realcompData.map((p, idx) => ({
                id: p.ListingId || `rc-${idx}`,
                address: p.UnparsedAddress || 'Address Withheld',
                city: `${p.City || ''}, MI ${p.PostalCode || ''}`.trim(),
                price: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p.ListPrice || 0),
                beds: p.BedroomsTotal || 0,
                baths: (p.BathroomsFull || 0) + (p.BathroomsHalf ? 0.5 : 0),
                sqft: p.LivingArea ? p.LivingArea.toLocaleString() : 'N/A',
                type: p.PropertySubType || p.PropertyType || 'Single Family',
                image: (p.Media && p.Media.length > 0) ? p.Media[0].MediaURL : null,
                status: p.StandardStatus
            }));
        }
    } catch (e) {
        console.error("Failed to load Realcomp properties:", e);
    }

    // Fallback Mock Data if Realcomp fails or is empty
    if (propertiesToDisplay.length === 0) {
        propertiesToDisplay = [
            {
                id: "1",
                address: "1042 Waddington Rd",
                city: "Birmingham, MI 48009",
                price: "$1,450,000",
                beds: 4,
                baths: 4,
                sqft: "3,200",
                type: "Single Family",
                image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                status: "Active"
            },
            {
                id: "2",
                address: "821 Rivenoak Ave",
                city: "Birmingham, MI 48009",
                price: "$899,000",
                beds: 3,
                baths: 3,
                sqft: "2,100",
                type: "Single Family",
                image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                status: "Active"
            },
            {
                id: "3",
                address: "4550 Walnut Lake Rd",
                city: "Bloomfield Hills, MI 48301",
                price: "$2,100,000",
                beds: 5,
                baths: 6,
                sqft: "6,500",
                type: "Estate",
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                status: "Coming Soon"
            },
            {
                id: "4",
                address: "2150 E Lincoln St",
                city: "Birmingham, MI 48009",
                price: "$725,000",
                beds: 3,
                baths: 2,
                sqft: "1,850",
                type: "Single Family",
                image: "https://images.unsplash.com/photo-1583608205712-bea72456202e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                status: "Active"
            },
            {
                id: "5",
                address: "1820 Quarton Rd",
                city: "Bloomfield Hills, MI 48304",
                price: "$3,450,000",
                beds: 6,
                baths: 7,
                sqft: "8,200",
                type: "Estate",
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                status: "Active"
            },
            {
                id: "6",
                address: "945 N Adams Rd",
                city: "Troy, MI 48098",
                price: "$649,900",
                beds: 4,
                baths: 3,
                sqft: "2,500",
                type: "Single Family",
                image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                status: "Active"
            }
        ];
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-[88px]">
            <PropertyFilters />

            {/* Main Content Split View */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-[1600px] mx-auto w-full">

                {/* Left: Property List */}
                <div className="w-full lg:w-[55%] lg:h-[calc(100vh-165px)] overflow-y-auto p-6 bg-slate-50">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h1 className="text-2xl font-heading font-bold text-slate-900">Metro Detroit Homes For Sale</h1>
                            <p className="text-slate-500 text-sm mt-1 font-medium">{propertiesToDisplay.length} Results</p>
                        </div>

                        <div className="flex bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
                            <button className="flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-md text-sm font-medium text-slate-900">
                                <List className="w-4 h-4" /> List
                            </button>
                            <button className="flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium text-slate-500 hover:text-slate-900">
                                <MapIcon className="w-4 h-4" /> Map
                            </button>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {propertiesToDisplay.map((property: any) => (
                            <Link href={`/listing/${property.id}`} key={property.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all cursor-pointer group block">
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">
                                        {property.type}
                                    </div>
                                    <img src={property.image} alt={property.address} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                </div>
                                <div className="p-5">
                                    <div className="text-2xl font-heading font-bold text-slate-900 mb-1">{property.price}</div>
                                    <div className="flex gap-4 text-sm font-medium text-slate-600 mb-4 pb-4 border-b border-slate-100">
                                        <span>{property.beds} <span className="font-normal text-slate-400">Beds</span></span>
                                        <span>{property.baths} <span className="font-normal text-slate-400">Baths</span></span>
                                        <span>{property.sqft} <span className="font-normal text-slate-400">Sqft</span></span>
                                    </div>
                                    <h4 className="font-semibold text-slate-900 truncate">{property.address}</h4>
                                    <p className="text-slate-500 text-sm truncate mt-0.5">{property.city}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-10 mb-8 flex justify-center">
                        <button className="border-2 border-slate-200 bg-white px-8 py-3 rounded-full text-sm font-bold tracking-wide text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors uppercase">
                            Load More Properties
                        </button>
                    </div>
                </div>

                {/* Right: Interactive Map */}
                <div className="hidden lg:block w-[45%] bg-slate-200 relative lg:h-[calc(100vh-165px)] border-l border-slate-200">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d376176.71190533356!2d-83.47353139871131!3d42.5085444535352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824c969397f35ad%3A0xe5a3c2678f8c4c7c!2sOakland%20County%2C%20MI!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0, position: 'absolute', inset: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
