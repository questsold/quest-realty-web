"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Search", href: "/properties" },
        { name: "Buyers", href: "/buyers" },
        { name: "Sellers", href: "/sellers" },
        { name: "Communities", href: "/communities" },
        { name: "About", href: "/about-us" },
        { name: "Team", href: "/our-team" },
        { name: "Blog", href: "/blog" },
    ];

    return (
        <motion.header
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md border-b shadow-sm py-4 text-zinc-900" : "bg-transparent py-6 text-white"}`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <img
                        src="https://assets.thesparksite.com/uploads/templates/header-q-2/Quest-Logo-gradient-white-250xAUTO.fit.png"
                        alt="Quest Realty White Logo"
                        className={`absolute h-10 w-auto object-contain transition-opacity duration-300 ${isScrolled ? "opacity-0 invisible" : "opacity-100 visible"}`}
                    />
                    <img
                        src="/quest-logo-dark.png"
                        alt="Quest Realty Dark Logo"
                        className={`h-10 w-auto object-contain transition-opacity duration-300 ${isScrolled ? "opacity-100 visible" : "opacity-0 invisible"}`}
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 items-center font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="hover:opacity-70 transition-opacity"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className={`px-6 py-2.5 rounded-full font-medium transition-all ${isScrolled ? "bg-primary text-white hover:bg-primary/90" : "bg-white text-secondary hover:bg-white/90"}`}
                    >
                        Contact Us
                    </Link>
                </nav>

                {/* Mobile Nav Toggle */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="fixed inset-0 bg-secondary z-50 flex flex-col p-6 text-white"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                                <img
                                    src="https://assets.thesparksite.com/uploads/templates/header-q-2/Quest-Logo-gradient-white-250xAUTO.fit.png"
                                    alt="Quest Realty Logo"
                                    className="h-10 w-auto object-contain"
                                />
                            </Link>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-6 text-2xl font-heading">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="line border-t my-4" />
                            <Link
                                href="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="bg-primary text-white text-center rounded-full py-4 text-lg font-medium"
                            >
                                Let's Talk
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
