import { PageHero } from "@/components/ui/PageHero";
import { Calendar, User, ArrowRight, TrendingUp } from "lucide-react";

export default function BlogPage() {
    const categories = ["All", "Market Updates", "Home Buying", "Home Selling", "Local Life"];

    const posts = [
        {
            id: 1,
            title: "How to Navigate the 2026 Metro Detroit Housing Market",
            excerpt: "Expert tips on what buyers and sellers can expect from interest rates, inventory levels, and neighborhood trends this year.",
            category: "Market Updates",
            image: "/images/hero-modern-house.png",
            date: "Feb 15, 2026",
            author: "Ali Berry",
            featured: true
        },
        {
            id: 2,
            title: "Top 5 Neighborhoods for First-Time Buyers in Oakland County",
            excerpt: "Discover the hidden gems offering the best mix of affordability, community amenities, and future appreciation potential.",
            category: "Home Buying",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "Jan 28, 2026",
            author: "Drew Knobloch"
        },
        {
            id: 3,
            title: "Preparing Your Home for a Spring Sale: A Checklist",
            excerpt: "Maximize your home's value and appeal to buyers with these essential spring cleaning and staging tips.",
            category: "Home Selling",
            image: "https://images.unsplash.com/photo-1583608205712-bea72456202e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "Jan 12, 2026",
            author: "Matthew Berney"
        },
        {
            id: 4,
            title: "The Best Coffee Shops in Downtown Birmingham",
            excerpt: "A local's guide to finding the perfect cup of coffee and the best places to work remotely in the downtown area.",
            category: "Local Life",
            image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "Dec 05, 2025",
            author: "Brittany Valensky"
        },
        {
            id: 5,
            title: "Understanding Closing Costs in Michigan",
            excerpt: "A comprehensive breakdown of the fees associated with closing on a home so you know exactly what to expect at the table.",
            category: "Home Buying",
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "Nov 18, 2025",
            author: "Billy Miller"
        },
        {
            id: 6,
            title: "Luxury Real Estate Trends in Bloomfield Hills",
            excerpt: "What high-end buyers are prioritizing this year, from smart home tech to multi-generational living spaces.",
            category: "Market Updates",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "Nov 02, 2025",
            author: "Ali Berry"
        }
    ];

    const featuredPost = posts.find((p) => p.featured);
    const regularPosts = posts.filter((p) => !p.featured);

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHero
                title="Real Estate Insights"
                description="Market trends, local guides, and expert advice for navigating Metro Detroit real estate."
                imageUrl="https://images.unsplash.com/photo-1450101499163-c8848c66cb85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            />

            <section className="py-24">
                <div className="container mx-auto px-6 max-w-7xl">

                    {/* Categories Bar */}
                    <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-16 pb-2 border-b border-slate-200">
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                className={`px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${i === 0 ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Featured Post */}
                    {featuredPost && (
                        <div className="mb-20">
                            <h2 className="flex items-center gap-2 text-sm font-bold tracking-widest text-primary uppercase mb-6">
                                <TrendingUp className="w-5 h-5" /> Featured Story
                            </h2>
                            <div className="group grid lg:grid-cols-2 gap-8 lg:gap-16 items-center bg-white rounded-3xl p-4 md:p-8 shadow-xl border border-slate-100 transition-all hover:shadow-2xl cursor-pointer">
                                <div className="relative h-64 sm:h-80 lg:h-full min-h-[300px] overflow-hidden rounded-2xl">
                                    <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md text-white px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
                                        {featuredPost.category}
                                    </div>
                                    <img
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="py-6 lg:py-12 pr-6">
                                    <div className="flex gap-4 text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {featuredPost.date}</span>
                                        <span className="flex items-center gap-1"><User className="w-4 h-4" /> {featuredPost.author}</span>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900 mb-6 group-hover:text-primary transition-colors">
                                        {featuredPost.title}
                                    </h3>
                                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                        {featuredPost.excerpt}
                                    </p>
                                    <span className="inline-flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all pb-1 border-b-2 border-transparent group-hover:border-primary">
                                        Read Full Article <ArrowRight className="w-5 h-5" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Recent Posts Grid */}
                    <div>
                        <h2 className="text-2xl font-heading font-bold text-slate-900 mb-8 pb-4 border-b border-slate-200">Latest Articles</h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {regularPosts.map((post) => (
                                <div key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all cursor-pointer flex flex-col">
                                    <div className="relative h-56 overflow-hidden">
                                        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                                            {post.category}
                                        </div>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex gap-4 text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider border-b border-slate-100 pb-4">
                                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                                            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.author}</span>
                                        </div>
                                        <h4 className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h4>
                                        <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3 flex-1">
                                            {post.excerpt}
                                        </p>
                                        <span className="inline-flex items-center gap-1 text-sm font-bold text-slate-900 group-hover:text-primary transition-colors mt-auto">
                                            Read Article <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <button className="px-8 py-4 border-2 border-slate-200 bg-white text-slate-700 rounded-full font-bold hover:bg-slate-50 transition-colors inline-block uppercase tracking-wider text-sm">
                                Load More Articles
                            </button>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
