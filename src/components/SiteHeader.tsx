import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/lessons", label: "Lessons" },
  { href: "/labs", label: "Labs" },
  { href: "/use-cases", label: "Use cases" },
  { href: "/ship", label: "Ship" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight text-[var(--ink)]">
          Jev Academy
        </Link>
        <nav className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--muted)]">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[var(--ink)]">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
