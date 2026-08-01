// Centralized Real-Time Google Gemini AI Integration Service for iNSIGHTS Copilot

const DEFAULT_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

export const getGeminiApiKey = () => {
  return localStorage.getItem('gemini_api_key') || DEFAULT_API_KEY;
};

export const setGeminiApiKey = (key) => {
  if (key) {
    localStorage.setItem('gemini_api_key', key.trim());
  } else {
    localStorage.removeItem('gemini_api_key');
  }
};

// 1. LIVE GEMINI DEEPSEARCH SYNTHESIZER
export const callGeminiDeepSearch = async (prompt) => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const systemInstruction = `
You are iNSIGHTS Copilot, an AI Research Engine for national hackathons.
Analyze the user's project request and return ONLY strict valid JSON matching this schema:
{
  "title": "Short Title",
  "tagline": "AI-Engineered framework for: prompt",
  "problemValidation": {
    "validatedNeed": "Domain-specific core problem statement",
    "marketGap": "What existing solutions lack",
    "feasibilityScore": 96,
    "innovationScore": 94,
    "impactScore": 95,
    "targetUsers": ["User 1", "User 2", "User 3"]
  },
  "deepSearch": {
    "summary": "Summary of scoured arXiv, IEEE, Kaggle & GitHub sources",
    "citations": [
      {
        "title": "Real or plausible research paper title",
        "authors": "Author et al. (2025)",
        "venue": "arXiv / IEEE / Kaggle",
        "url": "https://arxiv.org/abs/2303.08774",
        "type": "Paper",
        "snippet": "Empirical benchmark result"
      },
      {
        "title": "Dataset Name",
        "authors": "Kaggle AI Lab",
        "venue": "Kaggle Datasets",
        "url": "https://www.kaggle.com/datasets",
        "type": "Dataset",
        "snippet": "18,000+ curated records"
      },
      {
        "title": "Microservices Repository",
        "authors": "GitHub OpenSource Lab",
        "venue": "GitHub Repositories",
        "url": "https://github.com/TECH-RAJVARDHAN782/insights-copilot",
        "type": "GitHub",
        "snippet": "Node.js Express & Python FastAPI code"
      }
    ]
  },
  "architecture": {
    "frontend": "React 18 + Tailwind CSS",
    "backend": "Node.js Express + Python FastAPI",
    "database": "Cloud Document Store / Redis Cache",
    "aiModels": ["Gemini 1.5 Pro", "PyTorch Engine", "YOLOv8 Vision"]
  },
  "roadmap": [
    { "phase": "Phase 1 (Week 1)", "title": "Literature & Domain Synthesis", "task": "Extract paper citations" },
    { "phase": "Phase 2 (Week 2)", "title": "Backend API Microservices", "task": "Setup Express & FastAPI routers" },
    { "phase": "Phase 3 (Week 3)", "title": "Agent Sync & React Dashboard", "task": "Connect AI Agents and live state" },
    { "phase": "Phase 4 (Week 4)", "title": "Deployment & Presentation Deck", "task": "Deploy to Vercel and export PPT" }
  ]
}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${systemInstruction}\n\nUser Request: ${prompt}` }] }]
      })
    });

    if (response.ok) {
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    }
  } catch (err) {
    console.warn("Gemini DeepSearch API error, falling back:", err);
  }
  return null;
};

// 2. LIVE GEMINI AI AGENTS & DEV-BUDDY BOT CHAT SYNTHESIZER
export const callGeminiAgentChat = async (agentName, userMessage, projectTitle = "Project") => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const prompt = `
You are "${agentName}", an expert AI agent assisting a student developer on the project "${projectTitle}".
Respond concisely, technically, and concisely in clean markdown format.

Developer Message: "${userMessage}"
`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (response.ok) {
      const data = await response.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
    }
  } catch (err) {
    console.warn("Gemini Agent API error:", err);
  }
  return null;
};

// 3. LIVE GEMINI PPT DECK SLIDE GENERATOR
export const callGeminiPptDeck = async (projectTitle) => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const systemInstruction = `
Generate a 7-slide pitch deck presentation outline for "${projectTitle}".
Return ONLY a valid JSON array of 7 objects:
[
  { "id": 1, "title": "Slide 1 Title", "content": "Bullet point 1\\nBullet point 2\\nBullet point 3" },
  ...
]
`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemInstruction }] }]
      })
    });

    if (response.ok) {
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    }
  } catch (err) {
    console.warn("Gemini PPT API error:", err);
  }
  return null;
};

// 4. LIVE GEMINI WEB PROTOTYPE HTML CODE GENERATOR
export const callGeminiPrototypeCode = async (prompt, projectTitle) => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const promptText = `
Generate a single, complete, standalone runnable HTML file for: "${prompt}" (Project: "${projectTitle}").
Must include:
1. <script src="https://cdn.tailwindcss.com"></script>
2. Dark theme Tailwind CSS styling (bg-slate-950 text-white) with interactive buttons.
3. Embedded JavaScript logic inside <script> tags.

Return ONLY the raw HTML string without markdown codeblocks.
`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }]
      })
    });

    if (response.ok) {
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return rawText.replace(/```html/g, '').replace(/```/g, '').trim();
    }
  } catch (err) {
    console.warn("Gemini Prototype API error:", err);
  }
  return null;
};
