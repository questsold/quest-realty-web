
/**
 * Realcomp API Integration (OData)
 */

const REALCOMP_CLIENT_ID = process.env.REALCOMP_CLIENT_ID;
const REALCOMP_CLIENT_SECRET = process.env.REALCOMP_CLIENT_SECRET;
const REALCOMP_TOKEN_URL = process.env.REALCOMP_TOKEN_URL || 'https://auth.realcomp.com/Token';
const REALCOMP_API_URL = process.env.REALCOMP_API_URL || 'https://idxapi.realcomp.com/odata';
const REALCOMP_AUDIENCE = process.env.REALCOMP_AUDIENCE || 'rcapi.realcomp.com';

let cachedToken: string | null = null;
let tokenExpiry: number = 0;

async function getAccessToken() {
    if (cachedToken && Date.now() < tokenExpiry) {
        return cachedToken;
    }

    console.log("Fetching new Realcomp access token...");
    const response = await fetch(REALCOMP_TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            grant_type: 'client_credentials',
            client_id: REALCOMP_CLIENT_ID || '',
            client_secret: REALCOMP_CLIENT_SECRET || '',
            audience: REALCOMP_AUDIENCE,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Token fetch failed:", errorText);
        throw new Error(`Failed to fetch Realcomp token: ${response.statusText}`);
    }

    const data = await response.json();
    cachedToken = data.access_token;
    // expires_in is usually in seconds
    tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000;
    return cachedToken;
}

export interface RealcompProperty {
    ListingKey: string;
    ListingId: string;
    UnparsedAddress: string;
    City: string;
    PostalCode: string;
    ListPrice: number;
    BedroomsTotal: number;
    BathroomsFull: number;
    BathroomsHalf: number;
    LivingArea: number;
    PropertyType: string;
    PropertySubType: string;
    StandardStatus: string;
    MlsStatus: string;
    Media?: Array<{
        MediaURL: string;
        Order: number;
    }>;
    PublicRemarks: string;
    OriginalCity: string;
    Latitude?: number;
    Longitude?: number;
    YearBuilt?: number;
    LotSizeAcres?: number;
    GarageSpaces?: number;
    ArchitecturalStyle?: string;
}

export async function getProperties(options: {
    filter?: string,
    top?: number,
    skip?: number,
    orderby?: string
} = {}) {
    try {
        const token = await getAccessToken();
        const { filter, top = 12, skip = 0, orderby = 'ListPrice desc' } = options;

        const url = new URL(`${REALCOMP_API_URL}/Property`);

        // Base filters for IDX compliance
        // Note: Realcomp OData field names based on RESO Web API standards.
        let combinedFilter = "StandardStatus eq 'Active' and InternetEntireListingDisplayYN eq true";

        if (filter) {
            combinedFilter = `(${combinedFilter}) and (${filter})`;
        }

        url.searchParams.set('$filter', combinedFilter);
        url.searchParams.set('$top', top.toString());
        url.searchParams.set('$skip', skip.toString());
        url.searchParams.set('$orderby', orderby);
        url.searchParams.set('$expand', 'Media'); // Usually how photos are included

        console.log("Fetching properties from Realcomp:", url.toString());

        const response = await fetch(url.toString(), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
            next: { revalidate: 60 } // Cache for 1 minute in Next.js
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("API error:", errorText);
            throw new Error(`Realcomp API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.value as RealcompProperty[];
    } catch (error) {
        console.error("Error fetching properties:", error);
        return [];
    }
}

export async function getPropertyBySlug(listingId: string) {
    try {
        const token = await getAccessToken();
        const url = new URL(`${REALCOMP_API_URL}/Property`);
        url.searchParams.set('$filter', `ListingId eq '${listingId}'`);
        url.searchParams.set('$expand', 'Media');

        const response = await fetch(url.toString(), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
            next: { revalidate: 3600 }
        });

        if (!response.ok) return null;

        const data = await response.json();
        return (data.value && data.value.length > 0) ? data.value[0] as RealcompProperty : null;
    } catch (error) {
        console.error("Error fetching single property:", error);
        return null;
    }
}

export async function getSuggestions(q: string) {
    if (!q || q.length < 3) return [];
    try {
        const token = await getAccessToken();
        const url = new URL(`${REALCOMP_API_URL}/Property`);

        // Search for addresses or cities starting with q
        const filter = `contains(UnparsedAddress, '${q}') or contains(OriginalCity, '${q}')`;
        url.searchParams.set('$filter', filter);
        url.searchParams.set('$top', '10');
        url.searchParams.set('$select', 'UnparsedAddress,OriginalCity,PostalCode');

        const response = await fetch(url.toString(), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            }
        });

        if (!response.ok) return [];
        const data = await response.json();
        return data.value as any[];
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        return [];
    }
}
