// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Search,

//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   ExternalLink,

//   BookOpen,
//   Filter,
//   X,
//   Grid,
//   List,
//   Copy,

// } from "lucide-react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { getArticles, getJournals } from "../api/api";

// const SUBJECT_AREAS = [
//   "Medical & Health Sciences",
//   "Engineering & Technology",
//   "Computer Science",
//   "Life Sciences",
//   "Mathematics & Statistics",
// ];
// const ACCESS_TYPES = ["Open Access", "Subscription", "Hybrid"];

// export default function SearchDetail() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const params = new URLSearchParams(location.search);

//   const [query, setQuery] = useState(params.get("q") || "");
//   const [journalId, setJournalId] = useState(params.get("journal") || "");
//   const [journals, setJournals] = useState([]);
//   const [articles, setArticles] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [savedArticles, setSavedArticles] = useState({});
//   const [copiedCitation, setCopiedCitation] = useState(null);
//   const [expandedAbstract, setExpandedAbstract] = useState({});
//   const [sortBy, setSortBy] = useState("relevance");
//   const [filterSubject, setFilterSubject] = useState([]);
//   const [filterAccess, setFilterAccess] = useState([]);
//   const [filterYear, setFilterYear] = useState("");
//   const [viewMode, setViewMode] = useState("list");
//   const [showMobileFilter, setShowMobileFilter] = useState(false);
//   const [showAllJournals, setShowAllJournals] = useState(false);
//   const limit = 10;

//   useEffect(() => {
//     getJournals({ limit: 200 }).then((d) => setJournals(d.data || []));
//   }, []);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       setLoading(true);
//       try {
//         const data = await getArticles({
//           search: query,
//           journalId: journalId || undefined,
//           page,
//           limit,
//           ...(filterYear ? { year: filterYear } : {}),
//           ...(filterSubject.length === 1
//             ? { subjectArea: filterSubject[0] }
//             : {}),
//           ...(filterAccess.length === 1 ? { accessType: filterAccess[0] } : {}),
//         });
//         setArticles(data.data || []);
//         setTotal(data.total || 0);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchArticles();
//   }, [query, journalId, page, filterYear, filterSubject, filterAccess]);

//   const doSearch = () => {
//     setPage(1);
//     navigate(`/search?q=${encodeURIComponent(query)}&journal=${journalId}`);
//   };

//   const copyCitation = (article) => {
//     const year = article.publicationDate
//       ? new Date(article.publicationDate).getFullYear()
//       : "n.d.";

//     const citationText =
//       article.citation ||
//       `${article.authors || "Unknown Author"} (${year})
//     }${article.volume ? `, ${article.volume}` : ""}${
//       article.issue ? `(${article.issue})` : ""
//     }${article.pages ? `, ${article.pages}` : ""}.${
//       article.doi ? ` https://doi.org/${article.doi}` : ""
//     }`;

//     const fullCitation = `\n\n${citationText}`;

//     navigator.clipboard.writeText(fullCitation);
//     setCopiedCitation(article.id);

//     setTimeout(() => {
//       setCopiedCitation(null);
//     }, 2000);
//   };

//   const totalPages = Math.ceil(total / limit);
//   const from = (page - 1) * limit + 1;
//   const to = Math.min(page * limit, total);

//   const ACCESS_COLOR = {
//     "Open Access": "bg-green-100 text-green-700",
//     Subscription: "bg-blue-100 text-blue-700",
//     Hybrid: "bg-purple-100 text-purple-700",
//   };

//   const handleClearFilters = () => {
//     setFilterSubject([]);
//     setFilterAccess([]);
//     setFilterYear("");
//     setJournalId("");
//     setPage(1);
//   };

//   const handleSubjectChange = (subject) => {
//     setFilterSubject((prev) =>
//       prev.includes(subject)
//         ? prev.filter((s) => s !== subject)
//         : [...prev, subject],
//     );
//     setPage(1);
//   };

//   const handleAccessChange = (access) => {
//     setFilterAccess((prev) =>
//       prev.includes(access)
//         ? prev.filter((a) => a !== access)
//         : [...prev, access],
//     );
//     setPage(1);
//   };

//   const handleYearChange = (year) => {
//     setFilterYear(year);
//     setPage(1);
//   };

//   const handleJournalChange = (id) => {
//     setJournalId(id);
//     setPage(1);
//   };

//   const FilterSidebar = ({
//     filterSubject,
//     filterAccess,
//     filterYear,
//     journalId,
//     journals,
//     onYearChange,
//   }) => (
//     <div className="space-y-5">
//       {/* Journal filter */}
//       <div>
//         <div className="flex items-center justify-between mb-2">
//           <h3 className="text-[13px] font-bold text-gray-900">Journal</h3>
//           <ChevronDown size={14} className="text-gray-500" />
//         </div>
//         <div className="relative mb-3">
//           <Search
//             size={12}
//             className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
//           />
//           <input
//             placeholder="Search journals..."
//             className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-[11px] focus:outline-none focus:border-[#d69a22]"
//           />
//         </div>
//         <div className="space-y-2">
//   <label className="flex items-center justify-between cursor-pointer group">
//     <div className="flex items-center gap-2">
//       <input
//         type="checkbox"
//         checked={!journalId}
//         onChange={() => {
//           setJournalId("");
//           setPage(1);
//         }}
//         className="accent-[#d69a22]"
//       />
//       <span className="text-[12px] text-gray-700">All Journals</span>
//     </div>
//     <span className="text-[11px] text-gray-400">
//       {total.toLocaleString()}
//     </span>
//   </label>

//   {(showAllJournals ? journals : journals.slice(0, 5)).map((j) => (
//     <label
//       key={j.id}
//       className="flex items-center justify-between cursor-pointer"
//     >
//       <div className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           checked={journalId === String(j.id)}
//           onChange={() => {
//             setJournalId(journalId === String(j.id) ? "" : String(j.id));
//             setPage(1);
//           }}
//           className="accent-[#d69a22]"
//         />
//         <span className="text-[12px] text-gray-700 leading-tight">
//           {j.shortTitle || j.title}
//         </span>
//       </div>
//       <span className="text-[11px] text-gray-400 shrink-0 ml-2">
//         {j.articleCount || 0}
//       </span>
//     </label>
//   ))}

//   {journals.length > 5 && (
//     <button
//       type="button"
//       onClick={() => setShowAllJournals((prev) => !prev)}
//       className="text-[12px] text-[#d69a22] hover:underline flex items-center gap-1"
//     >
//       {showAllJournals ? "Show less" : "Show more"}
//       <ChevronDown
//         size={12}
//         className={`transition-transform ${
//           showAllJournals ? "rotate-180" : ""
//         }`}
//       />
//     </button>
//   )}
// </div>
//       </div>

//       {/* Publication Year */}
//       <div className="border-t border-gray-100 pt-4">
//         <div className="flex items-center justify-between mb-2">
//           <h3 className="text-[13px] font-bold text-gray-900">
//             Publication Year
//           </h3>
//           <ChevronDown size={14} className="text-gray-500" />
//         </div>
//         {["All Years", "2025", "2024", "2023", "2022", "2021 and earlier"].map(
//           (y) => (
//             <label
//               key={y}
//               className="flex items-center gap-2 mb-2 cursor-pointer"
//             >
//               <input
//                 type="radio"
//                 name="year"
//                 checked={
//                   filterYear ===
//                   (y === "All Years"
//                     ? ""
//                     : y === "2021 and earlier"
//                       ? "2021"
//                       : y)
//                 }
//                 onChange={() => {
//                   onYearChange(
//                     y === "All Years"
//                       ? ""
//                       : y === "2021 and earlier"
//                         ? "2021"
//                         : y,
//                   );
//                   setPage(1);
//                 }}
//                 className="accent-[#d69a22]"
//               />
//               <span className="text-[12px] text-gray-700">{y}</span>
//             </label>
//           ),
//         )}
//         <div className="flex items-center gap-2 mt-2">
//           <input
//             type="text"
//             placeholder="From"
//             className="w-full border border-gray-200 rounded px-2 py-1.5 text-[11px] focus:outline-none"
//           />
//           <span className="text-gray-400 text-[11px]">—</span>
//           <input
//             type="text"
//             placeholder="To"
//             className="w-full border border-gray-200 rounded px-2 py-1.5 text-[11px] focus:outline-none"
//           />
//         </div>
//         <button
//           onClick={() => setPage(1)}
//           className="mt-3 w-full py-2 rounded-lg text-white text-[12px] font-bold"
//           style={{ background: "linear-gradient(135deg, #d69a22, #b8821a)" }}
//         >
//           Apply
//         </button>
//       </div>

//       {/* Subject Area */}
//       <div className="border-t border-gray-100 pt-4">
//         <div className="flex items-center justify-between mb-2">
//           <h3 className="text-[13px] font-bold text-gray-900">Subject Area</h3>
//           <ChevronDown size={14} className="text-gray-500" />
//         </div>
//         <div className="relative mb-3">
//           <Search
//             size={12}
//             className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
//           />
//           <input
//             placeholder="Search subject area..."
//             className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-[11px] focus:outline-none"
//           />
//         </div>
//         {SUBJECT_AREAS.map((s) => (
//           <label
//             key={s}
//             className="flex items-center justify-between mb-2 cursor-pointer"
//           >
//             <div className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={filterSubject.includes(s)}
//                 onChange={() => {
//                   setFilterSubject((fs) =>
//                     fs.includes(s) ? fs.filter((x) => x !== s) : [...fs, s],
//                   );
//                   setPage(1);
//                 }}
//                 className="accent-[#d69a22]"
//               />
//               <span className="text-[12px] text-gray-700">{s}</span>
//             </div>
//           </label>
//         ))}
//       </div>

//       {/* Access Type */}
//       <div className="border-t border-gray-100 pt-4">
//         <div className="flex items-center justify-between mb-2">
//           <h3 className="text-[13px] font-bold text-gray-900">Access Type</h3>
//           <ChevronDown size={14} className="text-gray-500" />
//         </div>
//         {["All Access Types", ...ACCESS_TYPES].map((t) => (
//           <label
//             key={t}
//             className="flex items-center gap-2 mb-2 cursor-pointer"
//           >
//             <input
//               type="checkbox"
//               checked={
//                 t === "All Access Types"
//                   ? filterAccess.length === 0
//                   : filterAccess.includes(t)
//               }
//               onChange={() => {
//                 if (t === "All Access Types") {
//                   setFilterAccess([]);
//                   return;
//                 }
//                 setFilterAccess((fa) =>
//                   fa.includes(t) ? fa.filter((x) => x !== t) : [...fa, t],
//                 );
//                 setPage(1);
//               }}
//               className="accent-[#d69a22]"
//             />
//             <span className="text-[12px] text-gray-700">{t}</span>
//           </label>
//         ))}
//       </div>

//       <button
//         onClick={() => {
//           setFilterSubject([]);
//           setFilterAccess([]);
//           setFilterYear("");
//           setJournalId("");
//           setPage(1);
//         }}
//         className="w-full py-2 rounded-lg border border-gray-200 text-[12px] text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-1"
//       >
//         <X size={12} /> Apply Filters
//       </button>
//     </div>
//   );

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <Navbar />

//       {/* Search bar */}
//       <div className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 sticky top-0 z-30 shadow-sm">
//         <div className="max-w-[1800px] mx-auto flex flex-col sm:flex-row gap-3 items-center">
//           <div className="flex flex-1 max-w-[700px]">
//             <div className="relative flex-1">
//               <Search
//                 size={16}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && doSearch()}
//                 placeholder="Search articles, journals, authors..."
//                 className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-l-lg text-[13px] focus:outline-none focus:border-[#d69a22]"
//               />
//               {query && (
//                 <button
//                   onClick={() => setQuery("")}
//                   className="absolute right-3 top-1/2 -translate-y-1/2"
//                 >
//                   <X size={14} className="text-gray-400" />
//                 </button>
//               )}
//             </div>
//             <div className="relative border border-l-0 border-gray-200 bg-white">
//               <select
//                 value={journalId}
//                 onChange={(e) => {
//                   onJournalChange(e.target.value);
//                   setPage(1);
//                 }}
//                 className="h-full pl-3 pr-8 text-[13px] bg-white focus:outline-none appearance-none text-gray-600 min-w-[140px]"
//               >
//                 <option value="">All Journals</option>
//                 {journals.map((j) => (
//                   <option key={j.id} value={j.id}>
//                     {j.shortTitle || j.title}
//                   </option>
//                 ))}
//               </select>
//               <BookOpen
//                 size={13}
//                 className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none hidden"
//               />
//               <ChevronDown
//                 size={13}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
//               />
//             </div>
//             <button
//               onClick={doSearch}
//               className="px-5 py-2.5 rounded-r-lg text-white text-[13px] font-bold flex items-center gap-2"
//               style={{
//                 background: "linear-gradient(135deg, #d69a22, #b8821a)",
//               }}
//             >
//               <Search size={14} /> Search
//             </button>
//           </div>

//         </div>
//       </div>

//       <div className="flex-1 max-w-[1300px] mx-auto w-full px-4 sm:px-6 py-5">
//         {/* Results info + sort */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
//           <p className="text-[13px] text-gray-600">
//             {loading ? (
//               "Searching..."
//             ) : (
//               <>
//                 Showing{" "}
//                 <b>
//                   {from}-{to}
//                 </b>{" "}
//                 of <b>{total.toLocaleString()}</b> results
//                 {query && (
//                   <>
//                     {" "}
//                     for{" "}
//                     <span className="text-[#d69a22] font-semibold">
//                       "{query}"
//                     </span>
//                   </>
//                 )}
//               </>
//             )}
//           </p>
//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-1 text-[12px] text-gray-500">
//               Sort by:
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="ml-1 border border-gray-200 rounded-lg px-2 py-1 text-[12px] focus:outline-none"
//               >
//                 <option value="relevance">Relevance</option>
//                 <option value="newest">Newest</option>
//                 <option value="oldest">Oldest</option>
//                 <option value="citations">Citations</option>
//               </select>
//             </div>
//             <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => setViewMode("list")}
//                 className={`p-2 ${viewMode === "list" ? "bg-[#d69a22] text-white" : "text-gray-500 hover:bg-gray-50"}`}
//               >
//                 <List size={15} />
//               </button>
//               <button
//                 onClick={() => setViewMode("grid")}
//                 className={`p-2 ${viewMode === "grid" ? "bg-[#d69a22] text-white" : "text-gray-500 hover:bg-gray-50"}`}
//               >
//                 <Grid size={15} />
//               </button>
//             </div>
//             <button
//               className="lg:hidden flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-[12px] text-gray-600"
//               onClick={() => setShowMobileFilter(true)}
//             >
//               <Filter size={13} /> Filter
//             </button>
//           </div>
//         </div>

//         <div className="flex gap-5">
//           {/* Sidebar */}
//           <aside className="hidden lg:block w-[220px] shrink-0">
//             <div className="bg-white border border-gray-200 rounded-xl p-4 sticky top-[90px]">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-[13px] font-bold text-gray-900">
//                   Refine Results
//                 </h2>
//                 <button
//                   onClick={handleClearFilters}
//                   className="text-[11px] text-[#d69a22] hover:underline"
//                 >
//                   Clear All
//                 </button>
//               </div>
//               <FilterSidebar
//                 filterSubject={filterSubject}
//                 filterAccess={filterAccess}
//                 filterYear={filterYear}
//                 journalId={journalId}
//                 journals={journals}
//                 onSubjectChange={handleSubjectChange}
//                 onAccessChange={handleAccessChange}
//                 onYearChange={handleYearChange}
//                 onJournalChange={handleJournalChange}
//               />
//             </div>
//           </aside>

//           {/* Article list */}
//           <div className="flex-1 min-w-0">
//             {loading ? (
//               <div className="space-y-4">
//                 {[...Array(3)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse"
//                   >
//                     <div className="h-4 bg-gray-100 rounded w-3/4 mb-3" />
//                     <div className="h-3 bg-gray-100 rounded w-1/2 mb-3" />
//                     <div className="h-3 bg-gray-100 rounded w-full mb-2" />
//                     <div className="h-3 bg-gray-100 rounded w-4/5" />
//                   </div>
//                 ))}
//               </div>
//             ) : articles.length === 0 ? (
//               <div className="text-center py-16">
//                 <Search size={40} className="mx-auto text-gray-300 mb-4" />
//                 <h3 className="text-[18px] font-bold text-gray-700 mb-2">
//                   No articles found
//                 </h3>
//                 <p className="text-[13px] text-gray-500">
//                   Try different search terms or adjust your filters.
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {articles.map((article, idx) => (
//                   <ArticleCard
//                     key={article.id}
//                     article={article}
//                     idx={(page - 1) * limit + idx + 1}
//                     saved={savedArticles[article.id]}
//                     onSave={() =>
//                       setSavedArticles((s) => ({
//                         ...s,
//                         [article.id]: !s[article.id],
//                       }))
//                     }
//                     expanded={expandedAbstract[article.id]}
//                     onToggleAbstract={() =>
//                       setExpandedAbstract((e) => ({
//                         ...e,
//                         [article.id]: !e[article.id],
//                       }))
//                     }
//                     onCopyCitation={() => copyCitation(article)}
//                     copiedCitation={copiedCitation === article.id}
//                     accessColor={ACCESS_COLOR}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="mt-6 flex items-center justify-between">
//                 <p className="text-[12px] text-gray-500">
//                   Results per page:
//                   <select className="ml-2 border border-gray-200 rounded px-2 py-1 text-[12px] focus:outline-none">
//                     <option>10</option>
//                     <option>20</option>
//                     <option>50</option>
//                   </select>
//                 </p>
//                 <div className="flex items-center gap-1">
//                   <button
//                     onClick={() => setPage((p) => Math.max(1, p - 1))}
//                     disabled={page === 1}
//                     className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
//                   >
//                     <ChevronLeft size={14} />
//                   </button>
//                   {[...Array(Math.min(5, totalPages))].map((_, i) => {
//                     const pg =
//                       Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
//                     return (
//                       <button
//                         key={pg}
//                         onClick={() => setPage(pg)}
//                         className={`w-8 h-8 rounded-lg text-[12px] font-semibold ${pg === page ? "bg-[#d69a22] text-white" : "border border-gray-200 hover:bg-gray-50 text-gray-600"}`}
//                       >
//                         {pg}
//                       </button>
//                     );
//                   })}
//                   {totalPages > 5 && (
//                     <span className="text-gray-400 text-[12px] px-1">...</span>
//                   )}
//                   {totalPages > 5 && (
//                     <button
//                       onClick={() => setPage(totalPages)}
//                       className="w-8 h-8 rounded-lg text-[12px] border border-gray-200 hover:bg-gray-50 text-gray-600"
//                     >
//                       {totalPages}
//                     </button>
//                   )}
//                   <button
//                     onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                     disabled={page === totalPages}
//                     className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
//                   >
//                     <ChevronRight size={14} />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile filter drawer */}
//       {showMobileFilter && (
//         <>
//           <div
//             className="fixed inset-0 bg-black/50 z-40"
//             onClick={() => setShowMobileFilter(false)}
//           />
//           <div className="fixed right-0 top-0 h-full w-[300px] bg-white z-50 overflow-y-auto p-5">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-[16px] font-bold">Refine Results</h2>
//               <button onClick={() => setShowMobileFilter(false)}>
//                 <X size={20} className="text-gray-500" />
//               </button>
//             </div>
//             <FilterSidebar
//               filterSubject={filterSubject}
//               filterAccess={filterAccess}
//               filterYear={filterYear}
//               journalId={journalId}
//               journals={journals}
//               onSubjectChange={handleSubjectChange}
//               onAccessChange={handleAccessChange}
//               onYearChange={handleYearChange}
//               onJournalChange={handleJournalChange}
//             />
//           </div>
//         </>
//       )}

//       <Footer />
//     </div>
//   );
// }

// function ArticleCard({
//   article,
//   onCopyCitation,
//   copiedCitation,
//   accessColor,
// }) {
//   const year = article.publicationDate
//     ? new Date(article.publicationDate).getFullYear()
//     : "";
//   const accessType = article.accessType || "Open Access";
//   const citationText =
//     article.citation ||
//     `${article.authors || "Unknown Author"} (${year || "n.d."}). ${article.title}. ${article.volume ? `, ${article.volume}` : ""}${article.issue ? `(${article.issue})` : ""}${article.pages ? `, ${article.pages}` : ""}.${article.doi ? ` https://doi.org/${article.doi}` : ""}`;

//   return (
//     <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow grid grid-cols-[1fr_180px] gap-4 items-center">

//       <div className="flex-1 min-w-0">

//         {/* Title */}
//         <h3 className="text-[16px] font-bold text-[#0f1b2d] leading-snug hover:text-[#d69a22] cursor-pointer mb-1 transition-colors">
//           {article.title}
//         </h3>

//         {/* Journal info */}
//         <p className="text-[12px] text-gray-500 mb-1">
//           <span className="text-[#d69a22] font-semibold text-[13px]">
//             {article.journalName}
//           </span>
//           {article.volume && ` · Vol ${article.volume}`}
//           {article.issue && `, Issue ${article.issue}`}
//           {year && ` · ${year}`}
//         </p>

//         {/* DOI */}
//         {article.doi && (
//           <p className="text-[12px] text-gray-400 mb-2 flex items-center gap-1">
//             DOI: {article.doi}
//             <button className="text-gray-300 hover:text-gray-500">
//               <Copy size={11} />
//             </button>
//           </p>
//         )}

//         {/* Keywords */}
//         {article.keywords && (
//           <p className="text-[12px] text-gray-500 mb-2">
//             <span className="font-semibold">Keywords:</span> {article.keywords}
//           </p>
//         )}

//         {/* Action buttons */}
//         <div className="flex flex-wrap gap-2 mt-3">
//           <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d69a22] text-[12px] font-semibold text-[#d69a22] hover:bg-[#fff8ec] transition">
//             <ExternalLink size={12} /> View Article
//           </button>
//         </div>
//       </div>

//       {/* Right: save + citation stats */}
//       <div className="bg-[#faf7f2] border border-[#e5d6c2] rounded-xl p-3 w-[180px] shrink-0 self-start">
//         <h4 className="font-semibold text-[#b87518] mb-1">How to Cite</h4>

//         <p className="text-[10px] leading-4 text-gray-700 line-clamp-6 break-words">
//           {citationText}
//         </p>

//         <button
//           onClick={onCopyCitation}
//           className="mt-3 w-full px-2 py-1.5 border border-[#d69a22] rounded-md text-[#b87518] text-[10px] hover:bg-[#fff8ec]"
//         >
//           {copiedCitation ? "✓ Copied!" : "Copy Citation"}
//         </button>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Filter,
  X,
  Grid,
  List,
  Copy,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getArticles, getJournals } from "../api/api";

// ── APA citation builder ──────────────────────────────────────────────────────
function buildCitation(article) {
  if (article.citation) return article.citation;

  const year = article.publicationDate
    ? new Date(article.publicationDate).getFullYear()
    : "n.d.";
  const authors = article.authors || "Unknown Author";
  const title = article.title || "Untitled";
  const journal = article.journalName || "";
  const volume = article.volume ? article.volume : "";
  const issue = article.issue ? `(${article.issue})` : "";
  const pages = article.pages ? `, ${article.pages}` : "";
  const doi = article.doi ? ` https://doi.org/${article.doi}` : "";

  const volPart = volume ? `, ${volume}${issue}${pages}` : "";

  return `${authors} (${year}). ${title}.${journal ? ` ${journal}` : ""}${volPart}.${doi}`;
}

// ── Debounce hook ─────────────────────────────────────────────────────────────
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function SearchDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const [query, setQuery] = useState(params.get("q") || "");
  const [journalId, setJournalId] = useState(params.get("journal") || "");
  const [journals, setJournals] = useState([]);
  const [journalSearch, setJournalSearch] = useState(""); // frontend journal filter input
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [savedArticles, setSavedArticles] = useState({});
  const [copiedCitation, setCopiedCitation] = useState(null);
  const [expandedAbstract, setExpandedAbstract] = useState({});
  const [sortBy, setSortBy] = useState("relevance");
  const [filterSubject, setFilterSubject] = useState([]);
  const [filterAccess, setFilterAccess] = useState([]);
  const [filterYear, setFilterYear] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showAllJournals, setShowAllJournals] = useState(false);
  const limit = 10;

  const debouncedQuery = useDebounce(query, 350);

  // ── Load journals once ───────────────────────────────────────────────────────
  useEffect(() => {
    getJournals({ limit: 200 }).then((d) => setJournals(d.data || []));
  }, []);

  // ── Fetch articles whenever any filter/sort/page changes ─────────────────────
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const params = {
          search: debouncedQuery.trim(),
          page,
          limit,
          sort: sortBy !== "relevance" ? sortBy : undefined,
        };
        if (journalId) params.journalId = journalId;
        if (filterYear) params.year = filterYear;
        if (filterSubject.length > 0)
          params.subjectArea = filterSubject.join(",");
        if (filterAccess.length > 0) params.accessType = filterAccess.join(",");

        const data = await getArticles(params);
        setArticles(data.data || []);
        setTotal(data.total || 0);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [
    debouncedQuery,
    journalId,
    page,
    filterYear,
    filterSubject,
    filterAccess,
    sortBy,
  ]);

  // ── Search bar submit ────────────────────────────────────────────────────────
  const doSearch = () => {
    setPage(1);
    navigate(
      `/search?q=${encodeURIComponent(query.trim())}&journal=${journalId}`,
    );
  };

  // ── Citation copy ────────────────────────────────────────────────────────────
  const copyCitation = (article) => {
    navigator.clipboard.writeText(buildCitation(article));
    setCopiedCitation(article.id);
    setTimeout(() => setCopiedCitation(null), 2000);
  };

  // ── Filter handlers (all reset page = 1) ─────────────────────────────────────
  const handleClearFilters = () => {
    setFilterSubject([]);
    setFilterAccess([]);
    setFilterYear("");
    setYearFrom("");
    setYearTo("");
    setJournalId("");
    setJournalSearch("");
    setPage(1);
  };

  const handleYearChange = (year) => {
    setFilterYear(year);
    setPage(1);
  };

  const handleJournalChange = (id) => {
    setJournalId(id);
    setPage(1);
  };

  const handleApplyYearRange = () => {
    // yearFrom takes precedence for single-year semantics; extend as needed
    if (yearFrom) {
      setFilterYear(yearFrom);
    }
    setPage(1);
  };

  // ── Derived values ────────────────────────────────────────────────────────────
  const totalPages = Math.ceil(total / limit);
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const filteredJournals = journalSearch.trim()
    ? journals.filter((j) =>
        (j.shortTitle || j.title || "")
          .toLowerCase()
          .includes(journalSearch.trim().toLowerCase()),
      )
    : journals;

  const ACCESS_COLOR = {
    "Open Access": "bg-green-100 text-green-700",
    Subscription: "bg-blue-100 text-blue-700",
    Hybrid: "bg-purple-100 text-purple-700",
  };

  // ── FilterSidebar (inner component, uses closure state) ──────────────────────
  const FilterSidebar = () => (
    <div className="space-y-5">
      {/* Journal filter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[13px] font-bold text-gray-900">Journal</h3>
          <ChevronDown size={14} className="text-gray-500" />
        </div>
        <div className="relative mb-3">
          <Search
            size={12}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={journalSearch}
            onChange={(e) => setJournalSearch(e.target.value)}
            placeholder="Search journals..."
            className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-[11px] focus:outline-none focus:border-[#d69a22]"
          />
        </div>
        <div className="space-y-2">
          {/* All Journals */}
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!journalId}
                onChange={() => handleJournalChange("")}
                className="accent-[#d69a22]"
              />
              <span className="text-[12px] text-gray-700">All Journals</span>
            </div>
            <span className="text-[11px] text-gray-400">
              {total.toLocaleString()}
            </span>
          </label>

          {(showAllJournals
            ? filteredJournals
            : filteredJournals.slice(0, 5)
          ).map((j) => (
            <label
              key={j.id}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={journalId === String(j.id)}
                  onChange={() =>
                    handleJournalChange(
                      journalId === String(j.id) ? "" : String(j.id),
                    )
                  }
                  className="accent-[#d69a22]"
                />
                <span className="text-[12px] text-gray-700 leading-tight">
                  {j.shortTitle || j.title}
                </span>
              </div>
              <span className="text-[11px] text-gray-400 shrink-0 ml-2">
                {j.articleCount || 0}
              </span>
            </label>
          ))}

          {filteredJournals.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAllJournals((prev) => !prev)}
              className="text-[12px] text-[#d69a22] hover:underline flex items-center gap-1"
            >
              {showAllJournals
                ? "Show less"
                : `Show more (${filteredJournals.length - 5})`}
              <ChevronDown
                size={12}
                className={`transition-transform ${showAllJournals ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Publication Year */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[13px] font-bold text-gray-900">
            Publication Year
          </h3>
          <ChevronDown size={14} className="text-gray-500" />
        </div>
        {["All Years", "2025", "2024", "2023", "2022", "2021 and earlier"].map(
          (y) => {
            const val =
              y === "All Years" ? "" : y === "2021 and earlier" ? "2021" : y;
            return (
              <label
                key={y}
                className="flex items-center gap-2 mb-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="year"
                  checked={filterYear === val}
                  onChange={() => handleYearChange(val)}
                  className="accent-[#d69a22]"
                />
                <span className="text-[12px] text-gray-700">{y}</span>
              </label>
            );
          },
        )}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={yearFrom}
            onChange={(e) => setYearFrom(e.target.value)}
            placeholder="From"
            className="w-full border border-gray-200 rounded px-2 py-1.5 text-[11px] focus:outline-none"
          />
          <span className="text-gray-400 text-[11px]">—</span>
          <input
            type="text"
            value={yearTo}
            onChange={(e) => setYearTo(e.target.value)}
            placeholder="To"
            className="w-full border border-gray-200 rounded px-2 py-1.5 text-[11px] focus:outline-none"
          />
        </div>
        <button
          onClick={handleApplyYearRange}
          className="mt-3 w-full py-2 rounded-lg text-white text-[12px] font-bold"
          style={{ background: "linear-gradient(135deg, #d69a22, #b8821a)" }}
        >
          Apply
        </button>
      </div>
      {/* <button
        onClick={handleClearFilters}
        className="w-full py-2 rounded-lg border border-gray-200 text-[12px] text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-1"
      >
        <X size={12} /> Clear All Filters
      </button> */}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white ">
      <Navbar />

      {/* Search bar */}
      <div className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1800px] mx-auto flex flex-col sm:flex-row gap-3 items-center">
          <div className="flex flex-col sm:flex-row flex-1 max-w-[1200px] w-full gap-2 sm:gap-0">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && doSearch()}
                placeholder="Search articles, journals, authors..."
                className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-l-lg text-[13px] focus:outline-none focus:border-[#d69a22]"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X size={14} className="text-gray-400" />
                </button>
              )}
            </div>
            <div className="relative border border-l-0 border-gray-200 bg-white">
              <select
                value={journalId}
                onChange={(e) => handleJournalChange(e.target.value)}
                className="h-full pl-3 pr-8 text-[13px] bg-white focus:outline-none appearance-none text-gray-600 w-full sm:min-w-[140px]"
              >
                <option value="">All Journals</option>
                {journals.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.shortTitle || j.title}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
            <button
              onClick={doSearch}
              className="px-5 py-2.5 w-full sm:w-auto rounded-lg sm:rounded-l-none text-white text-[13px] font-bold flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #d69a22, #b8821a)",
              }}
            >
              <Search size={14} /> Search
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-[1300px] mx-auto w-full px-4 sm:px-6 py-5">
        {/* Results info + sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <p className="text-[13px] text-gray-600">
            {loading ? (
              "Searching..."
            ) : (
              <>
                Showing{" "}
                <b>
                  {from}-{to}
                </b>{" "}
                of <b>{total.toLocaleString()}</b> results
                {debouncedQuery && (
                  <>
                    {" "}
                    for{" "}
                    <span className="text-[#d69a22] font-semibold">
                      "{debouncedQuery}"
                    </span>
                  </>
                )}
              </>
            )}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              {/* LIST BUTTON */}
              <button
                onClick={() => setViewMode("list")}
                className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-[#d69a22] border-[#d69a22] text-white shadow-sm"
                    : "bg-white border-gray-200 text-gray-500 hover:border-[#d69a22] hover:text-[#d69a22]"
                }`}
              >
                <List size={16} />
              </button>

              {/* GRID BUTTON */}
              <button
                onClick={() => setViewMode("grid")}
                className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-[#d69a22] border-[#d69a22] text-white shadow-sm"
                    : "bg-white border-gray-200 text-gray-500 hover:border-[#d69a22] hover:text-[#d69a22]"
                }`}
              >
                <Grid size={16} />
              </button>
            </div>
            <button
              className="lg:hidden flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-[12px] text-gray-600"
              onClick={() => setShowMobileFilter(true)}
            >
              <Filter size={13} /> Filter
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Sidebar */}
          <aside className="hidden lg:block w-full lg:w-[220px] shrink-0">
            <div className="bg-white border border-gray-200 rounded-xl p-4 sticky top-[90px]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[13px] font-bold text-gray-900">
                  Refine Results
                </h2>
                <button
                  onClick={handleClearFilters}
                  className="text-[11px] text-[#d69a22] hover:underline"
                >
                  Clear All
                </button>
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* Article list */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse"
                  >
                    <div className="h-4 bg-gray-100 rounded w-3/4 mb-3" />
                    <div className="h-3 bg-gray-100 rounded w-1/2 mb-3" />
                    <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-4/5" />
                  </div>
                ))}
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-16">
                <Search size={40} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-[18px] font-bold text-gray-700 mb-2">
                  No articles found
                </h3>
                <p className="text-[13px] text-gray-500">
                  Try different search terms or adjust your filters.
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4"
                    : "space-y-4"
                }
              >
                {articles.map((article, idx) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    idx={(page - 1) * limit + idx + 1}
                    saved={savedArticles[article.id]}
                    onSave={() =>
                      setSavedArticles((s) => ({
                        ...s,
                        [article.id]: !s[article.id],
                      }))
                    }
                    expanded={expandedAbstract[article.id]}
                    onToggleAbstract={() =>
                      setExpandedAbstract((e) => ({
                        ...e,
                        [article.id]: !e[article.id],
                      }))
                    }
                    onCopyCitation={() => copyCitation(article)}
                    copiedCitation={copiedCitation === article.id}
                    accessColor={ACCESS_COLOR}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
                <p className="text-[12px] text-gray-500">
                  Results per page:
                  <select className="ml-2 border border-gray-200 rounded px-2 py-1 text-[12px] focus:outline-none">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pg =
                      Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                    return (
                      <button
                        key={pg}
                        onClick={() => setPage(pg)}
                        className={`w-8 h-8 rounded-lg text-[12px] font-semibold ${
                          pg === page
                            ? "bg-[#d69a22] text-white"
                            : "border border-gray-200 hover:bg-gray-50 text-gray-600"
                        }`}
                      >
                        {pg}
                      </button>
                    );
                  })}
                  {totalPages > 5 && (
                    <span className="text-gray-400 text-[12px] px-1">...</span>
                  )}
                  {totalPages > 5 && (
                    <button
                      onClick={() => setPage(totalPages)}
                      className="w-8 h-8 rounded-lg text-[12px] border border-gray-200 hover:bg-gray-50 text-gray-600"
                    >
                      {totalPages}
                    </button>
                  )}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showMobileFilter && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowMobileFilter(false)}
          />
          <div className="fixed right-0 top-0 h-full w-[85vw] max-w-[320px] bg-white z-50 overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-bold">Refine Results</h2>
              <button onClick={() => setShowMobileFilter(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <FilterSidebar />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

// ── ArticleCard ────────────────────────────────────────────────────────────────
function ArticleCard({ article, onCopyCitation, copiedCitation, viewMode }) {
  const year = article.publicationDate
    ? new Date(article.publicationDate).getFullYear()
    : "";

  const citationText = buildCitation(article);

  if (viewMode === "grid") {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow flex flex-col gap-3">
        <div>
          <h3 className="text-[14px] font-bold text-[#0f1b2d] leading-snug  cursor-pointer mb-1 transition-colors line-clamp-3">
            {article.title}
          </h3>
          <p className="text-[11px] text-gray-500">
            <span className="text-[#d69a22] font-semibold">
              {article.journalName}
            </span>
            {article.volume && ` · Vol ${article.volume}`}
            {article.issue && `, Issue ${article.issue}`}
            {year && ` · ${year}`}
          </p>
        </div>
        {article.doi && (
          <p className="text-[11px] text-gray-400 flex items-center gap-1">
            DOI: <span className="truncate">{article.doi}</span>
            <button className="text-gray-300 hover:text-gray-500 shrink-0">
              <Copy size={10} />
            </button>
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-auto">
          <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#d69a22] text-[11px] font-semibold text-[#d69a22] hover:bg-[#fff8ec] transition">
            <ExternalLink size={11} /> View Article
          </button>
          <button
            onClick={onCopyCitation}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-[11px] text-gray-500 hover:bg-gray-50 transition"
          >
            <Copy size={11} /> {copiedCitation ? "Copied!" : "Cite"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-[1fr_180px] gap-4 items-start gap-4 items-start">
      <div className="flex-1 min-w-0">
        <h3 className="text-[16px] font-bold text-[#0f1b2d] leading-snug  cursor-pointer mb-1 transition-colors">
          {article.title}
        </h3>

        <p className="text-[12px] text-gray-500 mb-1">
          <span className="text-[#d69a22] font-semibold text-[13px]">
            {article.journalName}
          </span>
          {article.volume && ` · Vol ${article.volume}`}
          {article.issue && `, Issue ${article.issue}`}
          {year && ` · ${year}`}
        </p>

        {article.doi && (
          <p className="text-[12px] text-gray-400 mb-2 flex items-center gap-1">
            DOI: {article.doi}
            <button className="text-gray-300 hover:text-gray-500">
              <Copy size={11} />
            </button>
          </p>
        )}

        {article.keywords && (
          <p className="text-[12px] text-gray-500 mb-2">
            <span className="font-semibold">Keywords:</span> {article.keywords}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mt-3">
          {article.articleUrl ? (
            <a
              href={article.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#d69a22] text-[11px] font-semibold text-[#d69a22] hover:bg-[#fff8ec] transition"
            >
              <ExternalLink size={11} /> View Articles
            </a>
          ) : (
            <button
              disabled
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-[11px] text-gray-400 cursor-not-allowed"
            >
              <ExternalLink size={11} /> No Link
            </button>
          )}

          {/* ✅ NEW: Cite Button for mobile/list view */}
          <button
            onClick={onCopyCitation}
            className="flex md:hidden items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-[11px] text-gray-600 hover:bg-gray-50 transition"
          >
            <Copy size={11} /> Cite
          </button>
        </div>
      </div>

      {/* Right: citation */}
      <div className="hidden md:block bg-[#faf7f2] border border-[#e5d6c2] rounded-xl p-2 w-[180px] shrink-0 self-start">
        <h4 className="font-semibold text-[#b87518] text-[13px] mb-1">
          How to Cite
        </h4>
        <p className="text-[9px] leading-4 text-gray-700 line-clamp-6 ">
          {citationText}
        </p>
        <button
          onClick={onCopyCitation}
          className="mt-2 w-[100px] text-center items-center px-2 py-1 border border-[#d69a22] rounded-md text-[#b87518] text-[10px] hover:bg-[#fff8ec]"
        >
          {copiedCitation ? "✓ Copied!" : "Copy Citation"}
        </button>
      </div>
    </div>
  );
}