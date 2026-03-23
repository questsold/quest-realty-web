"use client";

import { Hero } from "@/components/ui/Hero";
import { ExclusiveListings } from "@/components/ui/ExclusiveListings";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { ArrowRight, ChevronLeft, ChevronRight, Users, Building2, BarChart3, CircleDollarSign } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { Counter } from "@/components/ui/Counter";
import { getZillowReviews, ZillowReview } from "@/lib/zillow";

export default function Home() {
  const [reviews, setReviews] = useState<ZillowReview[]>([]);

  useEffect(() => {
    async function loadReviews() {
      const data = await getZillowReviews();
      setReviews(data);
    }
    loadReviews();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Hero />

      {/* Exclusive Listings Carousel */}
      <ExclusiveListings />

      {/* The Quest Realty Difference Section */}
      <section className="pt-12 pb-32 bg-white" id="About">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm uppercase tracking-[0.2em] text-primary mb-4 font-extrabold text-stroke">Discover</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-slate-900 leading-tight">
                The Quest Realty Difference
              </h3>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Quest Realty stands as a top-producing Realtor in Metro Detroit, committed to achieving swift, successful transactions. By combining aggressive digital marketing, precise demographic targeting, and a team of dedicated agents, Quest Realty ensures your property reaches qualified buyers immediately.
                </p>
                <p>
                  With transparency at every stage and proactive customer support, Quest Realty keeps you informed from the first lead through the closing table. Trust Quest Realty to leverage cutting-edge technology and in-depth market research to maximize demand and secure the best possible outcome for your home.
                </p>
              </div>
              <div className="mt-8 md:mt-12 flex flex-col md:flex-row gap-4 md:gap-6 text-center">
                <Link href="/about-us" className="bg-primary text-white px-10 py-5 rounded-full font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-lg shadow-xl shadow-primary/20">
                  Why we&apos;re different <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/our-team" className="border-2 border-slate-900 text-slate-900 px-10 py-5 rounded-full font-bold hover:bg-slate-100 transition-all text-center text-lg">
                  Our agents
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/hero-modern-house.png"
                  alt="Luxury Home Detail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-primary p-10 rounded-3xl text-white shadow-2xl hidden md:block border-8 border-white">
                <div className="text-4xl font-bold mb-1">Top 1%</div>
                <div className="text-sm font-medium uppercase tracking-widest opacity-80 uppercase">Nationwide</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Matters - Stats Section */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.3em] text-primary mb-4 font-bold">Experience Matters</h2>
            <h3 className="text-3xl md:text-5xl font-heading font-bold text-white">Why Clients Choose Us</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-5xl lg:text-7xl font-heading font-bold text-primary mb-4">
                <Counter value={1} suffix="%" />
              </div>
              <div className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-2">Nationwide</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Top Realtors</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl lg:text-7xl font-heading font-bold text-primary mb-4">
                <Counter value={920} prefix="$" suffix="M+" />
              </div>
              <div className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-2">Closed Volume</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Over $920M+ Million</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-5xl lg:text-7xl font-heading font-bold text-primary mb-4">
                <Counter value={3800} suffix="+" />
              </div>
              <div className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-2">Properties Sold</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Over 3,800+ Transactions</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who You Work With Matters! */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-sm uppercase tracking-[0.3em] text-primary mb-4 font-bold">Who You Work With</h2>
          <h3 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-20">Matters!</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Buying",
                desc: "Your journey to the perfect home starts with expert guidance and exclusive access.",
                link: "/buyers",
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Selling",
                desc: "Maximize your home's value with our innovative marketing and strategic negotiation.",
                link: "/sellers",
                image: "/images/hero-modern-house.png"
              },
              {
                title: "Invest",
                desc: "Build your wealth with our expert insights into high-yield real estate investments.",
                link: "/properties",
                image: "https://images.unsplash.com/photo-1554585371-9ed98c579632?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl aspect-[4/5] flex flex-col justify-end p-8 text-left"
              >
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/60 transition-colors z-10" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="relative z-20">
                  <h4 className="text-3xl font-bold text-white mb-4">{item.title}</h4>
                  <p className="text-white/80 mb-6 line-clamp-2">{item.desc}</p>
                  <Link href={item.link} className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Communities Section */}
      <section className="py-32 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm uppercase tracking-[0.3em] text-primary mb-4 font-bold">Discover Hidden Local Gems</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-slate-900">Communities</h3>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('communities-slider');
                  if (el) el.scrollBy({ left: -400, behavior: 'smooth' });
                }}
                className="p-4 rounded-full border-2 border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-all bg-white shadow-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('communities-slider');
                  if (el) el.scrollBy({ left: 400, behavior: 'smooth' });
                }}
                className="p-4 rounded-full border-2 border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-all bg-white shadow-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div
            id="communities-slider"
            className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[
              { name: "Troy", slug: "troy", image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/troy-500x360.png", stats: { pop: "87,294", rentOwn: "28/72", avgPrice: "$475,000", recentSales: "412" } },
              { name: "Birmingham", slug: "birmingham", image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/birmingham-500x360.png", stats: { pop: "21,813", rentOwn: "25/75", avgPrice: "$850,000", recentSales: "185" } },
              { name: "Bloomfield Hills", slug: "bloomfield-hills", image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/bloomfield-hills-500x360.png", stats: { pop: "4,460", rentOwn: "9/91", avgPrice: "$1,200,000", recentSales: "45" } },
              { name: "Rochester Hills", slug: "rochester-hills", image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/rochester-hills-500x360.png", stats: { pop: "76,300", rentOwn: "22/78", avgPrice: "$510,000", recentSales: "350" } },
              { name: "Royal Oak", slug: "royal-oak", image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/royal-oak-500x360.png", stats: { pop: "58,211", rentOwn: "35/65", avgPrice: "$395,000", recentSales: "420" } },
              { name: "Clarkston", slug: "clarkston", image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/clarkston-500x360.png", stats: { pop: "47,765", rentOwn: "17/83", avgPrice: "$444,611", recentSales: "265" } },
              { name: "Waterford", slug: "waterford", image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/bloomfield-hills-500x360.png", stats: { pop: "70,565", rentOwn: "29/71", avgPrice: "$315,000", recentSales: "380" } },
            ].map((community, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="min-w-[300px] md:min-w-[400px] snap-start"
              >
                <Link
                  href={`/communities/${community.slug}`}
                  className="group relative aspect-[500/360] bg-zinc-900 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block rounded-3xl"
                >
                  {/* Background Image Layer */}
                  <div className="absolute inset-0 z-0 bg-zinc-200">
                    <img
                      src={community.image}
                      alt={`${community.name} Map`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Overlay Layers */}
                  <div className="absolute inset-0 bg-slate-900/40 z-10 transition-colors duration-300 group-hover:bg-zinc-950/95" />

                  {/* Default State */}
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                    <h3 className="text-4xl font-heading font-medium text-white">{community.name}</h3>
                    <span className="text-sm font-medium text-white tracking-widest mt-4 bg-primary/80 px-6 py-2 rounded-full backdrop-blur-sm">View Guide</span>
                  </div>

                  {/* Hover State Data Overlay */}
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="w-full">
                      <div className="flex justify-between w-full mb-8">
                        <div className="flex flex-col items-center text-center w-1/2">
                          <Users className="w-8 h-8 text-primary mb-3" />
                          <span className="text-[10px] font-bold text-white tracking-widest uppercase mb-1">Population</span>
                          <span className="text-sm font-medium text-white">{community.stats.pop}</span>
                        </div>
                        <div className="flex flex-col items-center text-center w-1/2">
                          <Building2 className="w-8 h-8 text-primary mb-3" />
                          <span className="text-[10px] font-bold text-white tracking-widest uppercase mb-1">Rent vs Own</span>
                          <span className="text-sm font-medium text-white">{community.stats.rentOwn}</span>
                        </div>
                      </div>

                      <div className="flex justify-center mb-8">
                        <div className="bg-zinc-800 border border-zinc-700 text-white text-[10px] px-4 py-1 rounded tracking-widest uppercase font-bold">
                          {community.name}
                        </div>
                      </div>

                      <div className="flex justify-between w-full">
                        <div className="flex flex-col items-center text-center w-1/2">
                          <BarChart3 className="w-8 h-8 text-primary mb-3" />
                          <span className="text-[10px] font-bold text-white tracking-widest uppercase mb-1">Avg Price</span>
                          <span className="text-sm font-medium text-white">{community.stats.avgPrice}</span>
                        </div>
                        <div className="flex flex-col items-center text-center w-1/2">
                          <CircleDollarSign className="w-8 h-8 text-primary mb-3" />
                          <span className="text-[10px] font-bold text-white tracking-widest uppercase mb-1">Recent Sales</span>
                          <span className="text-sm font-medium text-white">{community.stats.recentSales}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Reviews Section */}
      <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl text-left">
              <h2 className="text-sm uppercase tracking-[0.3em] text-primary mb-4 font-bold">What Our Clients Say</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-white">Client Reviews</h3>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('reviews-slider');
                  if (el) el.scrollBy({ left: -400, behavior: 'smooth' });
                }}
                className="p-4 rounded-full border-2 border-slate-800 text-slate-400 hover:text-primary hover:border-primary transition-all bg-slate-900 shadow-xl"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('reviews-slider');
                  if (el) el.scrollBy({ left: 400, behavior: 'smooth' });
                }}
                className="p-4 rounded-full border-2 border-slate-800 text-slate-400 hover:text-primary hover:border-primary transition-all bg-slate-900 shadow-xl"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div
            id="reviews-slider"
            className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.slice(0, 6).map((review: any, idx) => (
              <motion.div
                key={review.ReviewId || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="min-w-[300px] md:min-w-[450px] snap-start"
              >
                <div className="h-full bg-slate-900 border border-slate-800 p-8 md:p-12 rounded-[2rem] relative group hover:border-primary/30 transition-all flex flex-col">
                  <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/5 group-hover:text-primary/10 transition-colors" />

                  <div className="flex gap-1 mb-6">
                    {[...Array(Math.floor(review.Rating || 5))].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl text-slate-300 leading-relaxed italic mb-10 overflow-hidden line-clamp-4">"{review.Description}"</p>

                  <div className="mt-auto flex gap-4 items-center justify-between">
                    <div className="flex flex-col min-w-0 flex-1 pr-4">
                      <h4 className="font-bold text-white text-lg truncate">
                        {review.ReviewerFullName || review.ReviewerScreenName || "Quest Client"}
                      </h4>
                      <p className="text-primary font-medium text-sm truncate">
                        {review.FreeFormLocation || review.ServiceProviderDesc || "Real Estate Services"}
                      </p>
                    </div>
                    <div className="flex-shrink-0 w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-primary font-bold uppercase">
                      {(review.ReviewerFullName || review.ReviewerScreenName || "Q").charAt(0)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold uppercase tracking-widest text-sm"
            >
              View More Success Stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ready to Move Forward? CTA Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm uppercase tracking-[0.4em] text-primary mb-6 font-extrabold">Are You</h2>
            <h3 className="text-5xl md:text-7xl font-heading font-bold text-slate-900 mb-10">Ready to move forward?</h3>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-primary text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all hover:scale-105"
            >
              Connect With Us <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
