import Breadcrumb from "../../components/Breadcrumb";

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#fbfaf8] min-h-screen">

      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-10 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-serif text-gray-900">
            Privacy Policy
          </h1>

          <div className="w-12 h-[2px] bg-[#B8860B] mt-3 mb-4" />

          <p className="text-gray-600 text-sm sm:text-base max-w-3xl">
            MRI Xplore is committed to protecting the privacy of researchers,
            authors, institutions, and visitors using our platform.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white py-3 px-4 sm:px-6 lg:px-10 border-b">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Privacy Policy", path: "/privacy-policy" },
            ]}
          />
        </div>
      </div>

      {/* Content */}
      <section className="py-8 px-4 sm:px-6 lg:px-10">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:p-10">

          <div className="space-y-8">

            <div>
              <h2 className="text-xl font-semibold text-[#B8860B] mb-3">
                1. Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                MRI Xplore respects your privacy and is committed to protecting
                any personal information collected through our platform. This
                Privacy Policy explains how information is collected, used,
                stored, and protected.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#B8860B] mb-3">
                2. Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may collect information such as your name, email address,
                institution details, search activity, submitted manuscripts,
                and other information voluntarily provided while using MRI
                Xplore services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#B8860B] mb-3">
                3. How We Use Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Information collected may be used to improve search services,
                manage user accounts, facilitate journal submissions,
                communicate important updates, and enhance platform security
                and performance.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#B8860B] mb-3">
                4. Cookies and Analytics
              </h2>
              <p className="text-gray-600 leading-relaxed">
                MRI Xplore may use cookies and analytics tools to understand
                user behavior, improve navigation, and enhance user experience.
                Users can manage cookie preferences through their browser
                settings.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#B8860B] mb-3">
                5. Third-Party Services
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Certain services may integrate with third-party providers for
                hosting, analytics, authentication, or communication purposes.
                These providers are required to maintain appropriate security
                measures.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#B8860B] mb-3">
                6. Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We implement reasonable technical and organizational safeguards
                to protect information against unauthorized access, disclosure,
                alteration, or destruction.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#B8860B] mb-3">
                7. User Rights
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Users may request access to, correction of, or deletion of
                personal information, subject to applicable legal and
                operational requirements.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#B8860B] mb-3">
                8. Changes to This Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                MRI Xplore reserves the right to update this Privacy Policy at
                any time. Changes will be posted on this page with the revised
                effective date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#B8860B] mb-3">
                9. Contact Us
              </h2>

              <div className="bg-[#fdf8f0] border border-[#f3dfb5] rounded-lg p-5">
                <p className="text-gray-700">
                  For questions regarding this Privacy Policy, please contact:
                </p>

                <div className="mt-3 space-y-1 text-gray-600">
                  <p>
                    <span className="font-semibold">MRI Xplore</span>
                  </p>
                  <p>Email: contact@mrixplore.org</p>
                  <p>Website: www.mrixplore.org</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}