
import Breadcrumb from "../../components/Breadcrumb";
import { Cookie, Mail } from "lucide-react";
import { motion } from "framer-motion";



export default function CookiePolicy() {
  return (
    <div className="bg-[#f8f8f8] min-h-screen">

      {/* HERO */}
    <motion.section
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="bg-[#fdfaf5] border-b border-[#ece3d2]"
>
  <div className="max-w-7xl mx-auto px-10 sm:px-12 lg:px-20 py-12">

    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-4xl"
    >

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex items-center gap-2 text-[#B8860B] mb-2"
      >
        <motion.div
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Cookie size={18} />
        </motion.div>

        <span className="font-medium text-sm">
          MRI Xplore Cookie Center
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-2xl lg:text-3xl font-serif text-gray-900"
      >
        Cookie Policy
      </motion.h1>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 48 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="h-[2px] bg-[#B8860B] mt-2 mb-3"
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-[#B8860B] font-medium text-[15px] leading-relaxed"
      >
        Understanding how MRI Xplore uses cookies and similar technologies.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-2 text-gray-600 leading-relaxed text-sm max-w-[580px]"
      >
        MRI Xplore uses cookies and related technologies to enhance user
        experience, improve platform functionality, analyze website
        performance, and support research discovery services.
      </motion.p>

    </motion.div>

  </div>
</motion.section>

      {/* BREADCRUMB */}
     <motion.div
  initial={{ opacity: 0, y: -15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="bg-white border-b"
>
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
</motion.div>

      {/* CONTENT */}
     <section className="py-8 px-8 sm:px-12 lg:px-20">
  <div className="max-w-7xl mx-auto">

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
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
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-b border-[#ececec] px-6 md:px-10 py-6 bg-[#fcfaf6]"
      >
        <h2 className="text-2xl font-semibold text-gray-900">
          MRI Xplore Cookie Policy
        </h2>
      </motion.div>

      {/* BODY */}
      <div className="px-6 md:px-10 py-8 space-y-8 text-sm">

        {/* 1 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
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
        </motion.div>

        <hr />

        {/* 2 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
            2. What Are Cookies?
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Cookies are small text files stored on your device when you
            visit a website. They help websites remember information about
            your visit, preferences, login status, and browsing behavior
            to improve functionality and user experience.
          </p>
        </motion.div>

        <hr />

        {/* 3 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
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
        </motion.div>

        <hr />

        {/* 4 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
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
        </motion.div>

        <hr />

        {/* 5 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
            5. Third-Party Cookies
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Certain services integrated with MRI Xplore may place cookies
            on your device. These services may include analytics providers,
            hosting partners, authentication services, and other trusted
            technology providers.
          </p>
        </motion.div>

        <hr />

        {/* 6 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
            6. Managing Cookies
          </h3>

          <p className="text-gray-700 leading-relaxed mb-3">
            Most web browsers allow users to control or disable cookies
            through browser settings.
          </p>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>View stored cookies.</li>
            <li>Delete existing cookies.</li>
            <li>Block future cookies.</li>
            <li>Configure notifications before cookies are stored.</li>
          </ul>
        </motion.div>

        <hr />

        {/* 7 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
            7. Data Protection
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Information collected through cookies is handled in accordance
            with MRI Xplore's Privacy Policy. We implement reasonable
            safeguards to protect collected information.
          </p>
        </motion.div>

        <hr />

        {/* 8 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
            8. Changes to This Cookie Policy
          </h3>

          <p className="text-gray-700 leading-relaxed">
            MRI Xplore reserves the right to update or modify this Cookie
            Policy at any time. Any changes will be posted on this page
            and become effective immediately upon publication.
          </p>
        </motion.div>

      </div>
    </motion.div>

    {/* CONTACT */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      whileHover={{ y: -4 }}
      className="mt-8 bg-white border border-[#ececec] rounded-xl p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          whileHover={{ rotate: 8, scale: 1.08 }}
          className="w-8 h-8 rounded-lg bg-[#B8860B] text-white flex items-center justify-center"
        >
          <Mail size={16} />
        </motion.div>

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
    </motion.div>

  </div>
</section>

    </div>
  );
}

