import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload, FileSpreadsheet, Download, CheckCircle, X,
  ArrowRight, Info, HelpCircle, FileText,
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getJournals, bulkUploadArticles, downloadTemplate } from '../../api/api';

const STEPS_BULK = [
  { num: 1, label: 'Upload File' },
  { num: 2, label: 'Map Columns' },
  { num: 3, label: 'Validate Data' },
  { num: 4, label: 'Preview & Confirm' },
  { num: 5, label: 'Import' },
];

export default function BulkUpload() {
  const navigate = useNavigate();
  const [step] = useState(1);
  const [journals, setJournals] = useState([]);
  const [journalId, setJournalId] = useState('');
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [skipEmpty, setSkipEmpty] = useState(true);
  const [updateExisting, setUpdateExisting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const dropRef = useRef();

  useEffect(() => {
    getJournals({ limit: 200 }).then((d) => setJournals(d.data || []));
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && (f.name.endsWith('.xlsx') || f.name.endsWith('.xls'))) setFile(f);
    else setError('Please upload a .xlsx or .xls file');
  };

  const handleUpload = async () => {
    if (!file) return setError('Please select an Excel file');
    setError('');
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('excelFile', file);
      fd.append('journalId', journalId);
      fd.append('skipEmpty', skipEmpty.toString());
      fd.append('updateExisting', updateExisting.toString());
      const data = await bulkUploadArticles(fd);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const blob = await downloadTemplate();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'article_template.xlsx';
      a.click();
    } catch (err) {
      setError('Failed to download template');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[22px] font-bold text-gray-900">Bulk Article Upload</h1>
          <p className="text-[13px] text-gray-500 mt-0.5">Upload multiple articles to the repository</p>
        </div>

        {/* Step indicator */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-5">
          <div className="flex items-center">
            {STEPS_BULK.map((s, i) => (
              <div key={s.num} className="flex items-center flex-1 min-w-0">
                <div className={`flex items-center gap-2 shrink-0`}>
                  <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center text-[12px] font-bold ${
                    s.num === 1 ? 'bg-[#d69a22] text-white shadow-lg' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {s.num}
                  </div>
                  <span className={`text-[12px] font-semibold hidden sm:block ${s.num === 1 ? 'text-[#d69a22]' : 'text-gray-400'}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS_BULK.length - 1 && (
                  <div className="flex-1 h-[2px] mx-3 bg-gray-100 rounded" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
          {/* Main upload area */}
          <div className="space-y-4">
            {result ? (
              /* Success result */
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-center py-6">
                  <div className="w-[64px] h-[64px] rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h2 className="text-[20px] font-bold text-gray-900 mb-2">Import Complete!</h2>
                  <p className="text-[14px] text-gray-500">{result.message}</p>

                  <div className="grid grid-cols-3 gap-4 mt-6 mb-6">
                    <div className="bg-green-50 rounded-xl p-4">
                      <p className="text-[28px] font-black text-green-600">{result.inserted}</p>
                      <p className="text-[12px] text-gray-500 mt-1">Inserted</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-[28px] font-black text-blue-600">{result.updated}</p>
                      <p className="text-[12px] text-gray-500 mt-1">Updated</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-[28px] font-black text-gray-500">{result.skipped}</p>
                      <p className="text-[12px] text-gray-500 mt-1">Skipped</p>
                    </div>
                  </div>

                  {result.errors?.length > 0 && (
                    <div className="mb-6 text-left bg-red-50 rounded-xl p-4">
                      <p className="text-[13px] font-bold text-red-600 mb-2">Errors ({result.errors.length}):</p>
                      {result.errors.slice(0, 5).map((e, i) => (
                        <p key={i} className="text-[12px] text-red-500">{e}</p>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => { setResult(null); setFile(null); }}
                      className="px-5 py-2.5 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50"
                    >
                      Upload Another
                    </button>
                    <button
                      onClick={() => navigate('/admin/articles')}
                      className="px-5 py-2.5 rounded-xl text-white text-[13px] font-semibold hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #d69a22, #b8821a)' }}
                    >
                      View Articles
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Upload File section */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-[16px] font-bold text-gray-900 mb-1">Upload File</h2>
                  <p className="text-[12px] text-gray-500 mb-5">Upload an Excel file containing article details.</p>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-[13px] text-red-600">
                      <X size={14} /> {error}
                    </div>
                  )}

                  {/* Journal dropdown */}
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                      Journal <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={journalId}
                      onChange={(e) => setJournalId(e.target.value)}
                      className="w-full px-3 py-3 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#d69a22] transition"
                    >
                      <option value="">Select Journal</option>
                      {journals.map((j) => (
                        <option key={j.id} value={j.id}>{j.title}</option>
                      ))}
                    </select>
                    <p className="text-[11px] text-gray-400 mt-1.5">Select the journal to which these articles belong.</p>
                  </div>

                  {/* File drop zone */}
                  <div className="mb-2">
                    <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                      Upload Excel File <span className="text-red-500">*</span>
                    </label>
                    <div
                      ref={dropRef}
                      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer ${
                        dragging
                          ? 'border-[#d69a22] bg-[#fff8ec]/60'
                          : file
                          ? 'border-green-400 bg-green-50'
                          : 'border-gray-200 hover:border-[#d69a22] hover:bg-[#fff8ec]/20'
                      }`}
                      onClick={() => document.getElementById('excelInput').click()}
                    >
                      {file ? (
                        <div>
                          <FileSpreadsheet size={36} className="mx-auto text-green-500 mb-3" />
                          <p className="text-[14px] font-semibold text-gray-800">{file.name}</p>
                          <p className="text-[12px] text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          <button
                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                            className="mt-3 text-[12px] text-red-400 hover:text-red-600"
                          >
                            Remove file
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="w-[56px] h-[56px] rounded-full bg-[#fff8ec] flex items-center justify-center mx-auto mb-4">
                            <Upload size={26} className="text-[#d69a22]" />
                          </div>
                          <p className="text-[14px] font-semibold text-gray-700">Drag & drop your Excel file here</p>
                          <p className="text-[12px] text-gray-400 my-3">or</p>
                          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50">
                            <Upload size={14} /> Browse File
                          </div>
                        </>
                      )}
                    </div>
                    <input
                      id="excelInput"
                      type="file"
                      accept=".xlsx,.xls"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-[11px] text-gray-400">Supported format: .xlsx, .xls</p>
                      <p className="text-[11px] text-gray-400">Maximum file size: 25 MB</p>
                    </div>
                  </div>

                  {/* Import options */}
                  <div className="mt-6">
                    <h3 className="text-[14px] font-bold text-gray-800 mb-3">Import Options</h3>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={skipEmpty}
                          onChange={(e) => setSkipEmpty(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded accent-[#d69a22]"
                        />
                        <div>
                          <p className="text-[13px] font-semibold text-gray-700">Skip rows with empty title</p>
                          <p className="text-[11px] text-gray-400">Articles without a title will be skipped during import.</p>
                        </div>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={updateExisting}
                          onChange={(e) => setUpdateExisting(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded accent-[#d69a22]"
                        />
                        <div>
                          <p className="text-[13px] font-semibold text-gray-700">Update existing records</p>
                          <p className="text-[11px] text-gray-400">If DOI or Article ID already exists, update the existing record.</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Info note */}
                  <div className="mt-5 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
                    <Info size={15} className="text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-[12px] text-blue-600">
                      After uploading, you will be able to map the columns in your file with our system fields.
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigate('/admin/articles')}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={loading || !file}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-[13px] font-bold transition hover:opacity-90 disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, #d69a22, #b8821a)' }}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>Upload & Proceed <ArrowRight size={15} /></>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Upload Guidelines */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-[14px] font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileText size={16} className="text-[#d69a22]" /> Upload Guidelines
              </h3>
              <div className="space-y-2.5">
                {[
                  'Download the template and add your article data.',
                  'Do not change the column headers.',
                  'Ensure mandatory fields are filled.',
                  'Save the file in .xlsx or .xls format only.',
                  'Maximum file size allowed is 25 MB.',
                  'You can upload up to 10,000 articles at a time.',
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={13} className="text-green-500 mt-0.5 shrink-0" />
                    <p className="text-[12px] text-gray-600">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Template */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-[36px] h-[36px] rounded-lg bg-green-100 flex items-center justify-center">
                  <FileSpreadsheet size={18} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-gray-800">Download Template</h3>
                  <p className="text-[11px] text-gray-500">Use our template to ensure correct formatting.</p>
                </div>
              </div>
              <button
                onClick={handleDownloadTemplate}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-200 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                <Download size={14} className="text-[#d69a22]" /> Download Template
              </button>
            </div>

            {/* Required Columns */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-[14px] font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-[#d69a22]">⇅</span> Required Columns
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {[
                  ['Article Title *', 'Publication Date *'],
                  ['Journal Name *', 'Volume'],
                  ['How to cite', 'Issue'],
                  ['Authors', 'Pages'],
                  ['DOI', 'Keywords'],
                ].map(([a, b], i) => (
                  <div key={i} className="contents">
                    <div className="flex items-center gap-1.5">
                      <span className="w-[5px] h-[5px] rounded-full bg-[#d69a22] shrink-0" />
                      <span className="text-[11px] text-gray-600">{a}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-[5px] h-[5px] rounded-full bg-[#d69a22] shrink-0" />
                      <span className="text-[11px] text-gray-600">{b}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-3">* Required fields</p>
            </div>

            {/* Need Help */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-[14px] font-bold text-gray-800 mb-2 flex items-center gap-2">
                <HelpCircle size={16} className="text-[#d69a22]" /> Need Help?
              </h3>
              <p className="text-[12px] text-gray-500 mb-3">
                If you face any issues during upload, please contact our support team.
              </p>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50">
                ✉ Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
