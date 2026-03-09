import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";

// Create a Zillow-style price tag icon
const createPriceIcon = (price: string) => {
    return new L.DivIcon({
        className: "price-marker-icon",
        html: `<div class="price-marker-container">
            <div class="price-marker-tag">${price}</div>
        </div>`,
        iconSize: [60, 30],
        iconAnchor: [30, 15],
        popupAnchor: [0, -15]
    });
};

function MapResizer() {
    const map = useMap();
    useEffect(() => {
        const observer = new ResizeObserver(() => {
            map.invalidateSize();
        });
        const container = map.getContainer();
        if (container) {
            observer.observe(container);
        }
        return () => observer.disconnect();
    }, [map]);
    return null;
}

function ChangeView({ bounds, center }: { bounds: L.LatLngBounds | null, center: [number, number] }) {
    const map = useMap();

    useEffect(() => {
        if (bounds && bounds.isValid()) {
            const timer = setTimeout(() => {
                map.invalidateSize();
                map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14, animate: true });
            }, 300);
            return () => clearTimeout(timer);
        } else {
            map.invalidateSize();
            map.setView(center, 12, { animate: true });
        }
    }, [bounds, map, center]);

    return null;
}

interface Property {
    id: string;
    address: string;
    city: string;
    price: string;
    beds: number | string;
    baths: number | string;
    sqft: string;
    lat?: number | string;
    lng?: number | string;
    latNum?: number | null;
    lngNum?: number | null;
    image?: string | null;
}

interface SearchBoundary {
    geojson: any;
    displayName: string;
    boundingbox: string[];
}

export default function PropertyMap({ properties, searchBoundary }: { properties: Property[], searchBoundary?: SearchBoundary }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const validProperties = useMemo(() => {
        return properties
            .map(p => ({
                ...p,
                latNum: typeof p.lat === 'string' ? parseFloat(p.lat) : (typeof p.lat === 'number' ? p.lat : null),
                lngNum: typeof p.lng === 'string' ? parseFloat(p.lng) : (typeof p.lng === 'number' ? p.lng : null)
            }))
            .filter(p =>
                p.latNum !== null && p.lngNum !== null &&
                !isNaN(p.latNum) && !isNaN(p.lngNum) &&
                p.latNum !== 0 && p.lngNum !== 0
            );
    }, [properties]);

    const { bounds, center } = useMemo(() => {
        // Show all results by prioritizing property markers first
        if (validProperties.length > 0) {
            try {
                const points = validProperties.map(p => [p.latNum!, p.lngNum!] as [number, number]);
                const b = L.latLngBounds(points);
                const c = b.getCenter();
                return { bounds: b, center: [c.lat, c.lng] as [number, number] };
            } catch (e) {
                // Ignore map bound errors
            }
        }

        // Fallback to boundary if no properties exist
        if (searchBoundary?.geojson) {
            try {
                const geoLayer = L.geoJSON(searchBoundary.geojson);
                const b = geoLayer.getBounds();
                if (b.isValid()) {
                    const c = b.getCenter();
                    return { bounds: b, center: [c.lat, c.lng] as [number, number] };
                }
            } catch (e) {
                console.error("Error parsing boundary geojson:", e);
            }
        }

        return { bounds: null, center: [42.48, -83.14] as [number, number] };
    }, [validProperties, searchBoundary]);

    if (!isMounted) return <div className="w-full h-full bg-slate-50 animate-pulse" />;

    return (
        <div className="w-full h-full relative">
            <MapContainer
                center={center}
                zoom={11}
                className="w-full h-full"
                scrollWheelZoom={true}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    maxZoom={20}
                />

                <MapResizer />
                <ChangeView bounds={bounds} center={center} />

                {validProperties.map((property) => (
                    <Marker
                        key={property.id}
                        position={[property.latNum!, property.lngNum!]}
                        icon={createPriceIcon(property.price)}
                    >
                        <Popup className="zillow-popup">
                            <Link href={`/listing/${property.id}`} className="flex flex-col min-w-[200px] sm:min-w-[240px] group cursor-pointer">
                                {property.image ? (
                                    <div className="w-full h-32 relative bg-slate-100 shrink-0 overflow-hidden">
                                        <img src={property.image} alt={property.address} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                ) : (
                                    <div className="w-full h-32 bg-slate-100 flex items-center justify-center shrink-0">
                                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">No Image</span>
                                    </div>
                                )}
                                <div className="p-4 group-hover:bg-slate-50 transition-colors">
                                    <div className="text-xl font-black text-slate-900 mb-1 group-hover:text-primary transition-colors">{property.price}</div>
                                    <div className="text-xs text-slate-600 font-bold mb-0.5 truncate">{property.address}</div>
                                    <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest truncate">{property.city}</div>
                                    <div className="mt-3 text-[10px] flex gap-3 text-slate-500 font-bold border-t border-slate-100 pt-3">
                                        <span>{property.beds} <span className="text-slate-400 font-medium">Beds</span></span>
                                        <span>{property.baths} <span className="text-slate-400 font-medium">Baths</span></span>
                                        <span>{property.sqft} <span className="text-slate-400 font-medium">sqft</span></span>
                                    </div>
                                </div>
                            </Link>
                        </Popup>
                    </Marker>
                ))}

                {/* Native Zoom Control */}
                <ZoomControl position="bottomright" />
            </MapContainer>

            <style jsx global>{`
                .price-marker-tag {
                    background: #94c83d;
                    color: white;
                    font-weight: 800;
                    font-size: 11px;
                    padding: 4px 12px;
                    border-radius: 20px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    text-align: center;
                    white-space: nowrap;
                    transition: all 0.2s ease;
                    display: inline-block;
                    border: 1.5px solid white;
                }
                .price-marker-container:hover .price-marker-tag {
                    background: #7ba632;
                    transform: scale(1.1);
                    z-index: 1000;
                }
                .leaflet-popup-content-wrapper {
                    border-radius: 12px;
                    padding: 0;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2) !important;
                }
                .leaflet-popup-content { margin: 0 !important; }
                .zillow-popup .leaflet-popup-tip { display: none; }
                .leaflet-container { font-family: inherit !important; }
            `}</style>
        </div>
    );
}
