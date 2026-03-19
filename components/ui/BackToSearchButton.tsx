"use client";

import { useRouter } from "next/navigation";

export function BackToSearchButton() {
    const router = useRouter();
    
    return (
        <a 
            href="/properties"
            onClick={(e) => {
                e.preventDefault();
                // If there is history, navigate back to preserve search params.
                // Otherwise fallback to the properties landing page.
                if (window.history.length > 2 && document.referrer.includes(window.location.host)) {
                    router.back();
                } else {
                    router.push('/properties');
                }
            }}
            className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors font-medium cursor-pointer"
        >
            <span className="w-4 h-4 flex">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                </svg>
            </span> 
            Back to Search
        </a>
    );
}
