import Breadcrumb from "../components/Breadcrumb";
import bg1 from "../assets/1bg.webp";
import building from "../assets/building.webp";
import bgClass from "../assets/vissionn.webp";
import {
  Goal,
  Eye,
  Users,
  BookOpen,
  Calendar,
  Search,
  GraduationCap,
  Globe,
  Star,
  ShieldCheck,
  UserCheck,
  Lightbulb,
} from "lucide-react";

import { motion } from "framer-motion";


/* Counter Hook */
// const useCounter = (end, duration = 2000) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const increment = end / (duration / 16);

//     const timer = setInterval(() => {
//       start += increment;
//       if (start >= end) {
//         setCount(end);
//         clearInterval(timer);
//       } else {
//         setCount(Math.ceil(start));
//       }
//     }, 16);

//     return () => clearInterval(timer);
//   }, [end, duration]);

//   return count;
// };

// const stats = [
//   { num: 500, label: "Members", icon: <Users size={28} strokeWidth={1.5} /> },
//   {
//     num: 50,
//     label: "Events Organized",
//     icon: <Calendar size={28} strokeWidth={1.5} />,
//   },
//   {
//     num: 100,
//     label: "Research Collaborations",
//     icon: <BookOpen size={28} strokeWidth={1.5} />,
//   },
//   {
//     num: 10,
//     label: "Years of Excellence",
//     icon: <Trophy size={28} strokeWidth={1.5} />,
//   },
// ];

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
      <section className="relative bg-[#fdf8f0] overflow-hidden lg:py-12 md:py-10 py-6 lg:px-10 px-2 md:px-6 justify">
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
    <section className="lg:py-12 md:py-10 py-6 bg-white px-6 lg:px-14 md:px-10">
  <div className="max-w-7xl mx-auto w-full">

    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="relative bg-white rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden w-full"
    >

      {/* LEFT BORDER */}
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        transition={{ duration: 0.8 }}
        className="absolute left-0 top-0 w-[6px] sm:w-[8px] md:w-[10px] lg:w-[15px] bg-[#B8860B] rounded-r-full"
      />

      {/* GRID FIX FOR TABLET */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0 lg:gap-0 w-full">

        {/* MISSION */}
        <motion.div
          whileHover={{ y: -5 }}
          className="
            flex flex-col lg:flex-row
            md:flex-col     /* ⭐ FIX: tablet becomes vertical */
            sm:flex-row
            gap-4 sm:gap-6
            p-4 sm:p-6 lg:p-8
            items-start w-full
          "
        >

          {/* IMAGE */}
          <div className="
            overflow-hidden rounded-lg w-full
            sm:w-40 md:w-full lg:w-44
            h-44 sm:h-48 md:h-56 lg:h-52
            flex-shrink-0
          ">
            <motion.img
              src={building}
              alt="Building"
              whileHover={{ scale: 1.05 }}
              className="w-full h-full object-cover"
            />
          </div>

          {/* TEXT */}
          <div className="w-full min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Goal className="w-5 h-5 text-[#B8860B]" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Our Mission
              </h3>
            </div>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 break-words">
              To promote excellence in mathematical research, foster collaboration,
              and support the growth of the mathematics community in India and beyond.
            </p>

            <div className="h-0.5 bg-[#B8860B] mb-4 w-10" />

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed break-words">
              We are committed to advancing knowledge, encouraging innovation,
              and inspiring the next generation of mathematicians.
            </p>
          </div>
        </motion.div>

        {/* VISION */}
        <motion.div
          whileHover={{ y: -5 }}
          className="
            flex flex-col lg:flex-row
            md:flex-col     /* ⭐ FIX: tablet stack fix */
            sm:flex-row
            gap-4 sm:gap-6
            p-4 sm:p-6 lg:p-8
            items-start border-t md:border-t-0 md:border-l border-gray-200 w-full
          "
        >

          {/* IMAGE */}
          <div className="
            overflow-hidden rounded-lg w-full
            sm:w-40 md:w-full lg:w-44
            h-44 sm:h-48 md:h-56 lg:h-52
            flex-shrink-0
          ">
            <motion.img
              src={bgClass}
              alt="Research"
              whileHover={{ scale: 1.05 }}
              className="w-full h-full object-cover"
            />
          </div>

          {/* TEXT */}
          <div className="w-full min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Eye className="w-5 h-5 text-[#B8860B]" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Our Vision
              </h3>
            </div>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 break-words">
              To be a leading institute recognized globally for excellence
              in mathematical research, education, and outreach.
            </p>

            <div className="h-0.5 bg-[#B8860B] mb-4 w-10" />

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed break-words">
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
     {/* <section className="bg-gray-50 py-6 px-6 sm:px-6 md:px-10 lg:px-14">
  <div className="max-w-7xl mx-auto w-full">

    <div className="
      bg-white rounded-xl shadow
      flex flex-col sm:flex-col md:flex-row
      divide-y md:divide-y-0 md:divide-x
      divide-gray-200
      w-full
    ">

      {stats.map((s, i) => {
        const count = useCounter(s.num);

        return (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -5 }}
            className="
              flex-1 flex items-center justify-start sm:justify-center
              gap-3 py-5 sm:py-6 px-4 sm:px-6
              cursor-pointer w-full
            "
          >

            <div className="text-[#B8860B] flex-shrink-0">
              {s.icon}
            </div>

            <div className="min-w-0">
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                {count}+
              </div>

              <div className="text-gray-900 text-xs sm:text-sm font-semibold break-words">
                {s.label}
              </div>
            </div>

          </motion.div>
        );
      })}

    </div>

  </div>
</section> */}

      {/* Objectives */}
     <section className="py-6 bg-white px-6 sm:px-6 lg:px-14 md:px-10">
  <div className="max-w-7xl mx-auto w-full">

    <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
      Our Objectives
    </h2>

    <div className="
      grid grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-6
      gap-4 sm:gap-5 lg:gap-6
      w-full
    ">

      {objectives.map((o, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.06, y: -6 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="
            relative text-center
            px-4 py-5 sm:py-6
            bg-white rounded-xl
            border border-gray-100
            shadow-sm
            hover:shadow-xl
            hover:border-[#e6c37a]
            transition-all duration-300
            w-full
            group
            overflow-hidden
          "
        >

          {/* subtle hover glow background */}
          <div className="
            absolute inset-0
            bg-gradient-to-b from-[#fff8ec] to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          " />

          {/* ICON BOX */}
          <div className="
            relative z-10
            w-14 h-14 sm:w-16 sm:h-16
            rounded-full
            bg-[#fdf8f0]
            flex items-center justify-center
            mx-auto mb-3
            text-[#B8860B]
            group-hover:scale-110
            transition-transform duration-300
          ">
            {o.icon}
          </div>

          {/* TITLE */}
          <h4 className="
            relative z-10
            font-bold text-gray-900 text-sm mb-2
            break-words
            group-hover:text-[#b8860b]
            transition-colors duration-300
          ">
            {o.title}
          </h4>

          {/* DESCRIPTION */}
          <p className="
            relative z-10
            text-gray-500 text-xs leading-relaxed
            break-words
          ">
            {o.desc}
          </p>

        </motion.div>
      ))}

    </div>

  </div>
</section>

      {/* Values */}
     <section className="py-6 bg-[#fdf8f0] px-6 sm:px-6 lg:px-14 md:px-10">
  <div className="max-w-7xl mx-auto w-full">

    <div className="
      grid grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-5
      gap-4 sm:gap-5 lg:gap-6
      w-full
    ">

      {values.map((v, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -6, scale: 1.06 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="
            relative text-center
            bg-white
            p-5 sm:p-6
            rounded-xl
            border border-gray-100
            shadow-sm
            hover:shadow-xl
            hover:border-[#e6c37a]
            transition-all duration-300
            w-full
            overflow-hidden
            group
          "
        >

          {/* hover glow background */}
          <div className="
            absolute inset-0
            bg-gradient-to-b from-[#fff7e6] to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          " />

          {/* ICON */}
          <div className="
            relative z-10
            text-[#B8860B]
            mb-3 flex justify-center
            group-hover:scale-110
            transition-transform duration-300
          ">
            {v.icon}
          </div>

          {/* TITLE */}
          <h4 className="
            relative z-10
            font-semibold text-gray-900 text-sm mb-2
            group-hover:text-[#b8860b]
            transition-colors duration-300
            break-words
          ">
            {v.title}
          </h4>

          {/* DESCRIPTION */}
          <p className="
            relative z-10
            text-gray-500 text-xs
            break-words
          ">
            {v.desc}
          </p>

        </motion.div>
      ))}

    </div>

  </div>
</section>
     
    </div>
  );
}