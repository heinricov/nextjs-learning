"use client";
import { useState } from "react";
import type { Post } from "@/services/posts";
import PostForm from "@/components/post-form";
import Table from "@/components/table";

type Props = {
  data: Post[];
};

export default function PostsClient({ data }: Props) {
  const [editing, setEditing] = useState<Post | null>(null);

  return (
    <>
      <PostForm
        key={editing?.id ?? "new"}
        initial={
          editing
            ? { id: editing.id, title: editing.title, content: editing.content }
            : null
        }
        onDone={() => setEditing(null)}
      />
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <Table data={data} onEdit={(item: Post) => setEditing(item)} />
        </div>
      </div>
    </>
  );
}
