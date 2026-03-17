"use client";

import { useState, useEffect } from "react";
import { MapPin, Navigation, Clock, Search, Briefcase, Plus, X, Loader2 } from "lucide-react";

interface SavedPlace {
    id: string;
    label: string;
    address: string;
}

interface CommuteWidgetProps {
    propertyAddress: string;
    propertyLat?: number;
    propertyLng?: number;
}

export function CommuteWidget({ propertyAddress, propertyLat, propertyLng }: CommuteWidgetProps) {
    const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>([]);
    const [newPlaceLabel, setNewPlaceLabel] = useState("");
    const [newPlaceAddress, setNewPlaceAddress] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    
    // Duration in minutes
    const [commuteTimes, setCommuteTimes] = useState<Record<string, number | null>>({});
    const [loadingTimes, setLoadingTimes] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const calculateCommute = async (place: SavedPlace) => {
        setLoadingTimes(prev => ({ ...prev, [place.id]: true }));
        setErrors(prev => ({ ...prev, [place.id]: "" }));
        
        try {
            const params = new URLSearchParams({ origin: place.address });
            
            if (propertyAddress) {
                params.append("dest", propertyAddress);
            }
            if (propertyLat && propertyLng) {
                params.append("destLat", propertyLat.toString());
                params.append("destLng", propertyLng.toString());
            }

            const res = await fetch(`/api/commute?${params.toString()}`);
            if (!res.ok) throw new Error("Could not calculate route");
            
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            
            // Duration is in seconds, convert to minutes
            const minutes = Math.ceil(data.duration / 60);
            setCommuteTimes(prev => ({ ...prev, [place.id]: minutes }));
            
        } catch (err: any) {
            console.error("Commute calculation error:", err);
            setErrors(prev => ({ ...prev, [place.id]: "Unavailable" }));
        } finally {
            setLoadingTimes(prev => ({ ...prev, [place.id]: false }));
        }
    };

    const savePlacesToStorage = (places: SavedPlace[]) => {
        localStorage.setItem("quest_commute_places", JSON.stringify(places));
        setSavedPlaces(places);
    };

    const handleAddPlace = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newPlaceAddress.trim()) return;
        
        const newPlace: SavedPlace = {
            id: Date.now().toString(),
            label: newPlaceLabel.trim() || 'Custom Destination',
            address: newPlaceAddress.trim()
        };
        
        const updated = [...savedPlaces, newPlace].slice(0, 2); // Max 2 places
        savePlacesToStorage(updated);
        
        setIsAdding(false);
        setNewPlaceLabel("");
        setNewPlaceAddress("");
        
        // Calculate immediately after adding
        calculateCommute(newPlace);
    };

    const removePlace = (id: string) => {
        const updated = savedPlaces.filter(p => p.id !== id);
        savePlacesToStorage(updated);
        
        // Cleanup state
        const newTimes = { ...commuteTimes };
        delete newTimes[id];
        setCommuteTimes(newTimes);
    };

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem("quest_commute_places");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setSavedPlaces(parsed);
                // Calculate times for loaded places
                parsed.forEach((place: SavedPlace) => calculateCommute(place));
            } catch (e) {
                console.error("Failed to parse saved places");
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [propertyAddress, propertyLat, propertyLng]);

    return (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mt-8">
            <h4 className="font-heading font-bold text-lg mb-4 text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Your Commute
            </h4>

            <div className="space-y-4">
                {savedPlaces.length === 0 && !isAdding && (
                    <div className="text-sm text-slate-500 bg-slate-50 p-4 rounded-xl text-center">
                        Add a location (like Work or School) to see commute times for this property.
                    </div>
                )}
                
                {/* List of saved commute places */}
                <div className="space-y-3">
                    {savedPlaces.map(place => (
                        <div key={place.id} className="group relative bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="bg-white p-2 rounded-full shadow-sm shrink-0">
                                    <Briefcase className="w-4 h-4 text-slate-600" />
                                </div>
                                <div className="truncate">
                                    <h5 className="font-semibold text-slate-900 text-sm truncate">{place.label}</h5>
                                    <p className="text-xs text-slate-500 truncate">{place.address}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 shrink-0 ml-4">
                                {loadingTimes[place.id] ? (
                                    <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                                ) : errors[place.id] ? (
                                    <span className="text-xs text-red-500 font-medium">N/A</span>
                                ) : commuteTimes[place.id] !== undefined ? (
                                    <div className="text-right">
                                        <span className="block font-bold text-slate-900 text-lg leading-tight">
                                            {commuteTimes[place.id]} <span className="text-sm font-normal text-slate-500">min</span>
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Drive</span>
                                    </div>
                                ) : null}
                                
                                <button 
                                    onClick={() => removePlace(place.id)}
                                    className="p-1 rounded-full text-slate-400 hover:text-red-500 hover:bg-slate-200 transition-colors opacity-0 group-hover:opacity-100 absolute -top-2 -right-2 bg-white border border-slate-200 shadow-sm"
                                    title="Remove this location"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add new place form */}
                {isAdding ? (
                    <form onSubmit={handleAddPlace} className="bg-slate-50 p-4 rounded-2xl space-y-3 border border-slate-200">
                        <div>
                            <input
                                type="text"
                                placeholder="Label (e.g., Work, School)"
                                className="w-full text-sm px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                value={newPlaceLabel}
                                onChange={e => setNewPlaceLabel(e.target.value)}
                                maxLength={30}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Address or Zip Code"
                                className="w-full text-sm px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                value={newPlaceAddress}
                                onChange={e => setNewPlaceAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex gap-2 pt-1">
                            <button 
                                type="submit" 
                                className="flex-1 bg-primary text-white text-sm font-semibold py-2 rounded-xl hover:bg-primary/90 transition-colors"
                            >
                                Save
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setIsAdding(false)}
                                className="flex-1 bg-white border border-slate-200 text-slate-700 text-sm font-semibold py-2 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    savedPlaces.length < 2 && (
                        <button 
                            onClick={() => setIsAdding(true)}
                            className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-primary hover:bg-primary/5 text-slate-500 hover:text-primary transition-all flex items-center justify-center gap-2 text-sm font-semibold"
                        >
                            <Plus className="w-4 h-4" />
                            Add a Commute Location
                        </button>
                    )
                )}
                
                {savedPlaces.length > 0 && (
                    <p className="text-[10px] text-slate-400 text-center uppercase tracking-wider font-semibold">
                        Saved to your profile
                    </p>
                )}
            </div>
        </div>
    );
}
