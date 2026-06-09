import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, LogIn, Shield, Mail, Lock } from "lucide-react";
import { loginAdmin } from "../../api/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "admin@mrixplore.com",
    password: "admin123",
    remember: false,
  });

  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginAdmin(form.email, form.password);

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminData", JSON.stringify(data.admin));
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f8fb] via-[#f5f7fb] to-[#eef2f7] flex items-center justify-center px-4">
      <div className="w-full max-w-[380px]">
        {/* Top Welcome Section */}
        <div className="bg-[#f7efe4] border border-[#ecd8bb] rounded-t-3xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-[58px] h-[58px] rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
              <Shield size={32} className="text-[#d69a22]" />
            </div>

            <div>
              <h2 className="text-[20px] font-black text-[#0f1b2d] leading-tight">
                MRI Xplore
              </h2>
              
              <p className="text-[13px] text-gray-600 mt-1">
                Secure access to dashboard
              </p>
              <div className="w-10 h-[2px] bg-[#c58504] mt-1"></div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-b-3xl shadow-xl border-x border-b border-gray-100 p-6 sm:p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-[13px] text-red-600 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                  className="w-full h-[46px] pl-11 pr-4 border border-gray-200 rounded-xl text-[14px] outline-none focus:border-[#d69a22] focus:ring-4 focus:ring-[#d69a22]/10 transition"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  className="w-full h-[46px] pl-11 pr-12 border border-gray-200 rounded-xl text-[14px] outline-none focus:border-[#d69a22] focus:ring-4 focus:ring-[#d69a22]/10 transition"
                  placeholder="Enter password"
                />

                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[48px] rounded-xl bg-[linear-gradient(135deg,#d69a22,#b87518)] text-white font-bold text-[15px] flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition disabled:opacity-60"
            >
              <LogIn size={18} />
              {loading ? "Logging in..." : "Login to Dashboard"}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link
              to="/"
              className="text-[14px] font-semibold text-gray-500 hover:text-[#d69a22]"
            >
              ← Back to Public Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}