"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Hero() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/properties?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <section className="relative min-h-[700px] md:h-[80vh] flex items-center justify-center overflow-hidden pt-36 pb-24 md:py-0">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
                    alt="Luxury home exterior"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/50" />
            </div>

            <div className="container relative z-10 px-6 mx-auto flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    <div className="mb-6 md:mb-10 text-white">
                        <div className="text-[10px] md:text-sm uppercase tracking-[0.4em] font-bold mb-4 text-primary drop-shadow-lg">
                            Your Metro Detroit
                        </div>
                        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tight mb-6 md:mb-8 leading-[1.2] md:leading-[1.1]">
                            Real Estate Experts
                        </h1>
                        <p className="text-sm sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed px-2 md:px-0 opacity-80">
                            The most current listings and detailed neighborhood information for the greater Michigan region.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row justify-center gap-4 mb-10 md:mb-12"
                    >
                        <Link
                            href="/buyers"
                            className="bg-primary hover:bg-primary/90 text-white px-10 py-4 md:py-5 rounded-full font-bold text-sm md:text-lg transition-all shadow-xl shadow-primary/20 hover:scale-105 text-center"
                        >
                            BUY WITH US
                        </Link>
                        <Link
                            href="/sellers"
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-2 border-white/30 px-10 py-4 md:py-5 rounded-full font-bold text-sm md:text-lg transition-all hover:scale-105 text-center"
                        >
                            SELL WITH US
                        </Link>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        onSubmit={handleSearch}
                        className="flex w-full max-w-xl mx-auto bg-white p-1.5 md:p-2 rounded-full shadow-2xl relative z-30"
                    >
                        <div className="relative flex-grow flex items-center">
                            <Search className="absolute left-4 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="City, Neighborhood..."
                                className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 rounded-l-full bg-transparent focus:outline-none text-slate-900 text-xs md:text-base"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-slate-900 hover:bg-slate-800 text-white px-5 md:px-8 py-3 md:py-4 rounded-full font-bold text-xs md:text-base transition-all translate-x-[1px]"
                        >
                            Search
                        </button>
                    </motion.form>
                </motion.div>
            </div>

            {/* Scroll to Discover */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-3 cursor-pointer group scale-100"
                onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            >
                <div className="bg-slate-950/40 backdrop-blur-md px-6 py-4 rounded-full border border-white/10 flex flex-col items-center gap-3 shadow-2xl hover:bg-slate-950/60 transition-all">
                    <span className="text-[11px] uppercase tracking-[0.5em] text-primary font-black drop-shadow-sm">Discover</span>
                    <div className="w-5 h-9 border-2 border-primary/40 rounded-full flex justify-center p-1 group-hover:border-primary/80 transition-colors">
                        <motion.div
                            animate={{
                                y: [0, 14, 0],
                                opacity: [0.4, 1, 0.4]
                            }}
                            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                            className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_12px_rgba(157,208,61,1)]"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Decorative Bottom gradient fade out */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
        </section>
    );
}
