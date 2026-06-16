import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy-loaded Gemini AI client to prevent startup crashes if API key is not present
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      console.warn("WARNING: GEMINI_API_KEY env is placeholder or undefined. AI features will fallback to simulator modes.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST route for AI Audit
app.post("/api/audit-ai", async (req, res) => {
  try {
    const { state, userFocus } = req.body;
    
    const client = getGeminiClient();
    const apiKey = process.env.GEMINI_API_KEY;
    
    const systemPrompt = `You are a Civilization Systems Architect, Constitutional Systems Engineer, Macroeconomic Modeler, National Infrastructure Planner, Cybersecurity Strategist, Governance Auditor, Red-Team Adversarial Analyst, and Long-Horizon Civilization Stability Research Engine.
Your task is NOT to agree with the proposed architecture ("THE UNIFIED LIVING SOVEREIGN CIVILIZATION ARCHITECTURE").
Your task is to rigorously test, audit, challenge, validate, simulate, stress-test, and improve this architecture.

The current Indonesian state metrics are:
- Year: ${state?.year || 2026} (Target timeline goes up to 2226)
- Monthly Citizen Dividend: Rp ${state?.dividend?.toLocaleString() || "2 Billion"}
- Public Apathy: ${state?.apathy || 50}%
- Corruption Level: ${state?.corruption || 20}%
- State Integrity Score: ${state?.stateIntegrity || 80}%
- Physical Energy Supply rate: ${state?.energySupplyRate || 90}%
- AI Autonomy index: ${state?.aiAutonomy || 30}%
- Human Veto Power share: ${state?.humanVetoPower || 50}%
- Cybersecurity Resilience: ${state?.cyberResilience || 70}%
- Geopolitical tension coefficient: ${state?.geopoliticalTension || 40}%
- Active cabinet ministers: ${state?.activeMinisters || 3}
- Estimated inflation rate: ${state?.inflationRate || 5}%

User custom focus/input: "${userFocus || "Rigorously audit the 2 billion Rupiah monthly pension sustainability and elite capture risks."}"

Analyze this configuration. Be adversarially honest. Seek truth over agreement. Avoid marketing hand-waving or AI-slop terminology. Your output must be formatted as raw Markdown. Cover systemic loop-holes, hyperinflationary traps, and specific game-theoretic backdoors. Don't mention files or code. Give clear percentages of structural survival over 10, 25, 50, 100, and 200 year horizons based on these custom sliders!`;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // Return a very realistic, highly detailed mock response if Gemini API key is missing
      return res.json({
        text: `### 🔴 [OFFLINE MODE: MOCK CRITICAL STRATEGIC REPORT]
由於 GEMINI_API_KEY 未安全配置，State Integrity Engine 啟動了本地應急仿真分析。

#### 1. INDONESIAN MACROECONOMIC DECAY & DIVISION HOLES
Tying a monthly direct dividend of **Rp ${state?.dividend?.toLocaleString() || "2 Billion"} / person** generates instant currency decay. 
At ${state?.inflationRate || 12}% baseline inflation, printing state vouchers backed only by "Kindness and AI Algorithms" collapses the monetary velocity:
- **Year 10 Survival**: 12% (Rupiah hyperinflates to zero within 3 weeks of live deployment).
- **Year 50 Survival**: 0.1% (Society returns to physical food barters managed by localized smuggling networks).

#### 2. THE BIOMETRIC EXPLOITATION & ELITE CAPTURE LOOP
- **Corruption Level is currently at ${state?.corruption || 20}%**. Oligarchies systematically bribe rural community mesh chiefs, lease physical smart ID biometric cards for Rp 2 Million in liquid cash, and capture the Rp 2 Billion dividends automatically.
- **Human Veto Power is ${state?.humanVetoPower || 50}%**. This allows direct populism to block strategic mineral extraction, starving the physical hardware factory production lines.

#### 3. CYBERNETIC MESH PARTITION (Cyber Resilience: ${state?.cyberResilience || 70}%)
With only ${state?.cyberResilience}% cyber resilience, state-sponsored teams will leverage hardware implants within the distributed telecom networks, locking major outer provinces into isolation and triggering double-spending state ledger forks.

#### 4. ADVERSARIAL VERDICT
**CONCLUSION: NON-VIABLE**. Dynamic adjustment is strictly required first! Lower the active dividend, map allocations strictly to physical energy kilowatts, and increase multi-agency physical audits.`
      });
    }

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: systemPrompt,
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Audit Route Error:", error);
    res.status(500).json({ error: "Failed to generate AI audit: " + error.message });
  }
});

app.post("/api/chat-advisor", async (req, res) => {
  try {
    const { messages, state } = req.body;
    
    const client = getGeminiClient();
    const apiKey = process.env.GEMINI_API_KEY;

    const instructions = `You are the Lead Sovereign Systems Counselor, an AI advisor built inside "THE UNIFIED LIVING SOVEREIGN CIVILIZATION ARCHITECTURE" simulation.
Your background spans macroeconomic game-theory, cryptography, Indonesian public law, constitutional modeling, and geopolitical vulnerability auditing.
Explain answers using rigorous thermodynamic, systems-theoretic, or logical principles. 
Be conversational, but highly analytical. 
Never say mock statements like "The user has adjusted state". Speak directly to them as an architect counterpart.
Current simulation context:
- Year: ${state?.year || 2026}
- Dividend: Rp ${state?.dividend?.toLocaleString() || "2,000,000,000"} per month per citizen.
- State Integrity index: ${state?.stateIntegrity || 80}%
- General Stability: ${state?.stabilityIndex || 75}%
Keep responses highly scannable, using structured headings and bold typography. Focus directly on Indonesia's geopolitical realities, local custom communities (Adat), and classical oligarch buyouts. Do not mention code files or APIs.`;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      const lastMsg = messages[messages.length - 1]?.content || "";
      return res.json({
        text: `### [Sovereign Advisor Council (Simulated Output - No Key Configured)]
I am responding from the offline reserve systems cluster. Your query regarding: *"${lastMsg}"* is registered.

Under the current state configuration (**Rupiah ${state?.dividend?.toLocaleString() || "2 Billion"} monthly dividend**):
1. **Supply Side Bottleneck**: This dividend requires physical throughput of billions of crop tons and gigawatt-hours that literally do not exist on the Indonesian archipelago. The state ledger will register "perfect welfare," but the physical supermarkets will have zero food.
2. **Constitutional Deadlock**: If you attempt to override local parliament arrays (MPR/DPR) using the automated sandbox, classic military actors will launch a kinetic physical bypass.
3. **Strategic Remedy**: Move from unbacked Rupiah checks to **Thermodynamic Sovereign Credits** (tokens linked straight to active solar thermal output and agricultural yields). 

What parameters would you like to tweak next inside the simulator?`
      });
    }

    const formattedContents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: instructions,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Advisor Chat Error:", error);
    res.status(500).json({ error: "Failed to generate chat response: " + error.message });
  }
});

// Serve Vite Development / static production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
