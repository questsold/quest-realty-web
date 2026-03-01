"use client";

import { useEffect } from "react";
import Script from "next/script";

interface RealScoutWidgetProps {
    agentId: string;
}

export default function RealScoutValuationWidget({ agentId }: RealScoutWidgetProps) {
    return (
        <div className="w-full pb-8 px-2">
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
        }
      `}} />

            <div>
                {/* @ts-ignore */}
                <realscout-home-value agent-encoded-id={agentId}></realscout-home-value>
            </div>
        </div>
    );
}
