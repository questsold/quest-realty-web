"use client";

import { useState } from "react";
import { submitLeadAction } from "@/app/actions/leads";
import { trackConversion } from "@/components/analytics/GoogleAnalytics";

export default function AgentContactForm({ agentName }: { agentName: string }) {
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
            source: `Subdomain - ${agentName.split(" ")[0]}`,
            tags: ["Agent Profile Lead"]
        };

        try {
            const result = await submitLeadAction(data);
            if (result.success) {
                setStatus("success");
                trackConversion("agent_contact_submission", {
                    event_category: "Leads",
                    event_label: `Agent Profile - ${agentName}`,
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
            <div className="text-center py-20 bg-zinc-900 border-[4px] border-zinc-800 px-6">
                <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">Thank You</h3>
                <div className="w-12 h-[2px] bg-white mx-auto mb-8" />
                <p className="text-zinc-400 tracking-[0.2em] text-xs font-semibold mb-12 uppercase leading-relaxed">
                    {agentName.split(' ')[0]} will be in touch shortly.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="text-white border-b-2 border-white pb-1 tracking-[0.3em] text-[10px] font-bold hover:text-zinc-400 hover:border-zinc-400 transition-colors uppercase"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12">
                <div className="relative group">
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-4 font-bold transition-colors group-focus-within:text-white">First Name</label>
                    <input
                        required
                        type="text"
                        name="firstName"
                        className="w-full bg-transparent border-b-2 border-zinc-700 py-3 px-0 focus:outline-none focus:border-white text-white transition-colors text-sm rounded-none font-medium"
                    />
                </div>
                <div className="relative group">
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-4 font-bold transition-colors group-focus-within:text-white">Last Name</label>
                    <input
                        required
                        type="text"
                        name="lastName"
                        className="w-full bg-transparent border-b-2 border-zinc-700 py-3 px-0 focus:outline-none focus:border-white text-white transition-colors text-sm rounded-none font-medium"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="relative group">
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-4 font-bold transition-colors group-focus-within:text-white">Email Address</label>
                    <input
                        required
                        type="email"
                        name="email"
                        className="w-full bg-transparent border-b-2 border-zinc-700 py-3 px-0 focus:outline-none focus:border-white text-white transition-colors text-sm rounded-none font-medium"
                    />
                </div>
                <div className="relative group">
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-4 font-bold transition-colors group-focus-within:text-white">Phone</label>
                    <input
                        required
                        type="tel"
                        name="phone"
                        className="w-full bg-transparent border-b-2 border-zinc-700 py-3 px-0 focus:outline-none focus:border-white text-white transition-colors text-sm rounded-none font-medium"
                    />
                </div>
            </div>

            <div className="relative group">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-4 font-bold transition-colors group-focus-within:text-white">Message</label>
                <textarea
                    required
                    name="message"
                    rows={4}
                    className="w-full bg-transparent border-b-2 border-zinc-700 py-3 px-0 focus:outline-none focus:border-white text-white transition-colors text-sm resize-none rounded-none font-medium"
                ></textarea>
            </div>

            {status === "error" && (
                <p className="text-red-400 text-[10px] uppercase tracking-[0.3em] font-bold mt-4">
                    Something went wrong. Please try again.
                </p>
            )}

            <div className="pt-8">
                <button
                    disabled={status === "loading"}
                    type="submit"
                    className="group flex items-center gap-4 border-[2px] border-white text-white py-5 px-12 hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
                >
                    <span className="text-zinc-500 font-light group-hover:text-black transition-colors">/</span>
                    <span className="uppercase tracking-[0.3em] text-[11px] font-bold">
                        {status === "loading" ? "Sending" : "Submit Inquiry"}
                    </span>
                    <span className="text-zinc-500 font-light group-hover:text-black transition-colors">/</span>
                </button>
            </div>
        </form>
    );
}
