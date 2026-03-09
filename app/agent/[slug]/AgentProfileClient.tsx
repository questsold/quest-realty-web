"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Star, MoveDown, MapPin } from "lucide-react";
import AgentContactForm from "./AgentContactForm";
import Link from 'next/link';
import { Counter } from "@/components/ui/Counter";

const Hero = ({ agent }: { agent: any }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    // Create a circular monogram with the agent's initials
    const monogram = agent.name.split(' ').map((n: string) => n.charAt(0)).join('');

    return (
        <div ref={ref} className="relative h-screen min-h-[700px] overflow-hidden bg-zinc-950 font-sans">
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-black/30 z-10" />
                {/* Gradient overlay for text legibility like moderngroupre */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10" />
                {agent.heroVideo ? (
                    <video
                        src={agent.heroVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover origin-center"
                    />
                ) : (
                    <img
                        src={agent.heroImage}
                        alt="Hero"
                        className="w-full h-full object-cover origin-center scale-[1.02] animate-slow-pan"
                    />
                )}
            </motion.div>

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 mt-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="mb-8"
                >
                    {/* Minimalist Circular Logo */}
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-[1.5px] border-white flex items-center justify-center mx-auto hover:bg-white/5 transition-colors duration-500">
                        <span className="text-white text-4xl md:text-5xl font-light tracking-tighter">
                            {monogram}
                        </span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.2em] uppercase mb-4"
                >
                    {agent.name}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-white/80 text-[10px] md:text-sm uppercase tracking-[0.4em] font-medium"
                >
                    QUEST REALTY
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="flex flex-col items-center gap-4 text-white hover:text-white/70 transition-colors cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                    <MoveDown className="w-6 h-6 animate-bounce opacity-70" strokeWidth={1.5} />
                </div>
            </motion.div>
        </div>
    );
};

const AboutSection = ({ agent }: { agent: any }) => {
    return (
        <section id="about" className="pt-32 pb-16 md:pt-48 md:pb-20 px-6 bg-white z-20 relative font-sans">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">

                <div className="w-full lg:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="relative p-6 md:p-12 border-[10px] border-zinc-100"
                    >
                        {/* Decorative slash corner */}
                        <div className="absolute -top-4 -left-4 w-8 h-8 bg-white border-t-2 border-l-2 border-black" />
                        <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-white border-b-2 border-r-2 border-black" />

                        <div className="aspect-[4/5] relative overflow-hidden bg-zinc-100">
                            <img
                                src={agent.image}
                                alt={agent.name}
                                className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 hover:grayscale-0 hover:scale-105 hover:opacity-100"
                            />
                        </div>
                    </motion.div>
                </div>

                <div className="w-full lg:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-[2px] bg-black" />
                            <h2 className="text-black uppercase tracking-[0.3em] text-xs font-bold">The Advisor</h2>
                        </div>

                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 mb-10 tracking-tight leading-none uppercase">
                            Delivering<br />Exceptional<br />Results.
                        </h3>

                        <div className="space-y-6">
                            {agent.bio.map((p: string, i: number) => (
                                <p key={i} className="text-zinc-600 text-base md:text-lg font-light leading-relaxed">
                                    {p}
                                </p>
                            ))}
                        </div>

                        {agent.stats && (
                            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-zinc-200 pt-12">
                                {agent.stats.map((stat: any, i: number) => {
                                    const match = typeof stat.value === 'string' ? stat.value.match(/^(\D*?)(\d+)(\D*)$/) : null;
                                    return (
                                        <div key={i}>
                                            <div className="text-3xl md:text-4xl font-bold text-black mb-2 tracking-tighter">
                                                {match ? (
                                                    <Counter value={Number(match[2])} prefix={match[1]} suffix={match[3]} delay={0.8} />
                                                ) : (
                                                    stat.value
                                                )}
                                            </div>
                                            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-zinc-500">{stat.label}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}

                        <div className="mt-16">
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group flex items-center gap-4 uppercase text-[11px] tracking-[0.3em] font-bold text-black"
                            >
                                <span className="text-zinc-400 font-light text-sm">/</span>
                                <span className="group-hover:translate-x-2 transition-transform duration-300">Contact {agent.name.split(' ')[0]}</span>
                                <span className="text-zinc-400 font-light text-sm">/</span>
                            </button>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

const ReviewsSection = ({ reviews }: { reviews: any[] }) => {
    if (!reviews || reviews.length === 0) return null;

    return (
        <section id="reviews" className="py-24 md:py-32 px-6 bg-zinc-50 relative font-sans">
            {/* Ghosted Monogram Background */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <span className="text-[40vw] text-zinc-100 font-bold select-none whitespace-nowrap opacity-50">
                    REVIEWS
                </span>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-black uppercase tracking-[0.3em] text-xs font-bold mb-6">Client Experiences</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight uppercase">
                        Testimonials.
                    </h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.slice(0, 6).map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="bg-white p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-zinc-100 flex flex-col h-full group hover:-translate-y-2 transition-transform duration-500"
                        >
                            <div className="flex gap-1 mb-8">
                                {[...Array(Math.floor(review.Rating || 5))].map((_, idx) => (
                                    <Star key={idx} className="w-4 h-4 text-black fill-black" />
                                ))}
                            </div>
                            <p className="text-zinc-600 text-sm md:text-base leading-relaxed font-light mb-10 flex-grow">
                                "{review.Description}"
                            </p>
                            <div className="mt-auto border-t border-zinc-100 pt-6">
                                <p className="text-black tracking-[0.2em] text-[10px] md:text-xs uppercase font-bold mb-1 truncate">
                                    {review.ReviewerFullName || review.ReviewerScreenName || "Valued Client"}
                                </p>
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <MapPin className="w-3 h-3" />
                                    <p className="tracking-[0.2em] text-[8px] uppercase font-semibold truncate">
                                        {review.FreeFormLocation || "Metro Detroit"}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ContactSection = ({ agent }: { agent: any }) => {
    return (
        <section id="contact" className="py-32 md:py-48 px-6 bg-zinc-950 text-white font-sans border-t-[8px] border-zinc-900">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-20">
                    <div className="w-full lg:w-5/12">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-[2px] bg-white" />
                            <h2 className="text-white uppercase tracking-[0.3em] text-xs font-bold">Inquiries</h2>
                        </div>

                        <h3 className="text-5xl lg:text-6xl font-black text-white mb-12 tracking-tight uppercase leading-none">
                            Connect<br />With Us.
                        </h3>

                        <div className="space-y-12">
                            <div>
                                <h4 className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-3">Direct Line</h4>
                                <a href={`tel:${agent.phone.replace(/[^0-9]/g, '')}`} className="text-white text-2xl font-light hover:text-zinc-400 transition-colors">
                                    {agent.phone}
                                </a>
                            </div>
                            <div>
                                <h4 className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-3">Email</h4>
                                <a href={`mailto:${agent.email}`} className="text-white text-lg font-light hover:text-zinc-400 transition-colors">
                                    {agent.email}
                                </a>
                            </div>
                        </div>

                        <div className="mt-20">
                            <div className="w-full h-[1px] bg-zinc-800 mb-8" />
                            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-semibold">
                                &copy; {new Date().getFullYear()} {agent.name.toUpperCase()}. ALL RIGHTS RESERVED.
                            </p>
                        </div>
                    </div>

                    <div className="w-full lg:w-7/12 lg:pl-10">
                        <AgentContactForm agentName={agent.name} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function AgentProfileClient({ agent, reviews }: { agent: any, reviews: any[] }) {
    return (
        <div className="bg-[#0f0f0f] mb-0 overflow-x-hidden selection:bg-white selection:text-black">
            <style jsx global>{`
                @keyframes slow-pan {
                    0% { transform: scale(1.02) translate(0, 0); }
                    50% { transform: scale(1.05) translate(-1%, 1%); }
                    100% { transform: scale(1.02) translate(0, 0); }
                }
                .animate-slow-pan {
                    animation: slow-pan 30s ease-in-out infinite alternate;
                }
            `}</style>
            <Hero agent={agent} />
            <AboutSection agent={agent} />
            <ReviewsSection reviews={reviews} />
            <ContactSection agent={agent} />
        </div>
    );
}
