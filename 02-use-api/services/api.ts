export function getBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
  return raw.replace(/\/+$/, "");
}

const endpoint = "/posts";

// Fungsi: Mengecek koneksi ke API dengan melakukan request ke base URL
export async function checkConnection(): Promise<{
  url: string;
  ok: boolean;
  status?: number;
  error?: string;
}> {
  let url = "-";
  try {
    url = getBaseUrl();
    const res = await fetch(url + endpoint, {
      method: "GET",
      cache: "no-store"
    });
    return { url, ok: res.ok, status: res.status };
  } catch (err) {
    return {
      url,
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : "Unknown error"
    };
  }
}

// Fungsi: Melakukan fetch ke endpoint API dengan path relatif terhadap base URL
export async function apiFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const base = getBaseUrl();
  const full = base + (path.startsWith("/") ? path : `/${path}`);
  return fetch(full, { cache: "no-store", ...init });
}
