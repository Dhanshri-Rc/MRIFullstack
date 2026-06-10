import { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Search,
  BookOpen,
  Filter,
  FileText,
  CalendarDays,
  Lightbulb,
  Users,
  ChevronDown,
  Library,
  ChevronRight,
} from "lucide-react";

import Homebg from "../assets/hbg.webp";
import { getJournals, getDashboardStats } from "../api/api";

export default function Home() {
  const navigate = useNavigate();

  const [searchIn, setSearchIn] = useState("");
  const [journals, setJournals] = useState([]);
  const [dbStats, setDbStats] = useState(null);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    getJournals({ limit: 200 })
      .then((d) => setJournals(d.data || []))
      .catch(() => setJournals([]));

    getDashboardStats()
      .then((d) => setDbStats(d.data))
      .catch(() => {});
  }, []);

  const filteredJournals = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return journals;

    return journals.filter((journal) => {
      return (
        (journal.title || "").toLowerCase().includes(q) ||
        (journal.keywords || "").toLowerCase().includes(q) ||
        (journal.subjectArea || "").toLowerCase().includes(q) ||
        (journal.description || "").toLowerCase().includes(q)
      );
    });
  }, [keyword, journals]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = encodeURIComponent(keyword.trim());
    const journal = encodeURIComponent(searchIn);
    navigate(`/search?q=${query}&journal=${journal}`);
  };

  const stats = [
    {
      icon: <BookOpen />,
      value: dbStats ? dbStats.totalJournals.toLocaleString() : "150+",
      title: "Journals",
      desc: "Curated MRI Journals",
    },
    {
      icon: <FileText />,
      value: dbStats ? dbStats.totalArticles.toLocaleString() : "25,000+",
      title: "Articles",
      desc: "Research Articles",
    },
    {
      icon: <CalendarDays />,
      value: "10 Years",
      title: "Coverage",
      desc: "Research Coverage",
    },
    {
      icon: <Users />,
      value: dbStats ? dbStats.totalInstitutions.toLocaleString() : "500+",
      title: "Institutions",
      desc: "Across India",
    },
  ];

  const steps = [
    [<Search />, "1", "Search", "Enter keywords, titles or topics"],
    [<Filter />, "2", "Filter", "Refine results using journals and filters"],
    [<FileText />, "3", "Explore", "Discover relevant articles and research"],
  ];

  const quickLinks = [
    { icon: <Library size={20} />, label: "Browse All Journals", link: "/journals" },
    { icon: <Filter size={20} />, label: "Advanced Search", link: "/advanced-search" },
    { icon: <Lightbulb size={20} />, label: "Search Tips", link: "/search" },
  ];

  return (
    <div className="min-h-screen bg-[#fbfaf8] text-[#111827] overflow-hidden">

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-[155px] sm:h-[175px] md:h-[190px] overflow-hidden bg-white border-b border-[#eee2d4]"
      >
        <img
          src={Homebg}
          alt=""
          className="absolute  w-full h-full object-cover "
        />
        <div className="absolute bg-white/10 max-sm:bg-white/55" />

        <div className="relative max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-[560px]">
            <h1 className="font-serif text-[28px] sm:text-[30px] md:text-[32px] font-bold leading-tight">
              Welcome to <span className="text-[#b98012]">MRI Xplore</span>
            </h1>
            <p className="text-[13px] sm:text-[14px] text-[#1d2025] mt-2">
              Your comprehensive search engine for all MRI journals in India
            </p>
          </div>
        </div>
      </motion.section>

      {/* SEARCH */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 -mt-2 relative z-20"
      >
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-[16px] shadow-[0_18px_45px_rgba(0,0,0,0.12)] px-4 sm:px-6 lg:px-7 py-6"
        >

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-5 sm:gap-8 border-b border-[#e5e0d7] pb-4">

            <button className="flex items-center gap-2 text-[#b98012] font-semibold border-b-2 border-[#b98012] pb-2 transition-transform hover:scale-105">
              <Search size={18} />
              Search Journals
            </button>

            <button
              onClick={() => navigate("/journals")}
              className="flex items-center gap-2 text-[#222] hover:text-[#b98012] transition-all hover:scale-105"
            >
              <BookOpen size={18} />
              Browse Journals
            </button>
          </div>

          {/* INPUTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">

            <div className="relative transition-transform hover:scale-[1.01]">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c27a12]" />

              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter title, keywords or topics..."
                className="w-full h-[48px] rounded-[7px] border border-[#d8d8d8] bg-white pl-11 pr-4 text-[13px] outline-none focus:border-[#c27a12] transition-all"
              />
            </div>

            <div className="relative transition-transform hover:scale-[1.01]">
              <BookOpen size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c27a12]" />

              <select
                value={searchIn}
                onChange={(e) => setSearchIn(e.target.value)}
                className="appearance-none w-full h-[48px] rounded-[7px] border border-[#d8d8d8] bg-white pl-11 pr-10 text-[13px] outline-none focus:border-[#c27a12] transition-all"
              >
                <option value="">All Journals</option>
                {filteredJournals.length > 0 ? (
                  filteredJournals.map((journal) => (
                    <option key={journal.id} value={journal.id}>
                      {journal.title}
                    </option>
                  ))
                ) : (
                  <option disabled>No journal found</option>
                )}
              </select>

              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">

            <button
              onClick={handleSearch}
              className="w-full sm:w-auto bg-gradient-to-r from-[#9a6108] to-[#d59621] text-white rounded-lg px-8 py-2.5 flex items-center justify-center gap-2 hover:scale-105 transition-transform"
            >
              <Search size={16} />
              Search
            </button>

            <Link to="/journals" className="w-full sm:w-auto">
              <button className="w-full border border-[#ddb66d] text-[#b98012] rounded-lg px-6 py-2.5 flex items-center justify-center gap-2 hover:bg-[#fff4df] hover:scale-105 transition-all">
                <Filter size={18} />
                Advanced Filters
              </button>
            </Link>

          </div>
        </motion.div>
      </motion.section>

      {/* STATS */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-[1065px] mx-auto px-4 mt-8"
      >
        <div className="bg-white rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.10)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">

          {stats.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-4 px-5 py-5 border-b sm:border-r lg:border-b-0"
            >
              <div className="w-[60px] h-[60px] rounded-full bg-[#fff4df] text-[#c18410] flex items-center justify-center">
                {s.icon}
              </div>

              <div>
                <h3 className="text-[22px] font-bold text-[#a76f09]">{s.value}</h3>
                <p className="font-semibold text-[14px] mt-1">{s.title}</p>
                <p className="text-[12px] text-gray-600">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* QUICK LINKS */}
      <section className="max-w-[1065px] mx-auto px-4 mt-8 pb-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

        <div>
          <h2 className="text-[18px] font-bold border-b-2 border-[#c18410] inline-block pb-1">
            How MRI Xplore Works
          </h2>

          <div className="flex flex-col md:flex-row md:items-center gap-5 mt-5">

            {steps.map((x, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4"
              >
                <div className="w-[66px] h-[56px] rounded-full bg-[#fff4df] text-[#c18410] flex items-center justify-center">
                  {x[0]}
                </div>

                <div>
                  <p className="font-bold text-[14px] flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-[16px] h-[16px] bg-[#b98012] text-white rounded-full text-[9px]">
                      {x[1]}
                    </span>
                    {x[2]}
                  </p>
                  <p className="text-[11px]">{x[3]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:border-l lg:pl-8">
          <h2 className="text-[18px] font-bold border-b-2 border-[#c18410] inline-block pb-1">
            Quick Access
          </h2>

          <div className="mt-4 space-y-3">
            {quickLinks.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="block border border-[#ddb66d] rounded-lg px-4 py-3 flex items-center justify-between text-[13px] font-semibold hover:bg-[#fff4df] hover:scale-[1.02] transition-all"
              >
                <span className="flex items-center gap-3 text-[#111]">
                  <span className="text-[#d59621]">{item.icon}</span>
                  {item.label}
                </span>

                <ChevronRight size={18} className="text-[#9a6108]" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}