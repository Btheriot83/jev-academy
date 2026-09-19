export type CurriculumLesson = {
  id: string;
  step: number;
  title: string;
  summary: string;
  href: string;
  pathStep: number;
  sources: { label: string; url: string }[];
};

/** Visible 0→7 path (home checklist + next-action CTA). */
export const PATH_STEPS = [
  {
    id: "0",
    title: "What Jev is (not an LLM) + when to use it",
    href: "/lessons/what-system-one-is",
    lessonIds: ["what-system-one-is", "when-to-use-jev"],
  },
  {
    id: "1",
    title: "Verify TYPESAFE_API_KEY (never display secrets)",
    href: "/lessons/credentials",
    lessonIds: ["credentials"],
  },
  {
    id: "2",
    title: "First System One call (curl + JS + Python)",
    href: "/lessons/first-api-call",
    lessonIds: ["first-api-call", "state"],
  },
  {
    id: "3",
    title: "Choice / Noul / Score labs",
    href: "/labs",
    lessonIds: ["noul", "choice", "score"],
  },
  {
    id: "4",
    title: "Confidence + when to escalate",
    href: "/lessons/confidence",
    lessonIds: ["confidence"],
  },
  {
    id: "5",
    title: "Fan-out / patterns",
    href: "/lessons/fan-out",
    lessonIds: ["fan-out", "patterns", "sdk-labs"],
  },
  {
    id: "6",
    title: "Pick a use-case → map to your projects",
    href: "/use-cases",
    lessonIds: ["project-labs"],
  },
  {
    id: "7",
    title: "Ship into a real repo",
    href: "/ship",
    lessonIds: ["ship"],
  },
] as const;

/** Full 12-step curriculum under /lessons/... (docs/CURRICULUM.md). */
export const LESSONS: CurriculumLesson[] = [
  {
    id: "what-system-one-is",
    step: 1,
    pathStep: 0,
    title: "What System One is",
    summary:
      "Jev vs LLMs: typed judgments and probabilities for software, not generated text. RLCD framing.",
    href: "/lessons/what-system-one-is",
    sources: [
      { label: "Introduction", url: "https://docs.typesafe.ai/introduction.md" },
      { label: "System One", url: "https://docs.typesafe.ai/concepts/system-one.md" },
      { label: "AI primer", url: "https://docs.typesafe.ai/introduction/machine-learning-primer.md" },
    ],
  },
  {
    id: "when-to-use-jev",
    step: 2,
    pathStep: 0,
    title: "When to use Jev vs an LLM vs code",
    summary:
      "Code owns workflow. Jev for narrow semantic decisions; LLM for generation; keep deterministic work in code.",
    href: "/lessons/when-to-use-jev",
    sources: [
      { label: "How to build", url: "https://docs.typesafe.ai/concepts/how-to-build-with-system-one.md" },
      { label: "Use-case map", url: "https://docs.typesafe.ai/concepts/use-case-map.md" },
      { label: "Jaggedness", url: "https://docs.typesafe.ai/model-jaggedness/jev-1.13.md" },
    ],
  },
  {
    id: "credentials",
    step: 3,
    pathStep: 1,
    title: "Credentials & key verification",
    summary:
      "Dashboard key → env TYPESAFE_API_KEY. Verify without printing the secret.",
    href: "/lessons/credentials",
    sources: [
      { label: "Quick start", url: "https://docs.typesafe.ai/introduction/quickstart.md" },
      { label: "API", url: "https://docs.typesafe.ai/api.md" },
    ],
  },
  {
    id: "first-api-call",
    step: 3,
    pathStep: 2,
    title: "First HTTP call",
    summary: "POST /v1/systemone with state + one Noul — curl, JS, Python.",
    href: "/lessons/first-api-call",
    sources: [
      { label: "Quick start", url: "https://docs.typesafe.ai/introduction/quickstart.md" },
      { label: "API", url: "https://docs.typesafe.ai/api.md" },
      { label: "JS SDK", url: "https://docs.typesafe.ai/sdk/javascript.md" },
      { label: "Python SDK", url: "https://docs.typesafe.ai/sdk/python.md" },
    ],
  },
  {
    id: "state",
    step: 4,
    pathStep: 2,
    title: "State craft",
    summary: "String vs object vs array; only relevant context; separate facts from questions.",
    href: "/lessons/state",
    sources: [{ label: "State", url: "https://docs.typesafe.ai/concepts/state.md" }],
  },
  {
    id: "noul",
    step: 5,
    pathStep: 3,
    title: "Noul",
    summary: "P(yes) in [0,1]; optional true/false criteria; no confidence field.",
    href: "/lessons/noul",
    sources: [
      { label: "Noul", url: "https://docs.typesafe.ai/primitives/noul.md" },
      { label: "Primitives", url: "https://docs.typesafe.ai/primitives.md" },
    ],
  },
  {
    id: "choice",
    step: 6,
    pathStep: 3,
    title: "Choice",
    summary: "Closed-set routing; probabilities + confidence; add other/none when needed.",
    href: "/lessons/choice",
    sources: [{ label: "Choice", url: "https://docs.typesafe.ai/primitives/choice.md" }],
  },
  {
    id: "score",
    step: 7,
    pathStep: 3,
    title: "Score",
    summary: "Ordered rubric; expectation between levels; avoid for exact magnitude (jaggedness).",
    href: "/lessons/score",
    sources: [
      { label: "Score", url: "https://docs.typesafe.ai/primitives/score.md" },
      { label: "Jaggedness", url: "https://docs.typesafe.ai/model-jaggedness/jev-1.13.md" },
    ],
  },
  {
    id: "confidence",
    step: 8,
    pathStep: 4,
    title: "Confidence as a second axis",
    summary: "Act / caution / escalate; risk-scaled thresholds. Answer = what; confidence = whether.",
    href: "/lessons/confidence",
    sources: [
      { label: "Confidence", url: "https://docs.typesafe.ai/confidence.md" },
      { label: "Confidence-gated routing", url: "https://docs.typesafe.ai/patterns/confidence-routing.md" },
    ],
  },
  {
    id: "fan-out",
    step: 9,
    pathStep: 5,
    title: "Fan-out & parallel questions",
    summary: "Many questions one call; ignore speculative answers in code; cost/latency win.",
    href: "/lessons/fan-out",
    sources: [
      { label: "Fan-out", url: "https://docs.typesafe.ai/patterns/fan-out.md" },
      { label: "Parallel questions", url: "https://docs.typesafe.ai/cookbooks/parallel_questions.md" },
    ],
  },
  {
    id: "patterns",
    step: 10,
    pathStep: 5,
    title: "Compose patterns",
    summary: "Intent routing, composite scoring, advanced structure in criteria.",
    href: "/lessons/patterns",
    sources: [
      { label: "Intent routing", url: "https://docs.typesafe.ai/patterns/intent-routing.md" },
      { label: "Composite scoring", url: "https://docs.typesafe.ai/patterns/composite-scoring.md" },
      { label: "Advanced structure", url: "https://docs.typesafe.ai/primitives/advanced.md" },
    ],
  },
  {
    id: "sdk-labs",
    step: 11,
    pathStep: 5,
    title: "SDK labs",
    summary: "JS @typesafe-ai/sdk and Python typesafe-sdk; models list; agent skill optional.",
    href: "/lessons/sdk-labs",
    sources: [
      { label: "JS SDK", url: "https://docs.typesafe.ai/sdk/javascript.md" },
      { label: "Python SDK", url: "https://docs.typesafe.ai/sdk/python.md" },
      { label: "Agent skill", url: "https://docs.typesafe.ai/agent-skill.md" },
      { label: "Models", url: "https://docs.typesafe.ai/models.md" },
    ],
  },
  {
    id: "project-labs",
    step: 12,
    pathStep: 6,
    title: "Capstone project labs",
    summary:
      "AZMDR routing, newsletter triage, app intake, Fit Desk adherence — conceptual only. Do not touch those repos.",
    href: "/lessons/project-labs",
    sources: [
      { label: "Intent routing", url: "https://docs.typesafe.ai/patterns/intent-routing.md" },
      { label: "Use-case map", url: "https://docs.typesafe.ai/concepts/use-case-map.md" },
      { label: "Demos", url: "https://docs.typesafe.ai/demos.md" },
    ],
  },
];

export function getLesson(id: string) {
  return LESSONS.find((l) => l.id === id);
}

export function getNextIncomplete(
  completed: Record<string, boolean>,
): (typeof PATH_STEPS)[number] {
  for (const step of PATH_STEPS) {
    const done = step.lessonIds.every((id) => completed[id]);
    if (!done) return step;
  }
  return PATH_STEPS[PATH_STEPS.length - 1];
}

export const STORAGE_KEY = "jev-academy-progress-v1";
