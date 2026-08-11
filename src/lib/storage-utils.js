const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://qmmadlnfiizyevzmcizz.supabase.co";

const LOCAL_STATIC_ASSETS = [
  "logo-sukabumi.png",
  "hero-bg.png",
  "next.svg",
  "vercel.svg",
  "file.svg",
  "globe.svg",
  "window.svg",
];

export function getPublicImageUrl(path) {
  if (!path) {
    return null;
  }

  // If already a full HTTP/HTTPS URL
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Remove leading slash for uniform checking
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // If it's a known local asset in public/
  if (LOCAL_STATIC_ASSETS.includes(cleanPath)) {
    return `/${cleanPath}`;
  }

  // Otherwise, construct Supabase Storage public URL
  return `${SUPABASE_URL}/storage/v1/object/public/images/${cleanPath}`;
}
