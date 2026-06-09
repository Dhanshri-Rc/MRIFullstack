import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Trash2,
  Eye,
  Save,
  X,
  RefreshCw,
  Pencil,
} from "lucide-react";
import {
  getContactInfo,
  updateContactInfo,
  getContactMessages,
  deleteContactMessage,
  updateContactMessageStatus,
} from "../../api/api";
import AdminLayout from "../../components/admin/AdminLayout";

export default function ContactAdmin() {
  const [info, setInfo] = useState({
    email: "",
    phone: "",
    address: "",
    workingHours: "",
  });

  const [messages, setMessages] = useState([]);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("all");
  const [deleteModal, setDeleteModal] = useState(false);
const [deleteId, setDeleteId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const infoRes = await getContactInfo();
      const msgRes = await getContactMessages();

      setInfo({
        email: infoRes.data?.email || "",
        phone: infoRes.data?.phone || "",
        address: infoRes.data?.address || "",
        workingHours: infoRes.data?.workingHours || "",
      });

      setMessages(msgRes.data || []);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load contact data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateContactInfo(info);
      alert("Contact info updated successfully");
      setShowInfoModal(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update contact info");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
  try {
    await deleteContactMessage(deleteId);

    setMessages((prev) =>
      prev.filter((msg) => msg.id !== deleteId)
    );

    if (selectedMsg?.id === deleteId) {
      setSelectedMsg(null);
    }

    setDeleteModal(false);
    setDeleteId(null);

  } catch (err) {
    alert(err.response?.data?.message || "Failed to delete message");
  }
};

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateContactMessageStatus(id, status);

      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, status } : msg))
      );

      if (selectedMsg?.id === id) {
        setSelectedMsg((prev) => ({ ...prev, status }));
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const pendingCount = messages.filter(
    (m) => (m.status || "pending") === "pending"
  ).length;

  const resolvedCount = messages.filter((m) => m.status === "resolved").length;

  const filteredMessages =
    filter === "all"
      ? messages
      : messages.filter((m) => (m.status || "pending") === filter);

  return (
    <AdminLayout>
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900">
            Contact Messages
          </h1>
          <p className="text-[13px] text-gray-500">
            View, delete, and update message status
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowInfoModal(true)}
            className="h-[38px] px-4 bg-[#b87518] text-white rounded-md text-[13px] font-semibold flex items-center gap-2 hover:bg-[#9f6413]"
          >
            <Pencil size={15} />
            Edit Contact Info
          </button>

          <button
            onClick={fetchData}
            className="h-[38px] px-4 bg-white border rounded-md text-[13px] flex items-center gap-2 hover:bg-gray-50"
          >
            <RefreshCw size={15} />
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-5">
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold">Contact Messages</h2>
            <span className="text-[12px] bg-[#fbf1df] text-[#b87518] px-3 py-1 rounded-full font-semibold">
              {messages.length} Messages
            </span>
          </div>

          <div className="flex gap-2 flex-wrap">
            <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
              All ({messages.length})
            </FilterButton>

            <FilterButton
              active={filter === "pending"}
              onClick={() => setFilter("pending")}
              type="pending"
            >
              Pending ({pendingCount})
            </FilterButton>

            <FilterButton
              active={filter === "resolved"}
              onClick={() => setFilter("resolved")}
              type="resolved"
            >
              Resolved ({resolvedCount})
            </FilterButton>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading contact messages...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 text-[12px]">Name</th>
                  <th className="p-3 text-[12px]">Email</th>
                  <th className="p-3 text-[12px]">Subject</th>
                  <th className="p-3 text-[12px]">Date</th>
                  <th className="p-3 text-[12px]">Status</th>
                  <th className="p-3 text-[12px] text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredMessages.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-5 text-center text-[13px] text-gray-500"
                    >
                      No contact messages found.
                    </td>
                  </tr>
                ) : (
                  filteredMessages.map((msg) => (
                    <tr key={msg.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-[13px] font-medium">
                        {msg.name}
                      </td>
                      <td className="p-3 text-[13px]">{msg.email}</td>
                      <td className="p-3 text-[13px]">
                        {msg.subject || "General Inquiry"}
                      </td>
                      <td className="p-3 text-[12px] text-gray-500">
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="p-3">
                        <StatusBadge status={msg.status} />
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap justify-center gap-2">
                          <button
                            onClick={() => setSelectedMsg(msg)}
                            className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                            title="View"
                          >
                            <Eye size={15} />
                          </button>

                      

                        <button
  onClick={() => {
    setDeleteId(msg.id);
    setDeleteModal(true);
  }}
  className="w-8 h-8 rounded-md bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100"
>
  <Trash2 size={15} />
</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showInfoModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-[520px] w-full p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-bold">Edit Contact Info</h2>
              <button
                onClick={() => setShowInfoModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleUpdateInfo} className="space-y-4">
              <InputBox
                icon={<Mail size={16} />}
                label="Email"
                name="email"
                value={info.email}
                onChange={handleInfoChange}
              />

              <InputBox
                icon={<Phone size={16} />}
                label="Phone"
                name="phone"
                value={info.phone}
                onChange={handleInfoChange}
              />

              <div>
                <label className="text-[13px] font-semibold flex items-center gap-2 mb-2">
                  <MapPin size={16} />
                  Address
                </label>
                <textarea
                  name="address"
                  value={info.address}
                  onChange={handleInfoChange}
                  rows={4}
                  className="admin-input h-auto py-2"
                  placeholder="Enter address"
                />
              </div>

              <InputBox
                icon={<Clock size={16} />}
                label="Working Hours"
                name="workingHours"
                value={info.workingHours}
                onChange={handleInfoChange}
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInfoModal(false)}
                  className="h-[38px] px-4 border rounded-md text-[13px]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="h-[38px] px-4 bg-[#b87518] text-white rounded-md text-[13px] font-semibold flex items-center gap-2 disabled:opacity-60"
                >
                  <Save size={15} />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedMsg && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-[520px] w-full p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-bold">Message Details</h2>
              <button
                onClick={() => setSelectedMsg(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            <Detail label="Name" value={selectedMsg.name} />
            <Detail label="Email" value={selectedMsg.email} />
            <Detail
              label="Subject"
              value={selectedMsg.subject || "General Inquiry"}
            />
            <Detail
              label="Date"
              value={
                selectedMsg.createdAt
                  ? new Date(selectedMsg.createdAt).toLocaleString()
                  : "-"
              }
            />

            <div className="mb-3">
              <p className="text-[12px] font-semibold text-gray-500">
                Status
              </p>
              <StatusBadge status={selectedMsg.status} />
            </div>

            <div className="mt-4">
              <p className="text-[12px] font-semibold text-gray-500 mb-1">
                Message
              </p>
              <div className="bg-gray-50 border rounded-md p-3 text-[13px] leading-6">
                {selectedMsg.message}
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 mt-5">
            

              <button
                onClick={() => handleStatusUpdate(selectedMsg.id, "pending")}
                className="h-[36px] px-4 bg-yellow-500 text-white rounded-md text-[13px]"
              >
                Pending
              </button>

              <button
                onClick={() => handleStatusUpdate(selectedMsg.id, "resolved")}
                className="h-[36px] px-4 bg-green-600 text-white rounded-md text-[13px]"
              >
                Resolved
              </button>

             
            </div>
          </div>
        </div>
      )}


{deleteModal && (
  <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center p-4">
    <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl overflow-hidden">
      
      <div className="p-6">
       

        <p className="text-[13px] text-gray-600">
          Are you sure you want to delete this contact message?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => {
              setDeleteModal(false);
              setDeleteId(null);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
          >
            Delete 
          </button>
        </div>
      </div>
    </div>
  </div>
)}
      <style>{`
        .admin-input {
          width: 100%;
          height: 38px;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 0 12px;
          font-size: 13px;
          outline: none;
        }
        .admin-input:focus {
          border-color: #b87518;
          box-shadow: 0 0 0 3px rgba(184,117,24,.10);
        }
      `}</style>
    </div>
    </AdminLayout>
  );
}

function FilterButton({ children, active, onClick, type }) {
  let activeClass = "bg-[#b87518] text-white";
  let inactiveClass = "bg-gray-100 text-gray-700";

  if (type === "pending") {
    activeClass = "bg-yellow-500 text-white";
    inactiveClass = "bg-yellow-50 text-yellow-700";
  }

  if (type === "resolved") {
    activeClass = "bg-green-600 text-white";
    inactiveClass = "bg-green-50 text-green-700";
  }

  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-md text-xs font-semibold ${
        active ? activeClass : inactiveClass
      }`}
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }) {
  const current = status || "pending";

  return (
    <span
      className={`inline-flex px-2 py-1 rounded-full text-[11px] font-semibold ${
        current === "resolved"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {current}
    </span>
  );
}

function InputBox({ icon, label, name, value, onChange }) {
  return (
    <div>
      <label className="text-[13px] font-semibold flex items-center gap-2 mb-2">
        {icon}
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="admin-input"
      />
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="mb-3">
      <p className="text-[12px] font-semibold text-gray-500">{label}</p>
      <p className="text-[14px] text-gray-900">{value}</p>
    </div>
  );
}