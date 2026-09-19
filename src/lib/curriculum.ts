export type CurriculumLesson = {
  id: string;
  step: number;
  title: string;
  summary: string;
  href: string;
  pathStep: number;
  sources: { label: string; url: string }[];
};

/** Visible 0 to 7 path (home checklist + next-action CTA). */
export const PATH_STEPS = [
  {
    id: "0",
    title: "What Jev is (it is not an LLM) and when to use it",
    href: "/lessons/what-system-one-is",
    lessonIds: ["what-system-one-is", "when-to-use-jev"],
  },
  {
    id: "1",
    title: "Check your TYPESAFE_API_KEY (keep it secret)",
    href: "/lessons/credentials",
    lessonIds: ["credentials"],
  },
  {
    id: "2",
    title: "Make your first System One call (curl, JS, and Python)",
    href: "/lessons/first-api-call",
    lessonIds: ["first-api-call", "state"],
  },
  {
    id: "3",
    title: "Labs for Choice, Noul, and Score",
    href: "/labs",
    lessonIds: ["noul", "choice", "score"],
  },
  {
    id: "4",
    title: "Confidence and when to escalate",
    href: "/lessons/confidence",
    lessonIds: ["confidence"],
  },
  {
    id: "5",
    title: "Fan-out and other patterns",
    href: "/lessons/fan-out",
    lessonIds: ["fan-out", "patterns", "sdk-labs"],
  },
  {
    id: "6",
    title: "Pick a use case and map it to your projects",
    href: "/use-cases",
    lessonIds: ["project-labs"],
  },
  {
    id: "7",
    title: "Ship it into a real repo",
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
      "Jev is built for software, not chat. It answers typed questions with structured answers and probabilities.",
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
    title: "When to use Jev, an LLM, or plain code",
    summary:
      "Code runs the workflow. Jev makes quick judgment calls. LLMs do the writing. Keep fixed-rule work in plain code.",
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
    title: "Set up and check your API key",
    summary:
      "Make a dashboard key, store it as TYPESAFE_API_KEY, and check it works without ever printing it.",
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
    title: "Make your first API call",
    summary: "Send state plus one Noul question to POST /v1/systemone. Examples in curl, JavaScript, and Python.",
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
    title: "State: what gets judged",
    summary: "State is the material the model judges. Send it as a string, an object, or an array. Only include what the questions need. Keep facts in the state and judgments in the questions.",
    href: "/lessons/state",
    sources: [{ label: "State", url: "https://docs.typesafe.ai/concepts/state.md" }],
  },
  {
    id: "noul",
    step: 5,
    pathStep: 3,
    title: "Noul: yes or no questions",
    summary: "Noul answers a yes/no question with a number from 0 to 1. Higher means more likely yes. Optional criteria fields let you define yes and no. There is no confidence field.",
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
    title: "Choice: pick one from the menu",
    summary: "Choice picks one option from a fixed list. You get the pick, per-option probabilities, and a confidence. Add other or none when the list might not cover every input.",
    href: "/lessons/choice",
    sources: [{ label: "Choice", url: "https://docs.typesafe.ai/primitives/choice.md" }],
  },
  {
    id: "score",
    step: 7,
    pathStep: 3,
    title: "Score: rate it with a rubric",
    summary: "Score rates something against an ordered rubric, like star ratings. The result can land between levels. Don't use it for exact counts, math, or dates.",
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
    title: "Confidence: how sure before you act",
    summary: "Every answer tells you what. Confidence tells you whether to act on it. High means go, medium means check, low means hand it to a human.",
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
    title: "Fan-out: many questions, one call",
    summary: "Ask many questions in one call, even ones you might not need. Your code picks which answers matter. It's cheaper and faster than one call per question.",
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
    title: "Combine patterns in code",
    summary: "Four patterns to mix and match: intent routing, composite scoring, confidence-gated routing, and fan-out. Instructions and criteria can also take JSON.",
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
    title: "SDK labs: JavaScript and Python",
    summary: "Install the JavaScript or Python SDK. Send one document plus a Choice, a Noul, and a Score in a single call. Then pick a model.",
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
    title: "Capstone labs: practice only",
    summary:
      "Four practice labs: request routing, newsletter triage, app intake, and Fit Desk adherence. Learning only. Do not touch the real product repos.",
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
