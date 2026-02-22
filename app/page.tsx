import { Hero } from "@/components/ui/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Introduction Section placeholder */}
      <section className="py-24 bg-white" id="About">
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-semibold">The Quest Realty Difference</h2>
          <h3 className="text-3xl md:text-5xl font-heading font-bold mb-8 text-slate-900">
            Why Clients Choose Us
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            Quest Realty stands as a top-producing Realtor in Metro Detroit, committed to achieving swift, successful transactions. By combining aggressive digital marketing, precise demographic targeting, and a team of dedicated agents, Quest Realty ensures your property reaches qualified buyers immediately.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-12">
            With transparency at every stage and proactive customer support, Quest Realty keeps you informed from the first lead through the closing table. Trust Quest Realty to leverage cutting-edge technology and in-depth market research to maximize demand and secure the best possible outcome for your home.
          </p>
          <a href="/about-us" className="inline-block border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-full font-medium hover:bg-slate-900 hover:text-white transition-colors">
            Discover Why We're Different
          </a>
        </div>
      </section>

      {/* Stats Section Placeholder */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
            <div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-1">Top</div>
              <div className="text-5xl lg:text-7xl font-heading font-bold text-primary mb-2">1%</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">Nationwide</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-1">Over</div>
              <div className="text-5xl lg:text-7xl font-heading font-bold text-primary mb-2">$100M+</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">Million Closed</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-1">Over</div>
              <div className="text-5xl lg:text-7xl font-heading font-bold text-primary mb-2">500+</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">Properties Sold</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings Placeholder */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-primary mb-2 font-semibold">Exclusive Portfolio</h2>
              <h3 className="text-3xl md:text-5xl font-heading font-bold text-slate-900">Handpicked Listings</h3>
            </div>
            <a href="/properties" className="hidden md:block text-slate-900 font-medium hover:text-primary transition-colors border-b-2 border-slate-900 hover:border-primary pb-1">
              View All Properties
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                address: "1042 Waddington Rd",
                city: "Birmingham, MI",
                price: "$1,450,000",
                beds: 4,
                baths: 4,
                sqft: "3,200",
                image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                address: "821 Rivenoak Ave",
                city: "Birmingham, MI",
                price: "$899,000",
                beds: 3,
                baths: 3,
                sqft: "2,100",
                image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                address: "4550 Walnut Lake Rd",
                city: "Bloomfield Hills, MI",
                price: "$2,100,000",
                beds: 5,
                baths: 6,
                sqft: "6,500",
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ].map((property, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative h-[340px] mb-5 overflow-hidden rounded-sm">
                  <div className="absolute inset-0 bg-slate-200" />
                  <img src={property.image} alt={property.address} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-bold shadow-sm border border-white/20">
                    {property.price}
                  </div>
                </div>
                <h4 className="text-xl font-heading font-medium text-slate-900 mb-1">{property.address}</h4>
                <p className="text-slate-500 mb-3 text-sm uppercase tracking-widest">{property.city}</p>
                <div className="flex gap-4 text-sm font-medium text-slate-700">
                  <span>{property.beds} Beds</span>
                  <span>{property.baths} Baths</span>
                  <span>{property.sqft} Sqft</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center md:hidden">
            <a href="/properties" className="inline-block border text-slate-900 px-6 py-3 font-medium hover:bg-slate-50 transition-colors uppercase tracking-widest text-sm">
              View All Properties
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
