import { PageHero } from "@/components/ui/PageHero";
import { Star, Quote } from "lucide-react";

export default function TestimonialsPage() {
    const reviews = [
        {
            id: 1,
            name: "Sarah & Mike T.",
            location: "Birmingham",
            text: "Working with Quest Realty was an absolute dream. Our agent was incredibly knowledgeable about the Birmingham market and helped us navigate a multiple-offer situation with ease. We secured our dream home and couldn't be happier!",
            rating: 5,
            date: "October 2025"
        },
        {
            id: 2,
            name: "David L.",
            location: "Bloomfield Hills",
            text: "I was extremely impressed by the level of professionalism and marketing expertise the Quest team brought to selling my home. From the stunning photography to the strategic pricing, they delivered results beyond my expectations.",
            rating: 5,
            date: "August 2025"
        },
        {
            id: 3,
            name: "Emily R.",
            location: "Royal Oak",
            text: "As a first-time homebuyer, I was nervous about the process, but my Quest advisor was patient, transparent, and always available to answer my questions. They made what could have been a stressful experience incredibly smooth and exciting.",
            rating: 5,
            date: "June 2025"
        },
        {
            id: 4,
            name: "James & Olivia W.",
            location: "Troy",
            text: "The communication from start to finish was flawless. We always felt like a priority, and their negotiation skills saved us thousands at the closing table. Highly recommend Quest Realty to anyone looking to buy in Metro Detroit.",
            rating: 5,
            date: "April 2025"
        },
        {
            id: 5,
            name: "The Martinez Family",
            location: "Rochester Hills",
            text: "We relocated from out of state and relied heavily on our Quest agent's local expertise. They took the time to understand exactly what our family needed and found us the perfect home in a great school district.",
            rating: 5,
            date: "January 2025"
        },
        {
            id: 6,
            name: "Robert H.",
            location: "Clarkston",
            text: "I've bought and sold over five properties in my lifetime, and my experience with Quest Realty was by far the best. Their market insight, responsiveness, and problem-solving abilities are unmatched in the industry.",
            rating: 5,
            date: "November 2024"
        }
    ];

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
                        {reviews.map((review) => (
                            <div key={review.id} className="bg-slate-50 rounded-2xl p-8 relative hover:shadow-xl transition-shadow border border-slate-100 group">
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
                                        <p className="text-sm text-primary font-medium">{review.location}</p>
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
