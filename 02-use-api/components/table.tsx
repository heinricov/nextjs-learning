"use client";
import type { Post } from "@/services/posts";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/services/posts";
import { useRouter } from "next/navigation";

type TableProps = {
  data: Post[];
  onEdit?: (item: Post) => void;
};

export default function Table({ data, onEdit }: TableProps) {
  const router = useRouter();

  // Edit ditangani oleh parent agar data ditampilkan di form

  async function onDelete(item: Post) {
    const ok = window.confirm(`Hapus post #${item.id}?`);
    if (!ok) return;
    const res = await deletePost(item.id);
    if (res.ok) {
      router.refresh();
    } else {
      window.alert(res.error ?? "Gagal menghapus post");
    }
  }
  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-zinc-100 dark:bg-zinc-900">
          <tr>
            <th className="px-3 py-2 text-left font-medium">ID</th>
            <th className="px-3 py-2 text-left font-medium">Judul</th>
            <th className="px-3 py-2 text-left font-medium">Konten</th>
            <th className="px-3 py-2 text-left font-medium">Dibuat</th>
            <th className="px-3 py-2 text-left font-medium">Diubah</th>
            <th className="px-3 py-2 text-left font-medium">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                className="px-3 py-3 text-center text-muted-foreground"
                colSpan={5}
              >
                Tidak ada data
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-3 py-2 align-top">{item.id}</td>
                <td className="px-3 py-2 align-top">{item.title}</td>
                <td className="px-3 py-2 align-top">{item.content}</td>
                <td className="px-3 py-2 align-top">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td className="px-3 py-2 align-top">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => onEdit?.(item)}
                    >
                      Ubah
                    </Button>
                    <Button
                      variant="destructive"
                      size="xs"
                      onClick={() => onDelete(item)}
                    >
                      Hapus
                    </Button>
                  </div>
                </td>
                <td className="px-3 py-2 align-top">
                  {new Date(item.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
