"use client";

import Link from "next/link";
import { PATH_STEPS } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export function PathChecklist() {
  const { completed, setDone, ready } = useProgress();

  return (
    <ol className="space-y-2">
      {PATH_STEPS.map((step) => {
        const done = step.lessonIds.every((id) => completed[id]);
        return (
          <li
            key={step.id}
            className="flex items-start gap-3 rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-3"
          >
            <button
              type="button"
              aria-pressed={done}
              aria-label={done ? `Mark step ${step.id} incomplete` : `Mark step ${step.id} complete`}
              onClick={() => step.lessonIds.forEach((id) => setDone(id, !done))}
              disabled={!ready}
              className={`mt-0.5 h-5 w-5 shrink-0 rounded border ${
                done
                  ? "border-[var(--accent)] bg-[var(--accent)]"
                  : "border-[var(--muted)] bg-transparent"
              }`}
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-xs font-mono text-[var(--muted)]">{step.id}</span>
                <Link
                  href={step.href}
                  className={`font-medium hover:underline ${done ? "text-[var(--muted)] line-through" : "text-[var(--ink)]"}`}
                >
                  {step.title}
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
