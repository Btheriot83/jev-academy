import Link from "next/link";
import { notFound } from "next/navigation";
import { LESSONS, getLesson } from "@/lib/curriculum";
import { LESSON_BODIES } from "@/lib/lesson-bodies";
import { mdToHtml } from "@/lib/markdown";
import { Prose } from "@/components/Prose";
import { CiteList } from "@/components/CiteList";
import { MarkDone } from "@/components/MarkDone";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  return { title: lesson?.title ?? "Lesson" };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const body = LESSON_BODIES[slug];
  if (!body) notFound();
  const html = await mdToHtml(body);
  const idx = LESSONS.findIndex((l) => l.id === slug);
  const prev = idx > 0 ? LESSONS[idx - 1] : null;
  const next = idx < LESSONS.length - 1 ? LESSONS[idx + 1] : null;

  return (
    <article className="space-y-6">
      <div className="space-y-2">
        <p className="font-mono text-xs text-[var(--muted)]">
          Lesson {lesson.step} · path {lesson.pathStep}
        </p>
        <h1 className="text-2xl font-semibold">{lesson.title}</h1>
        <p className="text-[var(--muted)]">{lesson.summary}</p>
      </div>
      <Prose html={html} />
      <div>
        <h2 className="text-sm font-semibold text-[var(--muted)]">Sources</h2>
        <CiteList sources={lesson.sources} />
      </div>
      <div className="flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-4">
        <MarkDone ids={[lesson.id]} />
        {prev ? (
          <Link href={prev.href} className="text-sm text-[var(--muted)] hover:text-[var(--ink)]">
            ← {prev.title}
          </Link>
        ) : null}
        {next ? (
          <Link
            href={next.href}
            className="ml-auto inline-flex rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-[var(--accent-ink)]"
          >
            Next: {next.title} →
          </Link>
        ) : (
          <Link
            href="/ship"
            className="ml-auto inline-flex rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-[var(--accent-ink)]"
          >
            Ship checklist →
          </Link>
        )}
      </div>
    </article>
  );
}
