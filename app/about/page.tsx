export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">About This Project</h1>

            <div className="prose prose-blue max-w-none text-gray-700">
                <p className="mb-6 text-lg">
                    This application is a <strong>Proof of Concept (POC)</strong> designed to demonstrate a compliant integration of Google AdSense
                    within a modern Next.js video application.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Objective</h2>
                <p className="mb-4">
                    The primary goal is to showcase best practices for ad placement, ensuring a high-quality user experience while strictly adhering
                    to Google's publisher policies. This includes correct labeling of content, avoiding accidental clicks, and ensuring content safety.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Technology Stack</h2>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                    <li><strong>Framework:</strong> Next.js 14+ (App Router)</li>
                    <li><strong>Styling:</strong> Tailwind CSS</li>
                    <li><strong>Ads:</strong> Google AdSense (Responsive Units)</li>
                    <li><strong>Player:</strong> Standard HTML5 Video with Custom Safe Controls</li>
                </ul>
            </div>
        </div>
    );
}
