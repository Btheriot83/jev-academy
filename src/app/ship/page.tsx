import Link from "next/link";
import { MarkDone } from "@/components/MarkDone";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = { title: "Ship" };

export default function ShipPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Ship it into a real repo</h1>
        <p className="mt-2 text-[var(--muted)]">
          This checklist walks you through moving a lab into Grind-Horse or any private repo. Codex
          and the <code className="text-[var(--ink)]">typesafe-ai</code> skill are already available
          there. This site does not call product repos.
        </p>
      </div>

      <ol className="list-decimal space-y-4 pl-5 text-[var(--ink)]">
        <li>
          <strong>Confirm the key locally</strong> — length and models status only; never print the
          secret. See{" "}
          <Link href="/lessons/credentials" className="underline">
            Credentials
          </Link>
          .
        </li>
        <li>
          <strong>Pick one judgment</strong> from{" "}
          <Link href="/use-cases" className="underline">
            use cases
          </Link>{" "}
          or a project lab (AZMDR routing, newsletter triage, app intake, Fit Desk adherence).
        </li>
        <li>
          <strong>Add a server-side module</strong> that reads{" "}
          <code>TYPESAFE_API_KEY</code> and calls{" "}
          <code>POST https://api.typesafe.ai/v1/systemone</code> (or the JS/Python SDK).
        </li>
        <li>
          <strong>Gate on confidence</strong> (Choice/Score) before you auto-act. Escalate when
          confidence is low.
        </li>
        <li>
          <strong>Install the skill in the target repo</strong> (if it is not there already):
          <CodeBlock
            label="bash"
            code={`npx skills add typesafe-ai/skills --skill typesafe-ai\n# or Claude Code plugin install per docs.typesafe.ai/agent-skill.md`}
          />
        </li>
        <li>
          <strong>Deploy this academy</strong> on the Vercel free tier: import{" "}
          <code>Btheriot83/jev-academy</code>, pick Next.js, and skip env vars for the public UI.
        </li>
      </ol>

      <div className="rounded-md border border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--muted)]">
        Not affiliated with or endorsed by TypeSafe. Public sources only.
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <MarkDone ids={["ship"]} label="Mark path step 7 done" />
        <Link href="/" className="text-sm text-[var(--muted)] hover:text-[var(--ink)]">
          Home
        </Link>
      </div>
    </div>
  );
}
