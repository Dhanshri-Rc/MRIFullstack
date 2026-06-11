
import Breadcrumb from "../../components/Breadcrumb";
import { ShieldCheck, Mail } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const lineAnimation = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.6,
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#f8f8f8] min-h-screen">

      {/* HERO */}
      <section className="bg-[#fdfaf5] border-b border-[#ece3d2]">
        <div className="max-w-7xl mx-auto px-10 sm:px-12 lg:px-20 py-12 bg-cover bg-center "
         >
<motion.div
  className="max-w-4xl"
  initial="hidden"
  animate="visible"
  variants={staggerContainer}
>
            <motion.div
  variants={fadeUp}
  className="flex items-center gap-2 text-[#B8860B] mb-2"
>
              <ShieldCheck size={18} />
              <span className="font-medium text-sm">
                MRI Xplore Policy Center
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-2xl lg:text-3xl font-serif text-gray-900">
              Privacy Policy
            </motion.h1>

            <motion.div
  initial={{ width: 0 }}
  whileInView={{ width: 48 }}
  transition={{ duration: 0.8 }}
  className="w-12 h-[2px] bg-[#B8860B] mt-2 mb-3" />

           <motion.p
  variants={fadeUp}
  className="text-[#B8860B] font-medium text-[15px] leading-relaxed">
              Protecting researchers, authors, institutions, and visitors.
            </motion.p>

            <motion.p
  variants={fadeUp}
  className="mt-2 text-gray-600 leading-relaxed text-sm max-w-[580px]">
              MRI Xplore is committed to maintaining the privacy,
              confidentiality, and security of information collected through
              our research discovery and scholarly communication platform.
            </motion.p>
          </motion.div>

        </div>
      </section>

      {/* BREADCRUMB */}
{/* BREADCRUMB */}
<motion.div
  initial={{ opacity: 0, y: -15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="bg-white border-b"
>
  <div className="max-w-7xl mx-auto px-10 sm:px-12 lg:px-20 py-3">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      whileHover={{ x: 3 }}
    >
      <Breadcrumb
        items={[
          {
            label: "Privacy Policy",
            path: "/privacy-policy",
          },
        ]}
      />
    </motion.div>
  </div>
</motion.div>

      {/* CONTENT */}
     <section className="py-8 px-8 sm:px-12 lg:px-20">
  <div className="max-w-7xl mx-auto">

    {/* MAIN CARD */}
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
          MRI Xplore Privacy Statement
        </h2>
      </motion.div>

      {/* BODY */}
      <div className="px-6 md:px-10 py-8 space-y-8 text-sm">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
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
        </motion.div>

        <motion.hr
          variants={lineAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="origin-left"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
            2. Information We Collect
          </h3>

          <p className="text-gray-700 leading-relaxed">
            We may collect information including names, email addresses,
            institutional affiliations, author profiles, manuscript
            submissions, reviewer information, account details, and
            platform usage data necessary for providing services.
          </p>
        </motion.div>

        <motion.hr
          variants={lineAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="origin-left"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
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
        </motion.div>

        <motion.hr
          variants={lineAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="origin-left"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
            4. Cookies and Analytics
          </h3>

          <p className="text-gray-700 leading-relaxed">
            MRI Xplore may use cookies and analytics technologies to
            improve user experience, understand platform usage, maintain
            session functionality, and enhance website performance.
          </p>
        </motion.div>

        <motion.hr
          variants={lineAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="origin-left"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
            5. Information Sharing
          </h3>

          <p className="text-gray-700 leading-relaxed">
            We do not sell personal information. Information may be shared
            with trusted service providers where necessary to operate the
            platform, comply with legal obligations, or support scholarly
            publishing activities.
          </p>
        </motion.div>

        <motion.hr
          variants={lineAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="origin-left"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
            6. Data Security
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Appropriate technical and organizational safeguards are
            implemented to protect information from unauthorized access,
            misuse, alteration, disclosure, or destruction.
          </p>
        </motion.div>

        <motion.hr
          variants={lineAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="origin-left"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
            7. User Rights
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Users may request access, correction, updating, restriction,
            or deletion of personal information, subject to applicable
            legal requirements and publishing obligations.
          </p>
        </motion.div>

        <motion.hr
          variants={lineAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="origin-left"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-[#B8860B] mb-3">
            8. Changes to This Policy
          </h3>

          <p className="text-gray-700 leading-relaxed">
            MRI Xplore reserves the right to modify this Privacy Policy.
            Any updates will be published on this page and become
            effective immediately upon publication.
          </p>
        </motion.div>

      </div>
    </motion.div>

    {/* CONTACT CARD */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
      }}
      className="mt-8 bg-white border border-[#ececec] rounded-xl p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          whileHover={{
            scale: 1.1,
            rotate: 8,
          }}
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

