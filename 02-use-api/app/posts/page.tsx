export const dynamic = "force-dynamic";
import PostsClient from "@/components/posts-client";
import { getAllPosts } from "@/services/posts";
import { getBaseUrl } from "@/services/api";

export default async function PostsPage() {
  const envelope = await getAllPosts();
  const data = envelope.data ?? [];
  let apiUrl = "-";
  try {
    apiUrl = getBaseUrl();
  } catch {}

  return (
    <main>
      <section className="mt-32 flex items-center justify-center">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold">Posts</h1>
            <p className="text-sm text-muted-foreground">
              Diperbarui: {new Date(envelope.updatedAt).toLocaleString()} •
              Total: {envelope.count}
            </p>
            <p className="text-xs text-muted-foreground">
              Terhubung ke API: <span className="font-mono">{apiUrl}</span>
            </p>
            {envelope.statusCode !== 200 && (
              <p className="text-xs text-red-600 dark:text-red-400">
                Gagal memuat data dari API (status: {envelope.statusCode})
              </p>
            )}
          </div>
          <PostsClient data={data} />
        </div>
      </section>
    </main>
  );
}
