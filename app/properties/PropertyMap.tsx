"use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Create a custom green marker icon
const createGreenIcon = () => {
    return new L.DivIcon({
        className: "custom-div-icon",
        html: `<div style="
            background-color: #94c83d;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        popupAnchor: [0, -7]
    });
};

function MapResizer() {
    const map = useMap();
    useEffect(() => {
        map.invalidateSize();
    }, [map]);
    return null;
}

function ChangeView({ bounds, center }: { bounds: L.LatLngBounds | null, center: [number, number] }) {
    const map = useMap();

    useEffect(() => {
        // Force a resize calculation before fitting bounds (helps with layout transitions)
        map.invalidateSize();

        if (bounds && bounds.isValid()) {
            // Use a slight delay to ensure the container transition is mostly done
            const timer = setTimeout(() => {
                map.invalidateSize();
                map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true });
            }, 100);
            return () => clearTimeout(timer);
        } else {
            map.setView(center, 11, { animate: true });
        }
    }, [bounds, map, center]);

    return null;
}

interface Property {
    id: string;
    address: string;
    city: string;
    price: string;
    lat?: number | string;
    lng?: number | string;
}

export default function PropertyMap({ properties }: { properties: Property[] }) {
    const [isMounted, setIsMounted] = useState(false);
    const [greenIcon, setGreenIcon] = useState<L.DivIcon | null>(null);

    useEffect(() => {
        setIsMounted(true);
        setGreenIcon(createGreenIcon());
        console.log("PropertyMap mounted with properties:", properties.length);
    }, []);

    const validProperties = useMemo(() => {
        return properties
            .map(p => ({
                ...p,
                lat: typeof p.lat === 'string' ? parseFloat(p.lat) : p.lat,
                lng: typeof p.lng === 'string' ? parseFloat(p.lng) : p.lng
            }))
            .filter(p =>
                p.lat !== undefined && p.lat !== null && !isNaN(p.lat as number) &&
                p.lng !== undefined && p.lng !== null && !isNaN(p.lng as number) &&
                p.lat !== 0 && p.lng !== 0
            );
    }, [properties]);

    const { bounds, center } = useMemo(() => {
        if (validProperties.length === 0) {
            console.log("No valid properties with coordinates found!");
            return { bounds: null, center: [42.48, -83.14] as [number, number] };
        }

        console.log(`Found ${validProperties.length} properties with valid coordinates.`);
        try {
            const b = L.latLngBounds(validProperties.map(p => [Number(p.lat), Number(p.lng)] as [number, number]));
            return { bounds: b, center: b.getCenter() as unknown as [number, number] };
        } catch (e) {
            console.error("Error creating bounds:", e);
            return { bounds: null, center: [42.48, -83.14] as [number, number] };
        }
    }, [validProperties]);

    if (!isMounted) return <div className="w-full h-full bg-slate-50 animate-pulse" />;

    return (
        <div className="w-full h-full relative">
            <MapContainer
                center={center}
                zoom={11}
                className="w-full h-full"
                scrollWheelZoom={true}
            >
                {/* Standard less busy looking maps: CartoDB Positron */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    subdomains='abcd'
                    maxZoom={20}
                />
                <MapResizer />
                <ChangeView bounds={bounds} center={center} />

                {validProperties.map((property) => (
                    <Marker
                        key={property.id}
                        position={[Number(property.lat), Number(property.lng)]}
                        icon={greenIcon || undefined}
                    >
                        <Popup>
                            <div className="p-2 min-w-[120px]">
                                <div className="font-extrabold text-slate-900 text-sm mb-1">{property.price}</div>
                                <div className="text-[11px] text-slate-600 font-medium leading-tight mb-0.5">{property.address}</div>
                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{property.city}</div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <style jsx global>{`
                .leaflet-popup-content-wrapper {
                    border-radius: 12px;
                    padding: 0;
                    overflow: hidden;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
                }
                .leaflet-popup-content {
                    margin: 0;
                }
                .leaflet-container {
                    font-family: inherit;
                }
            `}</style>
        </div>
    );
}
