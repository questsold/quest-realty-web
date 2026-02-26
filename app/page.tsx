"use client";
import { Hero } from "@/components/ui/Hero";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ value, suffix = "", prefix = "", duration = 2 }: { value: number; suffix?: string, prefix?: string, duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const displayValue = useTransform(springValue, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

export default function Home() {
  const featuredProperties = [
    {
      id: "1",
      address: "1042 Waddington Rd",
      city: "Birmingham, MI",
      price: "$1,850,000",
      beds: 5,
      baths: 4.5,
      sqft: "4,200",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "New Listing"
    },
    {
      id: "2",
      address: "821 Rivenoak Ave",
      city: "Birmingham, MI",
      price: "$899,000",
      beds: 3,
      baths: 3,
      sqft: "2,100",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "Active"
    },
    {
      id: "3",
      address: "4550 Walnut Lake Rd",
      city: "Bloomfield Hills, MI",
      price: "$2,100,000",
      beds: 5,
      baths: 6,
      sqft: "6,500",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "Coming Soon"
    }
  ];

  return (
    <>
      <Hero />

      {/* The Quest Realty Difference Section */}
      <section className="py-32 bg-white" id="About">
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
              <div className="mt-12 flex flex-wrap gap-6">
                <Link href="/about-us" className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
                  Why we&apos;re different <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/our-team" className="border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-all">
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
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
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

      {/* Handpicked Listings */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-bold">Discover</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 leading-tight">
                Handpicked Listings
              </h3>
            </div>
            <Link href="/properties" className="group flex items-center gap-2 text-slate-900 font-bold hover:text-primary transition-all">
              View Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProperties.map((property, idx) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <PropertyCard {...property} />
              </motion.div>
            ))}
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
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Upsizing",
                desc: "Ready for more space? We specialize in seamless transitions to your next dream home.",
                link: "/properties",
                image: "https://images.unsplash.com/photo-1600607687931-cebfad2114ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.3em] text-primary mb-4 font-bold">Discover Hidden Local Gems</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-slate-900">Communities</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Birmingham", slug: "birmingham", count: 42, image: "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
              { name: "Bloomfield Hills", slug: "bloomfield-hills", count: 28, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
              { name: "Troy", slug: "troy", count: 35, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
            ].map((city, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative h-72 rounded-3xl overflow-hidden group cursor-pointer"
              >
                <img src={city.image} alt={city.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                  <h4 className="text-2xl font-bold text-white mb-2">{city.name}</h4>
                  <p className="text-white/70 text-sm font-medium">{city.count} ACTIVE LISTINGS</p>
                </div>
                <Link href={`/communities/${city.slug}`} className="absolute inset-0 z-10" />
              </motion.div>
            ))}
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
    </>
  );
}
