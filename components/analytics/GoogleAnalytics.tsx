"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
        dataLayer: any[];
        widgetTracker: (...args: any[]) => void;
    }
}

export default function GoogleTracking({ ga_id, ads_id }: { ga_id?: string; ads_id?: string }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Use GA ID as primary if available, otherwise use Ads ID
    const primaryId = ga_id || ads_id;

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const gclid = params.get("gclid");
            const utmSource = params.get("utm_source");
            const utmCampaign = params.get("utm_campaign");
            const utmTerm = params.get("utm_term");
            const utmMedium = params.get("utm_medium");

            const setCookie = (name: string, val: string) => {
                document.cookie = `${name}=${encodeURIComponent(val)};path=/;max-age=${30 * 24 * 60 * 60};SameSite=Lax`;
            };

            if (gclid) setCookie("adwords_gclid", gclid);
            if (utmSource) setCookie("utm_source", utmSource);
            if (utmCampaign) setCookie("utm_campaign", utmCampaign);
            if (utmTerm) setCookie("utm_term", utmTerm);
            if (utmMedium) setCookie("utm_medium", utmMedium);
        }

        if (pathname && window.gtag && primaryId) {
            window.gtag("config", primaryId, {
                page_path: pathname,
            });
            if (ga_id && ads_id) {
                window.gtag("config", ads_id);
            }
        }

        // Send Follow Up Boss dynamic pageview on client-side router navigation
        // ONLY if the user is explicitly viewing a specific property listing page!
        if (typeof window !== "undefined" && window.widgetTracker && pathname?.startsWith('/listing/')) {
            // Slight delay ensures the new dynamic page <title> has finished rendering in Next.js
            setTimeout(() => {
                window.widgetTracker("send", "pageview");
            }, 500);
        }
    }, [pathname, searchParams, ga_id, ads_id, primaryId]);

    if (!primaryId) return null;

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
            />
            <Script
                id="google-tracking"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){window.dataLayer.push(arguments);};
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${primaryId}', {
              page_path: window.location.pathname,
            });
            ${(ga_id && ads_id) ? `gtag('config', '${ads_id}');` : ""}
          `,
                }}
            />
            {/* Follow Up Boss Tracking Pixel (Included here so it integrates natively with NextJS Client Router) */}
            <Script id="fub-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{
              __html: `
                (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
                {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
                (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
                e.parentNode.insertBefore(t,e);})
                (window,"https://widgetbe.com/agent",document,"widgetTracker");
                window.widgetTracker("create", "WT-JZAGZAIY");
                window.widgetTracker("send", "pageview");
              `
            }} />
        </>
    );
}

/**
 * Utility function to track conversions
 */
export const trackConversion = (eventName: string, params?: object) => {
    if (typeof window !== "undefined") {
        if (typeof window.gtag === "function") {
            window.gtag("event", eventName, params);
        } else if (Array.isArray(window.dataLayer)) {
            window.dataLayer.push(["event", eventName, params]);
        }
    }
};
