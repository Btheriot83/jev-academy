import Link from "next/link";
import { listUseCases, useCaseStats } from "@/lib/use-cases";

export const metadata = { title: "Use cases" };

export default function UseCasesPage() {
  const cases = listUseCases();
  const stats = useCaseStats();
  const xCases = cases.filter((c) => c.sourceType === "x");
  const otherCases = cases.filter((c) => c.sourceType === "other");
  const docsCases = cases.filter((c) => c.sourceType === "docs");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Use-case gallery</h1>
        <p className="mt-2 text-[var(--muted)]">
          {stats.total} public ideas · {stats.xCited} X-cited shown first · {stats.openSource}{" "}
          open source · {stats.docsSourced} docs-sourced. Not an endorsement. Map promising ones
          onto AZMDR routing, newsletter triage, app intake, or Fit Desk adherence — conceptual
          only.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          X-cited ({xCases.length})
        </h2>
        <ul className="space-y-2">
          {xCases.map((c) => (
            <CaseCard key={c.id} c={c} />
          ))}
        </ul>
      </section>

      {otherCases.length ? (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
            GitHub / public directories ({otherCases.length})
          </h2>
          <ul className="space-y-2">
            {otherCases.map((c) => (
              <CaseCard key={c.id} c={c} />
            ))}
          </ul>
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          Docs / public writeups ({docsCases.length})
        </h2>
        <ul className="space-y-2">
          {docsCases.map((c) => (
            <CaseCard key={c.id} c={c} />
          ))}
        </ul>
      </section>

      <p className="text-sm text-[var(--muted)]">
        Next:{" "}
        <Link href="/ship" className="underline hover:text-[var(--ink)]">
          Ship into a real repo
        </Link>
      </p>
    </div>
  );
}

function CaseCard({
  c,
}: {
  c: {
    id: string;
    slug: string;
    title: string;
    summary: string;
    category: string;
    sourceType: string;
    sourceLabel: string;
    openSource: boolean;
    primitives: string[];
  };
}) {
  const badge =
    c.sourceType === "x"
      ? "bg-[#1d9bf0]/20 text-[#8ecdf8]"
      : c.sourceType === "other"
        ? "bg-emerald-500/15 text-emerald-300"
        : "bg-[var(--border)] text-[var(--muted)]";
  return (
    <li>
      <Link
        href={`/use-cases/${c.slug}`}
        className="block rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-3 hover:border-[var(--muted)]"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${badge}`}>
            {c.sourceLabel}
          </span>
          {c.openSource ? (
            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-emerald-300">
              Open source
            </span>
          ) : null}
          <span className="font-mono text-[10px] text-[var(--muted)]">{c.id}</span>
          <span className="text-[10px] uppercase text-[var(--muted)]">{c.category}</span>
        </div>
        <p className="mt-1 font-medium text-[var(--ink)]">{c.title}</p>
        <p className="mt-0.5 text-sm text-[var(--muted)]">{c.summary}</p>
        {c.primitives.length ? (
          <p className="mt-1 text-xs text-[var(--muted)]">{c.primitives.join(" · ")}</p>
        ) : null}
      </Link>
    </li>
  );
}
