"use client";

import { useState } from "react";
import { createServiceRequestAction } from "@/actions/serviceRequest.action";
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  FileText,
  Loader2,
  FileCheck,
  X,
  FileIcon,
} from "lucide-react";

export default function ServiceRequestForm({ servicesList = [] }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    nik: "",
    address: "",
    serviceId: servicesList.length > 0 ? servicesList[0].id : "",
    description: "",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successData, setSuccessData] = useState(null);
  const [copied, setCopied] = useState(false);

  // Find currently selected service details for dynamic requirements
  const selectedService = servicesList.find((s) => s.id === formData.serviceId) || servicesList[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      // Filter out files larger than 10MB
      const validFiles = newFiles.filter((file) => {
        if (file.size > 10 * 1024 * 1024) {
          alert(`File "${file.name}" melebihi batas 10 MB.`);
          return false;
        }
        return true;
      });

      setSelectedFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      if (!formData.serviceId) {
        throw new Error("Silakan pilih jenis layanan terlebih dahulu.");
      }

      const postData = new FormData();
      postData.append("fullName", formData.fullName);
      postData.append("phone", formData.phone);
      postData.append("nik", formData.nik);
      postData.append("address", formData.address);
      postData.append("serviceId", formData.serviceId);
      postData.append("description", formData.description || "");

      // Append all selected document files
      selectedFiles.forEach((file) => {
        postData.append("files", file);
      });

      const res = await createServiceRequestAction(postData);

      if (res.success) {
        setSuccessData({
          submissionNumber: res.submissionNumber,
          fullName: formData.fullName,
        });
        // Reset form
        setFormData({
          fullName: "",
          phone: "",
          nik: "",
          address: "",
          serviceId: servicesList.length > 0 ? servicesList[0].id : "",
          description: "",
        });
        setSelectedFiles([]);
      } else {
        setErrorMsg(res.message || "Gagal membuat pengajuan.");
      }
    } catch (err) {
      setErrorMsg(err.message || "Terjadi kesalahan saat mengirim pengajuan.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (successData?.submissionNumber) {
      navigator.clipboard.writeText(successData.submissionNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      
      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100"
      >
        
        {/* Error Alert if any */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
            <div>
              <p className="font-bold">Gagal Mengirim Pengajuan</p>
              <p className="mt-0.5 text-rose-700">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* SECTION 1: DATA PEMOHON */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Nama Pemohon */}
            <div>
              <label className="block text-sm font-bold text-[#1b365d] mb-2">
                Nama Pemohon <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-3.5 rounded-2xl bg-[#eef2fc] border-0 text-[#1b365d] placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all"
              />
            </div>

            {/* No. HP */}
            <div>
              <label className="block text-sm font-bold text-[#1b365d] mb-2">
                No. HP <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Contoh: 081234567890"
                className="w-full px-4 py-3.5 rounded-2xl bg-[#eef2fc] border-0 text-[#1b365d] placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* NIK */}
            <div>
              <label className="block text-sm font-bold text-[#1b365d] mb-2">
                NIK <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="nik"
                required
                maxLength={16}
                value={formData.nik}
                onChange={handleChange}
                placeholder="16 digit NIK KTP"
                className="w-full px-4 py-3.5 rounded-2xl bg-[#eef2fc] border-0 text-[#1b365d] placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-sm font-bold text-[#1b365d] mb-2">
              Alamat <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="address"
              required
              rows={3}
              value={formData.address}
              onChange={handleChange}
              placeholder="Masukkan alamat lengkap pemohon"
              className="w-full px-4 py-3.5 rounded-2xl bg-[#eef2fc] border-0 text-[#1b365d] placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all resize-none"
            />
          </div>
        </div>

        {/* Horizontal Separator Line */}
        <div className="w-full h-[1.5px] bg-[#dbe5f7] my-8" />

        {/* SECTION 2: DETAIL PENGAJUAN */}
        <div className="space-y-6">
          
          {/* Jenis Layanan */}
          <div>
            <label className="block text-sm font-bold text-[#1b365d] mb-2">
              Jenis Layanan <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                name="serviceId"
                required
                value={formData.serviceId}
                onChange={handleChange}
                className="w-full appearance-none px-4 py-3.5 pr-10 rounded-2xl bg-[#eef2fc] border-0 text-[#1b365d] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all cursor-pointer"
              >
                {servicesList.length === 0 ? (
                  <option value="">Tidak ada layanan aktif</option>
                ) : (
                  servicesList.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))
                )}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#1b365d] text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Dynamic Service Requirement Box */}
          {selectedService && (
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3">
              <FileCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div className="text-xs text-indigo-900 leading-relaxed">
                <p className="font-bold text-indigo-950 text-sm mb-1">
                  Persyaratan Dokumen untuk {selectedService.name}:
                </p>
                <p className="whitespace-pre-line text-slate-700">
                  {selectedService.requirement ||
                    selectedService.description ||
                    "KTP, Kartu Keluarga, dan Surat Pengantar RT/RW."}
                </p>
              </div>
            </div>
          )}

          {/* Alasan Pengajuan */}
          <div>
            <label className="block text-sm font-bold text-[#1b365d] mb-2">
              Alasan / Keterangan Pengajuan
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Jelaskan secara singkat keperluan atau alasan pengajuan surat ini"
              className="w-full px-4 py-3.5 rounded-2xl bg-[#eef2fc] border-0 text-[#1b365d] placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all resize-none"
            />
          </div>

          {/* Upload Dokumen Dropzone (Multiple Files Support) */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-[#1b365d]">
              Upload Dokumen Lampiran (Bisa Lebih dari 1 File)
            </label>
            <label className="relative flex flex-col items-center justify-center p-8 rounded-2xl bg-[#eef2fc] hover:bg-[#e4ebfc] border-2 border-dashed border-indigo-200/80 cursor-pointer transition-colors group">
              <input
                type="file"
                multiple
                className="sr-only"
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx"
              />
              <UploadCloud className="w-10 h-10 text-indigo-400 group-hover:scale-110 transition-transform mb-2" />
              <span className="text-sm font-semibold text-[#1b365d]">
                Klik untuk memilih satu atau beberapa dokumen
              </span>
              <span className="text-xs text-slate-400 mt-1">
                Format disarankan: JPG, PNG, PDF, DOCX (Maks. 10MB per file)
              </span>
            </label>

            {/* Selected File List */}
            {selectedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-xs font-semibold text-slate-500">
                  Dokumen Terpilih ({selectedFiles.length} file):
                </p>
                <div className="space-y-2">
                  {selectedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <FileIcon className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span className="font-medium text-slate-800 truncate max-w-xs sm:max-w-md">
                          {file.name}
                        </span>
                        <span className="text-xs text-slate-400 font-mono shrink-0">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(idx)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Hapus dokumen ini"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 py-4 px-6 rounded-2xl bg-[#1c365d] hover:bg-[#132746] active:bg-[#0c183a] text-white font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Memproses Pengajuan & Mengunggah Dokumen...</span>
            </>
          ) : (
            <span>Kirim Pengajuan</span>
          )}
        </button>

      </form>

      {/* Success Modal Popup */}
      {successData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-extrabold text-[#1b365d]">
              Pengajuan Berhasil!
            </h3>

            <p className="text-sm text-slate-600 mt-2">
              Pengajuan surat/layanan atas nama <span className="font-bold text-slate-900">{successData.fullName}</span> telah terdaftar beserta dokumen lampirannya.
            </p>

            {/* Submission Number Box */}
            <div className="my-6 p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-between gap-3">
              <div className="text-left">
                <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">
                  Nomor Registrasi
                </p>
                <p className="text-lg font-mono font-extrabold text-[#1b365d]">
                  {successData.submissionNumber}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-indigo-200 text-indigo-700 font-semibold text-xs hover:bg-indigo-100/50 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Simpan nomor registrasi di atas untuk melacak status pengajuan Anda ke pihak desa.
            </p>

            <button
              type="button"
              onClick={() => setSuccessData(null)}
              className="w-full py-3 rounded-xl bg-[#1c365d] hover:bg-[#132746] text-white font-bold text-sm transition-colors cursor-pointer"
            >
              Tutup
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
