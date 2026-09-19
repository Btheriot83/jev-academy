import Link from "next/link";
import { LABS } from "@/lib/labs";

export const metadata = { title: "Labs" };

export default function LabsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Labs</h1>
        <p className="mt-2 text-[var(--muted)]">
          Copy-paste curl + JS. Uses <code className="text-[var(--ink)]">TYPESAFE_API_KEY</code> from
          your environment only — never paste keys here. Conceptual project labs do not touch product repos.
        </p>
      </div>
      <ul className="space-y-2">
        {LABS.map((lab) => (
          <li key={lab.id}>
            <Link
              href={`/labs/${lab.id}`}
              className="block rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-3 hover:border-[var(--muted)]"
            >
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-xs text-[var(--muted)]">{lab.theme}</span>
                <span className="font-medium text-[var(--ink)]">{lab.title}</span>
              </div>
              <p className="mt-1 text-sm text-[var(--muted)]">{lab.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
