export type Lab = {
  id: string;
  title: string;
  theme: string;
  summary: string;
  curl: string;
  js: string;
  notes: string[];
  sources: { label: string; url: string }[];
};

const AUTH = "$TYPESAFE_API_KEY";

export const LABS: Lab[] = [
  {
    id: "choice",
    title: "Choice: pick one from a set",
    theme: "Primitive",
    summary: "Think of a menu with fixed options. You give Jev the list, and it picks one. Your code then reads the choice, the probabilities, and the confidence.",
    curl: `curl -X POST https://api.typesafe.ai/v1/systemone \\
  -H "Authorization: Bearer ${AUTH}" \\
  -H "Content-Type: application/json" \\
  -d @- <<'EOF'
{
  "state": "My payout failed three times this week and merchants are complaining.",
  "model": "jev-latest",
  "questions": {
    "department": {
      "type": "choice",
      "instructions": "Which team should handle this?",
      "criteria": {
        "billing": "Payments, invoicing, refunds",
        "technical": "Bugs, outages, integrations",
        "sales": "Pricing, upgrades, new accounts"
      }
    }
  }
}
EOF`,
    js: `const key = process.env.TYPESAFE_API_KEY;
if (!key) throw new Error("TYPESAFE_API_KEY is not set");

const res = await fetch("https://api.typesafe.ai/v1/systemone", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${key}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    state: "My payout failed three times this week and merchants are complaining.",
    model: "jev-latest",
    questions: {
      department: {
        type: "choice",
        instructions: "Which team should handle this?",
        criteria: {
          billing: "Payments, invoicing, refunds",
          technical: "Bugs, outages, integrations",
          sales: "Pricing, upgrades, new accounts",
        },
      },
    },
  }),
});

if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
const data = await res.json();
console.log(data.answers.department.choice);
console.log(data.answers.department.confidence);`,
    notes: [
      "A Choice response has these fields: type, choice, probabilities, and confidence. See the API reference for details.",
      "Never log or print the API key.",
    ],
    sources: [
      { label: "Choice", url: "https://docs.typesafe.ai/primitives/choice.md" },
      { label: "API", url: "https://docs.typesafe.ai/api.md" },
    ],
  },
  {
    id: "noul",
    title: "Noul: a yes/no answer with a probability",
    theme: "Primitive",
    summary: "Ask a yes/no question. You get a number from 0 to 1. That number is the chance the answer is yes. It is like a gut check with odds attached.",
    curl: `curl -X POST https://api.typesafe.ai/v1/systemone \\
  -H "Authorization: Bearer ${AUTH}" \\
  -H "Content-Type: application/json" \\
  -d @- <<'EOF'
{
  "state": "Hi, I've been trying to connect my Stripe account for 3 days and it keeps failing. I'm losing sales. Please help ASAP.",
  "model": "jev-latest",
  "questions": {
    "urgency": {
      "type": "noul",
      "instructions": "Does this message express urgency?",
      "criteria": {
        "true": "Explicitly time-sensitive",
        "false": "No urgency expressed"
      }
    }
  }
}
EOF`,
    js: `const key = process.env.TYPESAFE_API_KEY;
if (!key) throw new Error("TYPESAFE_API_KEY is not set");

const res = await fetch("https://api.typesafe.ai/v1/systemone", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${key}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    state:
      "Hi, I've been trying to connect my Stripe account for 3 days and it keeps failing. I'm losing sales. Please help ASAP.",
    model: "jev-latest",
    questions: {
      urgency: {
        type: "noul",
        instructions: "Does this message express urgency?",
        criteria: {
          true: "Explicitly time-sensitive",
          false: "No urgency expressed",
        },
      },
    },
  }),
});

if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
const data = await res.json();
console.log(data.answers.urgency.noul);`,
    notes: [
      "A Noul answer returns type and noul, a number from 0 to 1. The docs do not attach a confidence field to Noul answers.",
      "The sample state is adapted from the public Quick start.",
    ],
    sources: [
      { label: "Noul", url: "https://docs.typesafe.ai/primitives/noul.md" },
      { label: "Quick start", url: "https://docs.typesafe.ai/introduction/quickstart.md" },
    ],
  },
  {
    id: "score",
    title: "Score: rate on a rubric",
    theme: "Primitive",
    summary: "Think of a 1-to-5 star rubric. You set ordered levels, and Jev rates against them. You get back a score, a legend, probabilities, and confidence.",
    curl: `curl -X POST https://api.typesafe.ai/v1/systemone \\
  -H "Authorization: Bearer ${AUTH}" \\
  -H "Content-Type: application/json" \\
  -d @- <<'EOF'
{
  "state": "Help! My payouts have been failing for 3 days.",
  "model": "jev-latest",
  "questions": {
    "frustration": {
      "type": "score",
      "instructions": "How frustrated is the customer?",
      "criteria": ["Calm", "Frustrated", "Very angry"]
    }
  }
}
EOF`,
    js: `const key = process.env.TYPESAFE_API_KEY;
if (!key) throw new Error("TYPESAFE_API_KEY is not set");

const res = await fetch("https://api.typesafe.ai/v1/systemone", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${key}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    state: "Help! My payouts have been failing for 3 days.",
    model: "jev-latest",
    questions: {
      frustration: {
        type: "score",
        instructions: "How frustrated is the customer?",
        criteria: ["Calm", "Frustrated", "Very angry"],
      },
    },
  }),
});

if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
const data = await res.json();
console.log(data.answers.frustration.score);
console.log(data.answers.frustration.confidence);`,
    notes: [
      "Score criteria is an ordered array. It needs at least two levels.",
      "The response gives you: score, legend, probabilities, and confidence.",
    ],
    sources: [
      { label: "Score", url: "https://docs.typesafe.ai/primitives/score.md" },
      { label: "API", url: "https://docs.typesafe.ai/api.md" },
    ],
  },
  {
    id: "confidence",
    title: "Confidence gates: act, review, or escalate",
    theme: "Pattern",
    summary: "The answer tells you what to do. Confidence tells you how sure you can be before you act. High confidence: act. Middle: have someone review. Low: escalate to a human.",
    curl: `curl -X POST https://api.typesafe.ai/v1/systemone \\
  -H "Authorization: Bearer ${AUTH}" \\
  -H "Content-Type: application/json" \\
  -d @- <<'EOF'
{
  "state": {"subject": "Charge dispute", "body": "I think this might be a duplicate but I'm not sure."},
  "model": "jev-latest",
  "questions": {
    "intent": {
      "type": "choice",
      "instructions": "Primary intent of this message",
      "criteria": {
        "refund": "Wants money back",
        "status": "Asking for status only",
        "other": "Something else"
      }
    }
  }
}
EOF`,
    js: `const key = process.env.TYPESAFE_API_KEY;
if (!key) throw new Error("TYPESAFE_API_KEY is not set");

const res = await fetch("https://api.typesafe.ai/v1/systemone", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${key}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    state: {
      subject: "Charge dispute",
      body: "I think this might be a duplicate but I'm not sure.",
    },
    model: "jev-latest",
    questions: {
      intent: {
        type: "choice",
        instructions: "Primary intent of this message",
        criteria: {
          refund: "Wants money back",
          status: "Asking for status only",
          other: "Something else",
        },
      },
    },
  }),
});

if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
const { choice, confidence } = (await res.json()).answers.intent;

// Thresholds are yours — tune in code, not in a prompt.
const ACTION_THRESHOLD = 0.7;
if (confidence >= ACTION_THRESHOLD) {
  console.log("act", choice);
} else {
  console.log("review", { choice, confidence });
}`,
    notes: [
      "The answer tells you what. Confidence tells you whether to act on it. See the docs page 'Confidence-gated routing'.",
      "Set your own thresholds in your app code. Pick them based on how much risk you can take.",
    ],
    sources: [
      { label: "Confidence", url: "https://docs.typesafe.ai/confidence.md" },
      {
        label: "Confidence-gated routing",
        url: "https://docs.typesafe.ai/patterns/confidence-routing.md",
      },
    ],
  },
  {
    id: "fan-out",
    title: "Fan-out: ask many questions at once",
    theme: "Pattern",
    summary: "Like working down a checklist. You ask several small questions in one call. Then your code uses the answers it needs and ignores the rest.",
    curl: `curl -X POST https://api.typesafe.ai/v1/systemone \\
  -H "Authorization: Bearer ${AUTH}" \\
  -H "Content-Type: application/json" \\
  -d @- <<'EOF'
{
  "state": "Hi, I've been trying to connect my Stripe account for 3 days and it keeps failing. I'm losing sales. Please help ASAP.",
  "model": "jev-latest",
  "questions": {
    "department": {
      "type": "choice",
      "instructions": "Which team should handle this",
      "criteria": {
        "billing": "Payment or subscription issues",
        "technical": "Bugs or integration problems",
        "sales": "Pricing or account questions"
      }
    },
    "frustration": {
      "type": "score",
      "instructions": "How frustrated the customer appears",
      "criteria": [
        "Calm, just stating facts",
        "Frustrated but civil",
        "Very angry, strong language"
      ]
    },
    "is_urgent": {
      "type": "noul",
      "instructions": "The message conveys urgency or time-sensitivity"
    }
  }
}
EOF`,
    js: `const key = process.env.TYPESAFE_API_KEY;
if (!key) throw new Error("TYPESAFE_API_KEY is not set");

const res = await fetch("https://api.typesafe.ai/v1/systemone", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${key}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    state:
      "Hi, I've been trying to connect my Stripe account for 3 days and it keeps failing. I'm losing sales. Please help ASAP.",
    model: "jev-latest",
    questions: {
      department: {
        type: "choice",
        instructions: "Which team should handle this",
        criteria: {
          billing: "Payment or subscription issues",
          technical: "Bugs or integration problems",
          sales: "Pricing or account questions",
        },
      },
      frustration: {
        type: "score",
        instructions: "How frustrated the customer appears",
        criteria: [
          "Calm, just stating facts",
          "Frustrated but civil",
          "Very angry, strong language",
        ],
      },
      is_urgent: {
        type: "noul",
        instructions: "The message conveys urgency or time-sensitivity",
      },
    },
  }),
});

if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
const { answers } = await res.json();
// Compose in code — ignore answers that are irrelevant for this branch.
console.log({
  route: answers.department.choice,
  urgent: answers.is_urgent.noul > 0.8,
  frustration: answers.frustration.score,
});`,
    notes: [
      "The questions run in parallel against the same state. See the Introduction and fan-out docs.",
      "The request body matches the public Quick start sample.",
    ],
    sources: [
      { label: "Fan-out", url: "https://docs.typesafe.ai/patterns/fan-out.md" },
      { label: "Quick start", url: "https://docs.typesafe.ai/introduction/quickstart.md" },
    ],
  },
  {
    id: "azmdr-routing",
    title: "Intent routing, AZMDR style (conceptual)",
    theme: "Project lab",
    summary:
      "Sort each incoming request into a bucket. Then send it to plain code, a specialist step, or a human. This is a learning example only. Do not touch AZMDR repos.",
    curl: `curl -X POST https://api.typesafe.ai/v1/systemone \\
  -H "Authorization: Bearer ${AUTH}" \\
  -H "Content-Type: application/json" \\
  -d @- <<'EOF'
{
  "state": {
    "channel": "web_form",
    "message": "I need my monthly report regenerated for last quarter and emailed to finance."
  },
  "model": "jev-latest",
  "questions": {
    "intent": {
      "type": "choice",
      "instructions": "What is the primary request type?",
      "criteria": {
        "report": "Generate or regenerate a report",
        "access": "Account or permission change",
        "bug": "Something is broken",
        "other": "Does not fit the above"
      }
    },
    "needs_human": {
      "type": "noul",
      "instructions": "Should a human review before acting?"
    }
  }
}
EOF`,
    js: `const key = process.env.TYPESAFE_API_KEY;
if (!key) throw new Error("TYPESAFE_API_KEY is not set");

const state = {
  channel: "web_form",
  message:
    "I need my monthly report regenerated for last quarter and emailed to finance.",
};

const res = await fetch("https://api.typesafe.ai/v1/systemone", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${key}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    state,
    model: "jev-latest",
    questions: {
      intent: {
        type: "choice",
        instructions: "What is the primary request type?",
        criteria: {
          report: "Generate or regenerate a report",
          access: "Account or permission change",
          bug: "Something is broken",
          other: "Does not fit the above",
        },
      },
      needs_human: {
        type: "noul",
        instructions: "Should a human review before acting?",
      },
    },
  }),
});

if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
const { answers } = await res.json();
const intent = answers.intent.choice;
const conf = answers.intent.confidence;
const human = answers.needs_human.noul;

if (human > 0.6 || conf < 0.55) console.log("route: human_queue", { intent, conf, human });
else if (intent === "report") console.log("route: report_pipeline", { intent });
else console.log("route: specialist", { intent });`,
    notes: [
      "This is a concept lab only. It uses AZMDR-style request routing as a learning example.",
      "The pattern is intent routing: classify first, then hand off to code, an LLM, or a human.",
    ],
    sources: [
      { label: "Intent routing", url: "https://docs.typesafe.ai/patterns/intent-routing.md" },
    ],
  },
  {
    id: "newsletter-triage",
    title: "Newsletter triage (conceptual)",
    theme: "Project lab",
    summary: "Like sorting mail over a bin. One call asks three things: is it urgent (Noul), what is it about (Choice), and should you keep it (Noul). Example theme only.",
    curl: `curl -X POST https://api.typesafe.ai/v1/systemone \\
  -H "Authorization: Bearer ${AUTH}" \\
  -H "Content-Type: application/json" \\
  -d @- <<'EOF'
{
  "state": {
    "from": "alerts@example.com",
    "subject": "Your invoice is past due — action required today",
    "snippet": "Account balance overdue. Click to pay before services pause."
  },
  "model": "jev-latest",
  "questions": {
    "topic": {
      "type": "choice",
      "instructions": "Newsletter / inbox topic",
      "criteria": {
        "billing": "Invoices, payments, receipts",
        "product": "Feature or product updates",
        "promo": "Marketing or promotions",
        "other": "Other"
      }
    },
    "is_urgent": {
      "type": "noul",
      "instructions": "Is this time-sensitive for the recipient?"
    },
    "keep": {
      "type": "noul",
      "instructions": "Should this stay in the primary inbox?"
    }
  }
}
EOF`,
    js: `const key = process.env.TYPESAFE_API_KEY;
if (!key) throw new Error("TYPESAFE_API_KEY is not set");

const res = await fetch("https://api.typesafe.ai/v1/systemone", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${key}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    state: {
      from: "alerts@example.com",
      subject: "Your invoice is past due — action required today",
      snippet: "Account balance overdue. Click to pay before services pause.",
    },
    model: "jev-latest",
    questions: {
      topic: {
        type: "choice",
        instructions: "Newsletter / inbox topic",
        criteria: {
          billing: "Invoices, payments, receipts",
          product: "Feature or product updates",
          promo: "Marketing or promotions",
          other: "Other",
        },
      },
      is_urgent: {
        type: "noul",
        instructions: "Is this time-sensitive for the recipient?",
      },
      keep: {
        type: "noul",
        instructions: "Should this stay in the primary inbox?",
      },
    },
  }),
});

if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
const { answers } = await res.json();
console.log({
  topic: answers.topic.choice,
  urgent: answers.is_urgent.noul,
  keep: answers.keep.noul,
});`,
    notes: [
      "This is a concept lab. Do not connect it to live newsletter repos.",
      "After you read the three answers, your code applies the keep or archive rules.",
    ],
    sources: [
      { label: "Fan-out", url: "https://docs.typesafe.ai/patterns/fan-out.md" },
      { label: "Primitives", url: "https://docs.typesafe.ai/primitives.md" },
    ],
  },
  {
    id: "app-intake",
    title: "App intake moderation (conceptual)",
    theme: "Project lab",
    summary: "Sort new submissions as they arrive. Only auto-accept when confidence is high enough.",
    curl: `curl -X POST https://api.typesafe.ai/v1/systemone \\
  -H "Authorization: Bearer ${AUTH}" \\
  -H "Content-Type: application/json" \\
  -d @- <<'EOF'
{
  "state": {
    "app_name": "Sample Tracker",
    "description": "Tracks daily habits. No payments. Free."
  },
  "model": "jev-latest",
  "questions": {
    "category": {
      "type": "choice",
      "instructions": "App category for intake",
      "criteria": {
        "productivity": "Tools for work or habits",
        "social": "Messaging or communities",
        "commerce": "Payments or storefronts",
        "other": "Other"
      }
    },
    "policy_risk": {
      "type": "score",
      "instructions": "How much policy review does this need?",
      "criteria": ["Low — clear and ordinary", "Medium — needs a glance", "High — escalate"]
    }
  }
}
EOF`,
    js: `const key = process.env.TYPESAFE_API_KEY;
if (!key) throw new Error("TYPESAFE_API_KEY is not set");

const res = await fetch("https://api.typesafe.ai/v1/systemone", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${key}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    state: {
      app_name: "Sample Tracker",
      description: "Tracks daily habits. No payments. Free.",
    },
    model: "jev-latest",
    questions: {
      category: {
        type: "choice",
        instructions: "App category for intake",
        criteria: {
          productivity: "Tools for work or habits",
          social: "Messaging or communities",
          commerce: "Payments or storefronts",
          other: "Other",
        },
      },
      policy_risk: {
        type: "score",
        instructions: "How much policy review does this need?",
        criteria: [
          "Low — clear and ordinary",
          "Medium — needs a glance",
          "High — escalate",
        ],
      },
    },
  }),
});

if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
const { answers } = await res.json();
const risk = answers.policy_risk.score;
const conf = answers.category.confidence;
if (risk >= 1.5 || conf < 0.6) console.log("queue_review", answers);
else console.log("auto_route", answers.category.choice);`,
    notes: [
      "This is a concept lab. It is not connected to any production intake system.",
      "Use Score and Choice confidence together before you auto-accept anything.",
    ],
    sources: [
      { label: "Confidence", url: "https://docs.typesafe.ai/confidence.md" },
      { label: "Score", url: "https://docs.typesafe.ai/primitives/score.md" },
    ],
  },
  {
    id: "fit-desk",
    title: "Fit Desk check-in judgment (conceptual)",
    theme: "Project lab",
    summary:
      "Read a short check-in message. Judge whether the person is sticking with the plan. Example theme only. This maps to Fit Desk as an example. It is not a live integration.",
    curl: `curl -X POST https://api.typesafe.ai/v1/systemone \\
  -H "Authorization: Bearer ${AUTH}" \\
  -H "Content-Type: application/json" \\
  -d @- <<'EOF'
{
  "state": {
    "plan": "Stand 30 minutes before noon; stretch twice.",
    "checkin": "Stood for about 20 min, skipped stretches — rushed morning."
  },
  "model": "jev-latest",
  "questions": {
    "adhered": {
      "type": "noul",
      "instructions": "Did the person substantially follow today's plan?"
    },
    "effort": {
      "type": "score",
      "instructions": "How much effort does the check-in show?",
      "criteria": ["Minimal", "Partial", "Strong"]
    }
  }
}
EOF`,
    js: `const key = process.env.TYPESAFE_API_KEY;
if (!key) throw new Error("TYPESAFE_API_KEY is not set");

const res = await fetch("https://api.typesafe.ai/v1/systemone", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${key}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    state: {
      plan: "Stand 30 minutes before noon; stretch twice.",
      checkin: "Stood for about 20 min, skipped stretches — rushed morning.",
    },
    model: "jev-latest",
    questions: {
      adhered: {
        type: "noul",
        instructions: "Did the person substantially follow today's plan?",
      },
      effort: {
        type: "score",
        instructions: "How much effort does the check-in show?",
        criteria: ["Minimal", "Partial", "Strong"],
      },
    },
  }),
});

if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
const { answers } = await res.json();
console.log({
  adhered: answers.adhered.noul,
  effort: answers.effort.score,
  effortConfidence: answers.effort.confidence,
});`,
    notes: [
      "This is a concept example. It shows how to map a gallery idea onto a project, Fit Desk style.",
      "Keep the check-in text in state. Then decide coaching actions in your code.",
    ],
    sources: [
      { label: "State", url: "https://docs.typesafe.ai/concepts/state.md" },
      { label: "Noul", url: "https://docs.typesafe.ai/primitives/noul.md" },
    ],
  },
];

export function getLab(id: string) {
  return LABS.find((l) => l.id === id);
}
