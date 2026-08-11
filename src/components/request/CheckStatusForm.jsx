"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  FileText,
  ExternalLink,
  MessageSquare,
  User,
  Phone,
  MapPin,
  Tag,
  Loader2,
  ArrowLeft,
  RotateCcw,
  Copy,
  Check,
} from "lucide-react";

import { checkServiceRequestStatusAction } from "@/actions/serviceRequest.action";
import { getPublicImageUrl } from "@/lib/storage-utils";

function formatErrorMessage(rawMessage) {
  if (!rawMessage) return "";
  if (typeof rawMessage !== "string") return String(rawMessage);

  if (rawMessage.startsWith("[")) {
    try {
      const parsed = JSON.parse(rawMessage);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item) => item.message).filter(Boolean).join(". ");
      }
    } catch (e) {
      // Ignore
    }
  }
  return rawMessage;
}

const STATUS_CONFIG = {
  PENDING: {
    label: "Menunggu Diproses",
    color: "bg-amber-50 text-amber-800 border-amber-200",
    badgeColor: "bg-amber-500",
    icon: Clock,
    stepIndex: 1,
    desc: "Pengajuan Anda telah diterima dan sedang menunggu giliran antrean verifikasi oleh petugas desa.",
  },
  PROCESS: {
    label: "Sedang Diproses",
    color: "bg-blue-50 text-blue-800 border-blue-200",
    badgeColor: "bg-blue-600",
    icon: Loader2,
    stepIndex: 2,
    desc: "Pengajuan Anda saat ini sedang dalam pemeriksaan dan pembuatan berkas oleh Kasi Pelayanan Desa.",
  },
  FINISHED: {
    label: "Selesai",
    color: "bg-emerald-50 text-emerald-800 border-emerald-200",
    badgeColor: "bg-emerald-600",
    icon: CheckCircle2,
    stepIndex: 3,
    desc: "Dokumen/layanan Anda telah selesai diproses oleh Pemerintah Desa Tonjong.",
  },
  REJECTED: {
    label: "Ditolak",
    color: "bg-rose-50 text-rose-800 border-rose-200",
    badgeColor: "bg-rose-600",
    icon: XCircle,
    stepIndex: 3,
    desc: "Pengajuan Anda ditolak oleh petugas. Silakan periksa alasan penolakan pada catatan admin di bawah.",
  },
};

export default function CheckStatusForm() {
  const searchParams = useSearchParams();

  const [ticketNumber, setTicketNumber] = useState("");
  const [nik, setNik] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [requestData, setRequestData] = useState(null);
  const [copied, setCopied] = useState(false);

  // Auto-search if query params present in URL
  useEffect(() => {
    const tParam = searchParams.get("ticket");
    const nParam = searchParams.get("nik");

    if (tParam) setTicketNumber(tParam);
    if (nParam) setNik(nParam);

    if (tParam && nParam) {
      handleSearch(tParam, nParam);
    }
  }, [searchParams]);

  async function handleSearch(tNum = ticketNumber, nVal = nik) {
    if (!tNum || !tNum.trim()) {
      setErrorMsg("Silakan masukkan Nomor Registrasi / Tiket Pengajuan.");
      return;
    }
    if (!nVal || !nVal.trim()) {
      setErrorMsg("Silakan masukkan NIK Pemohon.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setRequestData(null);

    try {
      const res = await checkServiceRequestStatusAction({
        submissionNumber: tNum.trim(),
        nik: nVal.trim(),
      });

      if (res.success) {
        setRequestData(res.data);
      } else {
        setErrorMsg(formatErrorMessage(res.message));
      }
    } catch (err) {
      setErrorMsg(formatErrorMessage(err.message || "Terjadi kesalahan saat melacak pengajuan."));
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch();
  }

  function handleReset() {
    setTicketNumber("");
    setNik("");
    setErrorMsg("");
    setRequestData(null);
  }

  function handleCopyTicket() {
    if (requestData?.submissionNumber) {
      navigator.clipboard.writeText(requestData.submissionNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const statusInfo = requestData
    ? STATUS_CONFIG[requestData.status] || STATUS_CONFIG.PENDING
    : null;

  const StatusIcon = statusInfo?.icon || Clock;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 space-y-6"
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1b365d]">
            Cek Status Pengajuan Layanan
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Masukkan Nomor Registrasi/Tiket dan NIK yang Anda gunakan saat mengajukan layanan.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-sm animate-in fade-in">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
            <div>
              <p className="font-bold">Pencarian Tidak Ditemukan</p>
              <p className="mt-1 text-rose-700 font-medium leading-relaxed">
                {formatErrorMessage(errorMsg)}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Nomor Registrasi */}
          <div>
            <label className="block text-sm font-bold text-[#1b365d] mb-2">
              Nomor Registrasi / Tiket <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value)}
              placeholder="Contoh: REG-20260811-XXXX"
              className="w-full px-4 py-3.5 rounded-2xl bg-[#eef2fc] border-0 text-[#1b365d] placeholder:text-slate-400 font-mono font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all uppercase"
            />
          </div>

          {/* NIK */}
          <div>
            <label className="block text-sm font-bold text-[#1b365d] mb-2">
              NIK Pemohon <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={16}
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              placeholder="16 digit NIK KTP"
              className="w-full px-4 py-3.5 rounded-2xl bg-[#eef2fc] border-0 text-[#1b365d] placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-[#1c365d] hover:bg-[#132746] active:bg-[#0c183a] text-white font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Mencari Data...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Lacak Pengajuan</span>
              </>
            )}
          </button>

          {requestData && (
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-3.5 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Cari Lain</span>
            </button>
          )}
        </div>
      </form>

      {/* Result Container */}
      {requestData && statusInfo && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 space-y-8 animate-in fade-in duration-300">
          
          {/* Result Header Card */}
          <div className={`p-6 rounded-2xl border ${statusInfo.color} space-y-4`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl bg-white shadow-2xs`}>
                  <StatusIcon className="w-6 h-6 text-slate-800" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                    Status Pengajuan
                  </span>
                  <h3 className="text-xl font-extrabold tracking-tight">
                    {statusInfo.label}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs font-mono text-xs font-bold text-slate-800">
                <span>{requestData.submissionNumber}</span>
                <button
                  type="button"
                  onClick={handleCopyTicket}
                  className="p-1 hover:bg-slate-100 rounded-md transition"
                  title="Salin nomor tiket"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-sm leading-relaxed opacity-90">
              {statusInfo.desc}
            </p>
          </div>

          {/* Process Timeline Steps */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
              Progres Pengajuan
            </h4>
            <div className="grid grid-cols-3 gap-2 relative">
              {/* Line connector */}
              <div className="absolute top-4 left-[15%] right-[15%] h-[2px] bg-slate-200 -z-0" />
              
              {/* Step 1: Diajukan */}
              <div className="flex flex-col items-center text-center z-10">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs mb-2">
                  ✓
                </div>
                <span className="text-xs font-bold text-slate-900">Diajukan</span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {new Date(requestData.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>

              {/* Step 2: Verifikasi / Diproses */}
              <div className="flex flex-col items-center text-center z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs mb-2 ${
                    statusInfo.stepIndex >= 2
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {statusInfo.stepIndex >= 2 ? "2" : "2"}
                </div>
                <span
                  className={`text-xs font-bold ${
                    statusInfo.stepIndex >= 2 ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  Pemeriksaan
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {statusInfo.stepIndex >= 2 ? "Sedang diverifikasi" : "Menunggu"}
                </span>
              </div>

              {/* Step 3: Selesai / Ditolak */}
              <div className="flex flex-col items-center text-center z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs mb-2 ${
                    requestData.status === "FINISHED"
                      ? "bg-emerald-600 text-white"
                      : requestData.status === "REJECTED"
                      ? "bg-rose-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  3
                </div>
                <span
                  className={`text-xs font-bold ${
                    statusInfo.stepIndex >= 3 ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {requestData.status === "REJECTED" ? "Ditolak" : "Selesai"}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {requestData.status === "FINISHED"
                    ? "Berkas Siap"
                    : requestData.status === "REJECTED"
                    ? "Dibatalkan"
                    : "Menunggu"}
                </span>
              </div>
            </div>
          </div>

          {/* Admin Note / Response Box */}
          <div className="p-6 rounded-2xl bg-indigo-50/80 border border-indigo-100 space-y-2">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              <span>Pesan & Jawaban dari Admin Desa:</span>
            </div>
            {requestData.note ? (
              <p className="text-sm text-indigo-950 font-medium leading-relaxed whitespace-pre-line bg-white p-4 rounded-xl border border-indigo-100">
                {requestData.note}
              </p>
            ) : (
              <p className="text-xs text-indigo-700/80 italic">
                {requestData.status === "FINISHED"
                  ? "Pengajuan telah disetujui dan dokumen telah terbit."
                  : requestData.status === "REJECTED"
                  ? "Pengajuan ditolak oleh petugas desa."
                  : "Belum ada catatan dari petugas desa. Pengajuan masih dalam antrean pemeriksaan."}
              </p>
            )}
          </div>

          {/* Detail Info Grid */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-[#1b365d] border-b border-slate-100 pb-2">
              Rincian Informasi Pengajuan
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Jenis Layanan</span>
                <p className="font-bold text-[#1b365d]">{requestData.service?.name || "-"}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Nama Pemohon</span>
                <p className="font-bold text-[#1b365d]">{requestData.fullName}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 space-y-1">
                <span className="text-xs text-slate-400 font-medium">NIK Pemohon</span>
                <p className="font-mono font-bold text-[#1b365d]">{requestData.nik}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 space-y-1">
                <span className="text-xs text-slate-400 font-medium">No. Telepon / WhatsApp</span>
                <p className="font-bold text-[#1b365d]">{requestData.phone}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 space-y-1 sm:col-span-2">
                <span className="text-xs text-slate-400 font-medium">Alamat Lengkap</span>
                <p className="font-medium text-slate-800">{requestData.address}</p>
              </div>

              {requestData.description && (
                <div className="p-4 rounded-xl bg-slate-50 space-y-1 sm:col-span-2">
                  <span className="text-xs text-slate-400 font-medium">Keterangan / Alasan</span>
                  <p className="font-medium text-slate-700 whitespace-pre-line">
                    {requestData.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Uploaded Documents List */}
          {requestData.attachments && requestData.attachments.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#1b365d] border-b border-slate-100 pb-2">
                Dokumen Lampiran yang Diunggah ({requestData.attachments.length})
              </h4>
              <div className="space-y-2">
                {requestData.attachments.map((file) => {
                  const fileUrl = getPublicImageUrl(file.fileUrl);

                  return (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 transition text-sm"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span className="font-medium text-slate-800 truncate">
                          {file.fileName}
                        </span>
                      </div>

                      {fileUrl && (
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-indigo-200 text-indigo-700 font-semibold text-xs hover:bg-indigo-50 transition shrink-0 shadow-2xs"
                        >
                          <span>Lihat</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/layanan"
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Buat Pengajuan Baru</span>
            </Link>

            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
            >
              Cari Pengajuan Lain
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
