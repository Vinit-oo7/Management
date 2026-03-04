import { supabase } from "./supabaseClient";

const productsTable = process.env.REACT_APP_SUPABASE_PRODUCTS_TABLE || "products";

export async function getPublishedProducts() {
  if (!supabase) {
    return {
      data: [],
      error: new Error("Supabase is not configured."),
    };
  }

  const { data, error } = await supabase
    .from(productsTable)
    .select("id,title,price,currency,status,created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(6);

  return { data: data || [], error };
}
