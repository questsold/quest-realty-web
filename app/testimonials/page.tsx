import { PageHero } from "@/components/ui/PageHero";
import { Star, Quote } from "lucide-react";
import { getZillowReviews } from "@/lib/zillow";

export default async function TestimonialsPage() {
    const reviews = await getZillowReviews();

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
                            <span className="font-bold text-blue-900">4.9</span>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                            </div>
                            <span className="text-slate-600 font-medium">Top Rated on Zillow</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.length > 0 ? (
                            reviews.map((review, idx) => (
                                <div key={review.ReviewId || idx} className="bg-slate-50 rounded-2xl p-8 relative flex flex-col hover:shadow-xl transition-shadow border border-slate-100 group">
                                    <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />

                                    <div className="flex gap-1 mb-6">
                                        {[...Array(Math.floor(review.Rating || 5))].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>

                                    <p className="text-slate-700 leading-relaxed mb-8 italic relative z-10 break-words whitespace-pre-wrap">
                                        "{review.Description}"
                                    </p>

                                    <div className="mt-auto border-t border-slate-200 pt-6">
                                        <h4 className="font-bold text-slate-900 truncate">
                                            {review.ReviewerFullName || review.ReviewerScreenName || "Quest Client"}
                                        </h4>
                                        <div className="flex flex-col mt-1">
                                            <p className="text-sm text-primary font-medium truncate">
                                                {review.FreeFormLocation || review.ServiceProviderDesc || "Real Estate Services"}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1">
                                                {review.ReviewDate ? new Date(review.ReviewDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ""}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-slate-500 py-12">
                                Loading reviews... (Or no reviews found)
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </main>
    );
}
