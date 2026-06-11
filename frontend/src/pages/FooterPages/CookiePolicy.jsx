
import Breadcrumb from "../../components/Breadcrumb";
import { Cookie, Mail } from "lucide-react";

export default function CookiePolicy() {
  return (
    <div className="bg-[#f8f8f8] min-h-screen">

      {/* HERO */}
      <section className="bg-[#fdfaf5] border-b border-[#ece3d2]">
        <div className="max-w-7xl mx-auto px-10 sm:px-12 lg:px-20 py-12">

          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-[#B8860B] mb-2">
              <Cookie size={18} />
              <span className="font-medium text-sm">
                MRI Xplore Cookie Center
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-serif text-gray-900">
              Cookie Policy
            </h1>

            <div className="w-12 h-[2px] bg-[#B8860B] mt-2 mb-3" />

            <p className="text-[#B8860B] font-medium text-[15px] leading-relaxed">
              Understanding how MRI Xplore uses cookies and similar technologies.
            </p>

            <p className="mt-2 text-gray-600 leading-relaxed text-sm max-w-[580px]">
              MRI Xplore uses cookies and related technologies to enhance user
              experience, improve platform functionality, analyze website
              performance, and support research discovery services.
            </p>
          </div>

        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-10 sm:px-12 lg:px-20 py-3">
          <Breadcrumb
            items={[
              {
                label: "Cookie Policy",
                path: "/cookie-policy",
              },
            ]}
          />
        </div>
      </div>

      {/* CONTENT */}
      <section className="py-8 px-8 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">

          <div
            className="
              bg-white
              border
              border-[#ececec]
              rounded-xl
              shadow-[0_2px_12px_rgba(0,0,0,0.04)]
              overflow-hidden
            "
          >

            {/* HEADER */}
            <div className="border-b border-[#ececec] px-6 md:px-10 py-6 bg-[#fcfaf6]">
              <h2 className="text-2xl font-semibold text-gray-900">
                MRI Xplore Cookie Policy
              </h2>

              
            </div>

            {/* BODY */}
            <div className="px-6 md:px-10 py-8 space-y-8 text-sm">

              <div>
                <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
                  1. Introduction
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  MRI Xplore uses cookies and similar tracking technologies to
                  provide a secure, efficient, and personalized experience for
                  researchers, authors, reviewers, institutions, and visitors
                  accessing our platform. This Cookie Policy explains what
                  cookies are, how we use them, and the choices available to users.
                </p>
              </div>

              <hr />

              <div>
                <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
                  2. What Are Cookies?
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  Cookies are small text files stored on your device when you
                  visit a website. They help websites remember information about
                  your visit, preferences, login status, and browsing behavior
                  to improve functionality and user experience.
                </p>
              </div>

              <hr />

              <div>
                <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
                  3. Types of Cookies We Use
                </h3>

                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>
                    <strong>Essential Cookies:</strong> Required for website
                    functionality, security, authentication, and navigation.
                  </li>

                  <li>
                    <strong>Performance Cookies:</strong> Help us understand
                    how visitors interact with our platform and identify areas
                    for improvement.
                  </li>

                  <li>
                    <strong>Functional Cookies:</strong> Remember user
                    preferences and settings to enhance browsing experiences.
                  </li>

                  <li>
                    <strong>Analytics Cookies:</strong> Collect anonymous
                    information about website usage, traffic sources, and user
                    engagement.
                  </li>
                </ul>
              </div>

              <hr />

              <div>
                <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
                  4. How We Use Cookies
                </h3>

                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Maintain secure user sessions.</li>
                  <li>Improve website performance and reliability.</li>
                  <li>Analyze visitor behavior and platform usage.</li>
                  <li>Remember user preferences and settings.</li>
                  <li>Enhance navigation and overall user experience.</li>
                  <li>Support research discovery and content accessibility.</li>
                </ul>
              </div>

              <hr />

              <div>
                <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
                  5. Third-Party Cookies
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  Certain services integrated with MRI Xplore may place cookies
                  on your device. These services may include analytics providers,
                  hosting partners, authentication services, and other trusted
                  technology providers. Such third parties manage their cookies
                  according to their own privacy policies.
                </p>
              </div>

              <hr />

              <div>
                <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
                  6. Managing Cookies
                </h3>

                <p className="text-gray-700 leading-relaxed mb-3">
                  Most web browsers allow users to control or disable cookies
                  through browser settings. Users may:
                </p>

                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>View stored cookies.</li>
                  <li>Delete existing cookies.</li>
                  <li>Block future cookies.</li>
                  <li>Configure notifications before cookies are stored.</li>
                </ul>

                <p className="text-gray-700 leading-relaxed mt-3">
                  Disabling certain cookies may affect website functionality
                  and user experience.
                </p>
              </div>

              <hr />

              <div>
                <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
                  7. Data Protection
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  Information collected through cookies is handled in accordance
                  with MRI Xplore's Privacy Policy. We implement reasonable
                  safeguards to protect collected information from unauthorized
                  access, disclosure, or misuse.
                </p>
              </div>

              <hr />

              <div>
                <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
                  8. Changes to This Cookie Policy
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  MRI Xplore reserves the right to update or modify this Cookie
                  Policy at any time. Any changes will be posted on this page
                  and become effective immediately upon publication.
                </p>
              </div>

            </div>
          </div>

          {/* CONTACT */}
          <div className="mt-8 bg-white border border-[#ececec] rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#B8860B] text-white flex items-center justify-center">
                <Mail size={16} />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                Contact Information
              </h3>
            </div>

            <div className="text-gray-700 space-y-1 text-sm">
              <p><strong>MRI Xplore</strong></p>
              <p>Email: editor@mriindia.com</p>
              <p>Website: mriindia.com</p>
              <p>Call Us: +91 9960266198</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

