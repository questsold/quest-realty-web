import { redirect } from "next/navigation";
import { getZillowReviews } from "@/lib/zillow";
import AgentProfileClient from "./AgentProfileClient";

const agentsData: Record<string, any> = {
    "matthew": {
        name: "Matthew Berney",
        role: "Real Estate Advisor",
        email: "matthew@questsold.com",
        phone: "(248) 955-1403",
        image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/Matthew-Berney-900x900.fit.jpeg",
        heroImage: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
        heroVideo: "/videos/luxury-home.mp4",
        bio: [
            "Matthew is a top-producing real estate advisor dedicated to delivering exceptional results for his clients across Metro Detroit. With years of experience and a deep understanding of the local luxury market, he provides strategic, high-tier guidance whether you are acquiring your first property or selling a grand estate.",
            "As a member of the elite Presidents Club, Matthew's commitment to excellence and high-level negotiation skills ensure that every transaction is seamless and discreet. He believes in building lifelong relationships with his clients through uncompromising transparency, steadfast trust, and dedicated hard work."
        ],
        zillowLink: "https://www.zillow.com/profile/MatthewBerney",
        stats: [
            { label: "Closed Volume", value: "$120M+" },
            { label: "Families Helped", value: "350+" },
            { label: "Years Experience", value: "12" },
            { label: "Ranking", value: "Top 1%" }
        ]
    }
};

export default async function AgentProfilePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const agent = agentsData[resolvedParams.slug.toLowerCase()];

    if (!agent) {
        redirect("/our-team");
    }

    const reviews = await getZillowReviews();

    return <AgentProfileClient agent={agent} reviews={reviews} />;
}
