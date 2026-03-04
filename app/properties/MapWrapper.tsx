"use client";

import dynamic from "next/dynamic";

const PropertyMap = dynamic(() => import("./PropertyMap"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">Loading Map...</div>
});

export default function MapWrapper({ properties, searchBoundary }: { properties: any[], searchBoundary?: any }) {
    return <PropertyMap properties={properties} searchBoundary={searchBoundary} />;
}
