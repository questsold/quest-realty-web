'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Home } from 'lucide-react';
import { PropertyCard } from './PropertyCard';
import Link from 'next/link';

export function ExclusiveListings() {
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchExclusive() {
            try {
                const res = await fetch('/api/exclusive-listings');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setProperties(data);
                }
            } catch (error) {
                console.error("Error fetching exclusive listings:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchExclusive();
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const { scrollLeft, clientWidth } = scrollRef.current;
        const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
        scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="flex gap-8 overflow-hidden py-10 px-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="min-w-[350px] h-[500px] bg-slate-100 animate-pulse rounded-[2.5rem]" />
                ))}
            </div>
        );
    }

    if (!properties.length) return null;

    return (
        <section className="py-24 bg-white overflow-hidden relative">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 mb-4"
                        >
                            <span className="w-8 h-[2px] bg-primary" />
                            <span className="text-xs uppercase tracking-[0.4em] text-primary font-black">Featured Collection</span>
                        </motion.div>
                        <h3 className="text-4xl md:text-6xl font-heading font-black text-slate-900 tracking-tighter leading-none mb-4">
                            Exclusive <span className="text-primary italic">Listings</span>
                        </h3>
                        <p className="text-slate-500 font-medium text-lg italic">The most prestigious properties from our office, curated for you.</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll('left')}
                            className="p-5 rounded-full bg-slate-50 border border-slate-100 text-slate-400 hover:text-primary hover:border-primary hover:bg-white hover:scale-110 active:scale-95 transition-all shadow-sm"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-5 rounded-full bg-slate-50 border border-slate-100 text-slate-400 hover:text-primary hover:border-primary hover:bg-white hover:scale-110 active:scale-95 transition-all shadow-sm"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto pb-12 pt-4 px-2 no-scrollbar snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {properties.map((property, idx) => (
                        <motion.div
                            key={property.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05, duration: 0.6 }}
                            className="min-w-[320px] md:min-w-[400px] snap-start"
                        >
                            <PropertyCard {...property} />
                        </motion.div>
                    ))}

                    {/* Final CTA Card inside carousel */}
                    <div className="min-w-[320px] md:min-w-[400px] snap-start h-full">
                        <div className="h-full bg-slate-900 rounded-[2.5rem] p-10 flex flex-col justify-center text-center text-white border-4 border-primary/20 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <Home className="w-16 h-16 text-primary mx-auto mb-8 animate-bounce relative z-10" />
                            <h4 className="text-3xl font-black mb-4 leading-tight relative z-10">Searching for <br />More?</h4>
                            <p className="text-white/60 font-medium mb-10 relative z-10">Explore our full inventory of Detroit's finest real estate.</p>
                            <Link
                                href="/properties"
                                className="bg-primary text-white py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-primary transition-all shadow-xl shadow-primary/20 relative z-10"
                            >
                                Browse All Listings
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex justify-center">
                    <Link
                        href="/properties"
                        className="group flex items-center gap-4 text-slate-900 font-black uppercase tracking-[0.2em] text-sm hover:text-primary transition-all"
                    >
                        View Full Office Portfolio <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 z-0" />
        </section>
    );
}

// Add CSS to hide scrollbars globally or via a utility if needed, 
// though inline styles and the 'no-scrollbar' class (assuming tailwind) are used.
