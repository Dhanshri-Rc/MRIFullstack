import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Search, Edit2, Trash2, Eye, ChevronLeft, ChevronRight, FileText,
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getArticles, deleteArticle } from '../../api/api';

export default function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const limit = 10;

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await getArticles({ page, limit, search });
      setArticles(data.data || []);
      setTotal(data.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArticles(); }, [page, search]);

  const handleDelete = async (id) => {
    await deleteArticle(id);
    setDeleteId(null);
    fetchArticles();
  };

  const totalPages = Math.ceil(total / limit);
  const statusColor = { draft: 'bg-yellow-100 text-yellow-700', published: 'bg-green-100 text-green-700', inactive: 'bg-gray-100 text-gray-500' };

  return (
    <AdminLayout>
      <div className="max-w-[1300px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-[22px] font-bold text-gray-900">Articles</h1>
            <p className="text-[13px] text-gray-500 mt-0.5">Manage all research articles in the repository.</p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/admin/articles/import"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50"
            >
              Import Articles
            </Link>
            <Link
              to="/admin/articles/add"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-[13px] font-semibold hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #d69a22, #b8821a)' }}
            >
              <Plus size={16} /> Add Article
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-5">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search articles by title, keywords..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#d69a22]"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <p className="text-[13px] text-gray-500">
              Showing <b>{articles.length}</b> of <b>{total}</b> articles
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['#', 'Title', 'Journal','Date', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      {[...Array(7)].map((_, j) => (
                        <td key={j} className="px-4 py-4">
                          <div className="h-4 bg-gray-100 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : articles.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center">
                      <FileText size={32} className="mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500 text-[14px]">No articles found</p>
                      <Link to="/admin/articles/add" className="text-[#d69a22] text-[13px] hover:underline mt-1 inline-block">
                        Add your first article
                      </Link>
                    </td>
                  </tr>
                ) : (
                  articles.map((a, idx) => (
                    <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-[12px] text-gray-400">{(page - 1) * limit + idx + 1}</td>
                      <td className="px-4 py-3">
                        <p className="text-[13px] font-semibold text-gray-800 line-clamp-2 max-w-[280px]">{a.title}</p>
                        {a.doi && <p className="text-[11px] text-gray-400 mt-0.5">DOI: {a.doi}</p>}
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-600 max-w-[150px] truncate">{a.journalName || '—'}</td>
                      
                      <td className="px-4 py-3 text-[12px] text-gray-500 whitespace-nowrap">
                        {a.publicationDate ? new Date(a.publicationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${statusColor[a.status] || 'bg-gray-100 text-gray-500'}`}>
                          {a.status?.charAt(0).toUpperCase() + a.status?.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link to={`/admin/articles/${a.id}/edit`}>
                            <button className="p-1.5 rounded-lg hover:bg-[#fff8ec] text-gray-400 hover:text-[#d69a22] transition">
                              <Edit2 size={14} />
                            </button>
                          </Link>
                          <button
                            onClick={() => setDeleteId(a.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
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

          {totalPages > 1 && (
            <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
              <p className="text-[12px] text-gray-500">Page {page} of {totalPages}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40">
                  <ChevronLeft size={14} />
                </button>
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pg = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                  return (
                    <button key={pg} onClick={() => setPage(pg)}
                      className={`w-8 h-8 rounded-lg text-[12px] font-semibold ${pg === page ? 'bg-[#d69a22] text-white' : 'border border-gray-200 hover:bg-gray-50 text-gray-600'}`}>
                      {pg}
                    </button>
                  );
                })}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-[380px] w-full shadow-2xl">
            <div className="w-[52px] h-[52px] rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h3 className="text-[17px] font-bold text-center mb-2">Delete Article?</h3>
            <p className="text-[13px] text-gray-500 text-center mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-600">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-[13px] font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
