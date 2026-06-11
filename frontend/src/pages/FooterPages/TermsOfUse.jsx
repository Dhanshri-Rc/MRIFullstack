import Breadcrumb from "../../components/Breadcrumb";
import bg1 from "../../components/Breadcrumb";
import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  UserCheck,
  AlertTriangle,
  Copyright,
  Ban,
  Scale,
  Mail,
} from "lucide-react";

const sections = [
  {
    icon: <FileText size={22} />,
    title: "Acceptance of Terms",
    content:
      "By accessing or using MRI Xplore, you agree to comply with and be bound by these Terms of Use. If you do not agree with any part of these terms, please discontinue use of the platform immediately.",
  },
  {
    icon: <UserCheck size={22} />,
    title: "User Eligibility",
    content:
      "MRI Xplore is intended for researchers, academicians, students, professionals, and other users interested in scholarly communication. Users must provide accurate information when creating accounts or submitting content.",
  },
  {
    icon: <Copyright size={22} />,
    title: "Intellectual Property Rights",
    content:
      "All content, branding, logos, text, graphics, software, and platform materials are the property of MRI Xplore or its licensors and are protected by applicable intellectual property laws. Unauthorized reproduction or distribution is prohibited.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "User Content",
    content:
      "Users retain ownership of content they submit. By uploading content, users grant MRI Xplore a non-exclusive right to display, store, index, and distribute such content for platform operations and academic dissemination purposes.",
  },
  {
    icon: <Ban size={22} />,
    title: "Prohibited Activities",
    content:
      "Users shall not engage in unlawful activities, distribute malicious software, attempt unauthorized access, submit misleading information, violate intellectual property rights, or disrupt platform functionality.",
  },
  {
    icon: <AlertTriangle size={22} />,
    title: "Disclaimer of Warranties",
    content:
      "MRI Xplore provides services on an 'as available' and 'as is' basis. We do not guarantee uninterrupted availability, accuracy, reliability, or suitability of platform content and services.",
  },
  {
    icon: <Scale size={22} />,
    title: "Limitation of Liability",
    content:
      "MRI Xplore shall not be liable for indirect, incidental, consequential, or special damages arising from the use of or inability to use the platform, including loss of data, profits, or research opportunities.",
  },
  {
    icon: <Mail size={22} />,
    title: "Contact Information",
    content:
      "For questions regarding these Terms of Use, users may contact MRI Xplore through the official communication channels provided on the platform.",
  },
];

export default function TermsOfUse() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#fdf8f0] overflow-hidden py-14 px-6 lg:px-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url(${bg1})` }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-3">
            Terms of Use
          </h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 50 }}
            transition={{ duration: 0.6 }}
            className="h-0.5 bg-[#B8860B] mb-4"
          />

          <p className="text-[#B8860B] font-semibold text-lg lg:text-xl mb-3">
            Guidelines for Accessing and Using MRI Xplore
          </p>

          <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
            These Terms of Use govern your access to and use of MRI Xplore,
            including all services, content, resources, and features provided
            through the platform.
          </p>
        </motion.div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white py-3 px-6 lg:px-16 border-b border-gray-100">
        <div className="relative max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: "Terms of Use", path: "/terms-of-use" }]}
          />
        </div>
      </div>

      {/* Last Updated */}
      <section className="py-6 px-6 lg:px-10 bg-white">
        <div className="relative max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-[#fdf8f0] border border-[#B8860B]/20 px-4 py-2 rounded-full">
            <span className="text-[#B8860B] font-medium text-sm">
              Last Updated: June 2026
            </span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="pb-8 px-6 lg:px-10">
        <div className="relative max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <p className="text-gray-600 text-sm leading-7">
              MRI Xplore is committed to providing a secure, reliable, and
              professional environment for academic collaboration, research
              dissemination, publication services, and scholarly networking.
              These Terms of Use establish the rules and conditions governing
              the use of our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="pb-16 px-6 lg:px-10">
        <div className="relative max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 grid gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex gap-4 p-6">
                <div className="w-12 h-12 flex-shrink-0 rounded-full bg-[#fdf8f0] flex items-center justify-center text-[#B8860B]">
                  {section.icon}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {section.title}
                  </h2>

                  <p className="text-gray-600 text-sm leading-7">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Governing Law */}
      <section className="bg-[#fdf8f0] py-12 px-6 lg:px-10">
        <div className="relative max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8 border-l-4 border-[#B8860B]">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Governing Law
            </h2>

            <p className="text-gray-600 text-sm leading-7">
              These Terms of Use shall be governed and interpreted in accordance
              with the applicable laws of India. Any disputes arising from the
              use of MRI Xplore shall be subject to the jurisdiction of the
              competent courts in India.
            </p>
          </div>
        </div>
      </section>

      {/* Amendments */}
      <section className="py-12 px-6 lg:px-10">
        <div className="relative max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Changes to These Terms
            </h2>

            <p className="text-gray-600 text-sm leading-7">
              MRI Xplore reserves the right to modify or update these Terms of
              Use at any time. Updated versions will be published on this page,
              and continued use of the platform constitutes acceptance of the
              revised terms.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}