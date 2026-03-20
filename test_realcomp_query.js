const REALCOMP_CLIENT_ID = process.env.REALCOMP_CLIENT_ID;
const REALCOMP_CLIENT_SECRET = process.env.REALCOMP_CLIENT_SECRET;
const REALCOMP_TOKEN_URL = 'https://auth.realcomp.com/Token';
const REALCOMP_API_URL = 'https://idxapi.realcomp.com/odata';

async function getToken() {
    console.log("Getting token...");
    const res = await fetch(REALCOMP_TOKEN_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grant_type: 'client_credentials', client_id: REALCOMP_CLIENT_ID, client_secret: REALCOMP_CLIENT_SECRET, audience: 'rcapi.realcomp.com' })
    });
    const text = await res.text();
    console.log("Token response:", text);
    return JSON.parse(text).access_token;
}

async function test() {
    try {
        const token = await getToken();
        console.log("Got token.");
        
        // Test 1: City without quotes?
        let filter1 = `(StandardStatus eq 'Active' or StandardStatus eq 'ComingSoon') and InternetEntireListingDisplayYN eq true and (City eq Troy)`;
        let url = new URL(`${REALCOMP_API_URL}/Property`);
        url.searchParams.set('$filter', filter1);
        
        console.log("URL 1:", url.toString());
        let res = await fetch(url.toString(), { headers: { 'Authorization': `Bearer ${token}` } });
        if (!res.ok) console.log("Test 1 Failed:", await res.text());
        else console.log("Test 1 OK:", (await res.json()).value?.length);
        
        // Test 2: OriginalCity
        let filter2 = `(StandardStatus eq 'Active' or StandardStatus eq 'ComingSoon') and InternetEntireListingDisplayYN eq true and (OriginalCity eq 'Troy')`;
        url = new URL(`${REALCOMP_API_URL}/Property`);
        url.searchParams.set('$filter', filter2);
        
        console.log("URL 2:", url.toString());
        res = await fetch(url.toString(), { headers: { 'Authorization': `Bearer ${token}` } });
        if (!res.ok) console.log("Test 2 Failed:", await res.text());
        else console.log("Test 2 OK:", (await res.json()).value?.length);
    } catch (e) {
        console.error("Crash:", e);
    }
}
test();
