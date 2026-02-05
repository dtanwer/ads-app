export default function VideoPlayer({ src }: { src: string }) {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
                {/* Compliance Label */}
                <div className="absolute top-4 left-4 z-10 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none">
                    Demo video – Royalty-free content for testing
                </div>

                {/* Video Element */}
                <video
                    className="w-full h-full"
                    controls
                    playsInline
                    preload="metadata"
                    controlsList="nodownload"
                >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="mt-4 text-sm text-gray-500 italic">
                This video is for demonstration purposes only.
            </div>
        </div>
    );
}
