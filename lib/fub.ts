/**
 * Follow Up Boss API Integration
 * 
 * Documentation: https://api.followupboss.com/
 */

const FUB_API_KEY = process.env.FUB_API_KEY;

interface FUBLead {
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
}

export async function sendLeadToFUB(lead: FUBLead) {
    if (!FUB_API_KEY) {
        console.error("FUB_API_KEY is not defined in environment variables.");
        return { success: false, error: "Configuration Error" };
    }

    try {
        const response = await fetch("https://api.followupboss.com/v1/events", {
            method: "POST",
            headers: {
                "Authorization": `Basic ${Buffer.from(FUB_API_KEY + ":").toString('base64')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                source: lead.source || "Quest Realty Website",
                type: lead.type === 'Seller' ? 'Seller Lead' : (lead.property ? 'Property Inquiry' : 'Inquiry'),
                person: {
                    firstName: lead.firstName,
                    lastName: lead.lastName,
                    emails: [{ value: lead.email }],
                    phones: lead.phone ? [{ value: lead.phone }] : []
                },
                message: lead.message || "",
                tags: lead.tags || ["Website Lead"],
                property: lead.property
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("FUB API Error:", errorData);
            return { success: false, error: "API Failure" };
        }

        return { success: true };
    } catch (error) {
        console.error("FUB Integration Error:", error);
        return { success: false, error: "Network Error" };
    }
}
