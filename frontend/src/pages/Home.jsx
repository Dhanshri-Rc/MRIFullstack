import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  BookOpen,
  Filter,
  FileText,
  CalendarDays,
  Lightbulb,
  Users,
  Library,
  ChevronRight,
} from "lucide-react";
import Homebg from "../assets/hbg.png";
import { getJournals, getDashboardStats } from "../api/api";
import { Link } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [journals, setJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dbStats, setDbStats] = useState(null);

  useEffect(() => {
    getJournals({ limit: 200 }).then((d) => setJournals(d.data || [])).catch(() => {});
    getDashboardStats().then((d) => setDbStats(d.data)).catch(() => {});
  }, []);

const handleSearch = () => {
  const params = new URLSearchParams();

  const q = searchQuery.trim();

  if (q) params.set("q", q);
  if (selectedJournal) params.set("journal", selectedJournal);

  navigate(`/search?${params.toString()}`);
};

  const stats = [
    { icon: <BookOpen />, value: dbStats ? dbStats.totalJournals.toLocaleString() : "150+", title: "Journals", desc: "Curated MRI Journals" },
    { icon: <FileText />, value: dbStats ? dbStats.totalArticles.toLocaleString() : "25,000+", title: "Articles", desc: "Research Articles" },
    { icon: <CalendarDays />, value: "10+ Years", title: "Coverage", desc: "Research Coverage" },
    { icon: <Users />, value: dbStats ? dbStats.totalInstitutions.toLocaleString() : "500+", title: "Institutions", desc: "Across India" },
  ];

  const steps = [
    [<Search />, "1", "Search", "Enter keywords, titles or topics"],
    [<Filter />, "2", "Filter", "Refine results using journals and filters"],
    [<FileText />, "3", "Explore", "Discover relevant articles and research"],
  ];
const quickLinks = [
  {
    icon: <Library size={20} />,
    label: "Browse All Journals",
    link: "/journals",
  },
  {
    icon: <Filter size={20} />,
    label: "Advanced Search",
    link: "/advanced-search",
  },
  {
    icon: <Lightbulb size={20} />,
    label: "Search Tips",
    link: "/search",
  },
];
  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#101827] overflow-x-hidden">

      {/* HERO */}
      {/* HERO */}
<section
  className="relative h-[200px] bg-cover bg-center bg-no-repeat animate-fadeIn"
  style={{ backgroundImage: `url(${Homebg})` }}
>
  <div className="absolute inset-0 bg-white/20" />

  <div className="relative max-w-[1250px] mx-auto px-5 sm:px-8 lg:px-20 h-full flex items-center">
    <div className="max-w-[560px]">
      <h1 className="font-serif text-[28px] sm:text-[30px] md:text-[32px] font-bold leading-tight text-[#0f172a]">
        Welcome to <span className="text-[#b98012]">MRI Xplore</span>
      </h1>

      <p className=" font-medium text-[13px] sm:text-[14px] text-[#4b5563] mt-2 max-w-[300px]">
        Your comprehensive search engine for all
        
        MRI journals in India
      </p>
    </div>
  </div>
</section>

      {/* SEARCH BOX */}
      <section className=" max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 -mt-3 relative z-20">
        <div className="bg-white rounded-[16px] shadow-[0_18px_45px_rgba(0,0,0,0.12)] px-5 sm:px-7 py-6 transition-all duration-300 hover:shadow-[0_24px_60px_rgba(0,0,0,0.16)]">

          <div className="flex gap-6 sm:gap-10 border-b border-[#e5e0d7]">
            <button className="flex items-center gap-3 text-[#b98012] font-semibold border-b-2 border-[#b98012] pb-4 -mb-[1px] transition-all duration-300 hover:scale-[1.03]">
              <Search size={20} /> Search Journals
            </button>

            <button
  onClick={() => navigate("/journals")}
  className="flex items-center gap-3 pb-4 text-[#222] transition-all duration-300 hover:text-[#b98012] hover:scale-[1.03]"
>
  <BookOpen size={20} /> Browse Journals
</button>
          </div>

          <div className="grid lg:grid-cols-[1.6fr_1fr_160px] gap-5 lg:gap-7 mt-6 items-end">
            <div>
              <label className="text-[13px] font-medium">
                Search by Keyword or Title
              </label>
              <div className="mt-3 flex items-center gap-3 border border-[#d8d8d8] rounded-lg px-4 h-[48px] transition-all duration-300 focus-within:border-[#b98012] focus-within:shadow-[0_0_0_3px_rgba(185,128,18,0.12)] hover:border-[#b98012]">
                <Search size={19} />
               <input
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") handleSearch();
  }}
  className="w-full outline-none text-[13px] sm:text-[14px] text-gray-600"
  placeholder="Search for keywords, article titles, topics, authors..."
/>
              </div>
            </div>

            <div>
              <label className="text-[13px] font-medium">
                Select Journal
              </label>
              <div className="mt-3 flex items-center gap-3 border border-[#d8d8d8] rounded-lg px-4 h-[48px] transition-all duration-300 hover:border-[#b98012]">
                <BookOpen size={19} />
                <select
                  value={selectedJournal}
                  onChange={(e) => setSelectedJournal(e.target.value)}
                  className="w-full outline-none bg-white text-[14px]"
                >
                  <option value="">All Journals</option>
                  {journals.map((j) => (
                    <option key={j.id} value={j.id}>{j.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="h-[48px] rounded-lg bg-gradient-to-r from-[#9a6108] to-[#d59621] text-white font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.04] hover:shadow-lg active:scale-[0.98]">
              <Search size={19} /> Search
            </button>
          </div>

          {/* <div className="flex justify-center mt-4">
            <button className="border border-[#ddb66d] text-[#b98012] rounded-lg px-6 py-2 flex items-center gap-3 transition-all duration-300 hover:bg-[#fff4df] hover:scale-[1.03]">
              <Filter size={19} /> Advanced Filters
            </button>
          </div> */}
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-[1065px] mx-auto px-4 mt-5">
        <div className="bg-white rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.10)] grid sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-5 py-5 border-b sm:border-r lg:border-b-0 last:border-r-0 transition-all duration-300 hover:bg-[#fffaf0] hover:-translate-y-1"
            >
              <div className="w-[64px] h-[64px] rounded-full bg-[#fff4df] text-[#c18410] flex items-center justify-center shrink-0 transition-all duration-300 hover:rotate-6 hover:scale-110">
                {s.icon}
              </div>

              <div>
                <h3 className="text-[22px] font-bold text-[#a76f09] leading-none">
                  {s.value}
                </h3>
                <p className="font-semibold text-[14px] mt-1">{s.title}</p>
                <p className="text-[12px] text-gray-600">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW + QUICK ACCESS */}
      <section className="max-w-[1065px] mx-auto px-4 mt-6 pb-8 grid lg:grid-cols-[1fr_360px] gap-8">
        <div>
          <h2 className="text-[18px] font-bold border-b-2 border-[#c18410] inline-block pb-1">
            How MRI Xplore Works
          </h2>

          <div className="flex flex-col md:flex-row md:items-center gap-5 mt-5">
            {steps.map((x, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-[56px] h-[56px] rounded-full bg-[#fff4df] text-[#c18410] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                  {x[0]}
                </div>

                <div>
                  <p className="font-bold text-[14px] flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-[16px] h-[16px] bg-[#b98012] text-white rounded-full text-[9px]">
                      {x[1]}
                    </span>
                    {x[2]}
                  </p>
                  <p className="text-[11px] leading-snug">{x[3]}</p>
                </div>

                {i < 2 && (
                  <span className="hidden md:block text-[#b98012] tracking-widest">
                    --------→
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:border-l lg:pl-10">
          <h2 className="text-[18px] font-bold border-b-2 border-[#c18410] inline-block pb-1">
            Quick Access
          </h2>

        <div className="mt-4 space-y-2">
  {quickLinks.map((item, i) => (
    <Link
      key={i}
      to={item.link}
      className="w-full border border-[#ddb66d] rounded-lg px-4 py-3 flex items-center justify-between text-[13px] font-semibold transition-all duration-300 hover:bg-[#fff4df] hover:translate-x-1 hover:shadow-sm"
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