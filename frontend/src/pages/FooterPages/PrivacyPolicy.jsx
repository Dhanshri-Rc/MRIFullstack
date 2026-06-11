
import Breadcrumb from "../../components/Breadcrumb";
import { ShieldCheck, Mail } from "lucide-react";


export default function PrivacyPolicy() {
  return (
    <div className="bg-[#f8f8f8] min-h-screen">

      {/* HERO */}
      <section className="bg-[#fdfaf5] border-b border-[#ece3d2]">
        <div className="max-w-7xl mx-auto px-10 sm:px-12 lg:px-20 py-12 bg-cover bg-center "
         >

          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-[#B8860B] mb-2">
              <ShieldCheck size={18} />
              <span className="font-medium text-sm">
                MRI Xplore Policy Center
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-serif text-gray-900">
              Privacy Policy
            </h1>

            <div className="w-12 h-[2px] bg-[#B8860B] mt-2 mb-3" />

            <p className="text-[#B8860B] font-medium text-[15px] leading-relaxed">
              Protecting researchers, authors, institutions, and visitors.
            </p>

            <p className="mt-2 text-gray-600 leading-relaxed text-sm max-w-[580px]">
              MRI Xplore is committed to maintaining the privacy,
              confidentiality, and security of information collected through
              our research discovery and scholarly communication platform.
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
                label: "Privacy Policy",
                path: "/privacy-policy",
              },
            ]}
          />
        </div>
      </div>

      {/* CONTENT */}
      <section className=" py-8 px-8 sm:px-12 lg:px-20">
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
                MRI Xplore Privacy Statement
              </h2>

           
            </div>

            {/* BODY */}
            <div className="px-6 md:px-10 py-8 space-y-8 text-sm">

              <div>
                <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
                  1. Introduction
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  MRI Xplore recognizes the importance of protecting personal
                  information and maintaining user trust. This Privacy Policy
                  explains how information is collected, used, stored,
                  disclosed, and protected when accessing our platform,
                  journals, services, and digital resources.
                </p>
              </div>
                      <hr />
              <div>
                <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
                  2. Information We Collect
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  We may collect information including names, email addresses,
                  institutional affiliations, author profiles, manuscript
                  submissions, reviewer information, account details, and
                  platform usage data necessary for providing services.
                </p>
              </div>
    <hr />
              <div>
                <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
                  3. Use of Information
                </h3>

                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Provide and improve research discovery services.</li>
                  <li>Support journal publishing workflows.</li>
                  <li>Manage accounts and communications.</li>
                  <li>Respond to inquiries and support requests.</li>
                  <li>Enhance security and platform performance.</li>
                </ul>
              </div>
<hr />
              <div>
                <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
                  4. Cookies and Analytics
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  MRI Xplore may use cookies and analytics technologies to
                  improve user experience, understand platform usage, maintain
                  session functionality, and enhance website performance.
                </p>
              </div>
                    <hr />
              <div>
                <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
                  5. Information Sharing
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  We do not sell personal information. Information may be shared
                  with trusted service providers where necessary to operate the
                  platform, comply with legal obligations, or support scholarly
                  publishing activities.
                </p>
              </div>
                    <hr/>  
              <div>
                <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
                  6. Data Security
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  Appropriate technical and organizational safeguards are
                  implemented to protect information from unauthorized access,
                  misuse, alteration, disclosure, or destruction.
                </p>
              </div>
    <hr />
              <div>
                <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
                  7. User Rights
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  Users may request access, correction, updating, restriction,
                  or deletion of personal information, subject to applicable
                  legal requirements and publishing obligations.
                </p>
              </div>
    <hr />
              <div>
                <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
                  8. Changes to This Policy
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  MRI Xplore reserves the right to modify this Privacy Policy.
                  Any updates will be published on this page and become
                  effective immediately upon publication.
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

