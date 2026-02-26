async function test() {
    console.log("Fetching new token...");
    try {
        const tokenResp = await fetch("https://auth.realcomp.com/Token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: "stcl_45067453-be76-4a41-b805-4be69cf3a140",
                client_secret: "HRZA8u1or81~lfssGv7lp3HqRZ",
                audience: "rcapi.realcomp.com"
            })
        });
        const tokenData = await tokenResp.json();
        const token = tokenData.access_token;
        console.log("Got token.");

        const urlsToTest = [
            "https://apiidx.realcomp.com/odata/Property",
            "https://apiidx.realcomp.com/odata/Property?$top=1",
            "https://apiidx.realcomp.com/odata/Properties"
        ];

        for (const testUrl of urlsToTest) {
            console.log(`\nTesting ${testUrl}...`);
            const resp = await fetch(testUrl, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });
            console.log("Status:", resp.status);
            if (resp.status === 200 || resp.status === 400 || resp.status === 403 || resp.status === 500) {
                const data = await resp.text();
                console.log("Success/Error Body! Data length:", data.length);
                console.log("Preview:", data.substring(0, 500));
            }
        }
    } catch (e) {
        console.error("Error:", e);
    }
}
test();
