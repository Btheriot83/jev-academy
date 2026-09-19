import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type SourceType = "x" | "docs" | "other";

export type UseCaseMeta = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  sourceType: SourceType;
  sourceLabel: string;
  primaryUrl: string;
  date?: string | null;
  primitives: string[];
  openSource: boolean;
  githubUrl?: string | null;
  file: string;
};

type CatalogCase = {
  id: string;
  title: string;
  category: string;
  source: string;
  primary_url: string;
  date: string | null;
  file: string;
  one_line: string;
  primitives: string[];
  open_source?: boolean;
  github_url?: string;
};

const DIR = path.join(process.cwd(), "content/use-cases");

function sourceLabel(source: string): { type: SourceType; label: string } {
  if (source === "x") return { type: "x", label: "X-cited" };
  if (source === "docs") return { type: "docs", label: "Docs-sourced" };
  return { type: "other", label: "Public source" };
}

function sortUseCases(cases: UseCaseMeta[]): UseCaseMeta[] {
  // X-cited first, then docs, then other; within group open_source first; then id
  const rank = (t: SourceType) => (t === "x" ? 0 : t === "docs" ? 1 : 2);
  return cases.sort((a, b) => {
    const r = rank(a.sourceType) - rank(b.sourceType);
    if (r !== 0) return r;
    const o = Number(b.openSource) - Number(a.openSource);
    if (o !== 0) return o;
    return a.id.localeCompare(b.id);
  });
}

function toMeta(c: CatalogCase): UseCaseMeta {
  const { type, label } = sourceLabel(c.source);
  return {
    id: c.id,
    slug: c.file.replace(/\.md$/, ""),
    title: c.title,
    summary: c.one_line,
    category: c.category,
    sourceType: type,
    sourceLabel: label,
    primaryUrl: c.primary_url,
    date: c.date,
    primitives: c.primitives ?? [],
    openSource: Boolean(c.open_source),
    githubUrl: c.github_url ?? null,
    file: c.file,
  };
}

export function listUseCases(): UseCaseMeta[] {
  const catalogPath = path.join(DIR, "catalog.json");
  if (fs.existsSync(catalogPath)) {
    const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8")) as {
      cases: CatalogCase[];
    };
    return sortUseCases(catalog.cases.map(toMeta));
  }
  // Fallback: scan markdown
  return sortUseCases(
    fs
      .readdirSync(DIR)
      .filter((f) => f.startsWith("UC-") && f.endsWith(".md"))
      .map((file) => {
        const { data } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
        const source = String(data.source ?? "docs");
        const { type, label } = sourceLabel(source);
        return {
          id: String(data.id ?? file),
          slug: file.replace(/\.md$/, ""),
          title: String(data.title ?? file),
          summary: String(data.summary ?? data.one_line ?? ""),
          category: String(data.category ?? "other"),
          sourceType: type,
          sourceLabel: label,
          primaryUrl: Array.isArray(data.source_urls)
            ? String(data.source_urls[0] ?? "")
            : String(data.primary_url ?? ""),
          date: data.date ? String(data.date) : null,
          primitives: Array.isArray(data.primitives) ? data.primitives.map(String) : [],
          openSource: Boolean(data.open_source),
          githubUrl: data.github_url ? String(data.github_url) : null,
          file,
        } satisfies UseCaseMeta;
      }),
  );
}

export function getUseCase(
  slug: string,
): { meta: UseCaseMeta; body: string } | null {
  const file = path.join(DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const source = String(data.source ?? "docs");
  const { type, label } = sourceLabel(source);
  return {
    meta: {
      id: String(data.id ?? slug),
      slug,
      title: String(data.title ?? slug),
      summary: String(data.summary ?? ""),
      category: String(data.category ?? "other"),
      sourceType: type,
      sourceLabel: label,
      primaryUrl: Array.isArray(data.source_urls)
        ? String(data.source_urls[0] ?? "")
        : "",
      date: data.date ? String(data.date) : null,
      primitives: Array.isArray(data.primitives) ? data.primitives.map(String) : [],
      openSource: Boolean(data.open_source),
      githubUrl: data.github_url ? String(data.github_url) : null,
      file: `${slug}.md`,
    },
    body: content.trim(),
  };
}

export function useCaseStats() {
  const all = listUseCases();
  return {
    total: all.length,
    xCited: all.filter((c) => c.sourceType === "x").length,
    docsSourced: all.filter((c) => c.sourceType === "docs").length,
    otherSourced: all.filter((c) => c.sourceType === "other").length,
    openSource: all.filter((c) => c.openSource).length,
  };
}
