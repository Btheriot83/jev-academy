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
    title: "Choice — closed-set routing",
    theme: "Primitive",
    summary: "Pick one option from a defined set. Read choice, probabilities, and confidence in code.",
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
      "Response fields for Choice: type, choice, probabilities, confidence (see API reference).",
      "Never log or echo the API key.",
    ],
    sources: [
      { label: "Choice", url: "https://docs.typesafe.ai/primitives/choice.md" },
      { label: "API", url: "https://docs.typesafe.ai/api.md" },
    ],
  },
  {
    id: "noul",
    title: "Noul — yes/no probability",
    theme: "Primitive",
    summary: "Ask a yes/no question; get noul in [0, 1] as P(yes).",
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
      "Noul answers return type + noul (0–1). Docs do not attach a confidence field to Noul answers.",
      "Sample state adapted from the public Quick start.",
    ],
    sources: [
      { label: "Noul", url: "https://docs.typesafe.ai/primitives/noul.md" },
      { label: "Quick start", url: "https://docs.typesafe.ai/introduction/quickstart.md" },
    ],
  },
  {
    id: "score",
    title: "Score — ordered rubric",
    theme: "Primitive",
    summary: "Rate along ordered levels; get a weighted score, legend, probabilities, confidence.",
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
      "Score criteria is an ordered array (at least two levels).",
      "Response: score, legend, probabilities, confidence.",
    ],
    sources: [
      { label: "Score", url: "https://docs.typesafe.ai/primitives/score.md" },
      { label: "API", url: "https://docs.typesafe.ai/api.md" },
    ],
  },
  {
    id: "confidence",
    title: "Confidence-gated routing",
    theme: "Pattern",
    summary: "Use Choice confidence as a second axis: act, review, or escalate.",
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
      "Answer tells you what; confidence tells you whether to act (docs: Confidence-gated routing).",
      "Pick thresholds for your risk tolerance in application code.",
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
    title: "Speculative fan-out",
    theme: "Pattern",
    summary: "Ask several questions in one call; compose and ignore in code.",
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
      "Questions evaluate in parallel against the same state (Introduction / fan-out docs).",
      "Request body shape matches the public Quick start sample.",
    ],
    sources: [
      { label: "Fan-out", url: "https://docs.typesafe.ai/patterns/fan-out.md" },
      { label: "Quick start", url: "https://docs.typesafe.ai/introduction/quickstart.md" },
    ],
  },
  {
    id: "azmdr-routing",
    title: "AZMDR-style intent routing (conceptual)",
    theme: "Project lab",
    summary:
      "Classify an inbound request and route to deterministic logic, specialist handling, or human review. Example theme only — do not touch AZMDR repos.",
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
      "Conceptual lab only. Maps to AZMDR-style request routing as a learning example.",
      "Pattern: Intent routing — classify then hand off to code / LLM / human.",
    ],
    sources: [
      { label: "Intent routing", url: "https://docs.typesafe.ai/patterns/intent-routing.md" },
    ],
  },
  {
    id: "newsletter-triage",
    title: "Newsletter triage (conceptual)",
    theme: "Project lab",
    summary: "Urgency Noul + topic Choice + keep Noul in one call. Example theme only.",
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
      "Conceptual lab for newsletter triage. Do not connect to live newsletter repos.",
      "Compose keep vs archive rules in your code after reading the three answers.",
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
    summary: "Classify intake submissions; gate on confidence before auto-accept.",
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
      "Conceptual app-intake lab. Not connected to any production intake system.",
      "Use Score + Choice confidence together before auto-accepting.",
    ],
    sources: [
      { label: "Confidence", url: "https://docs.typesafe.ai/confidence.md" },
      { label: "Score", url: "https://docs.typesafe.ai/primitives/score.md" },
    ],
  },
  {
    id: "fit-desk",
    title: "Fit Desk adherence judgment (conceptual)",
    theme: "Project lab",
    summary:
      "Judge whether a short check-in indicates adherence. Example theme only — Fit Desk as mapping, not a live integration.",
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
      "Conceptual Fit Desk adherence example for gallery → project mapping.",
      "Keep observed check-in text in state; decide coaching actions in code.",
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
