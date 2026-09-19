import Link from "next/link";
import { notFound } from "next/navigation";
import { LABS, getLab } from "@/lib/labs";
import { CodeBlock } from "@/components/CodeBlock";
import { CiteList } from "@/components/CiteList";
import { MarkDone } from "@/components/MarkDone";

export function generateStaticParams() {
  return LABS.map((l) => ({ slug: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: getLab(slug)?.title ?? "Lab" };
}

export default async function LabPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lab = getLab(slug);
  if (!lab) notFound();

  const projectLabs = new Set([
    "azmdr-routing",
    "newsletter-triage",
    "app-intake",
    "fit-desk",
  ]);
  const doneIds = projectLabs.has(slug)
    ? ["project-labs"]
    : slug === "fan-out"
      ? ["fan-out"]
      : slug === "confidence"
        ? ["confidence"]
        : ["noul", "choice", "score"].includes(slug)
          ? [slug]
          : [slug];


  return (
    <article className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs text-[var(--muted)]">{lab.theme}</p>
        <h1 className="text-2xl font-semibold">{lab.title}</h1>
        <p className="text-[var(--muted)]">{lab.summary}</p>
      </div>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">curl</h2>
        <CodeBlock code={lab.curl} label="bash" />
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          JavaScript
        </h2>
        <CodeBlock code={lab.js} label="js" />
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">Notes</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--ink)]">
          {lab.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </section>

      <div>
        <h2 className="text-sm font-semibold text-[var(--muted)]">Sources</h2>
        <CiteList sources={lab.sources} />
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-4">
        <MarkDone ids={doneIds} label="Mark related progress done" />
        <Link href="/labs" className="text-sm text-[var(--muted)] hover:text-[var(--ink)]">
          ← All labs
        </Link>
        <Link
          href="/use-cases"
          className="ml-auto inline-flex rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-[var(--accent-ink)]"
        >
          Browse use cases →
        </Link>
      </div>
    </article>
  );
}
