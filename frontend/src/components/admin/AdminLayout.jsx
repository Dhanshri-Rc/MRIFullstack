import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  
  Database,
  Menu,

  LogOut,

  Contact,
  X,
} from "lucide-react";
import logo from "../../assets/dlogoo.webp";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Journals", icon: BookOpen, path: "/admin/journals" },
  { label: "Articles", icon: FileText, path: "/admin/articles" },
 
  { label: "Bulk Upload", icon: Database, path: "/admin/bulk-upload" },
  { label: "Contacts", icon: Contact, path: "/admin/contactadmin" },
];

export default function AdminLayout({ children }) {menubar
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const adminData = JSON.parse(localStorage.getItem("adminData") || "{}");

  const activePage =
    navItems.find((item) => pathname.startsWith(item.path))?.label || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/login");
  };

  const Sidebar = ({ mobile = false }) => (
    <div className="h-full flex flex-col bg-black">
      <div className="h-[72px] px-5 flex items-center justify-between border-b border-white/10 shrink-0">
        <Link
          to="/"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-3 min-w-0"
        >
          <img
            src={logo}
            alt="MRI Xplore"
            className="h-[180px] w-[180px] object-contain "
          />

        
        </Link>

        {mobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.path || pathname.startsWith(item.path + "/");

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`relative flex items-center gap-2 px-3 py-2  rounded-lg text-[13px] font-semibold transition-all ${
                active
                  ? "bg-[#d69a22] text-white shadow-lg shadow-[#d69a22]/20"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-white rounded-r-full" />
              )}

              <span
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  active ? "bg-white/15" : "bg-white/5"
                }`}
              >
                <Icon size={17} />
              </span>

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 shrink-0">
        <div className="rounded-2xl bg-white/5 p-3 border border-white/10">
          <p className="text-white text-[13px] font-semibold">MRI Xplore</p>
          <p className="text-white/45 text-[11px] leading-5 mt-1">
            Empowering Research. Connecting Knowledge.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full bg-[#f4f6f9] overflow-hidden flex">
      <aside className="hidden lg:block w-[250px] shrink-0 h-full">
        <Sidebar />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-[270px] shadow-2xl">
            <Sidebar mobile />
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col h-full">
        <header className="h-[68px] bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center gap-4 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50"
          >
            <Menu size={21} className="text-gray-700" />
          </button>

          <div className="min-w-0">
            <h2 className="text-[16px] sm:text-[18px] font-bold text-gray-900 truncate">
              {activePage}
            </h2>
            <p className="hidden sm:block text-[12px] text-gray-500">
              Manage MRI Xplore admin operations
            </p>
          </div>

         

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
          
            <div className="relative">
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl border border-gray-200 px-2 py-1.5 hover:bg-gray-50"
              >
                <div className="w-[34px] h-[34px] rounded-xl bg-[#d69a22] flex items-center justify-center text-white font-bold text-[14px]">
                  {adminData.name?.charAt(0) || "A"}
                </div>

                <div className="hidden sm:block text-left">
                  <p className="text-[13px] font-semibold text-gray-900 leading-tight">
                    {adminData.name || "Admin User"}
                  </p>
                  <p className="text-[11px] text-gray-500 leading-tight">
                    Super Admin
                  </p>
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-[48px] w-[190px] bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-40">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-[13px] text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-[1400px] mx-auto">{children}</div>
        </main>

        <footer className="hidden sm:flex h-[44px] bg-white border-t border-gray-200 items-center justify-center shrink-0">
          <p className="text-[11px] text-gray-400 text-center px-4">
            © 2025 Multidisciplinary Research Institute, India. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}