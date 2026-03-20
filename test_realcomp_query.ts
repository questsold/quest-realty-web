import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const REALCOMP_CLIENT_ID = process.env.REALCOMP_CLIENT_ID;
const REALCOMP_CLIENT_SECRET = process.env.REALCOMP_CLIENT_SECRET;
const REALCOMP_TOKEN_URL = 'https://auth.realcomp.com/Token';
const REALCOMP_API_URL = 'https://idxapi.realcomp.com/odata';

async function getToken() {
    const res = await fetch(REALCOMP_TOKEN_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grant_type: 'client_credentials', client_id: REALCOMP_CLIENT_ID, client_secret: REALCOMP_CLIENT_SECRET, audience: 'rcapi.realcomp.com' })
    });
    return (await res.json()).access_token;
}

async function test() {
    const token = await getToken();
    console.log("Got token.");
    
    // Test 1: City and Office
    const officeIds = ['368625', '6505368625'];
    const officeFilterStr = `(${officeIds.map(id => `ListOfficeMlsId eq '${id}'`).join(' or ')})`;
    const cityFilterStr = `(City eq 'Troy' or OriginalCity eq 'Troy')`;
    const filter1 = `(StandardStatus eq 'Active' or StandardStatus eq 'ComingSoon') and InternetEntireListingDisplayYN eq true and (${cityFilterStr} and ${officeFilterStr})`;
    
    let url = new URL(`${REALCOMP_API_URL}/Property`);
    url.searchParams.set('$filter', filter1);
    
    let res = await fetch(url.toString(), { headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) console.log("Test 1 Failed:", await res.text());
    else {
        let json = await res.json();
        console.log("Test 1 OK:", json.value.length);
    }
    
    // Test 2: Just City and ModificationTimestamp desc
    const filter2 = `(StandardStatus eq 'Active' or StandardStatus eq 'ComingSoon') and InternetEntireListingDisplayYN eq true and (City eq 'Troy')`;
    url = new URL(`${REALCOMP_API_URL}/Property`);
    url.searchParams.set('$filter', filter2);
    url.searchParams.set('$orderby', 'ModificationTimestamp desc');
    res = await fetch(url.toString(), { headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) console.log("Test 2 Failed:", await res.text());
    else {
        let json = await res.json();
        console.log("Test 2 OK:", json.value.length);
    }
}
test();
