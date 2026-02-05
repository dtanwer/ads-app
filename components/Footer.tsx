import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-50 text-gray-600 mt-auto border-t border-gray-200">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center space-x-6">
                    <Link href="/privacy" className="hover:text-gray-900">
                        Privacy Policy
                    </Link>
                    <Link href="/about" className="hover:text-gray-900">
                        About
                    </Link>
                    <Link href="/contact" className="hover:text-gray-900">
                        Contact
                    </Link>
                </div>
                <div className="mt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} AdSense POC. For demonstration purposes only.</p>
                </div>
            </div>
        </footer>
    );
}
