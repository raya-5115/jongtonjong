const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://qmmadlnfiizyevzmcizz.supabase.co";

export function getPublicImageUrl(path) {
  if (!path) {
    return null;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${SUPABASE_URL}/storage/v1/object/public/images/${path}`;
}
