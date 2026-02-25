"use client";

import { useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { submitLeadAction } from "@/app/actions/leads";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            message: formData.get("message") as string,
            source: "Contact Page",
            tags: ["Contact Inquiry"]
        };

        try {
            const result = await submitLeadAction(data);
            if (result.success) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

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

                            {status === "success" ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                                    <p className="text-slate-500">Thank you for reaching out. An advisor will be in touch shortly.</p>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="mt-8 text-primary font-bold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold font-heading text-slate-900 mb-6">Send a Message</h3>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                                                    placeholder="Jane"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                                                    placeholder="Doe"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                                                placeholder="jane@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                                            <input
                                                required
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                                                placeholder="(555) 123-4567"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                            <textarea
                                                required
                                                id="message"
                                                name="message"
                                                rows={4}
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-slate-50 focus:bg-white resize-none"
                                                placeholder="How can we help you?"
                                            ></textarea>
                                        </div>

                                        {status === "error" && (
                                            <p className="text-red-500 text-sm font-medium text-center">
                                                Something went wrong. Please try again or call us directly.
                                            </p>
                                        )}

                                        <button
                                            disabled={status === "loading"}
                                            type="submit"
                                            className="w-full bg-slate-900 text-white font-bold py-4 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
                                        >
                                            {status === "loading" ? "Sending..." : "Send Message"}
                                        </button>
                                    </form>
                                </>
                            )}
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
