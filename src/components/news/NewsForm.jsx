"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Undo,
  Redo,
  X,
} from "lucide-react";

import { createNewsAction, updateNewsAction } from "@/actions/news.action";
import { slugify } from "@/lib/slugify";
import { getPublicImageUrl } from "@/lib/storage-utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsForm({ news = null }) {
  const router = useRouter();
  const isEdit = Boolean(news);

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(news?.title ?? "");
  const [slug, setSlug] = useState(news?.slug ?? "");
  const [isSlugUserModified, setIsSlugUserModified] = useState(Boolean(news?.slug));
  const [content, setContent] = useState(news?.content ?? "");

  // Undo/Redo history state
  const [history, setHistory] = useState([news?.content ?? ""]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    news?.image ? getPublicImageUrl(news.image) : null
  );

  const textareaRef = useRef(null);

  // Auto-slug on title change
  function handleTitleChange(e) {
    const val = e.target.value;
    setTitle(val);
    if (!isSlugUserModified) {
      setSlug(slugify(val));
    }
  }

  function handleSlugChange(e) {
    setIsSlugUserModified(true);
    setSlug(slugify(e.target.value));
  }

  function updateContent(newVal) {
    setContent(newVal);
    const newHist = history.slice(0, historyIndex + 1);
    newHist.push(newVal);
    setHistory(newHist);
    setHistoryIndex(newHist.length - 1);
  }

  function handleUndo() {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      setContent(history[prevIdx]);
    }
  }

  function handleRedo() {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setContent(history[nextIdx]);
    }
  }

  // Insert markdown tag at cursor position
  function insertFormat(startTag, endTag = "") {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const replacement = `${startTag}${selectedText}${endTag}`;

    const newContent =
      content.substring(0, start) + replacement + content.substring(end);

    updateContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + startTag.length,
        start + startTag.length + selectedText.length
      );
    }, 0);
  }

  function insertLink() {
    const url = prompt("Masukkan URL link (contoh: https://...):");
    if (!url) return;
    insertFormat("[", `](${url})`);
  }

  function insertImagePrompt() {
    const url = prompt("Masukkan URL gambar (contoh: https://...):");
    if (!url) return;
    insertFormat(`![Gambar](${url})`);
  }

  function insertTableTemplate() {
    const tableMd = `\n| Judul 1 | Judul 2 |\n| --- | --- |\n| Data 1 | Data 2 |\n`;
    insertFormat(tableMd);
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB.");
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleRemoveImage() {
    setImageFile(null);
    setPreviewUrl(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      toast.error("Judul berita wajib diisi.");
      return;
    }

    if (!content.trim()) {
      toast.error("Isi berita wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("content", content);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      let result;
      if (isEdit) {
        result = await updateNewsAction(news.id, formData);
      } else {
        result = await createNewsAction(formData);
      }

      toast.success(result.message);
      router.push("/dashboard/berita");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.message || "Terjadi kesalahan saat menyimpan berita."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Judul Berita */}
      <div className="space-y-1.5">
        <label htmlFor="title" className="text-sm font-semibold text-slate-900 flex items-center gap-1">
          Judul <span className="text-red-500">*</span>
        </label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Judul berita"
          required
          className="h-11 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
        />
      </div>

      {/* Slug (URL) */}
      <div className="space-y-1.5">
        <label htmlFor="slug" className="text-sm font-semibold text-slate-900 flex items-center gap-1">
          Slug (URL) <span className="text-red-500">*</span>
        </label>
        <Input
          id="slug"
          name="slug"
          value={slug}
          onChange={handleSlugChange}
          placeholder=""
          required
          className="h-11 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 font-mono text-xs text-slate-700 bg-slate-50/50"
        />
        <p className="text-xs text-slate-400 font-normal">
          Bagian alamat web berita ini. Otomatis dibuat dari judul.
        </p>
      </div>

      {/* Isi Berita (Rich Text Editor container) */}
      <div className="space-y-1.5">
        <label htmlFor="content" className="text-sm font-semibold text-slate-900 flex items-center gap-1">
          Isi Berita <span className="text-red-500">*</span>
        </label>

        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
          {/* Editor Toolbar */}
          <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b border-slate-100 bg-slate-50/70 text-slate-600">
            {/* Bold */}
            <button
              type="button"
              onClick={() => insertFormat("**", "**")}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-slate-700 font-bold transition"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>

            {/* Italic */}
            <button
              type="button"
              onClick={() => insertFormat("*", "*")}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-slate-700 italic transition"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>

            {/* Strikethrough */}
            <button
              type="button"
              onClick={() => insertFormat("~~", "~~")}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-slate-700 line-through transition"
              title="Strikethrough"
            >
              <Strikethrough className="w-4 h-4" />
            </button>

            <div className="h-4 w-[1px] bg-slate-200 mx-1" />

            {/* H2 */}
            <button
              type="button"
              onClick={() => insertFormat("\n## ", "\n")}
              className="px-2 py-1 text-xs font-bold rounded-lg hover:bg-white hover:shadow-2xs text-slate-700 transition"
              title="Heading 2"
            >
              H₂
            </button>

            {/* H3 */}
            <button
              type="button"
              onClick={() => insertFormat("\n### ", "\n")}
              className="px-2 py-1 text-xs font-bold rounded-lg hover:bg-white hover:shadow-2xs text-slate-700 transition"
              title="Heading 3"
            >
              H₃
            </button>

            <div className="h-4 w-[1px] bg-slate-200 mx-1" />

            {/* Bullet List */}
            <button
              type="button"
              onClick={() => insertFormat("\n- ")}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-slate-700 transition"
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </button>

            {/* Numbered List */}
            <button
              type="button"
              onClick={() => insertFormat("\n1. ")}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-slate-700 transition"
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </button>

            {/* Quote */}
            <button
              type="button"
              onClick={() => insertFormat("\n> ")}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-slate-700 transition"
              title="Quote"
            >
              <Quote className="w-4 h-4" />
            </button>

            <div className="h-4 w-[1px] bg-slate-200 mx-1" />

            {/* Link */}
            <button
              type="button"
              onClick={insertLink}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-slate-700 transition"
              title="Insert Link"
            >
              <LinkIcon className="w-4 h-4" />
            </button>

            {/* Image */}
            <button
              type="button"
              onClick={insertImagePrompt}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-slate-700 transition"
              title="Insert Image Link"
            >
              <ImageIcon className="w-4 h-4" />
            </button>

            {/* Table */}
            <button
              type="button"
              onClick={insertTableTemplate}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-slate-700 transition"
              title="Insert Table"
            >
              <TableIcon className="w-4 h-4" />
            </button>

            <div className="ml-auto flex items-center gap-1">
              {/* Undo */}
              <button
                type="button"
                onClick={handleUndo}
                disabled={historyIndex === 0}
                className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-slate-600 disabled:opacity-30 transition"
                title="Undo"
              >
                <Undo className="w-4 h-4" />
              </button>

              {/* Redo */}
              <button
                type="button"
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-slate-600 disabled:opacity-30 transition"
                title="Redo"
              >
                <Redo className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Textarea Area */}
          <textarea
            ref={textareaRef}
            id="content"
            name="content"
            value={content}
            onChange={(e) => updateContent(e.target.value)}
            rows={12}
            required
            className="w-full p-4 border-0 focus:ring-0 outline-none text-slate-800 text-sm leading-relaxed resize-y"
          />

          {/* Character counter footer */}
          <div className="px-4 py-2 border-t border-slate-100 bg-white text-xs font-medium text-slate-400">
            {content.length} karakter
          </div>
        </div>
      </div>

      {/* Gambar Sampul (Custom Pill Upload UI matching Screenshot) */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-900">
          Gambar Sampul
        </label>

        {previewUrl ? (
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <Image
              src={previewUrl}
              alt="Preview Gambar Sampul"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-3 right-3 p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition shadow cursor-pointer"
              title="Hapus gambar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-2 rounded-2xl border border-slate-200 bg-white">
            <label className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition cursor-pointer shrink-0">
              Choose File
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <span className="text-sm text-slate-500 font-normal truncate">
              {imageFile ? imageFile.name : "No file chosen"}
            </span>
          </div>
        )}

        <p className="text-xs text-slate-400 font-normal">
          Otomatis diperkecil dan dikompres saat diunggah.
        </p>
      </div>

      {/* Form Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-xs"
        >
          {loading
            ? "Menyimpan..."
            : isEdit
            ? "Simpan Perubahan"
            : "Tambah Berita"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/berita")}
          disabled={loading}
          className="rounded-xl px-6 py-2.5"
        >
          Batal
        </Button>
      </div>
    </form>
  );
}
