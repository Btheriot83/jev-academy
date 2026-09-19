export function CiteList({
  sources,
}: {
  sources: { label: string; url: string }[];
}) {
  return (
    <ul className="mt-2 space-y-1 text-sm text-[var(--muted)]">
      {sources.map((s) => (
        <li key={s.url}>
          <a className="underline hover:text-[var(--ink)]" href={s.url} rel="noreferrer">
            {s.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
