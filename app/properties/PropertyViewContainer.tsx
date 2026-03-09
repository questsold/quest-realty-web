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
    searchBoundary?: any;
}

export default function PropertyViewContainer({ initialView, properties, searchBoundary }: PropertyViewContainerProps) {
    const [view, setView] = useState(initialView);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Sync state with URL view parameter without triggering full reload
    const handleViewChange = (newView: string) => {
        setView(newView);
        const params = new URLSearchParams(searchParams.toString());
        params.set("view", newView);
        window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
    };

    const handleSortChange = (newSort: string) => {
        const params = new URLSearchParams(window.location.search);
        params.set("sort", newSort);
        router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false });
    };

    const currentSort = typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search).get("sort") || "ModificationTimestamp desc"
        : searchParams.get("sort") || "ModificationTimestamp desc";

    const sortOptions = [
        { label: "Newest Listings", value: "ModificationTimestamp desc" },
        { label: "Price: Low to High", value: "ListPrice asc" },
        { label: "Price: High to Low", value: "ListPrice desc" },
        { label: "Size: Largest", value: "LivingArea desc" },
    ];

    const hasResults = properties.length > 0;

    return (
        <>
            {/* Results Bar (Sticky/Persistent) */}
            <div className="bg-slate-50/50 border-b border-slate-200 py-4 px-6 md:px-10 z-20 shadow-sm transition-all shrink-0">
                <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                        <div>
                            <h1 className="text-xl md:text-2xl font-heading font-bold text-slate-900 tracking-tight flex items-center gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                                {properties.length} Live Listings Found
                            </h1>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest hidden sm:inline">Sort By</span>
                            <div className="relative group">
                                <select
                                    value={currentSort}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2 pr-10 text-xs font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer hover:border-slate-300"
                                >
                                    {sortOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-900 transition-colors">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
                                </div>
                            </div>
                        </div>
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
                        <MapWrapper properties={properties} searchBoundary={searchBoundary} />
                    </div>
                </div>
            </div>
        </>
    );
}
