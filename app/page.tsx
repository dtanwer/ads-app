import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
        AdSense Video POC
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-10">
        A compliant, production-ready demonstration of Google AdSense integration
        alongside royalty-free video content.
      </p>

      <div className="flex gap-4">
        <Link
          href="/watch"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 shadow-lg"
        >
          View Demo Video
        </Link>
        <Link
          href="/about"
          className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-8 rounded-full border border-gray-300 transition-colors duration-200"
        >
          Learn More
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-2">Safe Content</h3>
          <p className="text-gray-600 text-sm">Strictly uses royalty-free, labeled video content for demonstration.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-2">Compliant Ads</h3>
          <p className="text-gray-600 text-sm">Ad units are clearly separated from content and navigation controls.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-2">Performance</h3>
          <p className="text-gray-600 text-sm">Built on Next.js 14+ for optimal speed and SEO structure.</p>
        </div>
      </div>
    </div>
  );
}
