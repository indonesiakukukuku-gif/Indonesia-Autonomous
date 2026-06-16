import { useState, FormEvent } from 'react';
import { CivilizationState } from '../types';
import { initialConcepts } from '../data/defaults';
import { Send, Sparkles, MessageSquare, ShieldCheck, FileText, AlertTriangle, HelpCircle } from 'lucide-react';

interface StrategicCounselProps {
  state: CivilizationState;
}

// Micro CSS-based markdown presenter to bypass potential react-markdown import limits
function FormattedResponse({ text }: { text: string }) {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <div className="space-y-2 text-xs leading-relaxed text-slate-300 font-sans">
      {lines.map((line, i) => {
        if (line.startsWith('###')) {
          return (
            <h4 key={i} className="text-xs font-mono font-extrabold text-pink-400 uppercase mt-4 border-b border-pink-900/20 pb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-ping"></span>
              {line.replace('###', '').trim()}
            </h4>
          );
        }
        if (line.startsWith('####')) {
          return (
            <h5 key={i} className="text-[11px] font-mono font-bold text-teal-400 uppercase mt-3">
              {line.replace('####', '').trim()}
            </h5>
          );
        }
        if (line.startsWith('##') || line.startsWith('#')) {
          return (
            <h3 key={i} className="text-sm font-bold text-slate-100 mt-5 border-l-2 border-emerald-500 pl-2">
              {line.replace(/#+/g, '').trim()}
            </h3>
          );
        }
        if (line.startsWith('-') || line.startsWith('*')) {
          const content = line.substring(1).trim();
          // Bold matches
          const parts = content.split('**');
          return (
            <div key={i} className="flex items-start gap-1 py-0.5 max-w-full overflow-hidden">
              <span className="text-emerald-500 font-bold mr-1">•</span>
              <span className="flex-1">
                {parts.map((p, idx) => idx % 2 === 1 ? <strong key={idx} className="text-slate-100 font-semibold">{p}</strong> : p)}
              </span>
            </div>
          );
        }
        
        // Match bold markers within line
        const parts = line.split('**');
        if (parts.length > 1) {
          return (
            <p key={i}>
              {parts.map((p, idx) => idx % 2 === 1 ? <strong key={idx} className="text-slate-100 font-semibold">{p}</strong> : p)}
            </p>
          );
        }

        return line.trim() ? <p key={i} className="py-0.5">{line}</p> : <div key={i} className="h-2"></div>;
      })}
    </div>
  );
}

export default function StrategicCounsel({ state }: StrategicCounselProps) {
  const [userFocus, setUserFocus] = useState<string>("");
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);

  // Lead advisor chatbox variables
  const [chatInput, setChatInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'model'; content: string }>>([
    {
      role: 'model',
      content: `### Welcome back, Systems Engineer.
I am the Lead Sovereign Systems Counselor. Under your current simulation models, we are analyzing the **Rupiah ${state.dividend.toLocaleString()}** direct stakeholder pension mechanism.
What stress tests or structural amendments would you like to evaluate next?`
    }
  ]);
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  const runDynamicAudit = async () => {
    setIsAuditing(true);
    setAuditResult(null);
    try {
      const response = await fetch("/api/audit-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state, userFocus })
      });
      const data = await response.json();
      setAuditResult(data.text);
    } catch (err: any) {
      console.error(err);
      setAuditResult("CRITICAL SECURE BOUNDARY REJECT: Could not establish socket coordinate with the Server. Please confirm Express terminal state is active.");
    } finally {
      setIsAuditing(false);
    }
  };

  const runChatSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput;
    setChatInput("");
    const updatedMsgs = [...chatMessages, { role: 'user', content: userMsg }];
    setChatMessages(updatedMsgs);
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMsgs, state })
      });
      const data = await response.json();
      setChatMessages([...updatedMsgs, { role: 'model', content: data.text }]);
    } catch (err: any) {
      console.error(err);
      setChatMessages([...updatedMsgs, { role: 'model', content: "ERROR CONNECTING TO CYBER ADVISOR STREAM. PLEASE RELOAD." }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="strategic-counsel-board">
      
      {/* Dynamic Security Auditor (Left Side) */}
      <div className="lg:col-span-6 space-y-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold font-mono tracking-widest text-[#ec4899] uppercase mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" /> Phase 15 & 16: AI Adversarial Counsel
            </h3>
            <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
              Inject custom constitutional amendments or structural proposals, and prompt the Gemini AI-auditor to formulate an existential vulnerability report targeting your current states.
            </p>

            <div className="space-y-3 mb-4">
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                Enter Custom Proposal/Tweak Notes:
              </label>
              <textarea
                value={userFocus}
                onChange={(e) => setUserFocus(e.target.value)}
                placeholder="e.g., Link monthly stakeholder dividends straight to active regional micro-hydro energy surplus certificates instead of issuing paper Rupiah bills. This prevents classic M2 money supply inflation while maintaining real material dividends."
                className="w-full h-[90px] bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
              />
            </div>
          </div>

          <button
            onClick={runDynamicAudit}
            disabled={isAuditing}
            className="cursor-pointer bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-mono font-bold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-2 transition duration-200 disabled:opacity-50"
          >
            <FileText className="w-4 h-4 animate-bounce" />
            {isAuditing ? "COMPUTING EXPLOITS CRITICALS..." : "EXECUTE DYNAMIC DRAFT AUDIT"}
          </button>
        </div>

        {/* Dynamic Audit output paper */}
        {auditResult && (
          <div className="bg-slate-950 border-2 border-pink-950 p-5 rounded-xl shadow-inner max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950 animate-fade-in relative">
            <div className="absolute top-2 right-2 bg-pink-950/20 text-pink-400 border border-pink-900 text-[8px] font-mono uppercase px-2 py-0.5 rounded font-extrabold tracking-widest">
              Live AI Report
            </div>
            <FormattedResponse text={auditResult} />
          </div>
        )}
      </div>

      {/* Counselor Strategic chatbox (Right Side) */}
      <div className="lg:col-span-6 flex flex-col h-[520px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <div>
              <span className="text-xs font-bold text-slate-100 block">Lead Sovereign Systems Architect</span>
              <span className="text-[9px] font-mono text-slate-500 uppercase">Civilizational stability counsel server</span>
            </div>
          </div>
          <span className="text-[10px] font-mono bg-emerald-950/30 text-emerald-400 border border-emerald-900/60 px-2 py-0.5 rounded">
            Gemini Core Connected
          </span>
        </div>

        {/* Channels stream display */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-950/60 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950">
          {chatMessages.map((msg, idx) => (
            <div
              key={`msg-${idx}`}
              className={`flex flex-col max-w-[85%] ${
                msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              <span className="text-[8px] font-mono text-slate-500 mb-1">
                {msg.role === 'user' ? 'SYSTEMS ENGINEER' : 'AI STRATEGIC ADVISOR'}
              </span>
              <div
                className={`p-3 rounded-lg text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-900 text-slate-100 rounded-tl-none border border-slate-850 p-4'
                }`}
              >
                {msg.role === 'user' ? msg.content : <FormattedResponse text={msg.content} />}
              </div>
            </div>
          ))}
          {chatLoading && (
            <div className="flex flex-col items-start max-w-[80%]">
              <span className="text-[8.5px] font-mono text-slate-600 mb-1">COMPUTING RESPONSE COGNITIVE...</span>
              <div className="bg-slate-950 p-4 rounded-lg rounded-tl-none border border-slate-850/80 text-xs text-slate-500 font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input channel form */}
        <form onSubmit={runChatSubmit} className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            disabled={chatLoading}
            placeholder="Ask the sovereign counselor about succession rules, core loopholes, etc..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={chatLoading}
            className="cursor-pointer bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-slate-950 p-2.5 rounded-lg font-bold transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
