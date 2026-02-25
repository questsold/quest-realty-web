import { MapPin, Bed, Bath, Square, ArrowRight } from "lucide-react";
import Link from "next/link";

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

export function PropertyCard({ id, address, city, price, beds, baths, sqft, image, status = "Active" }: PropertyCardProps) {
    return (
        <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full">
            {/* Image Wrapper */}
            <div className="relative h-[280px] overflow-hidden">
                <img
                    src={image}
                    alt={address}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                        {status}
                    </span>
                </div>

                {/* Price Overlay */}
                <div className="absolute bottom-4 left-4">
                    <div className="bg-primary text-white px-4 py-2 rounded-xl font-bold shadow-lg">
                        {price}
                    </div>
                </div>

                {/* Hover Action */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-95 group-hover:scale-100">
                    <Link
                        href={`/listing/${id}`}
                        className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-slate-900 hover:text-white transition-all shadow-xl"
                    >
                        View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Content Wrapper */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h4 className="text-xl font-heading font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors truncate">
                        {address}
                    </h4>
                    <p className="text-slate-500 text-sm flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {city}
                    </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-5 mt-auto">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-slate-400">
                            <Bed className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Beds</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">{beds}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-x border-slate-100 px-4">
                        <div className="flex items-center gap-1.5 text-slate-400">
                            <Bath className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Baths</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">{baths}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-slate-400">
                            <Square className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Sqft</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">{sqft}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
