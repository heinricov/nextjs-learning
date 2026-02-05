"use client";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { createPost, updatePost } from "@/services/posts";
import type { Post } from "@/services/posts";
import { useRouter } from "next/navigation";

type PostFormProps = {
  initial?: Partial<Post> | null;
  onDone?: () => void;
};

export default function PostForm({ initial, onDone }: PostFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  // Inisialisasi dari props; perubahan 'initial' diatasi dengan remount via key di parent
  const [_init] = useState(initial);
  const [title, setTitle] = useState(_init?.title ?? "");
  const [content, setContent] = useState(_init?.content ?? "");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!title.trim() || !content.trim()) {
      setMessage("Title dan content wajib diisi");
      return;
    }
    setLoading(true);
    const payload = { title: title.trim(), content: content.trim() };
    const res =
      initial && typeof initial.id === "number"
        ? await updatePost(initial.id, payload)
        : await createPost(payload);
    setLoading(false);
    if (res.ok) {
      const isEdit = initial && typeof initial.id === "number";
      setTitle("");
      setContent("");
      setMessage(
        isEdit ? "Berhasil memperbarui post" : "Berhasil menambahkan post"
      );
      router.refresh();
      onDone?.();
    } else {
      setMessage(res.error ?? "Gagal menyimpan data");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mb-6 space-y-3 rounded-md border p-4">
      <div className="grid gap-2">
        <label className="text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring"
          placeholder="Masukkan judul"
          maxLength={200}
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring"
          placeholder="Tulis konten"
        />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={loading}>
          {loading
            ? "Menyimpan..."
            : initial && typeof initial.id === "number"
              ? "Perbarui"
              : "Simpan"}
        </Button>
        {initial && typeof initial.id === "number" && (
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => {
              setTitle("");
              setContent("");
              setMessage(null);
              onDone?.();
            }}
          >
            Batal
          </Button>
        )}
        {message && (
          <span className="text-sm text-muted-foreground">{message}</span>
        )}
      </div>
    </form>
  );
}
