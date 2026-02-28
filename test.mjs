import fs from 'fs';
async function test() {
    let output = "";
    try {
        const tokenResp = await fetch("https://auth.realcomp.com/Token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                grant_type: "client_credentials",
                client_id: "stcl_45067453-be76-4a41-b805-4be69cf3a140",
                client_secret: "HRZA8u1or81~lfssGv7lp3HqRZ",
                audience: "rcapi.realcomp.com"
            })
        });
        const tokenData = await tokenResp.json();
        const token = tokenData.access_token;

        const combinedFilter = "StandardStatus eq 'Active' and InternetEntireListingDisplayYN eq true and PropertyType eq 'Residential'";
        const url = `https://idxapi.realcomp.com/odata/Property?$top=5&$filter=${encodeURIComponent(combinedFilter)}&$orderby=ModificationTimestamp desc`;

        output += `URL: ${url}\n`;
        const resp = await fetch(url, {
            headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
        });
        const text = await resp.text();
        output += "Response Status: " + resp.status + "\n";
        output += "Response Body: " + text.substring(0, 1000) + "\n";
    } catch (e) {
        output += e.message + "\n";
    }
    fs.writeFileSync('output.txt', output);
}
test();
