import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.REACT_APP_SUPABASE_URL || process.env.REACT_APP_SUPABASE_PROJECT_URL;
const supabasePublishableKey =
  process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY ||
  process.env.REACT_APP_SUPABASE_ANON_KEY ||
  process.env.REACT_APP_SUPABASE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  // Missing keys should not crash the app in development.
  // The UI displays a clear status message when this happens.
  console.warn(
    "Supabase env vars are missing. Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_PUBLISHABLE_KEY (or REACT_APP_SUPABASE_ANON_KEY).",
  );
}

export const supabase =
  supabaseUrl && supabasePublishableKey
    ? createClient(supabaseUrl, supabasePublishableKey)
    : null;

export async function checkSupabaseConnection() {
  if (!supabaseUrl || !supabasePublishableKey) {
    return {
      ok: false,
      message:
        "Missing env vars: REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_PUBLISHABLE_KEY.",
    };
  }

  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/settings`, {
      method: "GET",
      headers: {
        apikey: supabasePublishableKey,
      },
    });

    if (!response.ok) {
      return {
        ok: false,
        message: `Connection failed (${response.status}).`,
      };
    }

    return { ok: true, message: "Supabase is connected." };
  } catch (error) {
    return {
      ok: false,
      message: "Network error while connecting to Supabase.",
    };
  }
}
