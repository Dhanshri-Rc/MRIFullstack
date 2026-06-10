import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Mail,Phone,MapPin,Clock,Plus,Send,Handshake,} from "lucide-react";
import bg6 from "../assets/hbg2.webp";
import { submitContact, getContactInfo } from "../api/api";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: "easeOut" },
  }),
};

const faqs = [
  "How do I search for journals?",
  "How can I submit my journal?",
  "Is there any fee to access journals?",
  "How do I contact the support team?",
  "Can I suggest a new journal?",
];

export default function ContactUs() {
  const [openFaq, setOpenFaq] = useState(null);
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    agree: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState({ type: "", text: "" });
  const [contactInfo, setContactInfo] = useState(null);

 useEffect(() => {
  const fetchContactInfo = async () => {
    try {
      const res = await getContactInfo();
      setContactInfo(res.data || {});
    } catch (err) {
      console.error("Failed to load contact info:", err);
    }
  };

  fetchContactInfo();
}, []);



useEffect(() => {
  if (location.hash === "#contact-hero") {
    document
      .getElementById("contact-hero")
      ?.scrollIntoView({ behavior: "smooth" });
  }
}, [location]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agree) {
      setSubmitMsg({ type: "error", text: "Please agree to Privacy Policy and Terms of Use." });
      return;
    }
    setSubmitting(true);
    setSubmitMsg({ type: "", text: "" });
    try {
      const res = await submitContact({ name: form.name, email: form.email, subject: form.subject, message: form.message });
      setSubmitMsg({ type: "success", text: res.message || "Message sent successfully." });
      setForm({ name: "", email: "", subject: "", message: "", agree: false });
    } catch (err) {
      setSubmitMsg({ type: "error", text: err.response?.data?.message || "Failed to send message. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-[#fbfaf8] min-h-screen">
      {/* Banner */}
      <section
  id="contact-hero"
  className="relative h-[130px] sm:h-[160px] overflow-hidden bg-[#1b1208]"
>
        <img
          src={bg6}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-right"
        />
        <div className="absolute " />

        <div className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6 h-full flex items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-white text-[26px] sm:text-[32px] font-bold">
              Contact Us
            </h1>
            <div className="w-[44px] h-[2px] bg-[#d69a22] mt-2 mb-2" />
            <p className="text-white text-[12px] sm:text-[14px] leading-[1.6] max-w-[430px]">
              We're here to help! Reach out to us for any queries, support, or
              partnership opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6 py-5 sm:py-7">
        <div className="grid grid-cols-1 lg:grid-cols-[285px_1fr_270px] gap-5">
          {/* Left Contact */}
          <motion.aside
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-white border border-[#eee2d4] rounded-[6px] p-4 shadow-[0_8px_28px_rgba(0,0,0,0.04)]"
          >
           <SectionTitle title="Get in Touch" />

<ContactItem
  icon={<Mail size={23} />}
  title="Email Us"
  text="For general queries and support"
  highlight={contactInfo?.email || "editor@mriindia.com"}
  onClick={() =>
    window.open(
      `mailto:${contactInfo?.email || "editor@mriindia.com"}`
    )
  }
/>

<ContactItem
  icon={<Phone size={22} />}
  title="Call Us"
  highlight={contactInfo?.phone || "+91 9960266198"}
  onClick={() =>
    window.open(`tel:${contactInfo?.phone || "+919960266198"}`)
  }
/>

<ContactItem
  icon={<MapPin size={23} />}
  title="Visit Us"
  text={
    contactInfo?.address ||
    "Multidisciplinary Research Institute (MRI) 1, Institutional Area, Taramani, Chennai - 600113, Tamil Nadu, India"
  }
  highlight="View on Map"
  onClick={() =>
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        contactInfo?.address ||
          "Multidisciplinary Research Institute Nagpur, Maharashtra, India"
      )}`,
      "_blank"
    )
  }
/>

<ContactItem
  icon={<Clock size={23} />}
  title="Working Hours"
  text={
    contactInfo?.workingHours ||
    "Monday - Saturday : 9:00 AM - 6:00 PM (IST) Sunday & Public Holidays - Closed"
  }
  
/>
          </motion.aside>

          {/* Form */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="bg-white border border-[#eee2d4] rounded-[6px] p-4 sm:p-5 shadow-[0_8px_28px_rgba(0,0,0,0.04)]"
          >
            <h2 className="text-[18px] font-bold text-[#111] mb-4">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" required>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="input-ui"
                  />
                </Field>

                <Field label="Email Address" required>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                    className="input-ui"
                  />
                </Field>
              </div>

              <Field label="Subject" required>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="input-ui"
                >
                  <option value="">-- Select Subject --</option>
                  <option>Journal Query</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                  <option>General Inquiry</option>
                </select>
              </Field>

              <Field label="Message" required>
                <div className="relative">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    maxLength={1000}
                    required
                    rows={8}
                    placeholder="Type your message here..."
                    className="input-ui pt-2"
                  />
                  <span className="absolute right-3 bottom-2 text-[10px] text-[#777]">
                    {form.message.length}/1000
                  </span>
                </div>
              </Field>

              <div className="flex items-center justify-between gap-3 flex-wrap">
                <label className="flex items-start gap-2 text-[11px] text-[#555]">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    className="mt-[2px] accent-[#b87518]"
                  />
                  <span>
                    I agree to the{" "}
                    <a className="text-[#b87518] hover:underline">Privacy Policy</a>{" "}
                    and{" "}
                    <a className="text-[#b87518] hover:underline">Terms of Use</a>.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="h-[36px] px-5 rounded-[4px] bg-[linear-gradient(135deg,#d69a22_0%,#b87518_45%,#8e5b0d_100%)] text-white text-[12px] font-semibold flex items-center gap-2 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(184,117,24,0.28)] transition-all disabled:opacity-60"
                >
                  <Send size={14} />
                  {submitting ? "Sending..." : "Send Message"}
                </button>
                {submitMsg.text && (
                  <div className={`mt-3 p-3 rounded-lg text-[13px] font-medium ${submitMsg.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                    {submitMsg.text}
                  </div>
                )}
              </div>
            </form>
          </motion.section>

          {/* FAQ */}
          <motion.aside
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
            className="bg-white border border-[#eee2d4] rounded-[6px] p-4 shadow-[0_8px_28px_rgba(0,0,0,0.04)]"
          >
            <SectionTitle title="Frequently Asked Questions" />

            <div className="space-y-3 mt-5">
              {faqs.map((item, i) => (
                <div
                  key={item}
                  className="border border-[#e7e1da] rounded-[5px] overflow-hidden hover:border-[#d69a22] transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full min-h-[36px] px-3 flex items-center justify-between text-left text-[11px] font-semibold text-[#222]"
                  >
                    {item}
                    <Plus
                      size={14}
                      className={`text-[#b87518] transition-transform ${
                        openFaq === i ? "rotate-45" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-3 pb-3 text-[11px] text-[#555] leading-[1.5]"
                      >
                        You can contact our team or use MRI Xplore features for
                        journal search, support, and submissions.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* <button className="mt-5 h-[34px] px-4 rounded-[4px] border border-[#d69a22] text-[#b87518] text-[12px] font-semibold flex items-center gap-2 hover:bg-[#b87518] hover:text-white transition-all">
              <HelpCircle size={14} />
              View All FAQs
            </button> */}
          </motion.aside>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#fbf6ee] border-t border-[#eee2d4] py-4">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-5 text-center">
          <h3 className="font-bold text-[15px]">
            Looking for collaboration or partnerships?
          </h3>
          <Link
  to="/contact#contact-hero"
  onClick={() => {
    setTimeout(() => {
      document
        .getElementById("contact-hero")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }}
>
          <button className="h-[34px] px-5 rounded-[5px] border border-[#d69a22] text-[#b87518] text-[12px] font-semibold flex items-center gap-2 hover:bg-[#b87518] hover:text-white transition-all">
            <Handshake size={15} />
            Write to Us
          </button>
          </Link>
        </div>
      </section>

      <style>{`
        .input-ui {
          width: 100%;
          min-height: 34px;
          border: 1px solid #dedede;
          border-radius: 4px;
          padding: 0 12px;
          font-size: 11px;
          outline: none;
          transition: all .25s ease;
          background: white;
        }
        .input-ui:focus {
          border-color: #b87518;
          box-shadow: 0 0 0 3px rgba(184,117,24,.09);
        }
      `}</style>
    </main>
  );
}

function SectionTitle({ title }) {
  return (
    <>
      <h2 className="text-[17px] font-bold text-[#111]">{title}</h2>
      <div className="w-[28px] h-[2px] bg-[#d69a22] mt-2" />
    </>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold text-[#111] mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}

function ContactItem({ icon, title, text, highlight, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex gap-3 py-4 border-b border-[#eee2d4] last:border-b-0 group cursor-pointer"
    >
      <div className="w-[42px] h-[42px] rounded-full bg-[#fbf1df] text-[#b87518] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
        {icon}
      </div>

      <div>
        <h3 className="text-[13px] font-bold text-[#111]">{title}</h3>

        <p className="text-[11px] text-[#555] leading-[1.5] mt-1">
          {text}
        </p>

        {highlight && (
          <p className="text-[11px] font-semibold text-[#b87518] mt-1">
            {highlight}
          </p>
        )}
      </div>
    </div>
  );
}