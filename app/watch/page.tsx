import VideoPlayer from '@/components/VideoPlayer';
import AdSenseBanner from '@/components/AdSenseBanner';

export default function WatchPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-grow lg:w-3/4">
                    <div className="bg-white rounded-xl p-1 shadow-sm border border-gray-100 mb-6">
                        <VideoPlayer src="/free-video.mp4" />
                    </div>

                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Demo Video: Nature & Landscapes</h1>
                        <p className="text-gray-600">
                            This is a demonstration of video playback functionality.
                            The content is royalty-free and for testing purposes only.
                        </p>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        {/* AdSense Placement: Below Video Content */}
                        <AdSenseBanner
                            adClient="ca-pub-XXXXXXXXXXXXXXXX"
                            adSlot="1234567890"
                            format="auto"
                            responsive={true}
                        />
                    </div>
                </div>

                {/* Sidebar (Optional for future, currently empty or safe space) */}
                <div className="hidden lg:block lg:w-1/4">
                    <div className="bg-gray-100 rounded-lg p-6 h-full min-h-[200px] flex items-center justify-center text-gray-400 text-sm">
                        Sidebar Area
                    </div>
                </div>
            </div>
        </div>
    );
}
