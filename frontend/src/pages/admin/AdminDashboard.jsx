import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  FileText,
  Users,
  Building2,
  Download,
  Eye,
  MoreVertical,
  Upload,
  Database,
  Plus,
  PenLine,
  BarChart3,
  HardDrive,
  Activity,
  CheckCircle,
  Calendar,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getDashboardStats, } from "../../api/api";

const COLORS = [
  "#d69a22",
  "#1a56db",
  "#0e9f6e",
  "#9061f9",
  "#e74694",
  "#ff6b35",
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((d) => setStats(d.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats
    ? [
        {
          label: "Total Journals",
          value: stats.totalJournals.toLocaleString(),
          icon: BookOpen,
          trend: "+4 this month",
        },
        {
          label: "Total Articles",
          value: stats.totalArticles.toLocaleString(),
          icon: FileText,
          trend: "+342 this month",
        },
        {
          label: "Total Authors",
          value: stats.totalAuthors.toLocaleString(),
          icon: Users,
          trend: "+180 this month",
        },
        {
          label: "Total Institutions",
          value: stats.totalInstitutions.toLocaleString(),
          icon: Building2,
          trend: "+36 this month",
        },
        {
          label: "Total Downloads",
          value: stats.totalDownloads.toLocaleString(),
          icon: Download,
          trend: "+3,456 this month",
        },
      ]
    : [];

  return (
    <AdminLayout>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-[22px] font-bold text-gray-900">
              Welcome back, Admin! 👋
            </h1>
            <p className="text-[13px] text-gray-500 mt-1">
              Here's what's happening with your MRI Xplore repository.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-[12px] text-gray-600 shadow-sm">
            <Calendar size={14} className="text-[#d69a22]" />
            {new Date().toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 animate-pulse h-[110px]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-[42px] h-[42px] rounded-lg bg-[#fff8ec] flex items-center justify-center">
                      <Icon size={20} className="text-[#d69a22]" />
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {card.label}
                  </p>
                  <p className="text-[22px] font-bold text-gray-900 mt-1">
                    {card.value}
                  </p>
                  {/* <p className="text-[11px] text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp size={11} /> {card.trend}
                  </p> */}
                </div>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 mb-5">
          {/* Articles Over Time */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[15px] font-bold text-gray-900">
                Articles Added Over Time
              </h2>
              <span className="text-[11px] text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Last 6 Months
              </span>
            </div>
            {stats?.articlesOverTime?.length ? (
              <SimpleLineChart data={stats.articlesOverTime} />
            ) : (
              <div className="h-[200px] flex items-center justify-center text-gray-400 text-[13px]">
                No data yet
              </div>
            )}
          </div>

{/* Subject Area Pie */}
<div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 overflow-hidden">
  <h2 className="text-[15px] font-bold text-gray-900 mb-4">
    Articles by Subject Area
  </h2>

  {stats?.articleSubjectAreaStats?.length ? (
    <div className="w-full overflow-hidden">
      <SubjectPieChart
        data={stats.articleSubjectAreaStats}
        total={stats?.totalArticles}
      />
    </div>
  ) : (
    <div className="h-[200px] flex items-center justify-center text-gray-400 text-[13px]">
      No data yet
    </div>
  )}
</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 mb-5">
          {/* Recent Journal Entries */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-[15px] font-bold text-gray-900">
                Recent Journal Entries
              </h2>
              <Link
                to="/admin/journals"
                className="text-[12px] text-[#d69a22] font-semibold hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {[
                      "Journal Name",
                      "Articles",
                      "Last Updated",
                      "Status",
                      "Action",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentJournalEntries?.length ? (
                    stats.recentJournalEntries.map((j) => (
                      <tr
                        key={j.id}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-[32px] h-[32px] rounded-lg bg-[#fff8ec] flex items-center justify-center shrink-0">
                              <BookOpen size={14} className="text-[#d69a22]" />
                            </div>
                            <span className="text-[13px] font-medium text-gray-800 line-clamp-1">
                              {j.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[13px] text-gray-600">
                          {j.articleCount?.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-[12px] text-gray-500">
                          {new Date(j.updatedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
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
                            <Link to={`/admin/journals/${j.id}`}>
                              <Eye
                                size={15}
                                className="text-gray-400 hover:text-[#d69a22] cursor-pointer"
                              />
                            </Link>
                            <MoreVertical
                              size={15}
                              className="text-gray-400 cursor-pointer"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-[13px] text-gray-400"
                      >
                        No journals yet.{" "}
                        <Link
                          to="/admin/journals/add"
                          className="text-[#d69a22] hover:underline"
                        >
                          Add one
                        </Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col gap-4">
            {/* Recent Uploads */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[15px] font-bold text-gray-900">
                  Recent Uploads
                </h2>
                <Link
                  to="/admin/bulk-upload"
                  className="text-[12px] text-[#d69a22] font-semibold hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {stats?.recentUploads?.length ? (
                  stats.recentUploads.map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="w-[32px] h-[32px] rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                        <CheckCircle size={14} className="text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium text-gray-800 truncate">
                          {u.title}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[12px] text-gray-400 text-center py-4">
                    No recent uploads
                  </p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-[15px] font-bold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Upload Data", icon: Upload, path: "/admin/upload" },
                  {
                    label: "Bulk Upload",
                    icon: Database,
                    path: "/admin/bulk-upload",
                  },
                  {
                    label: "Add Journal",
                    icon: Plus,
                    path: "/admin/journals/add",
                  },
                  { label: "Add Author", icon: Users, path: "/admin/authors" },
                  {
                    label: "Add Keyword",
                    icon: PenLine,
                    path: "/admin/keywords",
                  },
                  {
                    label: "Generate Report",
                    icon: BarChart3,
                    path: "/admin/reports",
                  },
                ].map((a) => {
                  const Icon = a.icon;
                  return (
                    <Link
                      key={a.label}
                      to={a.path}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-[#fff8ec] transition-colors group"
                    >
                      <div className="w-[36px] h-[36px] rounded-lg bg-[#fff8ec] group-hover:bg-[#d69a22] flex items-center justify-center transition-colors">
                        <Icon
                          size={16}
                          className="text-[#d69a22] group-hover:text-white"
                        />
                      </div>
                      <span className="text-[10px] text-gray-600 text-center leading-tight">
                        {a.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* System Overview */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-[15px] font-bold text-gray-900 mb-4">
                System Overview
              </h2>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <HardDrive size={18} className="mx-auto text-gray-400 mb-1" />
                  <p className="text-[10px] text-gray-500">Storage</p>
                  <p className="text-[12px] font-bold text-gray-800">48.6 GB</p>
                  <div className="mt-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#d69a22] rounded-full w-[24%]" />
                  </div>
                  <p className="text-[9px] text-gray-400 mt-1">24% of 200 GB</p>
                </div>
                <div className="text-center">
                  <Users size={18} className="mx-auto text-gray-400 mb-1" />
                  <p className="text-[10px] text-gray-500">Active Users</p>
                  <p className="text-[12px] font-bold text-gray-800">12</p>
                  <p className="text-[10px] text-blue-500 mt-1">Online</p>
                </div>
                <div className="text-center">
                  <Activity size={18} className="mx-auto text-gray-400 mb-1" />
                  <p className="text-[10px] text-gray-500">Status</p>
                  <p className="text-[12px] font-bold text-green-600">
                    Healthy
                  </p>
                  <p className="text-[9px] text-green-500 mt-1">
                    ✓ All systems operational
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// Simple SVG Line Chart
function SimpleLineChart({ data }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const w = 600,
    h = 180,
    pad = 40;
  const xStep = (w - pad * 2) / Math.max(data.length - 1, 1);

  const points = data.map((d, i) => ({
    x: pad + i * xStep,
    y: h - pad - (d.count / max) * (h - pad * 2),
    ...d,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
  const areaD = `${pathD} L ${points[points.length - 1]?.x} ${h - pad} L ${pad} ${h - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[200px]">
      {/* Y gridlines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = h - pad - t * (h - pad * 2);
        return (
          <g key={t}>
            <line
              x1={pad}
              y1={y}
              x2={w - pad}
              y2={y}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
            <text
              x={pad - 5}
              y={y + 4}
              textAnchor="end"
              fontSize="9"
              fill="#9ca3af"
            >
              {Math.round(max * t)}
            </text>
          </g>
        );
      })}
      {/* Area */}
      {points.length > 0 && (
        <path d={areaD} fill="url(#areaGrad)" opacity="0.3" />
      )}
      {/* Line */}
      {points.length > 0 && (
        <path
          d={pathD}
          fill="none"
          stroke="#d69a22"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {/* Dots + Labels */}
      {points.map((p, i) => (
        <g key={i}>
          <circle
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#d69a22"
            stroke="white"
            strokeWidth="2"
          />
          <text
            x={p.x}
            y={h - 8}
            textAnchor="middle"
            fontSize="9"
            fill="#9ca3af"
          >
            {p.month}
          </text>
        </g>
      ))}
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d69a22" />
          <stop offset="100%" stopColor="#d69a22" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Simple Donut Chart
function SubjectPieChart({ data, total }) {
  const colors = COLORS;
  const radius = 55;
  const cx = 80;
  const cy = 80;
  const stroke = 22;
  const circumference = 2 * Math.PI * radius;
  const totalCount = data.reduce((s, d) => s + Number(d.count || 0), 0) || 1;

  let offset = 0;

  const slices = data.map((d, i) => {
    const pct = Number(d.count || 0) / totalCount;
    const len = pct * circumference;
    const slice = {
      ...d,
      offset,
      len,
      color: colors[i % colors.length],
      pct,
    };
    offset += len;
    return slice;
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        viewBox="0 0 160 160"
        className="w-[155px] h-[155px] shrink-0 -rotate-90"
      >
        {slices.map((s, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={s.color}
            strokeWidth={stroke}
            strokeDasharray={`${s.len} ${circumference - s.len}`}
            strokeDashoffset={-s.offset}
            strokeLinecap="round"
          />
        ))}

        <text
          x={cx}
          y={cy + 2}
          textAnchor="middle"
          fontSize="18"
          fontWeight="bold"
          fill="#111"
          style={{ transform: "rotate(90deg)", transformOrigin: "80px 80px" }}
        >
          {(total || 0).toLocaleString()}
        </text>

        <text
          x={cx}
          y={cy + 18}
          textAnchor="middle"
          fontSize="8"
          fill="#9ca3af"
          style={{ transform: "rotate(90deg)", transformOrigin: "80px 80px" }}
        >
          Articles
        </text>
      </svg>

      <div className="w-full space-y-2">
        {slices.map((s, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-3 text-[11px]"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-[9px] h-[9px] rounded-sm shrink-0"
                style={{ background: s.color }}
              />
              <span className="text-gray-600 truncate max-w-[180px]">
                {s.subjectArea}
              </span>
            </div>

            <span className="font-semibold text-gray-700 shrink-0">
              {(s.pct * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

