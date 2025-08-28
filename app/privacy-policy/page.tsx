// pages/privacy.tsx or app/privacy/page.tsx (Next.js)
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className=" min-h-screen  p-5">
      <div className="max-w-4xl mx-auto space-y-6">
        <p>
          At <strong>Top Stories Online</strong>, your privacy matters. This
          Privacy Policy explains what information we collect and how we use it.
        </p>

        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Non-Personal Information:</strong> We may automatically
            collect information such as your browser type, device, and pages
            visited to improve our site.
          </li>
          <li>
            <strong>Cookies & Tracking:</strong> We may use cookies for basic
            site functionality and analytics.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Improve the website experience.</li>
          <li>Analyze general site traffic and performance.</li>
        </ul>

        <h2 className="text-2xl font-semibold">3. Sharing Your Information</h2>
        <p>
          We do <strong>not</strong> sell or rent your personal information. We
          do not share it with third parties, except for site operation
          purposes.
        </p>

        <h2 className="text-2xl font-semibold">4. Security</h2>
        <p>
          We take reasonable measures to protect your information, but no online
          service can guarantee complete security.
        </p>

        <h2 className="text-2xl font-semibold">5. Third-Party Links</h2>
        <p>
          Our site may contain links to external websites. We are not
          responsible for the privacy practices of these sites.
        </p>

        <h2 className="text-2xl font-semibold">6. Children’s Privacy</h2>
        <p>We do not knowingly collect information from children under 13.</p>

        <h2 className="text-2xl font-semibold">7. Updates</h2>
        <p>
          We may update this Privacy Policy occasionally. Changes will be posted
          here with a new effective date.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
