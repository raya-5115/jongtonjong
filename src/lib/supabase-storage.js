import "server-only";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://qmmadlnfiizyevzmcizz.supabase.co";

const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";

export const supabaseStorage = createClient(
  supabaseUrl,
  supabaseSecretKey
);