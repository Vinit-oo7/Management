import { supabase } from "./supabaseClient";

const notConfiguredError = new Error("Supabase is not configured.");

export function getFriendlyError(error, tableName) {
  if (!error) {
    return "";
  }

  const message = error.message || "Request failed.";
  const isMissingTable =
    error.code === "42P01" ||
    message.toLowerCase().includes("relation") ||
    message.toLowerCase().includes("does not exist");

  if (isMissingTable) {
    return `Table "${tableName}" not found. Run the SQL setup from README.`;
  }

  return message;
}

export async function listRows(tableName, options = {}) {
  if (!supabase) {
    return { data: [], error: notConfiguredError };
  }

  const { orderBy = "created_at", ascending = false, limit = 50 } = options;
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .order(orderBy, { ascending })
    .limit(limit);

  return { data: data || [], error };
}

export async function countRows(tableName, filters = []) {
  if (!supabase) {
    return { count: 0, error: notConfiguredError };
  }

  let query = supabase.from(tableName).select("*", { count: "exact", head: true });
  filters.forEach((filter) => {
    if (filter.op === "eq") {
      query = query.eq(filter.column, filter.value);
    }
  });

  const { count, error } = await query;
  return { count: count || 0, error };
}

export async function insertRow(tableName, payload) {
  if (!supabase) {
    return { data: null, error: notConfiguredError };
  }

  const { data, error } = await supabase.from(tableName).insert([payload]).select().single();
  return { data, error };
}

export async function updateRow(tableName, id, payload) {
  if (!supabase) {
    return { data: null, error: notConfiguredError };
  }

  const { data, error } = await supabase
    .from(tableName)
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}

export async function deleteRow(tableName, id) {
  if (!supabase) {
    return { error: notConfiguredError };
  }

  const { error } = await supabase.from(tableName).delete().eq("id", id);
  return { error };
}

export async function listSettings(keys) {
  if (!supabase) {
    return { data: [], error: notConfiguredError };
  }

  const { data, error } = await supabase
    .from("app_settings")
    .select("key,value_text,updated_at")
    .in("key", keys);

  return { data: data || [], error };
}

export async function upsertSettings(settingsMap) {
  if (!supabase) {
    return { data: [], error: notConfiguredError };
  }

  const rows = Object.entries(settingsMap).map(([key, value]) => ({
    key,
    value_text: value,
    updated_at: new Date().toISOString(),
  }));

  const { data, error } = await supabase
    .from("app_settings")
    .upsert(rows, { onConflict: "key" })
    .select("key,value_text,updated_at");

  return { data: data || [], error };
}
