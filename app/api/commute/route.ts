import { NextRequest, NextResponse } from "next/server";

async function geocode(address: string) {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`, {
        headers: {
            "User-Agent": "QuestRealty CommuteFeature/1.0 (info@questrealtymi.com)"
        }
    });
    
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.length > 0) {
        return {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon)
        };
    }
    return null;
}

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const origin = url.searchParams.get("origin");
    const destString = url.searchParams.get("dest");
    const destLat = url.searchParams.get("destLat");
    const destLng = url.searchParams.get("destLng");

    if (!origin) {
        return NextResponse.json({ error: "Missing origin" }, { status: 400 });
    }

    try {
        // Step 1: Geocode Origin
        const originCoords = await geocode(origin);
        if (!originCoords) {
            return NextResponse.json({ error: "Could not find origin address" }, { status: 404 });
        }

        // Step 2: Determine Destination Coords
        let destCoords: { lat: number, lng: number } | null = null;
        if (destLat && destLng && destLat !== "undefined" && destLng !== "undefined") {
            destCoords = { lat: parseFloat(destLat), lng: parseFloat(destLng) };
        } else if (destString) {
            destCoords = await geocode(destString);
        }

        if (!destCoords) {
            return NextResponse.json({ error: "Could not find destination address" }, { status: 404 });
        }

        // Step 3: Fetch Route from OSRM
        const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destCoords.lng},${destCoords.lat}?overview=false`;
        
        const routeRes = await fetch(osrmUrl);
        if (!routeRes.ok) {
            return NextResponse.json({ error: "Routing failed" }, { status: 500 });
        }

        const routeData = await routeRes.json();
        
        if (routeData.code !== "Ok" || !routeData.routes || routeData.routes.length === 0) {
            return NextResponse.json({ error: "No route found" }, { status: 404 });
        }

        const durationSeconds = routeData.routes[0].duration;
        const distanceMeters = routeData.routes[0].distance;
        
        return NextResponse.json({
            duration: durationSeconds,
            distance: distanceMeters,
            originCoords,
            destCoords
        });

    } catch (e: any) {
        console.error("Commute Calculation Error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
