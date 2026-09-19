"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";

export function NextAction() {
  const { next, pathDoneCount, ready } = useProgress();
  if (!ready) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
        <p className="text-sm text-[var(--muted)]">Loading progress…</p>
      </div>
    );
  }
  const done = pathDoneCount >= 8;
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
        {done ? "Path complete" : "Next action"}
      </p>
      <p className="mt-1 text-lg font-semibold text-[var(--ink)] leading-snug">
        {done ? "Ship a real integration from the checklist." : next.title}
      </p>
      <Link
        href={done ? "/ship" : next.href}
        className="mt-4 inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-ink)] hover:opacity-90"
      >
        {done ? "Open ship checklist" : `Continue · Step ${next.id}`}
      </Link>
      <p className="mt-2 text-xs text-[var(--muted)]">
        {pathDoneCount}/8 path steps marked done (local only)
      </p>
    </div>
  );
}
