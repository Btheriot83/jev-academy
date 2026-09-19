export function Prose({ html }: { html: string }) {
  return (
    <div
      className="prose-academy space-y-3 text-[15px] leading-relaxed text-[var(--ink)]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
