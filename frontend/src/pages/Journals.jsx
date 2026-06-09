import { useState, useEffect } from "react";
import {
  BookOpen,
  Search,
  ChevronDown,
  Grid3X3,
  List,
  Bookmark,
  CalendarDays,
  Globe,
  FileText,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import bg2 from "../assets/hbg2.png";
import { Link } from "react-router-dom";
import { getJournals } from "../api/api";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: "easeOut" },
  }),
};

export default function Journals() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All Subjects");
  const [journalType, setJournalType] = useState("All Journals");
  const [frequency, setFrequency] = useState("All Frequency");
  const [language, setLanguage] = useState("All Languages");
  const [year, setYear] = useState("All Years");
  const [sortBy, setSortBy] = useState("Relevance");
  const [view, setView] = useState("list");
  const [mobileFilter, setMobileFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [journals, setJournals] = useState([]);
  const [allJournals, setAllJournals] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const pageSize = 6;
  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    setLoading(true);

    const sortMap = {
      Relevance: "createdAt",
      "A-Z": "title",
      Newest: "newest",
      Oldest: "oldest",
    };

    getJournals({
      page: currentPage,
      limit: pageSize,
      search: search || undefined,
      subjectArea: subject !== "All Subjects" ? subject : undefined,
      accessType: journalType !== "All Journals" ? journalType : undefined,
      frequency: frequency !== "All Frequency" ? frequency : undefined,
      language: language !== "All Languages" ? language : undefined,
      establishedYear: year !== "All Years" ? year : undefined,
      sortBy: sortMap[sortBy] || "createdAt",
    })
      .then((d) => {
        setJournals(d.data || []);
        setTotal(d.total || 0);
      })
      .catch((err) => {
        console.error("Failed to fetch journals:", err);
        setJournals([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [
    currentPage,
    search,
    subject,
    journalType,
    frequency,
    language,
    year,
    sortBy,
  ]);

  useEffect(() => {
    getJournals({ limit: 1000 })
      .then((d) => setAllJournals(d.data || []))
      .catch(() => setAllJournals([]));
  }, []);

  const resetFilters = () => {
    setSearch("");
    setSubject("All Subjects");
    setJournalType("All Journals");
    setFrequency("All Frequency");
    setLanguage("All Languages");
    setYear("All Years");
    setSortBy("Relevance");
    setCurrentPage(1);
  };

  const setFilterAndResetPage = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const filteredJournals = journals;

  const publicationTypeCounts = {
    "Peer Reviewed": allJournals.filter((j) =>
      `${j.tags || ""} ${j.indexing || ""}`
        .toLowerCase()
        .includes("peer reviewed"),
    ).length,

    "Open Access": allJournals.filter((j) =>
      `${j.accessType || ""}`.toLowerCase().includes("open access"),
    ).length,

    "UGC CARE Listed": allJournals.filter((j) =>
      `${j.tags || ""} ${j.indexing || ""}`.toLowerCase().includes("ugc"),
    ).length,

    "Scopus Indexed": allJournals.filter((j) =>
      `${j.tags || ""} ${j.indexing || ""}`.toLowerCase().includes("scopus"),
    ).length,
  };

  return (
    <main className="bg-[#fbfaf8] min-h-screen text-[#171717]">
      <section className="relative h-[140px] md:h-[160px] overflow-hidden ">
        <img
          src={bg2}
          alt=""
          className="absolute w-full h-full object-cover object-right "
        />
        <div className="absolute " />

        <div className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6 py-7 sm:py-9">
          <div className="flex items-center gap-3">
            <BookOpen size={28} className="text-[#d69a22]" />
            <h1 className="text-white font-serif text-[28px] sm:text-[30px] font-semibold">
              Journals
            </h1>
            <Link to="/">
              <span className="hidden sm:inline text-[#d69a22] text-[13px] ml-4">
                Home
              </span>
            </Link>
            <span className="hidden sm:inline text-white/70 text-[13px]">
              ›
            </span>
            <span className="hidden sm:inline text-white text-[13px]">
              Journals
            </span>
          </div>

          <p className="text-white/90 text-[13px] sm:text-[14px] leading-[1.7] max-w-[400px] mt-1">
            Explore and search through our comprehensive collection of MRI
            journals from across India.
          </p>
        </div>
      </section>

      <section className="max-w-[1180px] mx-auto px-4 sm:px-6 py-5 sm:py-7">
        <button
          onClick={() => setMobileFilter(true)}
          className="lg:hidden mb-4 h-[42px] px-4 rounded-[5px] bg-white border border-[#eadfd3] text-[12px] font-semibold flex items-center gap-2"
        >
          <SlidersHorizontal size={15} />
          Filters
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-5">
          <aside className="hidden lg:block">
            <FilterPanel
              subject={subject}
              setSubject={setFilterAndResetPage(setSubject)}
              journalType={journalType}
              setJournalType={setFilterAndResetPage(setJournalType)}
              frequency={frequency}
              setFrequency={setFilterAndResetPage(setFrequency)}
              language={language}
              setLanguage={setFilterAndResetPage(setLanguage)}
              year={year}
              setYear={setFilterAndResetPage(setYear)}
              resetFilters={resetFilters}
              publicationTypeCounts={publicationTypeCounts}
            />
          </aside>

          <div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="bg-white border border-[#eadfd3] rounded-[6px] p-3 shadow-[0_8px_28px_rgba(0,0,0,0.04)]"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_250px_120px] gap-3">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8e6a3a]"
                  />
                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search by journal title, keywords, topics, publisher..."
                    className="w-full h-[46px] bg-white border border-[#e4d5c3] rounded-[5px] pl-11 pr-4 text-[12px] outline-none focus:border-[#b87518] focus:shadow-[0_0_0_3px_rgba(184,117,24,0.10)] transition-all"
                  />
                </div>

                <div className="relative">
                  <BookOpen
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8e6a3a]"
                  />
                  <select
                    value={journalType}
                    onChange={(e) => {
                      setJournalType(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="appearance-none w-full h-[46px] border border-[#e4d5c3] rounded-[5px] pl-11 pr-10 text-[12px] outline-none focus:border-[#b87518]"
                  >
                    <option>All Journals</option>
                    <option>Peer Reviewed</option>
                    <option>Open Access</option>
                    <option>UGC CARE Listed</option>
                    <option>Scopus Indexed</option>
                  </select>
                  <ChevronDown
                    size={15}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8e6a3a]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  className="h-[46px] rounded-[5px] bg-[linear-gradient(135deg,#d69a22_0%,#b87518_45%,#8e5b0d_100%)] text-white text-[13px] font-semibold flex items-center justify-center gap-2 hover:-translate-y-[1px] hover:shadow-[0_12px_25px_rgba(184,117,24,0.26)] transition-all"
                >
                  <Search size={16} />
                  Search
                </button>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5 mb-4">
              <p className="text-[13px] text-[#222]">
                Showing{" "}
                {total === 0
                  ? 0
                  : Math.min((currentPage - 1) * pageSize + 1, total)}{" "}
                - {Math.min(currentPage * pageSize, total)} of {total} journals
              </p>

              <div className="flex items-center gap-3">
                <span className="text-[12px] text-[#333]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-[34px] w-[115px] bg-white border border-[#e4d5c3] rounded-[5px] px-3 text-[11px] outline-none focus:border-[#b87518]"
                >
                  <option>Relevance</option>
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>

                <button
                  onClick={() => setView("grid")}
                  className={`w-[34px] h-[34px] rounded-[5px] flex items-center justify-center border transition ${
                    view === "grid"
                      ? "bg-[#f3e3c9] border-[#d69a22] text-[#b87518]"
                      : "bg-white border-[#eadfd3] text-[#555]"
                  }`}
                >
                  <Grid3X3 size={16} />
                </button>

                <button
                  onClick={() => setView("list")}
                  className={`w-[34px] h-[34px] rounded-[5px] flex items-center justify-center border transition ${
                    view === "list"
                      ? "bg-[#f3e3c9] border-[#d69a22] text-[#b87518]"
                      : "bg-white border-[#eadfd3] text-[#555]"
                  }`}
                >
                  <List size={17} />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-5 animate-pulse h-[120px]"
                  />
                ))}
              </div>
            ) : filteredJournals.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen size={40} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-[14px]">
                  No journals found. Try a different search.
                </p>
              </div>
            ) : view === "list" ? (
              <div className="space-y-4">
                {filteredJournals.map((journal, i) => (
                  <JournalListCard key={journal.id} journal={journal} i={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredJournals.map((journal, i) => (
                  <JournalGridCard key={journal.id} journal={journal} i={i} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <PageButton
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={14} />
                </PageButton>

                {[...Array(totalPages)].map((_, i) => {
                  const pg = i + 1;
                  return (
                    <PageButton
                      key={pg}
                      active={currentPage === pg}
                      onClick={() => setCurrentPage(pg)}
                    >
                      {pg}
                    </PageButton>
                  );
                })}

                <PageButton
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                >
                  <ChevronRight size={14} />
                </PageButton>
              </div>
            )}
          </div>
        </div>
      </section>

      {mobileFilter && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div
            onClick={() => setMobileFilter(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute left-0 top-0 h-full w-[82vw] max-w-[310px] bg-white p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-[20px] text-[#b87518]">Filters</h3>
              <button onClick={() => setMobileFilter(false)}>
                <X size={22} />
              </button>
            </div>

            <FilterPanel
              subject={subject}
              setSubject={setFilterAndResetPage(setSubject)}
              journalType={journalType}
              setJournalType={setFilterAndResetPage(setJournalType)}
              frequency={frequency}
              setFrequency={setFilterAndResetPage(setFrequency)}
              language={language}
              setLanguage={setFilterAndResetPage(setLanguage)}
              year={year}
              setYear={setFilterAndResetPage(setYear)}
              resetFilters={resetFilters}
              publicationTypeCounts={publicationTypeCounts}
            />
          </div>
        </div>
      )}
    </main>
  );
}

function FilterPanel({
  subject,
  setSubject,
  journalType,
  setJournalType,
  frequency,
  setFrequency,
  language,
  setLanguage,
  year,
  setYear,
  resetFilters,
  publicationTypeCounts,
}) {
  return (
    <div className="bg-white border border-[#eadfd3] rounded-[6px] p-4 shadow-[0_8px_28px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-serif text-[18px] font-semibold text-[#b87518]">
          Filters
        </h2>
        <button
          onClick={resetFilters}
          className="text-[11px] text-[#b87518] hover:underline"
        >
          Reset All
        </button>
      </div>

      <label className="block text-[12px] font-semibold mb-2">
        Journal Subject Area
      </label>
      <Select value={subject} onChange={setSubject}>
        <option>All Subjects</option>
        <option>Multidisciplinary</option>
        <option>Applied Sciences</option>
        <option>Social Sciences</option>
        <option>Mathematics</option>
        <option>Computer Science</option>
      </Select>

      <h3 className="text-[12px] font-semibold mt-5 mb-3">Publication Type</h3>

      {[
        "Peer Reviewed",
        "Open Access",
        "UGC CARE Listed",
        "Scopus Indexed",
      ].map((label) => {
        const count = publicationTypeCounts?.[label] || 0;

        return (
          <label
            key={label}
            className="flex items-center justify-between gap-3 text-[12px] text-[#333] mb-3 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={journalType === label}
                onChange={() =>
                  setJournalType(journalType === label ? "All Journals" : label)
                }
                className="accent-[#b87518]"
              />
              {label}
            </span>

            <span className="text-[#777]">({count})</span>
          </label>
        );
      })}

      <h3 className="text-[12px] font-semibold mt-5 mb-2">Frequency</h3>
      <Select value={frequency} onChange={setFrequency}>
        <option>All Frequency</option>
        <option>Quarterly</option>
        <option>Bi-Monthly</option>
        <option>Monthly</option>
        <option>Yearly</option>
      </Select>

      <h3 className="text-[12px] font-semibold mt-5 mb-2">Language</h3>
      <Select value={language} onChange={setLanguage}>
        <option>All Languages</option>
        <option>English</option>
        <option>Hindi</option>
      </Select>

      <h3 className="text-[12px] font-semibold mt-5 mb-3">
        Year of Publication
      </h3>
      <Select value={year} onChange={setYear}>
        <option>All Years</option>
        <option>2010</option>
        <option>2014</option>
        <option>2015</option>
        <option>2018</option>
        <option>2024</option>
      </Select>

      <button
        type="button"
        onClick={() => {}}
        className="w-full h-[38px] mt-5 rounded-[5px] bg-[linear-gradient(135deg,#d69a22_0%,#b87518_45%,#8e5b0d_100%)] text-white text-[12px] font-semibold hover:shadow-[0_10px_22px_rgba(184,117,24,0.25)] transition-all"
      >
        Apply Filters
      </button>
    </div>
  );
}

function Select({ value, onChange, children }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full h-[36px] border border-[#e4d5c3] rounded-[5px] px-3 pr-8 text-[11px] bg-white outline-none focus:border-[#b87518]"
      >
        {children}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b87518]"
      />
    </div>
  );
}

function JournalListCard({ journal, i }) {
  const coverSrc = journal.coverImage
    ? `http://localhost:5000${journal.coverImage}`
    : null;

  const indexingTags = journal.tags
    ? journal.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : journal.indexing
      ? journal.indexing
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={i}
      variants={fadeUp}
      className="group bg-white border border-[#eadfd3] rounded-[7px] p-4 shadow-[0_8px_28px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-[#d69a22]/60 hover:shadow-[0_16px_40px_rgba(184,117,24,0.12)] transition-all duration-300"
    >
      <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_340px] gap-4">
        <div className="w-[86px] h-[130px] rounded-[3px] bg-[#fff8ec] flex items-center justify-center overflow-hidden shrink-0">
          {coverSrc ? (
            <img
              src={coverSrc}
              alt={journal.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <BookOpen size={32} className="text-[#d69a22]" />
          )}
        </div>

        <div>
          <h3 className="font-serif text-[18px] font-semibold text-[#111] group-hover:text-[#b87518] transition-colors">
            {journal.title}
          </h3>
          <p className="text-[12px] text-[#333] leading-[1.7] mt-2 max-w-[520px] line-clamp-3">
            {journal.description || "No description available."}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {journal.accessType && (
              <span className="px-2.5 py-1 rounded-[4px] bg-[#f8f0df] text-[#8e5b0d] text-[10px] font-medium">
                {journal.accessType}
              </span>
            )}
            {indexingTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-[4px] bg-[#f8f0df] text-[#8e5b0d] text-[10px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="md:border-l border-[#eadfd3] md:pl-6 flex flex-col sm:flex-row md:flex-col justify-between gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 text-[12px] text-[#333]">
            {journal.issnPrint && (
              <Info
                icon={<FileText size={13} />}
                text={`ISSN: ${journal.issnPrint}`}
              />
            )}

            {journal.frequency && (
              <Info
                icon={<CalendarDays size={13} />}
                text={`Frequency: ${journal.frequency}`}
              />
            )}

            {journal.language && (
              <Info
                icon={<Globe size={13} />}
                text={`Language: ${journal.language}`}
              />
            )}

            {journal.establishedYear && (
              <Info
                icon={<CalendarDays size={13} />}
                text={`Established: ${journal.establishedYear}`}
              />
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <Link
              to={`/search?journal=${journal.id}`}
              className="h-[34px] px-4 rounded-[5px] border border-[#b87518] text-[#b87518] text-[11px] font-semibold flex items-center gap-2 hover:bg-[#b87518] hover:text-white transition-all"
            >
              View Articles <ArrowRight size={13} />
            </Link>
            <Bookmark size={17} className="text-[#b87518]" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function JournalGridCard({ journal, i }) {
  const coverSrc = journal.coverImage
    ? `http://localhost:5000${journal.coverImage}`
    : null;

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={i}
      variants={fadeUp}
      className="group bg-white border border-[#eadfd3] rounded-[7px] p-4 hover:-translate-y-1 hover:border-[#d69a22]/60 hover:shadow-[0_16px_40px_rgba(184,117,24,0.12)] transition-all duration-300"
    >
      <div className="w-full h-[170px] rounded-[5px] bg-[#fff8ec] flex items-center justify-center overflow-hidden">
        {coverSrc ? (
          <img
            src={coverSrc}
            alt={journal.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <BookOpen size={40} className="text-[#d69a22]" />
        )}
      </div>
      <h3 className="font-serif text-[17px] font-semibold mt-4 group-hover:text-[#b87518]">
        {journal.title}
      </h3>
      <p className="text-[12px] text-[#444] leading-[1.6] mt-2 line-clamp-3">
        {journal.description || "No description available."}
      </p>

      <div className="mt-4 space-y-2">
        {journal.issnPrint && (
          <Info
            icon={<FileText size={13} />}
            text={`ISSN: ${journal.issnPrint}`}
          />
        )}
        {journal.frequency && (
          <Info
            icon={<CalendarDays size={13} />}
            text={`Frequency: ${journal.frequency}`}
          />
        )}
        {journal.language && (
          <Info
            icon={<Globe size={13} />}
            text={`Language: ${journal.language}`}
          />
        )}
        {journal.establishedYear && (
          <Info
            icon={<CalendarDays size={13} />}
            text={`Established: ${journal.establishedYear}`}
          />
        )}
      </div>

      <Link
        to={`/search?journal=${journal.id}`}
        className="block w-full h-[34px] mt-4 rounded-[5px] border border-[#b87518] text-[#b87518] text-[11px] font-semibold hover:bg-[#b87518] hover:text-white transition-all flex items-center justify-center"
      >
        View Articles
      </Link>
    </motion.article>
  );
}

function Info({ icon, text }) {
  return (
    <p className="flex items-center gap-2">
      <span className="text-[#b87518]">{icon}</span>
      {text}
    </p>
  );
}

function PageButton({ children, active, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-[32px] h-[32px] rounded-[5px] border text-[12px] font-semibold flex items-center justify-center transition-all ${
        active
          ? "bg-[#b87518] border-[#b87518] text-white"
          : "bg-white border-[#eadfd3] text-[#333] hover:border-[#b87518] hover:text-[#b87518]"
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}
