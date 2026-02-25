"use server";

import { sendLeadToFUB } from "@/lib/fub";

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
        const result = await sendLeadToFUB(data);
        return result;
    } catch (error) {
        console.error("Server Action Lead Error:", error);
        return { success: false, error: "Internal Server Error" };
    }
}
