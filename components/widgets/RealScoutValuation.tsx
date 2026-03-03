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
          --rs-hvw-title-color: #000000;
          --rs-hvw-subtitle-color: #000000;
          --rs-hvw-primary-button-text-color: #ffffff;
          --rs-hvw-primary-button-color: #000000;
          --rs-hvw-secondary-button-text-color: #000000;
          --rs-hvw-secondary-button-color: #ffffff;
          --rs-hvw-widget-width: auto;
        }
      `}} />

            <div>
                {/* @ts-ignore */}
                <realscout-home-value agent-encoded-id={agentId} include-phone></realscout-home-value>
            </div>
        </div>
    );
}
