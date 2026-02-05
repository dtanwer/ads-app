export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

            <div className="prose prose-blue max-w-none text-gray-700">
                <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

                <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
                <p className="mb-4">
                    Welcome to AdSense POC. We respect your privacy and are committed to protecting your personal data.
                    This privacy policy will inform you as to how we look after your personal data when you visit our website
                    and tell you about your privacy rights and how the law protects you.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Cookies and Advertising</h2>
                <p className="mb-4">
                    We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits to our website
                    or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit
                    to our sites and/or other sites on the Internet.
                </p>
                <p className="mb-4">
                    Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 underline">Google Ads Settings</a>.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Data Collection</h2>
                <p className="mb-4">
                    This is a Proof of Concept application. We do not collect personal user data or require account creation.
                    Any data collected is strictly related to standard web analytics and ad serving performance as mandated by Google AdSense policies.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Contact Us</h2>
                <p className="mb-4">
                    If you have any questions about this privacy policy, please contact us via our Contact Page.
                </p>
            </div>
        </div>
    );
}
