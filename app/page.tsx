import { Hero } from "@/components/ui/Hero";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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

      {/* Introduction Section */}
      <section className="py-32 bg-white" id="About">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-bold">The Quest Realty Difference</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-slate-900 leading-tight">
                Innovative Marketing. <br />Expert Negotiation.
              </h3>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Quest Realty stands as a top-producing brokerage in Metro Detroit, committed to achieving swift, successful transactions. By combining aggressive digital marketing, precise demographic targeting, and a team of dedicated agents, Quest Realty ensures your property reaches qualified buyers immediately.
                </p>
                <p>
                  With transparency at every stage and proactive customer support, Quest Realty keeps you informed from the first lead through the closing table. Trust Quest Realty to leverage cutting-edge technology and in-depth market research to maximize demand and secure the best possible outcome for your home.
                </p>
              </div>
              <div className="mt-12 flex flex-wrap gap-6">
                <a href="/about-us" className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
                  Meet Our Team <ArrowRight className="w-5 h-5" />
                </a>
                <a href="/contact" className="border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-all">
                  Get in Touch
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Luxury Home Detail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-primary p-10 rounded-3xl text-white shadow-2xl hidden md:block">
                <div className="text-4xl font-bold mb-1">$100M+</div>
                <div className="text-sm font-medium uppercase tracking-widest opacity-80">Closed Volume</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center max-w-6xl mx-auto">
            <div>
              <div className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-2">1%</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Top Realtors</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-2">500+</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Homes Sold</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-2">24h</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avg Response Time</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-2">100%</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Client Focus</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-bold">Exclusive Portfolio</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 leading-tight">
                Featured Properties <br />in Metro Detroit
              </h3>
            </div>
            <Link href="/properties" className="group flex items-center gap-2 text-slate-900 font-bold hover:text-primary transition-all">
              View Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
