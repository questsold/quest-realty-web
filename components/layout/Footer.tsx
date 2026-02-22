import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-[#1f1f1f] text-zinc-400 py-16 border-t border-zinc-800">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <Link href="/" className="mb-6 block">
                        <img
                            src="https://assets.thesparksite.com/uploads/templates/header-q-2/Quest-Logo-gradient-white-250xAUTO.fit.png"
                            alt="Quest Realty Logo"
                            className="h-12 w-auto object-contain"
                        />
                    </Link>
                    <p className="mt-4 text-sm leading-relaxed">
                        The most current real estate listings and detailed neighborhood information for the greater Michigan region.
                    </p>
                    <div className="mt-6 flex flex-col gap-2 text-sm">
                        <a href="tel:2486625550" className="hover:text-white transition-colors">Phone: 248.662.5550</a>
                        <p>888 W Big Beaver Rd, Ste 200,<br />Troy, MI 48084</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-white font-medium mb-4">Quick Links</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="/buyers" className="hover:text-white transition-colors">For Buyers</Link></li>
                        <li><Link href="/sellers" className="hover:text-white transition-colors">For Sellers</Link></li>
                        <li><Link href="/properties" className="hover:text-white transition-colors">Property Search</Link></li>
                        <li><Link href="/communities" className="hover:text-white transition-colors">Communities</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-medium mb-4">Company</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="/our-team" className="hover:text-white transition-colors">Our Team</Link></li>
                        <li><Link href="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
                        <li><Link href="/join-us" className="hover:text-white transition-colors">Join Us</Link></li>
                        <li><Link href="/blog" className="hover:text-white transition-colors">Blog & Resources</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-medium mb-4">Tools & Legal</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="/home-valuation" className="hover:text-white transition-colors">Home Valuation</Link></li>
                        <li><Link href="/mortgage-calculator" className="hover:text-white transition-colors">Mortgage Calculator</Link></li>
                        <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-16 pt-8 border-t border-zinc-800 text-center text-sm">
                <p>© {new Date().getFullYear()} Quest Realty. All rights reserved.</p>
            </div>
        </footer>
    );
}
