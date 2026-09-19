import Link from "next/link";
import { notFound } from "next/navigation";
import { listUseCases, getUseCase } from "@/lib/use-cases";
import { mdToHtml } from "@/lib/markdown";
import { Prose } from "@/components/Prose";
import { MarkDone } from "@/components/MarkDone";

export function generateStaticParams() {
  return listUseCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const uc = getUseCase(slug);
  return { title: uc?.meta.title ?? "Use case" };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const uc = getUseCase(slug);
  if (!uc) notFound();
  const html = await mdToHtml(uc.body);
  const badge =
    uc.meta.sourceType === "x"
      ? "bg-[#1d9bf0]/20 text-[#8ecdf8]"
      : "bg-[var(--border)] text-[var(--muted)]";

  return (
    <article className="space-y-6">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${badge}`}>
            {uc.meta.sourceLabel}
          </span>
          {uc.meta.openSource ? (
            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-emerald-300">
              Open source
            </span>
          ) : null}
          <span className="font-mono text-xs text-[var(--muted)]">{uc.meta.id}</span>
          <span className="text-xs uppercase text-[var(--muted)]">{uc.meta.category}</span>
        </div>
        <h1 className="text-2xl font-semibold">{uc.meta.title}</h1>
        <p className="text-[var(--muted)]">{uc.meta.summary}</p>
        {uc.meta.primaryUrl ? (
          <p className="text-sm">
            <a
              href={uc.meta.primaryUrl}
              className="underline hover:text-[var(--accent)]"
              rel="noreferrer"
            >
              Primary source
            </a>
          </p>
        ) : null}
      </div>
      <Prose html={html} />
      <div className="flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-4">
        <MarkDone ids={["project-labs"]} label="Mark project-labs done" />
        <Link href="/use-cases" className="text-sm text-[var(--muted)] hover:text-[var(--ink)]">
          ← Gallery
        </Link>
        <Link
          href="/ship"
          className="ml-auto inline-flex rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-[var(--accent-ink)]"
        >
          Ship checklist →
        </Link>
      </div>
    </article>
  );
}
