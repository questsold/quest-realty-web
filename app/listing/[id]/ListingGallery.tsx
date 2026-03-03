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
    const [currentIndex, setCurrentIndex] = useState(0);

    const openGallery = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
        // Prevent scrolling when modal is open
        document.body.style.overflow = "hidden";
    };

    const closeGallery = () => {
        setIsOpen(false);
        // Restore scrolling
        document.body.style.overflow = "auto";
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <>
            <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[60vh] min-h-[500px] rounded-3xl overflow-hidden shadow-lg">
                {/* Main Image */}
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

                {/* Smaller Images */}
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
                        {/* Show 'View All' overlay on the last image if there are more */}
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

            {/* Fullscreen Gallery Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
                        onClick={closeGallery}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 rounded-full p-2 transition-colors z-50"
                            onClick={closeGallery}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="absolute top-6 left-6 text-white font-bold bg-black/50 px-4 py-2 rounded-full z-50">
                            {currentIndex + 1} / {images.length}
                        </div>

                        {images.length > 1 && (
                            <>
                                <button
                                    className="absolute left-6 text-white/70 hover:text-white bg-black/50 rounded-full p-3 transition-colors z-50"
                                    onClick={prevImage}
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>

                                <button
                                    className="absolute right-6 text-white/70 hover:text-white bg-black/50 rounded-full p-3 transition-colors z-50"
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
                            className="w-full h-full p-4 md:p-12 flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
                        >
                            <img
                                src={images[currentIndex]}
                                alt={`Property full view ${currentIndex + 1}`}
                                className="max-w-full max-h-full object-contain select-none"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
