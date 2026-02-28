'use client';

import { motion } from "framer-motion";
import { List, SlidersHorizontal, Map as MapIcon } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-[88px] overflow-hidden">
            {/* Filter Bar Skeleton */}
            <div className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4">
                <div className="h-10 w-64 bg-slate-100 rounded-xl animate-pulse" />
                <div className="h-10 w-24 bg-slate-100 rounded-xl animate-pulse ml-auto" />
                <div className="h-10 w-24 bg-slate-100 rounded-xl animate-pulse" />
            </div>

            {/* Main Content Split View Skeleton */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full relative">

                {/* Left: Property List Skeleton */}
                <div className="h-full w-full lg:w-[50%] overflow-y-auto bg-slate-50 border-r border-slate-200 p-6 md:p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex justify-between items-end mb-8">
                            <div className="space-y-3">
                                <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
                                <div className="h-4 w-32 bg-slate-100 rounded-md animate-pulse" />
                            </div>
                            <div className="flex gap-2 bg-white rounded-xl p-1 border border-slate-200">
                                <div className="h-8 w-20 bg-slate-100 rounded-lg animate-pulse" />
                                <div className="h-8 w-20 bg-slate-50 rounded-lg animate-pulse" />
                                <div className="h-8 w-20 bg-slate-50 rounded-lg animate-pulse" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm h-[420px] flex flex-col">
                                    <div className="h-64 bg-slate-100 animate-pulse" />
                                    <div className="p-7 space-y-4">
                                        <div className="h-6 w-3/4 bg-slate-100 rounded-md animate-pulse" />
                                        <div className="h-4 w-1/2 bg-slate-50 rounded-md animate-pulse" />
                                        <div className="flex gap-4 pt-4 border-t border-slate-50">
                                            <div className="h-8 w-12 bg-slate-50 rounded-md animate-pulse" />
                                            <div className="h-8 w-12 bg-slate-50 rounded-md animate-pulse" />
                                            <div className="h-8 w-12 bg-slate-50 rounded-md animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Map Skeleton */}
                <div className="hidden lg:block lg:w-[50%] bg-slate-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4 opacity-20">
                            <MapIcon className="w-16 h-16 text-slate-400" />
                            <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Loading Map View...</span>
                        </div>
                    </div>
                    {/* Decorative Map Grid Pattern */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                </div>
            </div>

            {/* Global Loading Top Bar (Subtle) */}
            <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 15, ease: "linear" }}
                className="fixed top-0 left-0 h-1 bg-primary z-[9999] shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
            />
        </div>
    );
}
