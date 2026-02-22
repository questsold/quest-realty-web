import { PageHero } from "@/components/ui/PageHero";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <PageHero
                title="Contact Us"
                description="We're here to help you navigate your real estate journey."
                imageUrl="https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            />

            <section className="py-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-16">

                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl font-heading font-bold text-slate-900 mb-6">Get in Touch</h2>
                            <p className="text-slate-600 mb-12 text-lg">
                                Whether you have a question about properties, need assistance with buying or selling, or want to join our team, we'd love to hear from you.
                            </p>

                            <div className="space-y-8">
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Office Location</h4>
                                        <p className="text-slate-600">23940 Woodward Ave<br />Pleasant Ridge, MI 48069</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                        <Phone className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Phone</h4>
                                        <p className="text-slate-600"><a href="tel:2489551403" className="hover:text-primary transition-colors">(248) 955-1403</a></p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Email</h4>
                                        <p className="text-slate-600"><a href="mailto:info@questsold.com" className="hover:text-primary transition-colors">info@questsold.com</a></p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                        <Clock className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Business Hours</h4>
                                        <p className="text-slate-600">Monday - Friday: 9am - 6pm<br />Saturday & Sunday: By Appointment</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
                            <h3 className="text-2xl font-bold font-heading text-slate-900 mb-6">Send a Message</h3>

                            <form className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                                            placeholder="Jane"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                                        placeholder="jane@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                                        placeholder="(555) 123-4567"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-slate-50 focus:bg-white resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <button
                                    type="button"
                                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-lg hover:bg-slate-800 transition-colors"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-[400px] w-full bg-slate-200 relative overflow-hidden">
                {/* Placeholder for actual Google Map iframe */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center brightness-75 grayscale" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-xl shadow-2xl flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer">
                        <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-lg">Quest Realty HQ</h4>
                            <p className="text-sm text-slate-500">23940 Woodward Ave, Pleasant Ridge</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
