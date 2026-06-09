

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, ArrowLeft, Upload, BookOpen } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { createJournal, updateJournal, getJournal } from "../../api/api";

const SUBJECT_AREAS = [
  "Medical & Health Sciences",
  "Engineering & Technology",
  "Computer Science",
  "Life Sciences",
  "Physical Sciences",
  "Mathematics & Statistics",
  "Social Sciences",
  "Humanities",
  "Business & Economics",
  "Agriculture",
  "Environmental Sciences",
  "Education",
  "Law",
  "Arts",
];

const ACCESS_TYPES = [
  "Open Access",
  "Subscription",
  "Hybrid",
  "Diamond Open Access",
];

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ field, value, onChange, ...props }) {
  return (
    <input
      name={field}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#d69a22] focus:ring-2 focus:ring-[#d69a22]/15 transition"
      {...props}
    />
  );
}

export default function AddEditJournal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id && id !== "add";

  const [form, setForm] = useState({
    title: "",
    shortTitle: "",
    description: "",
    issnPrint: "",
    issnOnline: "",
    publisher: "",
    subjectArea: "",
    indexing: "",
    accessType: "Open Access",
    frequency: "Bi-Monthly",
    language: "English",
    establishedYear: "",
    tags: "",
    status: "active",
  });

  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isEdit) {
      getJournal(id)
        .then((d) => {
          const j = d.data;
          setForm({
            title: j.title || "",
            shortTitle: j.shortTitle || "",
            description: j.description || "",
            issnPrint: j.issnPrint || "",
            issnOnline: j.issnOnline || "",
            publisher: j.publisher || "",
            subjectArea: j.subjectArea || "",
            indexing: j.indexing || "",
            accessType: j.accessType || "Open Access",
            frequency: j.frequency || "Bi-Monthly",
            language: j.language || "English",
            establishedYear: j.establishedYear || "",
            tags: j.tags || "",
            status: j.status || "active",
          });

          if (j.coverImage) {
            setCoverPreview(`http://localhost:5000${j.coverImage}`);
          }
        })
        .catch(() => setError("Failed to load journal"))
        .finally(() => setFetchLoading(false));
    }
  }, [id]);

  const set = (key) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setCoverFile(f);
    setCoverPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (coverFile) fd.append("coverImage", coverFile);

      if (isEdit) {
        await updateJournal(id, fd);
        setSuccess("Journal updated successfully!");
      } else {
        await createJournal(fd);
        setSuccess("Journal created successfully!");
        setTimeout(() => navigate("/admin/journals"), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save journal");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#d69a22] border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/admin/journals")}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-[22px] font-bold text-gray-900">
              {isEdit ? "Edit Journal" : "Add Journal"}
            </h1>
            <p className="text-[13px] text-gray-500">
              {isEdit
                ? "Update journal information"
                : "Add a new journal to the repository"}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-[13px] text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-xl text-[13px] text-green-600">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
            <div className="space-y-5">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-[15px] font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen size={17} className="text-[#d69a22]" /> Basic
                  Information
                </h2>

                <div className="space-y-4">
                  <Field label="Journal Title" required>
                    <Input
                      field="title"
                      value={form.title}
                      onChange={set("title")}
                      placeholder="Enter full journal title"
                      required
                    />
                  </Field>

                  <Field label="Short Title">
                    <Input
                      field="shortTitle"
                      value={form.shortTitle}
                      onChange={set("shortTitle")}
                      placeholder="Abbreviated title for citation"
                    />
                  </Field>

                  <Field label="Description">
                    <textarea
                      value={form.description}
                      onChange={set("description")}
                      rows={4}
                      placeholder="Brief description of the journal scope..."
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#d69a22] focus:ring-2 focus:ring-[#d69a22]/15 transition resize-none"
                    />
                  </Field>

                  <Field label="Publisher">
                    <Input
                      field="publisher"
                      value={form.publisher}
                      onChange={set("publisher")}
                      placeholder="Publishing organization name"
                    />
                  </Field>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-[15px] font-bold text-gray-800 mb-4">
                  ISSN & Classification
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="ISSN (Print)">
                    <Input
                      field="issnPrint"
                      value={form.issnPrint}
                      onChange={set("issnPrint")}
                      placeholder="e.g., 2456-4184"
                    />
                  </Field>

                  <Field label="ISSN (Online)">
                    <Input
                      field="issnOnline"
                      value={form.issnOnline}
                      onChange={set("issnOnline")}
                      placeholder="e.g., 2456-4185"
                    />
                  </Field>

                  <Field label="Frequency">
                    <select
                      value={form.frequency}
                      onChange={set("frequency")}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#d69a22] transition"
                    >
                      <option value="Bi-Monthly">Bi-Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </Field>

                  <Field label="Language">
                    <select
                      value={form.language}
                      onChange={set("language")}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#d69a22] transition"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                    </select>
                  </Field>

                  <Field label="Established Year">
                    <Input
                      field="establishedYear"
                      value={form.establishedYear}
                      onChange={set("establishedYear")}
                      placeholder="e.g., 2015"
                    />
                  </Field>

                  <Field label="Subject Area">
                    <select
                      value={form.subjectArea}
                      onChange={set("subjectArea")}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#d69a22] transition"
                    >
                      <option value="">Select Subject Area</option>
                      {SUBJECT_AREAS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Access Type">
                    <select
                      value={form.accessType}
                      onChange={set("accessType")}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#d69a22] transition"
                    >
                      {ACCESS_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Indexing">
                    <Input
                      field="indexing"
                      value={form.indexing}
                      onChange={set("indexing")}
                      placeholder="Scopus, UGC CARE, Web of Science"
                    />
                  </Field>

                  <Field label="Tags">
                    <Input
                      field="tags"
                      value={form.tags}
                      onChange={set("tags")}
                      placeholder="Peer Reviewed, UGC CARE, Scopus Indexed, Open Access"
                    />
                  </Field>

                  <Field label="Status">
                    <select
                      value={form.status}
                      onChange={set("status")}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#d69a22] transition"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </Field>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-[14px] font-bold text-gray-800 mb-4">
                  Cover Image
                </h3>

                <div
                  className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-[#d69a22] hover:bg-[#fff8ec]/30 transition"
                  onClick={() => document.getElementById("coverInput").click()}
                >
                  {coverPreview ? (
                    <img
                      src={coverPreview}
                      alt="Cover"
                      className="w-full h-[180px] object-cover rounded-lg"
                    />
                  ) : (
                    <div className="py-8">
                      <Upload
                        size={28}
                        className="mx-auto text-gray-300 mb-3"
                      />
                      <p className="text-[12px] text-gray-500">
                        Click to upload cover image
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        JPG, PNG, WebP (max 5MB)
                      </p>
                    </div>
                  )}
                </div>

                <input
                  id="coverInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFile}
                />

                {coverPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setCoverPreview("");
                      setCoverFile(null);
                    }}
                    className="mt-2 w-full text-[12px] text-red-400 hover:text-red-600"
                  >
                    Remove image
                  </button>
                )}
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-[14px] font-bold text-gray-800 mb-3">
                  Publish Settings
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-gray-600">Status</span>
                    <span
                      className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                        form.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {form.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
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
                      ? "Update Journal"
                      : "Save Journal"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/admin/journals")}
                    className="w-full py-2.5 rounded-xl border border-gray-200 text-[13px] text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
