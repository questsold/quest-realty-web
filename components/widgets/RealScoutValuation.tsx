"use client";

import { useEffect } from "react";
import Script from "next/script";

interface RealScoutWidgetProps {
    agentId: string;
}

export default function RealScoutValuationWidget({ agentId }: RealScoutWidgetProps) {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <Script
                src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
                type="module"
                strategy="afterInteractive"
            />

            <style dangerouslySetInnerHTML={{
                __html: `
        realscout-home-value {
          --rs-hvw-background-color: #ffffff;
          --rs-hvw-title-color: #0f172a;
          --rs-hvw-subtitle-color: rgba(71, 85, 105, 0.8);
          --rs-hvw-primary-button-color: #0f172a;
          --rs-hvw-primary-button-text-color: #ffffff;
          --rs-hvw-secondary-button-color: #ffffff;
          --rs-hvw-secondary-button-text-color: #0f172a;
          --rs-hvw-widget-width: 100%;
        }
      `}} />

            <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 border border-slate-100 min-h-[400px]">
                {/* @ts-ignore */}
                <realscout-home-value agent-id={agentId}></realscout-home-value>
            </div>
        </div>
    );
}
