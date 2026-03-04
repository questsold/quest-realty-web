"use client";

import Script from "next/script";

export default function ElfsightReviews() {
  return (
    <>
      <Script 
        src="https://elfsightcdn.com/platform.js" 
        strategy="afterInteractive"
      />
      <div 
        className="elfsight-app-82259b45-6c9d-4c9d-87dc-196698fa4a68" 
        data-elfsight-app-lazy 
      />
    </>
  );
}
