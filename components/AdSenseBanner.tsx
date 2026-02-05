'use client';

import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

interface AdSenseBannerProps {
    adClient: string;
    adSlot: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    responsive?: boolean;
}

export default function AdSenseBanner({
    adClient,
    adSlot,
    format = 'auto',
    responsive = true,
}: AdSenseBannerProps) {
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className="section-container my-8 flex flex-col items-center justify-center bg-gray-50 border border-gray-100 rounded-lg p-4">
            <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide font-semibold">
                Advertisement
            </div>
            <div className="w-full flex justify-center overflow-hidden min-h-[90px]">
                {/* AdSense Unit */}
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block', minWidth: '300px', minHeight: '50px' }}
                    data-ad-client={adClient}
                    data-ad-slot={adSlot}
                    data-ad-format={format}
                    data-full-width-responsive={responsive ? 'true' : 'false'}
                />
            </div>
        </div>
    );
}
