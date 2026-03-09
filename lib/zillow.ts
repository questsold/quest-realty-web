"use server";

export interface ZillowReview {
    ReviewId: string;
    ReviewerScreenName: string;
    ReviewDate: string;
    Description: string;
    Rating: number;
    [key: string]: any;
}

export async function getZillowReviews(): Promise<ZillowReview[]> {
    try {
        const token = process.env.BRIDGE_ZILLOW_REVIEWS_TOKEN;
        const accountId = process.env.ZILLOW_AGENT_ID;

        if (!token || !accountId) {
            console.error("Missing Bridge API credentials for Zillow Reviews");
            return [];
        }

        const res = await fetch(
            `https://api.bridgedataoutput.com/api/v2/OData/reviews/Reviews?access_token=${token}&$filter=AccountIdReviewee eq '${accountId}'&$orderby=ReviewDate desc`,
            {
                next: { revalidate: 3600 }, // Revalidate every hour
            }
        );

        if (!res.ok) {
            console.error("Failed to fetch Zillow reviews:", await res.text());
            return [];
        }

        const data = await res.json();
        const reviews = data.value || [];

        // Filter out any reviews that are not 5 stars
        return reviews.filter((r: ZillowReview) => r.Rating === 5);
    } catch (error) {
        console.error("Error fetching Zillow reviews:", error);
        return [];
    }
}
