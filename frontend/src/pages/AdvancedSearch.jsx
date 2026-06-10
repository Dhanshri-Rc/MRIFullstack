

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, BookOpen, ChevronDown, Lightbulb } from "lucide-react";
import bannerBg from "../assets/hbg.webp";
import { getJournals } from "../api/api";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" },
  }),
};

export default function AdvancedSearch() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [searchIn, setSearchIn] = useState("");
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    getJournals({ limit: 1000 })
      .then((res) => setJournals(res.data || []))
      .catch(() => setJournals([]));
  }, []);

  const filteredJournals = useMemo(() => {
    const q = keyword.trim().toLowerCase();

    if (!q) return journals;

    return journals.filter((journal) => {
      const title = journal.title?.toLowerCase() || "";
      const keywords = journal.keywords?.toLowerCase() || "";
      const subject = journal.subjectArea?.toLowerCase() || "";
      const description = journal.description?.toLowerCase() || "";

      return (
        title.includes(q) ||
        keywords.includes(q) ||
        subject.includes(q) ||
        description.includes(q)
      );
    });
  }, [keyword, journals]);

  useEffect(() => {
    if (
      searchIn &&
      !filteredJournals.some((journal) => String(journal.id) === String(searchIn))
    ) {
      setSearchIn("");
    }
  }, [filteredJournals, searchIn]);

  const popularSearches = [
    "Machine Learning",
    "Medical Imaging",
    "Healthcare",
    "AI in Medicine",
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    const query = encodeURIComponent(keyword.trim());
    const journal = encodeURIComponent(searchIn);

    navigate(`/search?q=${query}&journal=${journal}`);
  };

  return (
    <main className="min-h-screen bg-[#fbfaf8] text-[#111827] overflow-hidden">
      <section className="relative h-[155px] sm:h-[175px] md:h-[190px] overflow-hidden bg-white border-b border-[#eee2d4]">
        <img
          src={bannerBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover "
        />
        <div className="absolute  bg-white/10 max-sm:bg-white/55" />

        <div className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="font-serif text-[28px] sm:text-[30px] md:text-[32px] font-bold leading-tight">
              Advanced Search
            </h1>
            <p className="text-[13px] sm:text-[14px] text-[#24282e] mt-2">
              Search across all MRI journals with ease
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 -mt-3 relative z-20">
        <motion.form
          onSubmit={handleSearch}
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="bg-white rounded-[14px] border border-[#eee2d4] shadow-[0_14px_35px_rgba(0,0,0,0.07)] px-4 sm:px-6 lg:px-8 py-5 sm:py-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-7">
            <div>
              <label className="block text-[13px] font-semibold mb-3">
                Search in Title / Keywords
              </label>

              <div className="relative group">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c27a12]"
                />
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Enter title, keywords or topics..."
                  className="w-full h-[46px] sm:h-[50px] rounded-[7px] border border-[#d8d8d8] bg-white pl-12 pr-4 text-[13px] outline-none focus:border-[#c27a12] focus:shadow-[0_0_0_3px_rgba(194,122,18,0.10)] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold mb-3">
                Search In
              </label>

              <div className="relative group">
                <BookOpen
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c27a12]"
                />

                <select
                  value={searchIn}
                  onChange={(e) => setSearchIn(e.target.value)}
                  className="appearance-none w-full h-[46px] sm:h-[50px] rounded-[7px] border border-[#d8d8d8] bg-white pl-12 pr-10 text-[13px] outline-none focus:border-[#c27a12] focus:shadow-[0_0_0_3px_rgba(194,122,18,0.10)] transition-all"
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

                <ChevronDown
                  size={17}
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="group w-full sm:w-[230px] h-[46px] rounded-[7px] bg-[linear-gradient(135deg,#d69a22_0%,#b87518_45%,#8e5b0d_100%)] text-white text-[15px] font-semibold flex items-center justify-center gap-3 shadow-[0_10px_24px_rgba(184,117,24,0.26)] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(184,117,24,0.36)] active:scale-[0.98] transition-all duration-300"
            >
              <Search size={19} />
              Search
            </button>
          </div>
        </motion.form>
      </section>

      <section className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[455px_1fr] gap-5 lg:gap-7">
          <InfoCard icon={<Lightbulb size={30} />} title="Search Tips">
            Use specific keywords and phrases for better and more relevant results.
          </InfoCard>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            variants={fadeUp}
            className="group bg-white rounded-[10px] border border-[#eee2d4] px-5 sm:px-7 py-6 shadow-[0_14px_38px_rgba(0,0,0,0.07)] hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(184,117,24,0.13)] transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="w-[68px] h-[68px] rounded-full bg-[#fbf1df] flex items-center justify-center shrink-0 text-[#c27a12] group-hover:scale-105 transition-transform duration-300">
                <Search size={31} strokeWidth={1.8} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[17px] text-[#111] mb-4">
                  Popular Searches
                </h3>

                <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                  {popularSearches.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setKeyword(item)}
                      className="h-[36px] rounded-full border border-[#d9a760] text-[#b87518] text-[12px] font-medium bg-white hover:bg-[#b87518] hover:text-white hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(184,117,24,0.20)] transition-all duration-300 whitespace-nowrap px-2"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ icon, title, children }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={2}
      variants={fadeUp}
      className="group bg-white rounded-[10px] border border-[#eee2d4] px-5 sm:px-7 py-6 shadow-[0_14px_38px_rgba(0,0,0,0.07)] hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(184,117,24,0.13)] transition-all duration-300"
    >
      <div className="flex items-center gap-5">
        <div className="w-[68px] h-[68px] rounded-full bg-[#fbf1df] flex items-center justify-center shrink-0 text-[#c27a12] group-hover:scale-105 transition-transform duration-300">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold text-[17px] text-[#111]">{title}</h3>
          <p className="text-[14px] text-[#374151] leading-[1.55] mt-2 max-w-[280px]">
            {children}
          </p>
        </div>
      </div>
    </motion.div>
  );
}