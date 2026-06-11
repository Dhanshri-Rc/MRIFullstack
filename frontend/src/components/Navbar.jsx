import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/mlogo.webp";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Journals", path: "/journals" },
  { label: "About Us", path: "/about" },
  { label: "Advanced Search", path: "/advanced-search" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1280px] mx-auto h-[74px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 shrink-0">
          <img
            src={logo}
            alt="MRI India"
            className="h-[48px] sm:h-[50px] w-auto object-contain"
          />

          <span className="hidden md:block w-[1px] h-[40px] bg-[#c8922a]" />

          <h1 className="hidden md:block text-[20px] lg:text-[24px] font-semibold tracking-[-0.5px] text-[#111]">
            MRI <span className="text-[#c27a12]">Xplore</span>
          </h1>
        </Link>

        <nav className="hidden lg:flex items-center gap-9 lg:mr-9">
          {navLinks.map((link) => {
            const active = pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-1 text-[14px] font-semibold transition-all duration-300 hover:text-[#c27a12] ${
                  active ? "text-[#c27a12]" : "text-[#111]"
                }`}
              >
                {link.label}

                <span
                  className={`absolute left-0 bottom-[1px] h-[2px] bg-[#c27a12] transition-all duration-300  ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
              
            );
          })}
         
        </nav>

       

        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-md border border-[#eadfd3] text-[#9a6416]"
        >
          <Menu size={23} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[60] lg:hidden"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed right-0 top-0 h-dvh w-[72vw] max-w-[230px] bg-white z-[70] shadow-[-10px_0_30px_rgba(0,0,0,0.18)]"
            >
              <div className="h-[70px] px-3 flex items-center justify-between border-b border-[#eadfd3]">
                <img src={logo} alt="MRI India" className="h-[34px] w-auto" />

                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-6 h-6 flex items-center justify-center rounded-md border border-[#eadfd3] text-[#000] ml-3"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="px-4 py-5 flex flex-col gap-2">
                {navLinks.map((link) => {
                  const active = pathname === link.path;

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`px-4 py-3 rounded-[6px] text-[14px] font-semibold transition-all ${
                        active
                          ? "bg-[#fbf1df] text-[#c27a12]"
                          : "text-[#111] hover:bg-[#fbfaf8] hover:text-[#c27a12]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}