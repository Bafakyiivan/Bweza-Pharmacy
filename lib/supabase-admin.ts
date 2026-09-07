type JsonRecord = Record<string, unknown>;

function config() {
  const rawUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!rawUrl || !key) return null;
  try {
    const url = new URL(rawUrl);
    if (url.protocol !== "https:") return null;
    return { url: url.toString().replace(/\/$/, ""), key };
  } catch {
    return null;
  }
}

function headers(key: string, extra?: HeadersInit) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    ...extra,
  };
}

export function isSupabaseConfigured() {
  return Boolean(config());
}

export async function insertRow<T extends JsonRecord>(table: string, row: T) {
  const settings = config();
  if (!settings) throw new Error("Supabase is not configured.");
  const response = await fetch(`${settings.url}/rest/v1/${table}`, {
    method: "POST",
    headers: headers(settings.key, {
      "content-type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify(row),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Database write failed (${response.status}).`);
  const records = (await response.json()) as Array<JsonRecord>;
  return records[0] ?? row;
}

export async function uploadPrivatePrescription(path: string, file: File) {
  const settings = config();
  if (!settings) throw new Error("Supabase is not configured.");
  const bucket = process.env.SUPABASE_PRESCRIPTIONS_BUCKET || "prescriptions";
  const response = await fetch(`${settings.url}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: headers(settings.key, {
      "content-type": file.type,
      "x-upsert": "false",
    }),
    body: await file.arrayBuffer(),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`Private file upload failed (${response.status}).`);
}

export async function deletePrivatePrescription(path: string) {
  const settings = config();
  if (!settings) return;
  const bucket = process.env.SUPABASE_PRESCRIPTIONS_BUCKET || "prescriptions";
  await fetch(`${settings.url}/storage/v1/object/${bucket}/${path}`, {
    method: "DELETE",
    headers: headers(settings.key),
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  }).catch(() => undefined);
}
