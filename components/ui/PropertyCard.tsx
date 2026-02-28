'use client';

import { MapPin, Bed, Bath, Square, ArrowRight, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface PropertyCardProps {
    id: string;
    address: string;
    city: string;
    price: string;
    beds: number;
    baths: number;
    sqft: string;
    image: string;
    status?: string;
}

export function PropertyCard({ id, address, city, price, beds, baths, sqft, image, status = "For Sale" }: PropertyCardProps) {
    const [isSaved, setIsSaved] = useState(false);
    const [currentImgIdx, setCurrentImgIdx] = useState(0);

    // Mock images for carousel demonstration
    const images = [image, image, image]; // In a real app, this would be property.Media

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500 border border-slate-100 flex flex-col h-full relative"
        >
            {/* Image Wrapper */}
            <div className="relative h-64 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImgIdx}
                        src={images[currentImgIdx]}
                        alt={address}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full h-full object-cover"
                    />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-lg backdrop-blur-md border border-white/20
                        ${status.toLowerCase().includes('new') ? 'bg-emerald-500 text-white' : 'bg-white/90 text-slate-900'}
                    `}>
                        {status}
                    </span>
                </div>

                {/* Save Heart */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsSaved(!isSaved);
                    }}
                    className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-rose-500 transition-all duration-300 shadow-xl"
                >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>

                {/* Carousel Controls (Hidden by default, reveal on hover) */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                    <button
                        onClick={(e) => { e.preventDefault(); setCurrentImgIdx(v => (v > 0 ? v - 1 : images.length - 1)) }}
                        className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all pointer-events-auto shadow-lg"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); setCurrentImgIdx(v => (v < images.length - 1 ? v + 1 : 0)) }}
                        className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all pointer-events-auto shadow-lg"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Image Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    {images.map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImgIdx ? 'bg-white w-3' : 'bg-white/40'}`} />
                    ))}
                </div>
            </div>

            {/* Content Wrapper */}
            <div className="p-7 flex flex-col flex-grow">
                <div className="mb-5">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-heading font-black text-slate-900 tracking-tight">{price}</span>
                    </div>
                    <div className="flex flex-col">
                        <h4 className="font-bold text-slate-800 truncate group-hover:text-primary transition-colors leading-snug">
                            {address}
                        </h4>
                        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1">
                            <MapPin className="w-3 h-3 text-primary" /> {city}
                        </p>
                    </div>
                </div>

                {/* Specs Row */}
                <div className="flex items-center gap-5 border-t border-slate-50 pt-6 mt-auto">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                            <Bed className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-900 leading-none">{beds}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Beds</span>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-slate-100" />
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                            <Bath className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-900 leading-none">{baths}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Baths</span>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-slate-100" />
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                            <Square className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-900 leading-none">{sqft}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Sqft</span>
                        </div>
                    </div>
                </div>

                {/* Link Overlay */}
                <Link href={`/listing/${id}`} className="absolute inset-0 z-0" aria-label={`View details for ${address}`}>
                    <span className="sr-only">View Details</span>
                </Link>
            </div>
        </motion.div>
    );
}

