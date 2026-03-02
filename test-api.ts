const REALCOMP_TOKEN_URL = process.env.REALCOMP_TOKEN_URL || 'https://auth.realcomp.com/Token';
const REALCOMP_API_URL = process.env.REALCOMP_API_URL || 'https://idxapi.realcomp.com/odata';
const REALCOMP_AUDIENCE = process.env.REALCOMP_AUDIENCE || 'rcapi.realcomp.com';
const REALCOMP_CLIENT_ID = process.env.REALCOMP_CLIENT_ID;
const REALCOMP_CLIENT_SECRET = process.env.REALCOMP_CLIENT_SECRET;

async function getAccessToken() {
    const response = await fetch(REALCOMP_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            grant_type: 'client_credentials',
            client_id: REALCOMP_CLIENT_ID || '',
            client_secret: REALCOMP_CLIENT_SECRET || '',
            audience: REALCOMP_AUDIENCE,
        }),
    });
    const data = await response.json();
    return data.access_token;
}

async function main() {
    const token = await getAccessToken();
    const baseQuery = `${process.env.REALCOMP_API_URL || 'https://idxapi.realcomp.com/odata'}/Property?$top=10&$select=UnparsedAddress,OriginalCity,PostalCode,ListingId,StreetNumber,StreetName,StreetSuffix&$filter=`;
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
    };

    console.log("Test 10: Active + StreetNumber or Address starts with 4953");
    let start = Date.now();
    let q = '4953';
    let filter = `StandardStatus eq 'Active' and (startswith(UnparsedAddress, '${q}') or startswith(StreetNumber, '${q}'))`;
    let res = await fetch(`${baseQuery}${encodeURIComponent(filter)}`, { headers });
    let data = await res.json();
    console.log("Time:", Date.now() - start, "ms", "Results:", data.value?.length);

    console.log("Test 11: Active + Address contains 4953 Treeside");
    start = Date.now();
    q = '4953 treeside';
    filter = `StandardStatus eq 'Active' and (contains(UnparsedAddress, '${q}') or startswith(OriginalCity, '${q}') or contains(StreetName, 'treeside'))`;
    res = await fetch(`${baseQuery}${encodeURIComponent(filter)}`, { headers });
    data = await res.json();
    console.log("Time:", Date.now() - start, "ms", "Results:", data.value?.length);
}

main().catch(console.error);
