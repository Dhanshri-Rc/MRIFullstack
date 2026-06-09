import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import bg1 from "../assets/1bg.png";
import building from "../assets/building.png";
import bgClass from "../assets/vissionn.png";
import {
  Goal,
  Eye,
  Users,
  BookOpen,
  Calendar,
  Trophy,
  Search,
  GraduationCap,
  Globe,
  Star,
  ShieldCheck,
  UserCheck,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* Counter Hook */
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
};

const stats = [
  { num: 500, label: "Members", icon: <Users size={28} strokeWidth={1.5} /> },
  {
    num: 50,
    label: "Events Organized",
    icon: <Calendar size={28} strokeWidth={1.5} />,
  },
  {
    num: 100,
    label: "Research Collaborations",
    icon: <BookOpen size={28} strokeWidth={1.5} />,
  },
  {
    num: 10,
    label: "Years of Excellence",
    icon: <Trophy size={28} strokeWidth={1.5} />,
  },
];

const objectives = [
  {
    title: "Promote Research",
    desc: "Promote and support high-quality mathematical research across diverse areas.",
    icon: <Search size={24} strokeWidth={1.5} />,
  },
  {
    title: "Foster Collaboration",
    desc: "Encourage collaboration among researchers, institutions, and organizations worldwide.",
    icon: <Users size={24} strokeWidth={1.5} />,
  },
  {
    title: "Disseminate Knowledge",
    desc: "Publish and disseminate research findings through journals, proceedings, and other platforms.",
    icon: <BookOpen size={24} strokeWidth={1.5} />,
  },
  {
    title: "Organize Events",
    desc: "Organize conferences, workshops, seminars, and training programs to exchange ideas.",
    icon: <Calendar size={24} strokeWidth={1.5} />,
  },
  {
    title: "Nurture Talent",
    desc: "Support young mathematicians through mentoring, grants, and career development.",
    icon: <GraduationCap size={24} strokeWidth={1.5} />,
  },
  {
    title: "Serve Society",
    desc: "Apply mathematics to address real-world problems and contribute to societal progress.",
    icon: <Globe size={24} strokeWidth={1.5} />,
  },
];

const values = [
  {
    title: "Excellence",
    desc: "We pursue the highest standards in research and education.",
    icon: <Star size={28} strokeWidth={1.5} />,
  },
  {
    title: "Integrity",
    desc: "We uphold honesty, transparency, and ethical practices.",
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
  },
  {
    title: "Collaboration",
    desc: "We believe in the power of working together for greater impact.",
    icon: <Users size={28} strokeWidth={1.5} />,
  },
  {
    title: "Inclusivity",
    desc: "We value diversity and promote an inclusive academic community.",
    icon: <UserCheck size={28} strokeWidth={1.5} />,
  },
  {
    title: "Innovation",
    desc: "We encourage creative thinking and innovative approaches.",
    icon: <Lightbulb size={28} strokeWidth={1.5} />,
  },
];

export default function About() {
  return (
    <div className="">
      {/* Hero */}
      <section className="relative bg-[#fdf8f0] overflow-hidden py-12 px-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 "
          style={{ backgroundImage: `url(${bg1})` }}
        />
        

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-3">
              About Us
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-0.5 bg-[#B8860B] mb-4"
            />
            <p className="text-[#B8860B] font-semibold text-[20px] mb-4">
              Advancing mathematics. Inspiring minds.
            </p>
            <p className=" leading-relaxed mb-4 text-gray-600 text-[14px] ">
              The Mathematical Research Institute of India (MRI India) is
              dedicated to the advancement of mathematical sciences through
              research, collaboration, and the dissemination of knowledge.
            </p>
            <p className="text-gray-600 text-[14px] leading-relaxed">
              We strive to create a vibrant community of mathematicians and
              researchers Who work together to solve problems, explore new ideas, and contribute to society through the power of mathematics.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white py-3 lg:px-16 px-10">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: "About Us", path: "/about" }]} />
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-12 md:py-6 bg-white px-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* SINGLE CONTAINER */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative bg-white rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            {/* LEFT THICK BORDER (animated) */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 0.8 }}
              className="absolute left-0 top-0 w-[10px] md:w-[15px] bg-[#B8860B] rounded-r-full"
            />

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* LEFT SIDE - MISSION */}
              <motion.div
                whileHover={{ y: -5 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-8 items-start transition"
              >
                {/* Image with zoom */}
                <div className="overflow-hidden rounded-lg w-full sm:w-44 h-48 sm:h-52 flex-shrink-0">
                  <motion.img
                    src={building}
                    alt="Building"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <motion.span
                      whileHover={{ rotate: 10, scale: 1.2 }}
                      className="text-[#B8860B]"
                    >
                      <Goal className="w-5 h-5" />
                    </motion.span>

                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      Our Mission
                    </h3>
                  </div>

                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3">
                    To promote excellence in mathematical research, foster
                    collaboration, and support the growth of the mathematics
                    community in India and beyond.
                  </p>

                  {/* Animated line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 40 }}
                    transition={{ duration: 0.5 }}
                    className="h-0.5 bg-[#B8860B] mb-4"
                  />

                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    We are committed to advancing knowledge, encouraging
                    innovation, and inspiring the next generation of
                    mathematicians.
                  </p>
                </div>
              </motion.div>

              {/* RIGHT SIDE - VISION */}
              <motion.div
                whileHover={{ y: -5 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-8 items-start border-t md:border-t-0 md:border-l border-gray-200 transition"
              >
                {/* Image with zoom */}
                <div className="overflow-hidden rounded-lg w-full sm:w-44 h-48 sm:h-52 flex-shrink-0">
                  <motion.img
                    src={bgClass}
                    alt="Research"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <motion.span
                      whileHover={{ rotate: -10, scale: 1.2 }}
                      className="text-[#B8860B]"
                    >
                      <Eye className="w-5 h-5" />
                    </motion.span>

                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      Our Vision
                    </h3>
                  </div>

                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3">
                    To be a leading institute recognized globally for excellence
                    in mathematical research, education, and outreach.
                  </p>

                  {/* Animated line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 40 }}
                    transition={{ duration: 0.5 }}
                    className="h-0.5 bg-[#B8860B] mb-4"
                  />

                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    We envision a world where mathematics drives discovery,
                    solves real-world challenges, and improves lives.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-6 px-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-xl shadow flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {stats.map((s, i) => {
              const count = useCounter(s.num);

              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex-1 flex items-center justify-center gap-3 py-6 px-4 cursor-pointer"
                >
                  <div className="text-[#B8860B]">{s.icon}</div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {count}+
                    </div>
                    <div className="text-gray-900 text-sm font-semibold">
                      {s.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-6 bg-white px-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Our Objectives
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {objectives.map((o, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="text-center px-4 py-6 bg-white rounded-lg hover:shadow-lg transition"
              >
                <div className="w-16 h-16 rounded-full bg-[#fdf8f0] flex items-center justify-center mx-auto mb-3 text-[#B8860B]">
                  {o.icon}
                </div>

                <h4 className="font-bold text-gray-900 text-sm mb-2">
                  {o.title}
                </h4>

                <p className="text-gray-500 text-xs leading-relaxed">
                  {o.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-6 bg-[#fdf8f0] px-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="text-[#B8860B] mb-3 flex justify-center">
                  {v.icon}
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-2">
                  {v.title}
                </h4>
                <p className="text-gray-500 text-xs">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-6 bg-white px-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#faf6ef] to-[#f5efe6] border rounded-xl px-8 py-6 shadow"
          >
            <div className="flex items-center gap-4">
              <div className="text-[#B8860B]">
                <Users size={40} strokeWidth={1.5} />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  Be a part of our growing community
                </h3>
                <p className="text-gray-500 text-sm">
                  Join MRI India and contribute to mathematics.
                </p>
              </div>
            </div>

            <Link
              to="/membership"
              className="inline-flex items-center gap-2 bg-[#B8860B] hover:bg-[#9c7410] text-white text-xs font-semibold px-6 py-3 rounded-md transition"
            >
              BECOME A MEMBER
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}