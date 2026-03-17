import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q");

    if (!query || query.length < 3) {
        return NextResponse.json([]);
    }

    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`, {
            headers: {
                "User-Agent": "QuestRealty CommuteFeature/1.0 (info@questrealtymi.com)"
            }
        });

        if (!res.ok) {
            return NextResponse.json([], { status: res.status });
        }

        const data = await res.json();
        
        // Map to simpler format
        const suggestions = data.map((item: any) => ({
            display_name: item.display_name,
            lat: item.lat,
            lon: item.lon,
            address: item.address
        }));

        return NextResponse.json(suggestions);
    } catch (e: any) {
        console.error("Address autocomplete error:", e);
        return NextResponse.json([], { status: 500 });
    }
}
