import { checkConnection } from "@/services/api";

export default async function Connection() {
  const conn = await checkConnection();
  return (
    <>
      <div className="rounded-md border p-4 w-full max-w-md">
        <p className="text-sm">
          API URL: <span className="font-mono">{conn.url}</span>
        </p>
        <p className="text-sm">
          Status koneksi:{" "}
          <span
            className={
              conn.ok
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }
          >
            {conn.ok
              ? `Berhasil${conn.status ? ` (${conn.status})` : ""}`
              : `Gagal${
                  conn.status
                    ? ` (${conn.status})`
                    : conn.error
                      ? ` (${conn.error})`
                      : ""
                }`}
          </span>
        </p>
      </div>
    </>
  );
}
