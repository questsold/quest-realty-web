import { PageHero } from "@/components/ui/PageHero";
import { Star, Quote } from "lucide-react";
import { allReviews } from "@/lib/data/reviews_data";

export default function TestimonialsPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <PageHero
                title="Client Success Stories"
                description="Don't just take our word for it. Hear from the families we've helped."
                imageUrl="https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            />

            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">

                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Proven Results</h2>
                        <h3 className="text-4xl font-heading font-bold text-slate-900 mb-6">Experience the Quest Difference</h3>
                        <div className="flex justify-center items-center gap-2 mb-6 cursor-pointer hover:scale-105 transition-transform bg-blue-50 w-fit mx-auto px-6 py-3 rounded-full border border-blue-100">
                            <span className="font-bold text-blue-900">5.0</span>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                            </div>
                            <span className="text-slate-600 font-medium">Over 500+ Zillow Reviews</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allReviews.map((review, idx) => (
                            <div key={idx} className="bg-slate-50 rounded-2xl p-8 relative flex flex-col hover:shadow-xl transition-shadow border border-slate-100 group">
                                <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />

                                <div className="flex gap-1 mb-6">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-slate-700 leading-relaxed mb-8 italic relative z-10">"{review.text}"</p>

                                <div className="mt-auto border-t border-slate-200 pt-6">
                                    <h4 className="font-bold text-slate-900">{review.name}</h4>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-sm text-primary font-medium">{review.location} — {review.agent}</p>
                                        <p className="text-xs text-slate-400">{review.date}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors inline-block">
                            Load More Reviews
                        </button>
                    </div>

                </div>
            </section>
        </main>
    );
}
