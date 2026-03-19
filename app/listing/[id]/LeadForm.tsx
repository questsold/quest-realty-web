"use client";

import { useState } from "react";
import { submitLeadAction } from "@/app/actions/leads";
import { CheckCircle2 } from "lucide-react";
import { trackConversion } from "@/components/analytics/GoogleAnalytics";

export function LeadForm({ property, agent }: { property: any, agent: { name: string, role: string, phone: string, image: string } }) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: (formData.get("fullName") as string).split(" ")[0] || "Inquiry",
            lastName: (formData.get("fullName") as string).split(" ").slice(1).join(" ") || "Lead",
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            message: formData.get("message") as string,
            source: "Website",
            type: "Buyer" as "Buyer" | "Seller" | "General", // Explicitly setting this helps FUB categorize it right
            tags: ["Property Inquiry", property.city],
            property: {
                street: property.address,
                city: property.city,
                state: property.state || "MI",
                code: property.zip,
                mlsNumber: property.id,
                price: property.price,
                url: window.location.href // Send the listing URL directly to FUB
            }
        };

        try {
            const result = await submitLeadAction(data);
            if (result.success) {
                setStatus("success");
                trackConversion("contact_form_submission", {
                    event_category: "Leads",
                    event_label: "Property Inquiry",
                    property_address: property.address
                });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Inquiry Received</h4>
                <p className="text-sm text-slate-500">{agent.name} will be in touch with you shortly regarding this property.</p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-primary font-bold text-sm hover:underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center gap-4 mb-8">
                <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-16 h-16 rounded-full object-cover shadow-md"
                />
                <div>
                    <h4 className="font-bold text-slate-900">{agent.name}</h4>
                    <p className="text-sm text-primary font-medium">{agent.role}</p>
                    <p className="text-xs text-slate-500 mt-1">{agent.phone}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    required
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50 text-sm"
                />
                <input
                    required
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50 text-sm"
                />
                <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50 text-sm"
                />
                <textarea
                    required
                    name="message"
                    defaultValue={`I am interested in ${property.address}`}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50 text-sm resize-none"
                ></textarea>

                {status === "error" && (
                    <p className="text-red-500 text-xs text-center">Something went wrong. Please try again.</p>
                )}

                <button
                    disabled={status === "loading"}
                    type="submit"
                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors mt-2 disabled:opacity-50"
                >
                    {status === "loading" ? "Sending..." : "Request Information"}
                </button>
                <button
                    type="button"
                    className="w-full border-2 border-slate-900 text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-50 transition-colors"
                >
                    Schedule a Tour
                </button>
            </form>
        </>
    );
}
