import Link from "next/link";
import { LESSONS } from "@/lib/curriculum";
import { NextAction } from "@/components/NextAction";
import { PathChecklist } from "@/components/PathChecklist";
import { useCaseStats } from "@/lib/use-cases";

export default function HomePage() {
  const stats = useCaseStats();
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
          Public · cites docs.typesafe.ai · no endorsement
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
          Learn System One. Put a judgment in your code.
        </h1>
        <p className="max-w-2xl text-[var(--muted)] leading-relaxed">
          Jev returns typed answers and probabilities, not essays. This academy walks Brandon Theriot from zero to a copy-paste lab that fits real project shapes: routing, triage, intake, and adherence. Your key stays in your environment.
        </p>
        <NextAction />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          Path 0 to 7
        </h2>
        <PathChecklist />
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <Link
          href="/lessons"
          className="rounded-md border border-[var(--border)] bg-[var(--card)] p-4 hover:border-[var(--muted)]"
        >
          <p className="font-medium text-[var(--ink)]">Lessons</p>
          <p className="mt-1 text-sm text-[var(--muted)]">{LESSONS.length} steps in the curriculum</p>
        </Link>
        <Link
          href="/labs"
          className="rounded-md border border-[var(--border)] bg-[var(--card)] p-4 hover:border-[var(--muted)]"
        >
          <p className="font-medium text-[var(--ink)]">Labs</p>
          <p className="mt-1 text-sm text-[var(--muted)]">curl and JS. Your key stays in the environment.</p>
        </Link>
        <Link
          href="/use-cases"
          className="rounded-md border border-[var(--border)] bg-[var(--card)] p-4 hover:border-[var(--muted)]"
        >
          <p className="font-medium text-[var(--ink)]">Use cases</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {stats.total} · {stats.xCited} X-cited first
          </p>
        </Link>
      </section>
    </div>
  );
}
