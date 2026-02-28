"use client";

import { Search, Filter, X, SlidersHorizontal, MapPin, Home, Check, RotateCcw, ArrowUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { METRO_DETROIT_CITIES } from "@/lib/cities";

function FiltersContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [q, setQ] = useState(searchParams.get("q") || "");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

    // Filter States
    const [localFilters, setLocalFilters] = useState({
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        beds: searchParams.get("beds") || "Any",
        baths: searchParams.get("baths") || "Any",
        type: searchParams.get("type") || "Residential",
        sqft: searchParams.get("sqft") || "Any",
        year: searchParams.get("year") || "Any",
        sort: searchParams.get("sort") || "ModificationTimestamp desc"
    });

    const propertyTypes = ["Any", "Residential", "Single Family", "Condominium", "Townhouse", "Land", "Multi-Family", "Commercial"];
    const bedsOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];
    const bathsOptions = ["Any", "1+", "2+", "3+", "4+"];
    const sqftOptions = ["Any", "1,000+", "2,000+", "3,000+", "4,000+", "5,000+"];
    const yearOptions = ["Any", "2020+", "2010+", "2000+", "1990+", "1980+", "Earlier"];

    const sortOptions = [
        { label: "Newest Listings", value: "ModificationTimestamp desc" },
        { label: "Price: Low to High", value: "ListPrice asc" },
        { label: "Price: High to Low", value: "ListPrice desc" },
        { label: "Size: Largest First", value: "LivingArea desc" },
    ];

    const handleSearch = (e: React.FormEvent | string) => {
        if (typeof e !== 'string') e.preventDefault();
        const searchTerm = typeof e === 'string' ? e : q;
        const params = new URLSearchParams(searchParams);
        if (searchTerm) params.set("q", searchTerm);
        else params.delete("q");
        router.push(`/properties?${params.toString()}`);
        setShowSuggestions(false);
    };

    const handleInputChange = (val: string) => {
        setQ(val);
        if (val.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            if (debounceTimer) clearTimeout(debounceTimer);
            return;
        }

        const localMatches = METRO_DETROIT_CITIES
            .filter(c => c.toLowerCase().startsWith(val.toLowerCase()) || (val.length > 3 && c.toLowerCase().includes(val.toLowerCase())))
            .slice(0, 5)
            .map(c => ({ OriginalCity: c, type: 'city' }));

        setSuggestions(localMatches);
        setShowSuggestions(localMatches.length > 0);

        if (debounceTimer) clearTimeout(debounceTimer);
        if (val.length >= 3) {
            const timer = setTimeout(async () => {
                setIsLoading(true);
                try {
                    const res = await fetch(`/api/autocomplete?q=${encodeURIComponent(val)}`);
                    const data = await res.json();
                    const formattedData = data.map((item: any) => ({
                        ...item,
                        type: item.UnparsedAddress?.toLowerCase().includes(val.toLowerCase()) ? 'address' : 'city'
                    }));
                    setSuggestions(prev => {
                        const combined = [...prev, ...formattedData];
                        const seen = new Set();
                        return combined.filter(item => {
                            const label = item.UnparsedAddress || item.OriginalCity;
                            if (!label || seen.has(label)) return false;
                            seen.add(label);
                            return true;
                        }).slice(0, 10);
                    });
                    setShowSuggestions(true);
                } catch (e) {
                    console.error("Autocomplete error:", e);
                } finally {
                    setIsLoading(false);
                }
            }, 300);
            setDebounceTimer(timer);
        }
    };

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams);
        Object.entries(localFilters).forEach(([key, value]) => {
            if (value && value !== 'Any' && value !== 'Earlier') {
                params.set(key, value.replace('+', '').replace(',', ''));
            } else if (value === 'Earlier') {
                params.set(key, '1900'); // Symbolic for searching older homes if needed
            } else {
                params.delete(key);
            }
        });
        if (q) params.set("q", q);
        router.push(`/properties?${params.toString()}`);
        setIsModalOpen(false);
    };

    const clearFilters = () => {
        const reset = {
            minPrice: "",
            maxPrice: "",
            beds: "Any",
            baths: "Any",
            type: "Residential",
            sqft: "Any",
            year: "Any",
            sort: "ModificationTimestamp desc"
        };
        setLocalFilters(reset);
        setQ("");
        router.push('/properties');
        setIsModalOpen(false);
    };

    const activeFilterCount = Object.entries(localFilters).filter(([k, v]) => {
        if (k === 'type' && v === 'Residential') return false;
        if (k === 'sort' && v === 'ModificationTimestamp desc') return false;
        return v !== 'Any' && v !== '';
    }).length;

    return (
        <div className="bg-white/90 backdrop-blur-xl border-b border-slate-200 sticky top-[88px] z-[9999] shadow-sm relative transition-all duration-300">
            <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between !overflow-visible relative">

                {/* Left side: Advanced Search Bar */}
                <div className="relative w-full md:max-w-xl">
                    <form onSubmit={handleSearch} className="relative z-[60]">
                        <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2">
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                            ) : (
                                <Search className="w-4 h-4 text-primary" />
                            )}
                        </button>
                        <input
                            type="text"
                            value={q}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            onFocus={() => q.length >= 2 && setShowSuggestions(true)}
                            placeholder="Search by City, Zip, or Address..."
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-sm bg-white font-bold placeholder:text-slate-400 placeholder:font-medium transition-all"
                        />
                    </form>

                    <AnimatePresence>
                        {showSuggestions && suggestions.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 z-[100] overflow-hidden p-2"
                            >
                                {suggestions.map((item, idx) => {
                                    const label = item.UnparsedAddress || item.OriginalCity;
                                    return (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ x: 5 }}
                                            onClick={() => {
                                                setQ(label);
                                                handleSearch(label);
                                            }}
                                            className="w-full text-left flex items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50 rounded-2xl transition-all duration-300 border-b border-slate-50 last:border-0 group cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                                                    {item.type === 'address' ? <Home className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                                                </div>
                                                <div className="flex flex-col text-left">
                                                    <span className="font-bold text-slate-900 uppercase tracking-tight text-xs group-hover:text-primary transition-colors">{label}</span>
                                                    <span className="text-[10px] uppercase font-extrabold text-slate-400 group-hover:text-slate-500 transition-colors">
                                                        {item.type === 'address' ? `Address in ${item.OriginalCity}` : 'City'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-2 text-primary">
                                                <Search className="w-3.5 h-3.5 transform -rotate-45" />
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right side: Filter Controls */}
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">

                    {/* Filter Pills */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2
                            ${activeFilterCount > 0 ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900'}
                        `}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                        {activeFilterCount > 0 && (
                            <span className="ml-1 w-5 h-5 bg-primary text-white flex items-center justify-center rounded-full text-[9px] border-2 border-slate-900">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>

                    <div className="w-px h-8 bg-slate-200 mx-2 hidden md:block" />

                    <button
                        className="flex items-center gap-2 px-6 py-3.5 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95 whitespace-nowrap"
                    >
                        Save Search
                    </button>

                    <button
                        onClick={clearFilters}
                        disabled={activeFilterCount === 0 && !q}
                        className="p-3.5 text-slate-400 hover:text-slate-900 disabled:opacity-0 disabled:pointer-events-none transition-all"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>

                {/* Overlay Modal (Updated styled) */}
                <AnimatePresence>
                    {isModalOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsModalOpen(false)}
                                className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[200]"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl z-[201] overflow-hidden flex flex-col max-h-[90vh]"
                            >
                                {/* Modal Header */}
                                <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                    <div>
                                        <h2 className="text-3xl font-heading font-black text-slate-900 tracking-tight underline decoration-primary decoration-4 underline-offset-8">Search Filters</h2>
                                        <p className="text-slate-500 text-[11px] mt-4 font-black uppercase tracking-widest">Fine-tune your acquisition criteria</p>
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-4 bg-white border border-slate-200 rounded-[1.25rem] hover:bg-slate-50 transition-colors shadow-sm group"
                                    >
                                        <X className="w-6 h-6 text-slate-400 group-hover:text-slate-900 transition-colors" />
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <div className="p-10 overflow-y-auto space-y-12">
                                    {/* Sorting Section */}
                                    <section>
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-6 flex items-center gap-2">
                                            <ArrowUpDown className="w-4 h-4" /> Sort Priority
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                            {sortOptions.map(opt => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => setLocalFilters({ ...localFilters, sort: opt.value })}
                                                    className={`px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all text-center ${localFilters.sort === opt.value ? "bg-slate-900 text-white border-slate-900 shadow-xl" : "bg-white border-slate-200 text-slate-500 hover:border-slate-400"}`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Price Section */}
                                    <section>
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-6">Valuation Range</h3>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Minimum Price</label>
                                                <div className="relative">
                                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                                    <input
                                                        type="number"
                                                        placeholder="Any"
                                                        value={localFilters.minPrice}
                                                        onChange={(e) => setLocalFilters({ ...localFilters, minPrice: e.target.value })}
                                                        className="w-full pl-10 pr-5 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 font-bold text-slate-900"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Maximum Price</label>
                                                <div className="relative">
                                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                                    <input
                                                        type="number"
                                                        placeholder="Any"
                                                        value={localFilters.maxPrice}
                                                        onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: e.target.value })}
                                                        className="w-full pl-10 pr-5 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 font-bold text-slate-900"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Property Type */}
                                    <section>
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-6">Property Asset Type</h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {propertyTypes.map(type => (
                                                <button
                                                    key={type}
                                                    onClick={() => setLocalFilters({ ...localFilters, type })}
                                                    className={`px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all text-center ${localFilters.type === type ? "bg-slate-900 text-white border-slate-900 shadow-xl" : "bg-white border-slate-200 text-slate-500 hover:border-slate-400"}`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <section>
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-6">Accommodation</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Bedrooms</label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {bedsOptions.map(opt => (
                                                            <button
                                                                key={opt}
                                                                onClick={() => setLocalFilters({ ...localFilters, beds: opt })}
                                                                className={`px-5 py-3 rounded-xl text-xs font-black border transition-all ${localFilters.beds === opt ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-white border-slate-200 text-slate-500 hover:border-primary/30"}`}
                                                            >
                                                                {opt}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <section>
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-6">Square Footage</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {sqftOptions.map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setLocalFilters({ ...localFilters, sqft: opt })}
                                                        className={`px-5 py-3 rounded-xl text-xs font-black border transition-all ${localFilters.sqft === opt ? "bg-slate-900 text-white border-slate-900 shadow-xl" : "bg-white border-slate-200 text-slate-500 hover:border-slate-400"}`}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center mt-auto">
                                    <button
                                        onClick={clearFilters}
                                        className="flex items-center gap-2 text-slate-400 hover:text-rose-500 font-black uppercase tracking-[0.2em] text-[9px] transition-colors"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5" /> Reset Selection
                                    </button>
                                    <div className="flex gap-4 w-full sm:w-auto">
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="flex-1 sm:flex-none px-8 py-4.5 bg-white border border-slate-200 rounded-2xl font-black uppercase tracking-widest text-[10px] text-slate-400 hover:text-slate-900 transition-all"
                                        >
                                            Dismiss
                                        </button>
                                        <button
                                            onClick={applyFilters}
                                            className="flex-1 sm:flex-none px-12 py-4.5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30"
                                        >
                                            <Check className="w-4 h-4" /> Apply Changes
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export function PropertyFilters() {
    return (
        <Suspense fallback={<div className="container mx-auto px-6 py-4 animate-pulse uppercase font-black text-[10px] tracking-widest text-slate-400">Loading Market Data...</div>}>
            <FiltersContent />
        </Suspense>
    );
}
