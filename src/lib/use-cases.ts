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
};

const DIR = path.join(process.cwd(), "content/use-cases");

function sourceLabel(source: string): { type: SourceType; label: string } {
  if (source === "x") return { type: "x", label: "X-cited" };
  if (source === "docs") return { type: "docs", label: "Docs-sourced" };
  return { type: "other", label: "Public source" };
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
    file: c.file,
  };
}

export function listUseCases(): UseCaseMeta[] {
  const catalogPath = path.join(DIR, "catalog.json");
  if (fs.existsSync(catalogPath)) {
    const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8")) as {
      cases: CatalogCase[];
    };
    const cases = catalog.cases.map(toMeta);
    // X-cited first, then docs, then other; stable by id within group
    const rank = (t: SourceType) => (t === "x" ? 0 : t === "docs" ? 1 : 2);
    return cases.sort((a, b) => {
      const r = rank(a.sourceType) - rank(b.sourceType);
      if (r !== 0) return r;
      return a.id.localeCompare(b.id);
    });
  }
  // Fallback: scan markdown
  return fs
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
        file,
      } satisfies UseCaseMeta;
    })
    .sort((a, b) => {
      const rank = (t: SourceType) => (t === "x" ? 0 : t === "docs" ? 1 : 2);
      const r = rank(a.sourceType) - rank(b.sourceType);
      return r !== 0 ? r : a.id.localeCompare(b.id);
    });
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
  };
}
