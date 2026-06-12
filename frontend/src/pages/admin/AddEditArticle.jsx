import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  FileText,
  BookOpen,
  CalendarDays,
  Hash,
  Quote,
  Tag,
  CheckCircle,
  XCircle,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  createArticle,
  updateArticle,
  getArticle,
  getJournals,
} from "../../api/api";

export default function AddEditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id && id !== "add";

  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    journalId: "",
    title: "",
    publicationDate: "",
    volume: "",
    issue: "",
    pages: "",
    doi: "",
    keywords: "",
    citation: "",
      articleUrl: "",
    status: "published",
  });

  useEffect(() => {
    getJournals({ limit: 200 })
      .then((d) => setJournals(d.data || []))
      .catch(() => {});

    if (isEdit) {
      getArticle(id)
        .then((d) => {
          const a = d.data;

          setForm({
            journalId: a.journalId || "",
            title: a.title || "",
            publicationDate: a.publicationDate
              ? a.publicationDate.split("T")[0]
              : "",
            volume: a.volume || "",
            issue: a.issue || "",
            pages: a.pages || "",
            doi: a.doi || "",
            keywords: a.keywords || "",
            citation: a.citation || "",
            articleUrl: a.articleUrl || "",
            status: a.status || "published",
          });
        })
        .catch(() => setError("Failed to load article"))
        .finally(() => setFetchLoading(false));
    }
  }, [id, isEdit]);

  const set = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");
  setLoading(true);

  try {
    const fd = new FormData();

    // ✅ ONLY SEND REQUIRED FIELDS (CLEAN FIX)
   const cleanData = {
  journalId: form.journalId,
  title: form.title,
  publicationDate: form.publicationDate,
  volume: form.volume,
  issue: form.issue,
  pages: form.pages,
  doi: form.doi,
  keywords: form.keywords,
  citation: form.citation,
  articleUrl: form.articleUrl,   // ✅ ADD THIS
  status: form.status,
};

    Object.entries(cleanData).forEach(([key, value]) => {
      fd.append(key, value || "");
    });

    if (isEdit) {
      await updateArticle(id, fd);
      setSuccess("Article updated successfully!");
    } else {
      await createArticle(fd);
      setSuccess("Article created successfully!");

      setTimeout(() => {
        navigate("/admin/articles");
      }, 1200);
    }
  } catch (err) {
    setError(err.response?.data?.message || "Failed to save article");
  } finally {
    setLoading(false);
  }
};

  const inputCls =
    "w-full h-[42px] px-3 border border-gray-200 rounded-lg text-[13px] bg-white outline-none focus:border-[#d69a22] focus:ring-4 focus:ring-[#d69a22]/10 transition";

  const textareaCls =
    "w-full px-3 py-3 border border-gray-200 rounded-lg text-[13px] bg-white outline-none focus:border-[#d69a22] focus:ring-4 focus:ring-[#d69a22]/10 transition resize-none";

  const labelCls = "block text-[12px] font-semibold text-gray-700 mb-1.5";

  if (fetchLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#d69a22] border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  const selectedJournal = journals.find(
    (j) => String(j.id) === String(form.journalId)
  );

  return (
    <AdminLayout>
      <div className="max-w-[1180px] mx-auto">
        <div className="bg-white rounded-2xl p-5 sm:p-6 mb-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/admin/articles")}
                className="w-10 h-10 rounded-xl bg-white/10 text-black flex items-center justify-center hover:bg-white/20 transition"
              >
                <ArrowLeft size={18} />
              </button>

              <div>
                <h1 className="text-[22px] sm:text-[24px] font-bold text-black">
                  {isEdit ? "Edit Article" : "Add Article"}
                </h1>
                <p className="text-[12px] sm:text-[13px] text-gray-500 mt-1">
                  Manage article title, journal, DOI, keywords and citation.
                </p>
              </div>
            </div>

            <span
              className={`w-fit px-3 py-1 rounded-full text-[11px] font-bold ${
                form.status === "published"
                  ? "bg-green-100 text-green-700"
                  : form.status === "inactive"
                  ? "bg-gray-100 text-gray-600"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {form.status.toUpperCase()}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-[13px] text-red-600 flex items-center gap-2">
            <XCircle size={16} />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-[13px] text-green-700 flex items-center gap-2">
            <CheckCircle size={16} />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] gap-5">
            <div className="space-y-5">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 bg-[#fbfaf7]">
                  <h2 className="text-[16px] font-bold text-gray-900 flex items-center gap-2">
                    <FileText size={17} className="text-[#d69a22]" />
                    Article Information
                  </h2>
                  <p className="text-[12px] text-gray-500 mt-1">
                    Complete the article metadata shown on the public article page.
                  </p>
                </div>

                <div className="p-5 sm:p-6 space-y-5">
                  <div>
                    <label className={labelCls}>
                      Journal <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <BookOpen
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <select
                        value={form.journalId}
                        onChange={set("journalId")}
                        className={inputCls + " pl-10"}
                        required
                      >
                        <option value="">Select Journal</option>
                        {journals.map((j) => (
                          <option key={j.id} value={j.id}>
                            {j.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>
                      Article Title <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={form.title}
                      onChange={set("title")}
                      placeholder="Enter article title"
                      className={textareaCls}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <div>
                      <label className={labelCls}>Publication Date</label>
                      <div className="relative">
                        <CalendarDays
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="date"
                          value={form.publicationDate}
                          onChange={set("publicationDate")}
                          className={inputCls + " pl-10"}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Volume</label>
                      <input
                        value={form.volume}
                        onChange={set("volume")}
                        placeholder="e.g., 15"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Issue</label>
                      <input
                        value={form.issue}
                        onChange={set("issue")}
                        placeholder="e.g., 01"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Pages</label>
                      <input
                        value={form.pages}
                        onChange={set("pages")}
                        placeholder="e.g., 1-10"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>DOI</label>
                    <div className="relative">
                      <Hash
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        value={form.doi}
                        onChange={set("doi")}
                        placeholder="e.g., 10.1234/sample.2026.001"
                        className={inputCls + " pl-10"}
                      />
                    </div>
                  </div>

                 <div>
  <label className={labelCls}>Keywords</label>

  <div className="relative">
    <Tag
      size={16}
      className="absolute left-3 top-4 text-gray-400"
    />

    <textarea
      value={form.keywords}
      onChange={set("keywords")}
      placeholder="keyword1, keyword2, keyword3"
      rows={2}
      className={`${inputCls} pl-10 min-h-[60px] resize-y pt-3`}
    />
  </div>

  <p className="text-[11px] text-gray-400 mt-1">
    Separate multiple keywords using commas.
  </p>
</div>
<div>
  <label className={labelCls}>Article URL</label>

  <input
    value={form.articleUrl}
    onChange={set("articleUrl")}
    placeholder="https://doi.org / external link"
    className={inputCls}
  />

  <p className="text-[11px] text-gray-400 mt-1">
    Add external article link for “View Article” button
  </p>
</div>
                  <div>
                    <label className={labelCls}>How to Cite</label>
                    <div className="relative">
                      <Quote
                        size={16}
                        className="absolute left-3 top-3 text-gray-400"
                      />
                      <textarea
                        value={form.citation}
                        onChange={set("citation")}
                        rows={5}
                        placeholder="Author, A. (2026). Article title. Journal Name, Volume(Issue), Pages."
                        className={textareaCls + " pl-10"}
                      />
                    </div>
                        
                  </div>
            
                </div>
              </div>
            </div>

            <aside className="space-y-5">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 bg-[#fbfaf7]">
                  <h3 className="text-[15px] font-bold text-gray-900">
                    Publish Settings
                  </h3>
                  <p className="text-[12px] text-gray-500 mt-1">
                    Set the article visibility.
                  </p>
                </div>

                <div className="p-5">
                  <label className={labelCls}>Status</label>
                  <select
                    value={form.status}
                    onChange={set("status")}
                    className={inputCls}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="inactive">Inactive</option>
                  </select>

                 
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 bg-[#fbfaf7]">
                  <h3 className="text-[15px] font-bold text-gray-900">
                    Preview
                  </h3>
                  <p className="text-[12px] text-gray-500 mt-1">
                    Quick overview of article details.
                  </p>
                </div>

                <div className="p-5 space-y-3">
                  <PreviewRow
                    label="Journal"
                    value={selectedJournal?.title || "Not selected"}
                  />
                  <PreviewRow label="Title" value={form.title || "—"} />
                  <PreviewRow
                    label="Volume / Issue"
                    value={`${form.volume || "—"} / ${form.issue || "—"}`}
                  />
                  <PreviewRow label="Pages" value={form.pages || "—"} />
                  <PreviewRow label="DOI" value={form.doi || "—"} />
                </div>
              </div>
{form.articleUrl && (
  <a
    href={form.articleUrl}
    target="_blank"
    rel="noreferrer"
    className="text-[12px] text-[#d69a22] hover:underline mt-1 block"
  >
    Open Article Link →
  </a>
)}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-[13px] font-bold transition hover:opacity-90 disabled:opacity-60"
                  style={{
                    background: "linear-gradient(135deg, #d69a22, #b8821a)",
                  }}
                >
                  <Save size={16} />
                  {loading
                    ? "Saving..."
                    : isEdit
                    ? "Update Article"
                    : "Save Article"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/admin/articles")}
                  className="w-full mt-2 py-2.5 rounded-xl border border-gray-200 text-[13px] text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

function PreviewRow({ label, value }) {
  return (
    <div className="border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
      <p className="text-[11px] text-gray-400 font-semibold uppercase">
        {label}
      </p>
      <p className="text-[13px] text-gray-800 leading-5 mt-0.5 break-words">
        {value}
      </p>
    </div>
  );
}