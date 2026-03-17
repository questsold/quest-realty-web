import { getProperties, getSearchBoundary } from "@/lib/realcomp";
import { METRO_DETROIT_COUNTIES } from "@/lib/cities";
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
        const matchedCounty = METRO_DETROIT_COUNTIES.find(c => c.toLowerCase() === q.trim().toLowerCase());

        if (matchedCounty) {
            const countyName = matchedCounty.replace(/ county/i, '');
            filterString = `CountyOrParish eq '${countyName}'`;
        } else if (isNumeric) {
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
        let typeFilter = '';
        if (propType === 'Residential') {
            typeFilter = `PropertyType eq 'Residential'`;
        } else if (propType === 'Condominium') {
            typeFilter = `PropertySubType eq 'Condominium'`;
        } else if (propType === 'Single Family') {
            typeFilter = `PropertySubType eq 'SingleFamilyResidence'`;
        } else if (propType === 'Land') {
            typeFilter = `PropertyType eq 'Land'`;
        } else if (propType === 'Multi-Family') {
            typeFilter = `PropertyType eq 'ResidentialIncome' or PropertySubType eq 'MultiFamily'`;
        } else if (propType === 'Commercial') {
            typeFilter = `PropertyType eq 'CommercialSale' or PropertyType eq 'BusinessOpportunity'`;
        } else {
            typeFilter = `PropertySubType eq '${propType}'`;
        }
        filterString += (filterString ? " and " : "") + `(${typeFilter})`;
    }

    // Office Filtering
    const officeParam = typeof searchParams.office === 'string' ? searchParams.office : null;
    const officeOnly = officeParam === 'true' || (officeParam !== 'false' && !q);

    if (officeOnly) {
        const officeIds = ['368625', '6505368625'];
        const officeFilter = `(${officeIds.map(id => `ListOfficeMlsId eq '${id}'`).join(' or ')})`;
        filterString += (filterString ? " and " : "") + `(${officeFilter})`;
    }

    let searchBoundary = null;
    try {
        const [realcompData, boundaryData] = await Promise.all([
            getProperties({
                top: 250,
                filter: filterString || undefined,
                orderby: sortOrder
            }),
            q && q.length >= 3 ? getSearchBoundary(q) : Promise.resolve(null)
        ]);

        searchBoundary = boundaryData;

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
                image: (p.Media && p.Media.length > 0) ? [...p.Media].sort((a: any, b: any) => (a.Order || 999) - (b.Order || 999))[0].MediaURL : null,
                status: p.StandardStatus,
                lat: p.Latitude,
                lng: p.Longitude
            }));
        }
    } catch (e) {
        console.error("Failed to load search data:", e);
    }

    return (
        <div className="h-screen bg-white flex flex-col overflow-hidden">
            {/* Header Spacer */}
            <div className="h-[80px] w-full shrink-0" />

            <PropertyFilters />

            <PropertyViewContainer
                initialView={view}
                properties={propertiesToDisplay}
                searchBoundary={searchBoundary}
            />
        </div>
    );
}
