"use client";

import { useProgress } from "@/lib/progress";

export function MarkDone({ ids, label }: { ids: string[]; label?: string }) {
  const { completed, setDone, ready } = useProgress();
  const done = ids.every((id) => completed[id]);
  return (
    <button
      type="button"
      disabled={!ready}
      onClick={() => ids.forEach((id) => setDone(id, !done))}
      className={`rounded-md border px-3 py-2 text-sm font-medium ${
        done
          ? "border-[var(--accent)] text-[var(--accent)]"
          : "border-[var(--border)] bg-[var(--card)] text-[var(--ink)] hover:border-[var(--muted)]"
      }`}
    >
      {done ? "✓ Done" : label ?? "Mark done"}
    </button>
  );
}
