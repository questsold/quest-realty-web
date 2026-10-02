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
    property?: {
        street: string;
        city: string;
        state: string;
        code: string;
        mlsNumber: string;
        price: number;
        url: string;
    };
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

        // Check for Google Ads traffic (gclid or UTM tags)
        const gclid = cookieStore.get('adwords_gclid')?.value;
        const utmSource = cookieStore.get('utm_source')?.value;
        const utmCampaign = cookieStore.get('utm_campaign')?.value;
        const utmTerm = cookieStore.get('utm_term')?.value;

        const isGoogleAds = Boolean(
            gclid ||
            utmSource?.toLowerCase() === 'google' ||
            utmCampaign?.toLowerCase().includes('adwords') ||
            utmCampaign?.toLowerCase().includes('buyer')
        );

        if (isGoogleAds) {
            if (!agentReferrer) {
                data.source = "Google AdWords";
            }

            const rawCampaign = utmCampaign ? decodeURIComponent(utmCampaign) : "Quest Realty - Buyer Leads Search";
            const tagsToAdd = [
                "Google Ads",
                "AdWords Target",
                rawCampaign
            ];

            if (utmTerm) {
                tagsToAdd.push(`Keyword: ${decodeURIComponent(utmTerm)}`);
            }

            data.tags = Array.from(new Set([...(data.tags || []), ...tagsToAdd]));
        }

        const result = await sendLeadToFUB(data);
        return result;
    } catch (error) {
        console.error("Server Action Lead Error:", error);
        return { success: false, error: "Internal Server Error" };
    }
}
