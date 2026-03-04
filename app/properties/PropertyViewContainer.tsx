"use client";

import { useState, useEffect } from "react";
import { List, SlidersHorizontal, Map as MapIcon, MapPinOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PropertyCard } from "@/components/ui/PropertyCard";
import MapWrapper from "./MapWrapper";

interface PropertyViewContainerProps {
    initialView: string;
    properties: any[];
}

export default function PropertyViewContainer({ initialView, properties }: PropertyViewContainerProps) {
    const [view, setView] = useState(initialView);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Sync state with URL view parameter without triggering full reload
    const handleViewChange = (newView: string) => {
        setView(newView);
        const params = new URLSearchParams(searchParams.toString());
        params.set("view", newView);
        window.history.replaceState(null, "", `?${params.toString()}`);
    };

    const hasResults = properties.length > 0;

    return (
        <>
            {/* Results Bar (Sticky/Persistent) */}
            <div className="bg-slate-50/50 border-b border-slate-200 py-4 px-6 md:px-10 z-20 shadow-sm">
                <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-2xl font-heading font-bold text-slate-900 tracking-tight flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                            {properties.length} Live Listings Found
                        </h1>
                    </div>

                    <div className="flex bg-white rounded-2xl border border-slate-200 p-1.5 shadow-sm">
                        <button
                            onClick={() => handleViewChange('list')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${view === 'list' ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}
                        >
                            <List className="w-4 h-4" /> LIST
                        </button>
                        <button
                            onClick={() => handleViewChange('split')}
                            className={`hidden lg:flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${view === 'split' ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}
                        >
                            <SlidersHorizontal className="w-4 h-4" /> SPLIT
                        </button>
                        <button
                            onClick={() => handleViewChange('map')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${view === 'map' ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}
                        >
                            <MapIcon className="w-4 h-4" /> MAP
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Split View */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full relative">

                {/* Left: Property List */}
                <div
                    className={`h-full overflow-y-auto transition-all duration-500 ease-in-out bg-white
                        ${view === 'map' ? 'hidden w-0' : 'block'}
                        ${view === 'list' ? 'w-full' : 'w-full lg:w-[50%]'}
                        ${view === 'split' ? 'w-full lg:w-[50%]' : ''}
                    `}
                >
                    <div className="max-w-[1400px] mx-auto p-6 md:p-10">
                        {!hasResults ? (
                            <div className="flex flex-col items-center justify-center py-32 bg-slate-50 rounded-[2.5rem] border border-slate-200 shadow-sm px-6 text-center">
                                <div className="bg-white p-8 rounded-full mb-8 shadow-sm">
                                    <MapPinOff className="w-14 h-14 text-slate-300" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">No properties matched</h3>
                                <p className="text-slate-500 max-w-sm mb-10 font-medium">We couldn't find any listings for your current criteria. Try removing filters or searching a broader area.</p>
                                <Link
                                    href="/properties"
                                    className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all shadow-xl shadow-primary/20"
                                >
                                    Clear all filters
                                </Link>
                            </div>
                        ) : (
                            <div className={`grid gap-8 ${view === 'list' ? 'sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'sm:grid-cols-2'}`}>
                                {properties.map((property: any) => (
                                    <PropertyCard key={property.id} {...property} />
                                ))}
                            </div>
                        )}

                        {hasResults && (
                            <div className="mt-16 mb-16 flex justify-center">
                                <button className="group relative px-12 py-5 bg-white border border-slate-200 rounded-full text-xs font-bold tracking-widest text-slate-900 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 uppercase shadow-sm">
                                    <span className="relative z-10">Load More Properties</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Interactive Map */}
                <div
                    className={`relative transition-all duration-500 ease-in-out bg-slate-100 border-l border-slate-200
                        ${view === 'list' ? 'hidden' : 'flex'}
                        ${view === 'map' ? 'w-full' : 'w-0 lg:w-[50%]'}
                        ${view === 'split' ? 'hidden lg:flex lg:w-[50%]' : ''}
                    `}
                >
                    <div className="absolute inset-0">
                        <MapWrapper properties={properties} />
                    </div>
                </div>
            </div>
        </>
    );
}
