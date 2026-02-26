import { Search, Map as MapIcon, Filter, List, SlidersHorizontal, ImageOff } from "lucide-react";
import Link from "next/link";
import { getProperties } from "@/lib/realcomp";

export default async function PropertiesPage() {
    let propertiesToDisplay: any[] = [];

    try {
        const realcompData = await getProperties({ top: 12 }); // Fetch 12 active properties
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
            {/* Search Header Bar */}
            <div className="bg-white border-b border-slate-200 sticky top-[88px] z-40 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="City, Neighborhood, or Zip"
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        />
                    </div>

                    <div className="flex w-full md:w-auto gap-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap">
                            Price <SlidersHorizontal className="w-4 h-4 ml-1 text-slate-400" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap">
                            Beds & Baths <SlidersHorizontal className="w-4 h-4 ml-1 text-slate-400" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap">
                            Property Type <SlidersHorizontal className="w-4 h-4 ml-1 text-slate-400" />
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 whitespace-nowrap">
                            <Filter className="w-4 h-4 mr-1" /> Filters
                        </button>
                    </div>
                </div>
            </div>

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

                {/* Right: Map View (Placeholder) */}
                <div className="hidden lg:block w-[45%] bg-slate-200 relative lg:h-[calc(100vh-165px)] border-l border-slate-200">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px]" />

                    {/* Map Overlay UI */}
                    <div className="absolute top-6 right-6">
                        <div className="bg-white rounded-lg shadow-xl p-1 flex flex-col border border-slate-200">
                            <button className="p-2 hover:bg-slate-50 rounded-md transition-colors"><div className="w-6 h-6 flex items-center justify-center font-bold text-slate-700 text-lg">+</div></button>
                            <div className="w-full h-px bg-slate-100" />
                            <button className="p-2 hover:bg-slate-50 rounded-md transition-colors"><div className="w-6 h-6 flex items-center justify-center font-bold text-slate-700 text-lg">-</div></button>
                        </div>
                    </div>

                    {/* Example Map Pins */}
                    {propertiesToDisplay.map((prop: any, idx: number) => (
                        <div
                            key={prop.id}
                            className="absolute bg-primary text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-xl border-2 border-white cursor-pointer hover:scale-110 transition-transform hover:bg-slate-900 hover:text-white hover:z-50"
                            style={{
                                top: `${25 + (idx * 12)}%`,
                                left: `${20 + (idx * 15 - (idx % 2 * 25))}%`
                            }}
                        >
                            {prop.price.split(',')[0]}K
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
