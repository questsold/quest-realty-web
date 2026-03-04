import { getProperties } from "@/lib/realcomp";
import { PropertyFilters } from "./PropertyFilters";
import PropertyViewContainer from "./PropertyViewContainer";

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

    return (
        <div className="min-h-screen bg-white flex flex-col overflow-hidden">
            {/* Header Spacer */}
            <div className="h-[80px] w-full shrink-0" />

            <PropertyFilters />

            <div>
                <h1 className="text-xl md:text-2xl font-heading font-bold text-slate-900 tracking-tight flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    {propertiesToDisplay.length} Live Listings Found
                </h1>
                {/* Debug Info */}
                {propertiesToDisplay.length > 0 && (
                    <div className="text-[10px] text-slate-400 font-mono mt-1 opacity-10">
                        DBG: {propertiesToDisplay[0].lat}, {propertiesToDisplay[0].lng}
                    </div>
                )}
            </div>

            <PropertyViewContainer
                initialView={view}
                properties={propertiesToDisplay}
            />
        </div>
    );
}
