"use client";

import { useState } from "react";
import { createServiceRequestAction } from "@/actions/serviceRequest.action";
import { UploadCloud, CheckCircle2, AlertCircle, Copy, Check, FileText, Loader2 } from "lucide-react";

export default function ServiceRequestForm({ servicesList = [] }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    nik: "",
    address: "",
    serviceId: servicesList.length > 0 ? servicesList[0].id : "",
    description: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successData, setSuccessData] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      if (!formData.serviceId) {
        throw new Error("Silakan pilih jenis layanan terlebih dahulu.");
      }

      const res = await createServiceRequestAction({
        fullName: formData.fullName,
        phone: formData.phone,
        nik: formData.nik,
        address: formData.address,
        serviceId: formData.serviceId,
        description: formData.description || "",
      });

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
        setSelectedFile(null);
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

        {/* Horizontal Separator Line (Matching Mockup) */}
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

          {/* Alasan Pengajuan */}
          <div>
            <label className="block text-sm font-bold text-[#1b365d] mb-2">
              Alasan Pengajuan
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

          {/* Upload Dokumen Dropzone */}
          <div>
            <label className="block text-sm font-bold text-[#1b365d] mb-2">
              Upload Dokumen (KTP / KK / Surat Pengantar)
            </label>
            <label className="relative flex flex-col items-center justify-center p-8 rounded-2xl bg-[#eef2fc] hover:bg-[#e4ebfc] border-2 border-dashed border-indigo-200/80 cursor-pointer transition-colors group">
              <input
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                accept="image/*,.pdf"
              />
              <UploadCloud className="w-10 h-10 text-indigo-400 group-hover:scale-110 transition-transform mb-2" />
              <span className="text-sm font-semibold text-[#1b365d]">
                {selectedFile ? selectedFile.name : "Klik untuk memilih dokumen"}
              </span>
              <span className="text-xs text-slate-400 mt-1">
                {selectedFile
                  ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                  : "Format disarankan: JPG, PNG, atau PDF (Maks. 5MB)"}
              </span>
            </label>
          </div>

        </div>

        {/* Submit Button (Full Width Dark Navy) */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 py-4 px-6 rounded-2xl bg-[#1c365d] hover:bg-[#132746] active:bg-[#0c183a] text-white font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Memproses Pengajuan...</span>
            </>
          ) : (
            <span>Ajukan</span>
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
              Pengajuan surat/layanan atas nama <span className="font-bold text-slate-900">{successData.fullName}</span> telah terdaftar.
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
              Simpan nomor registrasi di atas untuk melacak status pengajuan Anda ke pihak kelurahan/desa.
            </p>

            <button
              type="button"
              onClick={() => setSuccessData(null)}
              className="w-full py-3 rounded-xl bg-[#1c365d] hover:bg-[#132746] text-white font-bold text-sm transition-colors"
            >
              Tutup
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
