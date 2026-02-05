import { apiFetch } from "./api";

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type PostsEnvelope = {
  statusCode: number;
  count: number;
  updatedAt: string;
  data: Post[];
};

export async function getAllPosts(): Promise<PostsEnvelope> {
  try {
    const res = await apiFetch("/posts", { method: "GET" });
    const json = await res.json();
    if (Array.isArray(json) && json.length > 0) {
      return json[0] as PostsEnvelope;
    }
    if (json && typeof json === "object" && "statusCode" in json) {
      return {
        statusCode: (json as { statusCode: number }).statusCode,
        count: 0,
        updatedAt: new Date().toISOString(),
        data: []
      };
    }
    return {
      statusCode: res.status,
      count: 0,
      updatedAt: new Date().toISOString(),
      data: []
    };
  } catch {
    return {
      statusCode: 0,
      count: 0,
      updatedAt: new Date().toISOString(),
      data: []
    };
  }
}

export async function createPost(input: {
  title: string;
  content: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await apiFetch("/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input)
    });
    if (!res.ok) {
      return { ok: false, error: `Status ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return {
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

export async function updatePost(
  id: number,
  input: Partial<{ title: string; content: string }>
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await apiFetch(`/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input)
    });
    if (!res.ok) {
      return { ok: false, error: `Status ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return {
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

export async function deletePost(
  id: number
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await apiFetch(`/posts/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) {
      return { ok: false, error: `Status ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return {
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
