import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
        map.invalidateSize();
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
        // If we have a search boundary, prioritize it for the map view
        if (searchBoundary?.geojson) {
            try {
                // Create a ghost layer to calculate bounds of GeoJSON
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

        // Fallback to property markers
        if (validProperties.length === 0) {
            return { bounds: null, center: [42.48, -83.14] as [number, number] };
        }

        try {
            const points = validProperties.map(p => [p.latNum!, p.lngNum!] as [number, number]);
            const b = L.latLngBounds(points);
            const c = b.getCenter();
            return { bounds: b, center: [c.lat, c.lng] as [number, number] };
        } catch (e) {
            return { bounds: null, center: [42.48, -83.14] as [number, number] };
        }
    }, [validProperties, searchBoundary]);

    // Create the dimming mask (inverse polygon)
    const maskData = useMemo(() => {
        if (!searchBoundary?.geojson) return null;

        // A huge rectangle covering the globe with a hole for the city
        // Note: GeoJSON coordinates are [lng, lat]
        const outer = [
            [-180, 90],
            [180, 90],
            [180, -90],
            [-180, -90],
            [-180, 90]
        ];

        let inner: any[] = [];
        if (searchBoundary.geojson.type === 'Polygon') {
            inner = searchBoundary.geojson.coordinates[0];
        } else if (searchBoundary.geojson.type === 'MultiPolygon') {
            // Take the first polygon's outer ring
            inner = searchBoundary.geojson.coordinates[0][0];
        }

        if (inner.length === 0) return null;

        return {
            type: "Feature",
            properties: {},
            geometry: {
                type: "Polygon",
                coordinates: [outer, inner]
            }
        };
    }, [searchBoundary]);

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

                {/* The Dimming Mask */}
                {maskData && (
                    <GeoJSON
                        data={maskData as any}
                        style={{
                            fillColor: '#000',
                            fillOpacity: 0.15,
                            weight: 0,
                            stroke: false
                        }}
                    />
                )}

                {/* The City/Zip Boundary Outline */}
                {searchBoundary?.geojson && (
                    <GeoJSON
                        data={searchBoundary.geojson}
                        style={{
                            color: '#004cff',
                            weight: 3,
                            opacity: 0.7,
                            fillOpacity: 0
                        }}
                    />
                )}

                {validProperties.map((property) => (
                    <Marker
                        key={property.id}
                        position={[property.latNum!, property.lngNum!]}
                        icon={createPriceIcon(property.price)}
                    >
                        <Popup className="zillow-popup">
                            <div className="p-3 min-w-[200px]">
                                <div className="text-lg font-black text-slate-900 mb-1">{property.price}</div>
                                <div className="text-xs text-slate-600 font-bold mb-0.5">{property.address}</div>
                                <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">{property.city}</div>
                                <div className="mt-2 text-[10px] flex gap-3 text-slate-500 font-bold border-t border-slate-100 pt-2">
                                    <span>{property.beds} Beds</span>
                                    <span>{property.baths} Baths</span>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Re-add zoom control in Zillow position */}
                <div className="leaflet-bottom leaflet-right">
                    <div className="leaflet-control-zoom leaflet-bar leaflet-control">
                        <a className="leaflet-control-zoom-in" href="#" title="Zoom in" role="button" aria-label="Zoom in" onClick={(e) => { e.preventDefault(); (window as any)._leaflet_map?.zoomIn(); }}>+</a>
                        <a className="leaflet-control-zoom-out" href="#" title="Zoom out" role="button" aria-label="Zoom out" onClick={(e) => { e.preventDefault(); (window as any)._leaflet_map?.zoomOut(); }}>-</a>
                    </div>
                </div>
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
