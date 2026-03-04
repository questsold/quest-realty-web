import { PageHero } from "@/components/ui/PageHero";
import ElfsightReviews from "@/components/widgets/ElfsightReviews";

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
                        <p className="text-slate-600 text-lg">We pride ourselves on the relationships we build and the successful outcomes we deliver for our clients.</p>
                    </div>

                    <div className="bg-slate-50 rounded-[2.5rem] p-4 md:p-12 border border-slate-100">
                        <ElfsightReviews />
                    </div>

                </div>
            </section>
        </main>
    );
}
