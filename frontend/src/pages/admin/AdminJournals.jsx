import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getJournals, deleteJournal } from "../../api/api";

export default function AdminJournals() {
  const [journals, setJournals] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const limit = 10;

  const fetchJournals = async () => {
    setLoading(true);
    try {
      const data = await getJournals({ page, limit, search });
      setJournals(data.data || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, [page, search]);

  const handleDelete = async (id) => {
    try {
      await deleteJournal(id);
      setDeleteId(null);
      fetchJournals();
    } catch (err) {
      alert("Failed to delete journal");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <AdminLayout>
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-[22px] font-bold text-gray-900">Journals</h1>
            <p className="text-[13px] text-gray-500 mt-0.5">
              Manage all research journals in the repository.
            </p>
          </div>
          <Link
            to="/admin/journals/add"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-[13px] font-semibold transition hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #d69a22, #b8821a)" }}
          >
            <Plus size={16} /> Add Journal
          </Link>
        </div>

        {/* Search + filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-5 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              placeholder="Search journals by title, ISSN, publisher..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#d69a22]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <p className="text-[13px] text-gray-500">
              Showing <b>{journals.length}</b> of <b>{total}</b> journals
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {[
                    "#",
                    "Journal",
                    "ISSN (Print)",
                    "ISSN (Online)",
                    "Publisher",
                    
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      {[...Array(8)].map((__, j) => (
                        <td key={j} className="px-4 py-4">
                          <div className="h-4 bg-gray-100 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : journals.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center">
                      <BookOpen
                        size={32}
                        className="mx-auto text-gray-300 mb-3"
                      />
                      <p className="text-gray-500 text-[14px]">
                        No journals found
                      </p>
                      <Link
                        to="/admin/journals/add"
                        className="text-[#d69a22] text-[13px] hover:underline mt-1 inline-block"
                      >
                        Add your first journal
                      </Link>
                    </td>
                  </tr>
                ) : (
                  journals.map((j, idx) => (
                    <tr
                      key={j.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-[12px] text-gray-400">
                        {(page - 1) * limit + idx + 1}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-[36px] h-[36px] rounded-lg bg-[#fff8ec] flex items-center justify-center shrink-0 overflow-hidden">
                            {j.coverImage ? (
                              <img
                                src={`http://localhost:5000${j.coverImage}`}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <BookOpen size={16} className="text-[#d69a22]" />
                            )}
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-gray-800 line-clamp-1 max-w-[220px]">
                              {j.title}
                            </p>
                            <p className="text-[11px] text-gray-400">
                              {j.subjectArea}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-600">
                        {j.issnPrint || "—"}
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-600">
                        {j.issnOnline || "—"}
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-600 max-w-[160px] truncate">
                        {j.publisher || "—"}
                      </td>
                     
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                            j.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {j.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                        
                          <Link to={`/admin/journals/${j.id}/edit`}>
                            <button className="p-1.5 rounded-lg bg-[#ececf1] text-[#3740ec] transition">
                              <Edit2 size={14} />
                            </button>
                          </Link>
                          <button
                            onClick={() => setDeleteId(j.id)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-500 transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
              <p className="text-[12px] text-gray-500">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
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
                      className={`w-8 h-8 rounded-lg text-[12px] font-semibold transition ${
                        pg === page
                          ? "bg-[#d69a22] text-white"
                          : "border border-gray-200 hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      {pg}
                    </button>
                  );
                })}
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

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-[380px] w-full shadow-2xl">
            <div className="w-[52px] h-[52px] rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h3 className="text-[17px] font-bold text-gray-900 text-center mb-2">
              Delete Journal?
            </h3>
            <p className="text-[13px] text-gray-500 text-center mb-6">
              This will permanently delete the journal and all associated data.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-[13px] font-semibold hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
