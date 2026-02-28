"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

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

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div className="w-full h-full bg-slate-100 animate-pulse" />;

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
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapResizer />
                <ChangeView center={center} />

                {validProperties.map((property) => (
                    <Marker
                        key={property.id}
                        position={[property.lat!, property.lng!]}
                    >
                        <Popup>
                            <div className="p-1">
                                <div className="font-bold text-slate-900">{property.price}</div>
                                <div className="text-xs text-slate-600 truncate">{property.address}</div>
                                <div className="text-[10px] text-slate-400">{property.city}</div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
