import { NextResponse } from 'next/server';
import { getProperties } from '@/lib/realcomp';

export async function GET() {
    try {
        // Quest Realty Office IDs
        const officeIds = ['368625', '6505368625'];
        const filterStr = `(${officeIds.map(id => `ListOfficeMlsId eq '${id}'`).join(' or ')})`;

        const properties = await getProperties({
            filter: filterStr,
            orderby: 'ListPrice desc',
            top: 15 // Limit for carousel
        });

        // Map to common UI format
        const formatted = properties.map((p, idx) => ({
            id: p.ListingId || `exclusive-${idx}`,
            address: (p as any).InternetAddressDisplayYN === false ? 'Address Withheld' : (p.UnparsedAddress || 'Address Withheld'),
            city: `${p.OriginalCity || p.City || ''}, MI ${p.PostalCode || ''}`.trim(),
            price: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p.ListPrice || 0),
            beds: p.BedroomsTotal || 0,
            baths: (p.BathroomsFull || 0) + (p.BathroomsHalf ? 0.5 : 0),
            sqft: p.LivingArea ? p.LivingArea.toLocaleString() : 'N/A',
            type: p.PropertySubType || p.PropertyType || 'Single Family',
            image: (p.Media && p.Media.length > 0) ? p.Media[0].MediaURL : null,
            status: p.StandardStatus
        }));

        return NextResponse.json(formatted);
    } catch (error: any) {
        console.error("Exclusive listings error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
