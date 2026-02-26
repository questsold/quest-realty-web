"use client";

import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function FiltersContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [q, setQ] = useState(searchParams.get("q") || "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        if (q) params.set("q", q);
        else params.delete("q");
        router.push(`/properties?${params.toString()}`);
    };

    return (
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            <form onSubmit={handleSearch} className="relative w-full md:max-w-md">
                <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Search className="w-5 h-5 text-slate-400 hover:text-primary transition-colors" />
                </button>
                <input
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search by City or Zip Code (e.g. Birmingham, 48009)"
                    className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-slate-50"
                />
            </form>

            <div className="flex w-full md:w-auto gap-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                <button type="button" className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap transition-colors">
                    Price <SlidersHorizontal className="w-4 h-4 ml-1 text-slate-400" />
                </button>
                <button type="button" className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap transition-colors">
                    Beds & Baths <SlidersHorizontal className="w-4 h-4 ml-1 text-slate-400" />
                </button>
                <button type="button" className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap transition-colors">
                    Property Type <SlidersHorizontal className="w-4 h-4 ml-1 text-slate-400" />
                </button>
                <button type="button" className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 whitespace-nowrap transition-colors">
                    <Filter className="w-4 h-4 mr-1" /> Filters
                </button>
            </div>
        </div>
    );
}

export function PropertyFilters() {
    return (
        <div className="bg-white border-b border-slate-200 sticky top-[88px] z-40 shadow-sm">
            <Suspense fallback={<div className="container mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">Loading filters...</div>}>
                <FiltersContent />
            </Suspense>
        </div>
    );
}
