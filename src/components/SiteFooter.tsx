export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[var(--border)]">
      <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-[var(--muted)] space-y-2">
        <p>
          Public learning site for Brandon Theriot. Content cites{" "}
          <a className="underline hover:text-[var(--ink)]" href="https://docs.typesafe.ai/llms.txt">
            docs.typesafe.ai
          </a>
          . Not affiliated with or endorsed by TypeSafe.
        </p>
        <p>
          Never paste API keys into this site. Labs use env{" "}
          <code className="text-[var(--ink)]">TYPESAFE_API_KEY</code> only.
        </p>
      </div>
    </footer>
  );
}
