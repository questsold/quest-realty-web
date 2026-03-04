import { Search, Map as MapIcon, Filter, List, SlidersHorizontal, ImageOff, MapPinOff, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { getProperties } from "@/lib/realcomp";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { PropertyFilters } from "./PropertyFilters";
import MapWrapper from "./MapWrapper";

export const dynamic = "force-dynamic";

export default async function PropertiesPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const searchParams = await props.searchParams;
    let propertiesToDisplay: any[] = [];
    const q = typeof searchParams.q === 'string' ? searchParams.q : '';
    const view = typeof searchParams.view === 'string' ? searchParams.view : 'split';

    // Additional Filters
    const minPrice = typeof searchParams.minPrice === 'string' ? parseInt(searchParams.minPrice) : null;
    const maxPrice = typeof searchParams.maxPrice === 'string' ? parseInt(searchParams.maxPrice) : null;
    const minBeds = typeof searchParams.beds === 'string' ? parseInt(searchParams.beds) : null;
    const minBaths = typeof searchParams.baths === 'string' ? parseFloat(searchParams.baths) : null;
    const minSqft = typeof searchParams.sqft === 'string' ? parseInt(searchParams.sqft) : null;
    const minYear = typeof searchParams.year === 'string' ? parseInt(searchParams.year) : null;
    const propType = typeof searchParams.type === 'string' ? searchParams.type : 'Residential';
    const sortOrder = typeof searchParams.sort === 'string' ? searchParams.sort : 'ModificationTimestamp desc';

    const isNumeric = /^\d+$/.test(q.trim());

    let filterString = "";
    if (q) {
        if (isNumeric) {
            filterString = `contains(PostalCode, '${q.trim()}')`;
        } else {
            filterString = `(contains(OriginalCity, '${q.trim()}') or contains(UnparsedAddress, '${q.trim()}'))`;
        }
    }

    // Append additional filters
    if (minPrice !== null) filterString += (filterString ? " and " : "") + `ListPrice ge ${minPrice}`;
    if (maxPrice !== null) filterString += (filterString ? " and " : "") + `ListPrice le ${maxPrice}`;
    if (minBeds !== null) filterString += (filterString ? " and " : "") + `BedroomsTotal ge ${minBeds}`;
    if (minBaths !== null) filterString += (filterString ? " and " : "") + `BathroomsFull ge ${minBaths}`;
    if (minSqft !== null) filterString += (filterString ? " and " : "") + `LivingArea ge ${minSqft}`;
    if (minYear !== null) filterString += (filterString ? " and " : "") + `YearBuilt ge ${minYear}`;

    // Safer Property Type Filter
    if (propType && propType !== 'Any') {
        const typeFilter = propType === 'Residential'
            ? `PropertyType eq 'Residential'`
            : `(contains(PropertySubType, '${propType}') or contains(PropertyType, '${propType}'))`;
        filterString += (filterString ? " and " : "") + `(${typeFilter})`;
    }

    // Office Filtering
    const officeOnly = searchParams.office === 'true';
    if (officeOnly) {
        const officeIds = ['368625', '6505368625'];
        const officeFilter = `(${officeIds.map(id => `ListOfficeMlsId eq '${id}'`).join(' or ')})`;
        filterString += (filterString ? " and " : "") + `(${officeFilter})`;
    }

    // Determine if this is a "filtered" view
    const isFiltered = !!(q || searchParams.minPrice || searchParams.maxPrice || searchParams.beds || searchParams.baths || searchParams.sqft || searchParams.year || (searchParams.type && searchParams.type !== 'Residential'));

    try {
        const realcompData = await getProperties({
            top: 40,
            filter: filterString || undefined,
            orderby: sortOrder
        });
        if (realcompData && realcompData.length > 0) {
            propertiesToDisplay = realcompData.map((p, idx) => ({
                id: p.ListingId || `rc-${idx}`,
                address: (p as any).InternetAddressDisplayYN === false ? 'Address Withheld' : (p.UnparsedAddress || [p.StreetNumber, p.StreetName, p.StreetSuffix].filter(Boolean).join(' ') || 'Address Withheld'),
                city: `${p.OriginalCity || p.City || ''}, MI ${p.PostalCode || ''}`.trim(),
                price: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p.ListPrice || 0),
                beds: p.BedroomsTotal || 0,
                baths: (p.BathroomsFull || 0) + (p.BathroomsHalf ? 0.5 : 0),
                sqft: p.LivingArea ? p.LivingArea.toLocaleString() : 'N/A',
                type: p.PropertySubType || p.PropertyType || 'Single Family',
                image: (p.Media && p.Media.length > 0) ? p.Media[0].MediaURL : null,
                status: p.StandardStatus,
                lat: p.Latitude,
                lng: p.Longitude
            }));
        }
    } catch (e) {
        console.error("Failed to load Realcomp properties:", e);
    }

    const hasResults = propertiesToDisplay.length > 0;

    return (
        <div className="min-h-screen bg-white flex flex-col overflow-hidden">
            {/* Header Spacer */}
            <div className="h-[80px] w-full shrink-0" />

            <PropertyFilters />

            {/* Results Bar (Sticky/Persistent) */}
            <div className="bg-slate-50/50 border-b border-slate-200 py-4 px-6 md:px-10 z-20 shadow-sm">
                <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-2xl font-heading font-bold text-slate-900 tracking-tight flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                            {propertiesToDisplay.length} Live Listings Found
                        </h1>
                    </div>

                    <div className="flex bg-white rounded-2xl border border-slate-200 p-1.5 shadow-sm">
                        <Link
                            href={`/properties?${new URLSearchParams({ ...Object.fromEntries(Object.entries(searchParams).map(([k, v]) => [k, String(v)])), view: 'list' }).toString()}`}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${view === 'list' ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}
                        >
                            <List className="w-4 h-4" /> LIST
                        </Link>
                        <Link
                            href={`/properties?${new URLSearchParams({ ...Object.fromEntries(Object.entries(searchParams).map(([k, v]) => [k, String(v)])), view: 'split' }).toString()}`}
                            className={`hidden lg:flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${view === 'split' ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}
                        >
                            <SlidersHorizontal className="w-4 h-4" /> SPLIT
                        </Link>
                        <Link
                            href={`/properties?${new URLSearchParams({ ...Object.fromEntries(Object.entries(searchParams).map(([k, v]) => [k, String(v)])), view: 'map' }).toString()}`}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${view === 'map' ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}
                        >
                            <MapIcon className="w-4 h-4" /> MAP
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content Split View */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full relative">

                {/* Left: Property List */}
                <div
                    className={`h-full overflow-y-auto transition-all duration-500 ease-in-out bg-white
                        ${view === 'map' ? 'hidden w-0' : 'block'}
                        ${view === 'list' ? 'w-full' : 'w-full lg:w-[50%]'}
                        ${view === 'split' ? 'w-full lg:w-[50%]' : ''}
                    `}
                >
                    <div className="max-w-[1400px] mx-auto p-6 md:p-10">
                        {!hasResults ? (
                            <div className="flex flex-col items-center justify-center py-32 bg-slate-50 rounded-[2.5rem] border border-slate-200 shadow-sm px-6 text-center">
                                <div className="bg-white p-8 rounded-full mb-8 shadow-sm">
                                    <MapPinOff className="w-14 h-14 text-slate-300" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">No properties matched</h3>
                                <p className="text-slate-500 max-w-sm mb-10 font-medium">We couldn't find any listings for your current criteria. Try removing filters or searching a broader area.</p>
                                <Link
                                    href="/properties"
                                    className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all shadow-xl shadow-primary/20"
                                >
                                    Clear all filters
                                </Link>
                            </div>
                        ) : (
                            <div className={`grid gap-8 ${view === 'list' ? 'sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'sm:grid-cols-2'}`}>
                                {propertiesToDisplay.map((property: any) => (
                                    <PropertyCard key={property.id} {...property} />
                                ))}
                            </div>
                        )}

                        {hasResults && (
                            <div className="mt-16 mb-16 flex justify-center">
                                <button className="group relative px-12 py-5 bg-white border border-slate-200 rounded-full text-xs font-bold tracking-widest text-slate-900 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 uppercase shadow-sm">
                                    <span className="relative z-10">Load More Properties</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Interactive Map */}
                <div
                    className={`relative transition-all duration-500 ease-in-out bg-slate-100 border-l border-slate-200
                        ${view === 'list' ? 'hidden' : 'flex'}
                        ${view === 'map' ? 'w-full' : 'w-0 lg:w-[50%]'}
                        ${view === 'split' ? 'hidden lg:flex lg:w-[50%]' : ''}
                    `}
                >
                    <div className="absolute inset-0">
                        <MapWrapper properties={propertiesToDisplay} />
                    </div>
                </div>
            </div>
        </div>
    );
}
