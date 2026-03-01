"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Home, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { METRO_DETROIT_CITIES } from "@/lib/cities";
import { trackConversion } from "@/components/analytics/GoogleAnalytics";

const HERO_IMAGE = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";

export function Hero() {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
    const router = useRouter();

    const topLocations = ["Troy", "Detroit", "Ann Arbor", "Birmingham", "Royal Oak"];

    const handleSearch = (e: React.FormEvent | string) => {
        if (typeof e !== 'string') e.preventDefault();
        const term = (typeof e === 'string' ? e : searchQuery).trim();
        if (term) {
            setIsNavigating(true);
            trackConversion("property_search", {
                search_term: term,
                event_category: "Engagement",
                event_label: "Hero Search Bar",
            });
            router.push(`/properties?q=${encodeURIComponent(term)}`);
            setShowSuggestions(false);
        }
    };

    const handleInputChange = (val: string) => {
        setSearchQuery(val);

        if (val.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            if (debounceTimer) clearTimeout(debounceTimer);
            return;
        }

        const localMatches = METRO_DETROIT_CITIES
            .filter(c => c.toLowerCase().startsWith(val.toLowerCase()) || (val.length > 3 && c.toLowerCase().includes(val.toLowerCase())))
            .slice(0, 5)
            .map(c => ({ OriginalCity: c, type: 'city', label: c }));

        setSuggestions(localMatches);
        setShowSuggestions(localMatches.length > 0);

        if (debounceTimer) clearTimeout(debounceTimer);

        if (val.length >= 3) {
            const timer = setTimeout(async () => {
                setIsLoading(true);
                try {
                    const res = await fetch(`/api/autocomplete?q=${encodeURIComponent(val)}`);
                    const data = await res.json();

                    const resMap: Record<string, any[]> = { city: [], zip: [], address: [] };
                    const seen = new Set();

                    data.forEach((item: any) => {
                        if (item.OriginalCity && item.OriginalCity.toLowerCase().startsWith(val.toLowerCase()) && !seen.has(`city-${item.OriginalCity}`)) {
                            seen.add(`city-${item.OriginalCity}`);
                            resMap.city.push({
                                label: item.OriginalCity,
                                type: 'city'
                            });
                        }
                        if (item.PostalCode && !seen.has(`zip-${item.PostalCode}`)) {
                            seen.add(`zip-${item.PostalCode}`);
                            resMap.zip.push({
                                label: item.PostalCode,
                                type: 'zip',
                                PostalCode: item.PostalCode
                            });
                        }
                        if (item.UnparsedAddress && !seen.has(`address-${item.UnparsedAddress}`)) {
                            seen.add(`address-${item.UnparsedAddress}`);
                            resMap.address.push({
                                ...item,
                                label: item.UnparsedAddress,
                                type: 'address'
                            });
                        }
                    });

                    setSuggestions(prev => {
                        const cityMatches = [...resMap.city];
                        prev.forEach(p => {
                            if (p.type === 'city' && !seen.has(`city-${p.label}`)) {
                                seen.add(`city-${p.label}`);
                                cityMatches.push(p);
                            }
                        });
                        return [...cityMatches, ...resMap.zip, ...resMap.address].slice(0, 8);
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

    useEffect(() => {
        return () => { if (debounceTimer) clearTimeout(debounceTimer); };
    }, [debounceTimer]);

    const containerVariants: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section className={`relative min-h-[800px] md:h-[90vh] flex items-center justify-center pt-24 md:pt-32 ${showSuggestions ? 'z-50' : 'z-20'}`}>
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1.25 }}
                    transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                    className="w-full h-full"
                >
                    <img
                        src={HERO_IMAGE}
                        alt="Luxury Home"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/80" />
                <div className="absolute inset-0 bg-slate-950/20 backdrop-brightness-[0.85]" />
            </div>

            <div className="container relative z-10 px-6 mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl mx-auto flex flex-col items-center text-center"
                >
                    <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-white/90">
                            Metro Detroit Luxury Real Estate
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter text-white mb-8 leading-[0.95] md:leading-[0.9]"
                    >
                        Find Your <span className="text-primary italic">Quest</span> <br className="hidden md:block" />
                        For Perfection.
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
                    >
                        Access exclusive off-market listings and the most accurate real-time market data in Michigan. Your journey home begins here.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className={`relative w-full max-w-2xl transition-all duration-500 hover:scale-[1.02] ${showSuggestions ? 'z-50' : 'z-30'}`}
                    >
                        <div className="bg-white/90 backdrop-blur-2xl p-2 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white/20">
                            <form onSubmit={handleSearch} className="flex items-center">
                                <div className="flex-grow flex items-center pl-6">
                                    <div className="mr-4">
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                        ) : (
                                            <Search className="w-5 h-5 text-primary" />
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={isNavigating ? "Directing to properties..." : "Enter City, Zip, or Address..."}
                                        className="w-full py-4 md:py-5 bg-transparent focus:outline-none text-slate-900 text-sm md:text-base font-bold placeholder:text-slate-400 disabled:opacity-50"
                                        value={searchQuery}
                                        onChange={(e) => handleInputChange(e.target.value)}
                                        onFocus={() => searchQuery.length >= 2 && !isNavigating && setShowSuggestions(true)}
                                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                        disabled={isNavigating}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isNavigating}
                                    className="bg-slate-900 duration-300 hover:bg-primary text-white px-10 py-4 md:py-5 rounded-[2rem] font-black text-xs md:text-sm uppercase tracking-widest transition-all shadow-xl shadow-slate-900/20 active:scale-95 flex items-center gap-2 disabled:bg-slate-400 disabled:scale-100 disabled:shadow-none"
                                >
                                    {isNavigating ? "Searching" : "Search"}
                                </button>
                            </form>
                        </div>

                        <AnimatePresence>
                            {showSuggestions && suggestions.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                    className="absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] border border-slate-100 overflow-hidden text-left z-50 p-3"
                                >
                                    <div className="px-4 py-2 border-b border-slate-50 mb-2">
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Match Results</span>
                                    </div>
                                    {suggestions.map((item, idx) => (
                                        <motion.button
                                            key={`${idx}-${item.type}-${item.label}`}
                                            whileHover={{ x: 8, backgroundColor: "rgb(248, 250, 252)" }}
                                            onClick={() => {
                                                setSearchQuery(item.label);
                                                handleSearch(item.label);
                                            }}
                                            className="w-full text-left flex items-center justify-between gap-4 px-4 py-4 rounded-xl transition-all group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                                    {item.type === 'address' ? <Home className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900 uppercase tracking-tight text-xs group-hover:text-primary transition-colors">{item.label}</span>
                                                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                                                        {item.type === 'address' ? `Property in ${item.OriginalCity || 'Michigan'}` : item.type === 'zip' ? `Search Zip Code` : 'City / Region'}
                                                    </span>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-primary" />
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-8 flex flex-wrap justify-center gap-3"
                    >
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40 self-center mr-2">Top Areas:</span>
                        {topLocations.map(city => (
                            <button
                                key={city}
                                onClick={() => handleSearch(city)}
                                className="px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black text-white/70 uppercase tracking-widest transition-all hover:border-primary/50 hover:text-white"
                            >
                                {city}
                            </button>
                        ))}
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row justify-center gap-6 mt-16"
                    >
                        <Link
                            href="/buyers"
                            className="group relative overflow-hidden bg-primary px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] text-white transition-all shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10">Commission Savings</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>
                        <Link
                            href="/sellers"
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
                        >
                            What's My Home Worth?
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-50 via-zinc-50/40 to-transparent z-[5]" />
        </section>
    );
}
