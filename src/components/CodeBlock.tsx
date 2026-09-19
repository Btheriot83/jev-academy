"use client";

import { useState } from "react";

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative my-3 overflow-hidden rounded-md border border-[var(--border)] bg-[#0d1117]">
      {label ? (
        <div className="flex items-center justify-between border-b border-[var(--border)] px-3 py-1.5 text-xs text-[var(--muted)]">
          <span>{label}</span>
          <button
            type="button"
            className="hover:text-[var(--ink)]"
            onClick={async () => {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      ) : null}
      <pre className="overflow-x-auto p-3 text-[12px] leading-relaxed text-[#e6edf3]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
