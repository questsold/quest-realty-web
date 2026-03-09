"use server";

import { sendLeadToFUB } from "@/lib/fub";
import { cookies } from "next/headers";

export async function submitLeadAction(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    source?: string;
    type?: 'Buyer' | 'Seller' | 'General';
    message?: string;
    tags?: string[];
}) {
    try {
        const cookieStore = await cookies();
        const agentReferrer = cookieStore.get('agentReferrer')?.value;

        if (agentReferrer) {
            const capitalizedAgent = agentReferrer.charAt(0).toUpperCase() + agentReferrer.slice(1).toLowerCase();
            const agentSourceString = `Subdomain - ${capitalizedAgent}`;

            data.source = agentSourceString;
            data.tags = [...(data.tags || []), agentSourceString];
        }

        const result = await sendLeadToFUB(data);
        return result;
    } catch (error) {
        console.error("Server Action Lead Error:", error);
        return { success: false, error: "Internal Server Error" };
    }
}
