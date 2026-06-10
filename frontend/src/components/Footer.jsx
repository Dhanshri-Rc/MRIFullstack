import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Mail, Building2 } from "lucide-react";
import logo from "../assets/flogo.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="block text-[11px] text-white/80 hover:text-[#d69a22] hover:translate-x-1 transition-all duration-300"
    >
      {children}
    </Link>
  );
}

function SocialIcon({ href, children, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -2, scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="w-[28px] h-[28px] rounded-full border border-white/25 flex items-center justify-center text-white hover:text-[#d69a22] hover:border-[#d69a22] transition-all duration-300"
    >
      {children}
    </motion.a>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    alert("Subscribed successfully!");
    setEmail("");
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="relative overflow-hidden bg-[#000] text-white"
    >
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_90%_20%,rgba(214,154,34,0.22),transparent_35%)]" />

      <div className="relative max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.9fr_0.8fr_1.55fr] gap-5 lg:gap-8">
          <div>
            <img
              src={logo}
              alt="MRI Xplore"
              className="w-[190px] h-auto object-contain mb-2"
            />
            <p className="text-[11px] text-white/80 leading-[1.55] max-w-[240px]">
              MRI Xplore is a comprehensive search engine for MRI journals in
              India, empowering research and connecting knowledge.
            </p>
          </div>

          <div>
            <h4 className="text-[12px] font-bold mb-2">Quick Links</h4>
            <div className="space-y-1.5">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/journals">Journals</FooterLink>
              <FooterLink to="/advanced-search">Advanced Search</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </div>
          </div>

          <div>
            <h4 className="text-[12px] font-bold mb-2">Resources</h4>
            <div className="space-y-1.5">
              <FooterLink to="/for-authors">For Authors</FooterLink>
              <FooterLink to="/for-reviewers">For Reviewers</FooterLink>
              <FooterLink to="/submission-guidelines">
                Submission Guidelines
              </FooterLink>
              <FooterLink to="/faqs">FAQs</FooterLink>
            </div>
          </div>

          <div>
            <h4 className="text-[12px] font-bold mb-2">Policies</h4>
            <div className="space-y-1.5">
              <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Use</FooterLink>
              <FooterLink to="/refund-policy">Refund Policy</FooterLink>
              <FooterLink to="/cookie-policy">Cookie Policy</FooterLink>
            </div>
          </div>

          <div>
            <h4 className="text-[12px] font-bold mb-2">Stay Connected</h4>
            <p className="text-[11px] text-white/80 leading-[1.45] mb-2">
              Subscribe to our newsletter for the latest updates and research
              insights.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-[275px] rounded-[4px] overflow-hidden bg-white"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-[30px] flex-1 px-3 text-[11px] text-[#111] outline-none"
              />
              <button className="h-[30px] px-3 bg-[#c47a0c] hover:bg-[#a86408] text-white text-[11px] font-semibold transition-all">
                Subscribe
              </button>
            </form>

            <div className="flex items-center gap-2.5 mt-2.5">
              <SocialIcon href="https://linkedin.com" label="LinkedIn">
                <FaLinkedinIn size={12} />
              </SocialIcon>

              <SocialIcon href="https://twitter.com" label="Twitter">
                <FaTwitter size={12} />
              </SocialIcon>

              <SocialIcon href="mailto:info@mriindia.org" label="Email">
                <Mail size={12} />
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-white/10 pt-3 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-white/70 text-center md:text-left">
            © 2025 Multidisciplinary Research Institute, India. All rights
            reserved.
          </p>

          <div className="flex items-center gap-1.5 text-[11px] text-white/75 text-center">
            <Building2 size={13} className="text-[#d69a22]" />
            <span className="text-[#d69a22] font-semibold">MRI Xplore</span>
            <span>– Empowering Research. Connecting Knowledge.</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}