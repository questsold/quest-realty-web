'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PropertyCard } from './PropertyCard';

interface SimilarPropertiesSliderProps {
    properties: any[];
}

export function SimilarPropertiesSlider({ properties }: SimilarPropertiesSliderProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const { scrollLeft, clientWidth } = scrollRef.current;
        const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
        scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    };

    if (!properties || properties.length === 0) return null;

    return (
        <div className="mt-12 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-2xl font-heading font-black text-slate-900 tracking-tight">Similar Properties</h3>
                    <p className="text-slate-500 font-medium text-sm mt-1">Explore other homes in this budget and location.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-3 rounded-full bg-slate-50 border border-slate-100 text-slate-400 hover:text-primary hover:border-primary hover:bg-white transition-all shadow-sm"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-3 rounded-full bg-slate-50 border border-slate-100 text-slate-400 hover:text-primary hover:border-primary hover:bg-white transition-all shadow-sm"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {properties.map((property) => (
                    <div key={property.id} className="min-w-[85vw] md:min-w-[350px] max-w-[400px] snap-start shrink-0">
                        <PropertyCard {...property} />
                    </div>
                ))}
            </div>
        </div>
    );
}
