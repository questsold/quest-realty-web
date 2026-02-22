"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
    title: string;
    imageAlt: string;
    imageUrl?: string;
    eyebrow?: string;
    description?: string;
}

export function PageHero({ title, imageAlt, imageUrl, eyebrow, description }: PageHeroProps) {
    const defaultImage = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80";

    return (
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 z-0">
                <img
                    src={imageUrl || defaultImage}
                    alt={imageAlt}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/50" />
            </div>

            <div className="container relative z-10 px-6 mx-auto flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    {eyebrow && (
                        <div className="text-sm md:text-base uppercase tracking-[0.2em] font-medium text-white mb-4">
                            {eyebrow}
                        </div>
                    )}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tight text-white m-0 leading-tight">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-8 text-lg md:text-xl text-white/90 leading-relaxed font-medium">
                            {description}
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
