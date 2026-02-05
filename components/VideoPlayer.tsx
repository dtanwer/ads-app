'use client';

import { useState, useEffect, useRef } from 'react';

// Google's Universal Test Tag - Single Inline Linear (Most reliable for POCs)
const TEST_AD_TAG = "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=";

export default function VideoAdsPlayer({ mainVideoSrc }: { mainVideoSrc: string }) {
    const [isAdPlaying, setIsAdPlaying] = useState(false);
    const [sdkLoaded, setSdkLoaded] = useState(false);
    const [adError, setAdError] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const adContainerRef = useRef<HTMLDivElement>(null);
    const adsLoaderRef = useRef<any>(null);
    const adsManagerRef = useRef<any>(null);

    // 1. Manually inject IMA SDK script on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // check if script already exists
        if (document.getElementById('ima-sdk-script')) {
            setSdkLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.id = 'ima-sdk-script';
        script.src = '//imasdk.googleapis.com/js/sdkloader/ima3.js';
        script.async = true;
        // script.crossOrigin = 'anonymous'; // Not strictly needed for the loader script itself, but good practice if loading from strict CDNs

        script.onload = () => {
            console.log('IMA SDK Loaded');
            setSdkLoaded(true);
        };

        script.onerror = () => {
            setAdError('Failed to load Ad SDK');
        };

        document.head.appendChild(script);

        // Cleanup: We generally don't remove the SDK script on unmount as it's global, 
        // but we clean up manager instances below.
        return () => {
            if (adsManagerRef.current) {
                adsManagerRef.current.destroy();
            }
        };
    }, []);

    // 2. Initialize IMA only on USER CLICK (Addresses COOP/Autoplay policies)
    const initIMA = () => {
        if (!window.google || !window.google.ima || !adContainerRef.current || !videoRef.current) {
            console.error("IMA SDK not ready or DOM elements missing");
            return;
        }

        const google = window.google;

        // Prevent double init
        if (adsLoaderRef.current) {
            // If loader exists, just request ads again if needed, or simply play video
            // For this POC, we'll reset.
            adsLoaderRef.current.contentComplete();
        }

        // Create Display Container
        const adDisplayContainer = new google.ima.AdDisplayContainer(
            adContainerRef.current,
            videoRef.current
        );

        // Critical: Initialize container strictly on user action
        adDisplayContainer.initialize();

        // Create Ads Loader
        const adsLoader = new google.ima.AdsLoader(adDisplayContainer);
        adsLoaderRef.current = adsLoader;

        // Determine VAST Tag based on Env
        const isTestMode = process.env.NEXT_PUBLIC_ADS_MODE === 'test';
        const adTagUrl = isTestMode
            ? TEST_AD_TAG
            : (process.env.NEXT_PUBLIC_PROD_VAST_TAG || TEST_AD_TAG);

        console.log(`Requesting Ads (Mode: ${process.env.NEXT_PUBLIC_ADS_MODE || 'default-test'})...`);

        // Listen for the Ad Manager to load
        adsLoader.addEventListener(
            google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
            (e: any) => {
                const adsManager = e.getAdsManager(videoRef.current);
                adsManagerRef.current = adsManager;

                // Listen for pause/resume requests
                adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, () => {
                    console.log('Ad Requested Pause');
                    setIsAdPlaying(true);
                    // videoRef.current?.pause(); // video.js or IMA usually handles this, but explicit is safer
                });

                adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, () => {
                    console.log('Ad Requested Resume');
                    setIsAdPlaying(false);
                    videoRef.current?.play();
                });

                // Error handling (if ad fails, just play the video)
                adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (err: any) => {
                    console.error('Ad Error:', err.getError());
                    setAdError('Ad Error: ' + err.getError().toString());
                    setIsAdPlaying(false);
                    videoRef.current?.play();
                });

                // All events for debugging
                adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, () => {
                    console.log('All Ads Completed');
                    setIsAdPlaying(false);
                    videoRef.current?.play();
                });

                try {
                    adsManager.init(videoRef.current?.clientWidth || 640, videoRef.current?.clientHeight || 360, google.ima.ViewMode.NORMAL);
                    adsManager.start();
                } catch (adError) {
                    console.log("AdsManager init failed:", adError);
                    videoRef.current?.play();
                }
            }
        );

        // Ad Error on Loader
        adsLoader.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            (e: any) => {
                console.error("Loader Error:", e.getError());
                videoRef.current?.play();
            }
        );

        // Request the Ad
        const adsRequest = new google.ima.AdsRequest();
        adsRequest.adTagUrl = adTagUrl;

        // Linear ads usually require these matches
        adsRequest.linearAdSlotWidth = videoRef.current.clientWidth;
        adsRequest.linearAdSlotHeight = videoRef.current.clientHeight;

        adsLoader.requestAds(adsRequest);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl group">

                {/* AD CONTAINER: Google injects the ad UI here */}
                {/* We keep it technically visible but ensure z-index handles layering */}
                <div
                    ref={adContainerRef}
                    id="ad-container"
                    className="absolute inset-0 z-50 pointer-events-auto"
                    style={{ display: isAdPlaying ? 'block' : 'none' }}
                />

                {/* MAIN CONTENT VIDEO */}
                <video
                    ref={videoRef}
                    className="w-full h-full"
                    controls={!isAdPlaying} // Display native controls only when ad IS NOT playing
                    playsInline
                >
                    <source src={mainVideoSrc} type="video/mp4" />
                </video>

                {/* START BUTTON OVERLAY (Required to trigger ad with sound & fix COOP) */}
                {!isAdPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-40"
                        // Only show this overlay if we haven't started playing or if we are paused/idle. 
                        // For this POC, we hide it once ads start, but a real player manages this state more granularly.
                        style={{ display: isAdPlaying ? 'none' : 'flex' }}
                    >
                        <button
                            onClick={() => {
                                // If video is already playing (paused), just play. 
                                // Else init ads.
                                if (videoRef.current && videoRef.current.currentTime > 0 && !videoRef.current.paused && !videoRef.current.ended) {
                                    // Video is playing
                                } else {
                                    if (sdkLoaded) initIMA();
                                }
                            }}
                            disabled={!sdkLoaded}
                            className={`bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 ${!sdkLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {sdkLoaded ? (
                                <>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    Play Video
                                </>
                            ) : (
                                "Loading Ad SDK..."
                            )}
                        </button>
                    </div>
                )}

                {/* Error Banner */}
                {adError && (
                    <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-xs p-1 text-center font-mono z-50">
                        {adError}
                    </div>
                )}
            </div>

            <div className="mt-4 text-sm text-gray-400 flex justify-between">
                <span>Mode: <span className="text-blue-500 font-mono">{process.env.NEXT_PUBLIC_ADS_MODE || 'test'}</span></span>
                {sdkLoaded && <span className="text-green-500">● SDK Ready</span>}
            </div>
        </div>
    );
}

// Add types for Window
declare global {
    interface Window {
        google: any;
    }
}