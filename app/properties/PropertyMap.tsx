"use client";

import { useEffect, useState } from "react";
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

function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
}

interface Property {
    id: string;
    address: string;
    city: string;
    price: string;
    lat?: number;
    lng?: number;
}

export default function PropertyMap({ properties }: { properties: Property[] }) {
    const [isMounted, setIsMounted] = useState(false);
    const [greenIcon, setGreenIcon] = useState<L.DivIcon | null>(null);

    useEffect(() => {
        setIsMounted(true);
        setGreenIcon(createGreenIcon());
    }, []);

    if (!isMounted) return <div className="w-full h-full bg-slate-50 animate-pulse" />;

    // Find a reasonable center (default to Metro Detroit area if no properties have coordinates)
    const validProperties = properties.filter(p => p.lat && p.lng);
    const center: [number, number] = validProperties.length > 0
        ? [validProperties[0].lat!, validProperties[0].lng!]
        : [42.48, -83.14]; // Oakland County center

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
                <ChangeView center={center} />

                {validProperties.map((property) => (
                    <Marker
                        key={property.id}
                        position={[property.lat!, property.lng!]}
                        icon={greenIcon || undefined}
                    >
                        <Popup>
                            <div className="p-2 min-w-[120px]">
                                <div className="font-exrabold text-slate-900 text-sm mb-1">{property.price}</div>
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
