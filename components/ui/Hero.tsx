"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
        <section className="relative h-[80vh] min-h-[550px] flex items-center justify-center overflow-hidden">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
                    alt="Luxury home exterior"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/40" />
            </div>

            <div className="container relative z-10 px-6 mx-auto flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <div className="mb-10 text-white">
                        <div className="text-sm md:text-md uppercase tracking-[0.2em] font-medium mb-4">
                            Your Metro Detroit
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tight mb-6">
                            Real Estate Experts
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                            The most current listings and detailed neighborhood information for the greater Michigan region.
                        </p>
                    </div>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        onSubmit={handleSearch}
                        className="flex w-full max-w-xl mx-auto bg-white p-2 rounded-full shadow-2xl"
                    >
                        <div className="relative flex-grow flex items-center">
                            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="City, Neighborhood, or Zip"
                                className="w-full pl-12 pr-4 py-4 rounded-l-full bg-transparent focus:outline-none text-slate-900"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium transition-colors"
                        >
                            Search
                        </button>
                    </motion.form>
                </motion.div>
            </div>

            {/* Decorative Bottom gradient fade out */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
        </section>
    );
}
