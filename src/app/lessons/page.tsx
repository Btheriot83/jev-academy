import Link from "next/link";
import { LESSONS, PATH_STEPS } from "@/lib/curriculum";

export const metadata = { title: "Lessons" };

export default function LessonsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Lessons</h1>
        <p className="mt-2 text-[var(--muted)]">
          Full 12-step curriculum. Home checklist follows the shorter 0→7 path.
        </p>
      </div>
      <ol className="space-y-2">
        {LESSONS.map((l) => (
          <li key={l.id}>
            <Link
              href={l.href}
              className="flex gap-3 rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-3 hover:border-[var(--muted)]"
            >
              <span className="w-6 font-mono text-xs text-[var(--muted)]">{l.step}</span>
              <div>
                <p className="font-medium text-[var(--ink)]">{l.title}</p>
                <p className="text-sm text-[var(--muted)]">{l.summary}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
      <p className="text-sm text-[var(--muted)]">
        Path steps {PATH_STEPS.map((s) => s.id).join(" · ")} — see{" "}
        <Link href="/" className="underline">
          home
        </Link>
        .
      </p>
    </div>
  );
}
