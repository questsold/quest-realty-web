"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ListingGalleryProps {
    images: string[];
    status: string;
    daysOnMarket: number;
}

export function ListingGallery({ images, status, daysOnMarket }: ListingGalleryProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'single'>('grid');
    const [currentIndex, setCurrentIndex] = useState(0);

    const checkPhotoLimit = () => {
        if ((window as any).__noreg_bypass) return;
        window.dispatchEvent(new CustomEvent("increment-photo-view"));
    };

    const openGallery = (index: number) => {
        checkPhotoLimit();
        setCurrentIndex(index);
        setViewMode('grid');
        setIsOpen(true);
        document.body.style.overflow = "hidden";
    };

    const openSingleView = (index: number) => {
        checkPhotoLimit();
        setCurrentIndex(index);
        setViewMode('single');
    };

    const closeGallery = () => {
        setIsOpen(false);
        document.body.style.overflow = "auto";
    };

    const backToGrid = (e?: React.MouseEvent) => {
        if(e) e.stopPropagation();
        setViewMode('grid');
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        checkPhotoLimit();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        checkPhotoLimit();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <>
            <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[60vh] min-h-[500px] rounded-3xl overflow-hidden shadow-lg">
                <div
                    className="col-span-4 lg:col-span-2 row-span-2 relative group cursor-pointer"
                    onClick={() => openGallery(0)}
                >
                    <img
                        src={images[0]}
                        alt="Main listing view"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-6 left-6 flex gap-2">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                            {status}
                        </span>
                        <span className="bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                            {daysOnMarket} DOM
                        </span>
                    </div>
                </div>

                {images.slice(1, 5).map((img, idx) => (
                    <div
                        key={idx}
                        className="hidden lg:block relative group overflow-hidden cursor-pointer"
                        onClick={() => openGallery(idx + 1)}
                    >
                        <img
                            src={img}
                            alt={`Property view ${idx + 2}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {idx === 3 && images.length > 5 && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/50">
                                <span className="text-white font-bold tracking-widest uppercase border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
                                    View All Photos
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-start overflow-y-auto"
                        onClick={viewMode === 'single' ? undefined : closeGallery}
                    >
                        {/* Global Close Button */}
                        <button
                            className="fixed top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-colors z-[110]"
                            onClick={closeGallery}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {viewMode === 'grid' ? (
                            /* Grid / List View */
                            <div className="w-full max-w-5xl mx-auto py-6 md:py-12 px-0 sm:px-4 flex flex-col gap-2 md:gap-8" onClick={(e) => e.stopPropagation()}>
                                <div className="text-white text-center mb-4 mt-6 md:mt-0">
                                    <h2 className="text-2xl md:text-3xl font-bold">Property Photos</h2>
                                    <p className="text-slate-400 mt-2">{images.length} Photos</p>
                                </div>
                                {images.map((img, idx) => (
                                    <div 
                                        key={idx} 
                                        className="w-full sm:rounded-xl overflow-hidden cursor-pointer hover:ring-4 hover:ring-primary transition-all duration-300 relative group"
                                        onClick={() => openSingleView(idx)}
                                    >
                                        <img 
                                            src={img} 
                                            alt={`Property view ${idx + 1}`} 
                                            className="w-full h-auto object-cover max-h-[80vh]" 
                                            loading="lazy" 
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Single Photo View */
                            <div className="fixed inset-0 flex items-center justify-center bg-black/95 z-[105]" onClick={backToGrid}>
                                <button
                                    className="absolute top-6 left-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 px-4 py-2 rounded-full font-bold transition-colors z-[110] flex items-center gap-2"
                                    onClick={backToGrid}
                                >
                                    <ChevronLeft className="w-5 h-5" /> Back to Grid
                                </button>

                                <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white font-bold bg-black/50 px-4 py-2 rounded-full z-[110]">
                                    {currentIndex + 1} / {images.length}
                                </div>

                                {images.length > 1 && (
                                    <>
                                        <button
                                            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 transition-colors z-[110]"
                                            onClick={prevImage}
                                        >
                                            <ChevronLeft className="w-8 h-8" />
                                        </button>

                                        <button
                                            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 transition-colors z-[110]"
                                            onClick={nextImage}
                                        >
                                            <ChevronRight className="w-8 h-8" />
                                        </button>
                                    </>
                                )}

                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-full h-full p-4 md:p-16 flex items-center justify-center"
                                    onClick={(e) => e.stopPropagation()} // Prevent going back to grid when clicking image
                                >
                                    <img
                                        src={images[currentIndex]}
                                        alt={`Property full view ${currentIndex + 1}`}
                                        className="max-w-full max-h-full object-contain select-none"
                                    />
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
