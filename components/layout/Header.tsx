"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    const forceDarkHeader = pathname === "/properties" || pathname?.startsWith("/listing/");
    const isDarkTheme = isScrolled || forceDarkHeader;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        handleScroll(); // Check on mount
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    const navItems = [
        {
            name: "Buyers",
            href: "/buyers",
            dropdown: [
                { name: "Search Homes", href: "/properties" },
                { name: "Buyer Overview", href: "/buyers" },
                { name: "Neighborhood Guides", href: "/communities" },
            ]
        },
        {
            name: "Sellers",
            href: "/sellers",
            dropdown: [
                { name: "Home Valuation", href: "/home-valuation" },
                { name: "Seller Overview", href: "/sellers" },
                { name: "Market Reports", href: "/blog" },
            ]
        },
        { name: "Communities", href: "/communities" },
        {
            name: "About",
            href: "/about-us",
            dropdown: [
                { name: "Our Team", href: "/our-team" },
                { name: "Client Testimonials", href: "/testimonials" },
                { name: "Real Estate Blog", href: "/blog" },
                { name: "About Quest Realty", href: "/about-us" },
            ]
        },
    ];

    return (
        <>
        <motion.header
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isDarkTheme ? "bg-white/95 backdrop-blur-md border-b shadow-sm py-3 text-zinc-900" : "bg-transparent py-5 text-white"}`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <img
                        src="https://assets.thesparksite.com/uploads/templates/header-q-2/Quest-Logo-gradient-white-250xAUTO.fit.png"
                        alt="Quest Realty White Logo"
                        className={`absolute h-8 md:h-10 w-auto object-contain transition-opacity duration-300 ${isDarkTheme ? "opacity-0 invisible" : "opacity-100 visible"}`}
                    />
                    <img
                        src="/quest-logo-dark.png"
                        alt="Quest Realty Dark Logo"
                        className={`h-8 md:h-10 w-auto object-contain transition-opacity duration-300 ${isDarkTheme ? "opacity-100 visible" : "opacity-0 invisible"}`}
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 items-center font-medium">
                    {navItems.map((item) => (
                        <div
                            key={item.name}
                            className="relative group py-2"
                            onMouseEnter={() => setActiveDropdown(item.name)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                href={item.href}
                                className="flex items-center gap-1 hover:text-primary transition-colors duration-200"
                            >
                                {item.name}
                                {item.dropdown && <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? "rotate-180" : ""}`} />}
                            </Link>

                            <AnimatePresence>
                                {item.dropdown && activeDropdown === item.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden py-2"
                                    >
                                        {item.dropdown.map((subItem) => (
                                            <Link
                                                key={subItem.name}
                                                href={subItem.href}
                                                className="block px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors text-sm font-semibold"
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                    <Link
                        href="/contact"
                        className={`px-6 py-2.5 rounded-full font-bold shadow-sm transition-all hover:scale-105 active:scale-95 ${isDarkTheme ? "bg-primary text-white hover:bg-primary/90 shadow-primary/20" : "bg-white text-slate-900 hover:bg-white/90"}`}
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

            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="fixed inset-0 bg-slate-900 z-[100] flex flex-col h-[100dvh] w-full text-white overflow-y-auto"
                    >
                        <div className="flex justify-between items-center p-6 mb-4 shrink-0">
                            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                                <img
                                    src="https://assets.thesparksite.com/uploads/templates/header-q-2/Quest-Logo-gradient-white-250xAUTO.fit.png"
                                    alt="Quest Realty Logo"
                                    className="h-10 w-auto object-contain"
                                />
                            </Link>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white/10 rounded-full">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="px-6 pb-12 flex-1">
                            <nav className="flex flex-col gap-8 text-2xl font-heading">
                            {navItems.map((item) => (
                                <div key={item.name} className="flex flex-col gap-4">
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-white hover:text-primary transition-colors font-bold"
                                    >
                                        {item.name}
                                    </Link>
                                    {item.dropdown && (
                                        <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary/30">
                                            {item.dropdown.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="text-lg text-slate-400 hover:text-white transition-colors"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="line border-t border-white/10 my-4" />
                            <Link
                                href="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="bg-primary text-white text-center rounded-full py-5 text-xl font-bold shadow-xl shadow-primary/20"
                            >
                                Let's Talk
                            </Link>
                                </nav>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
        </>
    );
}
