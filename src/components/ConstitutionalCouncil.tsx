import { useState, useEffect } from 'react';
import { CivilizationState } from '../types';
import { 
  ShieldCheck, Brain, Scale, Terminal, RefreshCw, AlertTriangle, 
  Play, CheckCircle, Users, Activity, FileText, Lock, Eye, 
  HelpCircle, Server, Award, Heart, HeartPulse, Sparkles, Sliders
} from 'lucide-react';

interface ConstitutionalCouncilProps {
  state: CivilizationState;
  onChangeState: (state: CivilizationState) => void;
}

export default function ConstitutionalCouncil({ state, onChangeState }: ConstitutionalCouncilProps) {
  // AI governance active scanner log simulation state
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([
    "INFO [03:14:02] Constitutional Council Node online. Initializing baseline monitoring...",
    "OK   [03:14:15] Pancasila Ethical Anchors fully synchronised across all Edge Units.",
    "OK   [03:15:30] AI Autonomy loop vetted. Human Veto power thresholds verified.",
    "WARN [03:17:45] Minor value drift detected in South Sulawesi region; automatically compensated.",
  ]);

  // Selected value for detailed compliance review
  const [selectedValueIndex, setSelectedValueIndex] = useState<number>(0);

  // Simulation controls
  const [customVetoInput, setCustomVetoInput] = useState<string>("Bantuan Sosial 100% berbasis emisi LUV.");
  const [simulationResponse, setSimulationResponse] = useState<string>("Awaiting input...");
  const [isSimulatingVeto, setIsSimulatingVeto] = useState<boolean>(false);

  // Dynamic calculations based on global state
  const complianceScore = Math.round(Math.max(10, 98 - (state.corruption * 0.4) - (state.apathy * 0.2)));
  const aiSafetyMargin = Math.round(100 - state.aiAutonomy + (state.humanVetoPower * 0.3));
  const threatLevel = state.geopoliticalTension > 50 || state.corruption > 40 ? "ELEVATED" : "STABLE";

  // Simulate real-time compliance scan logging
  useEffect(() => {
    let interval: any;
    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false);
            setLogs((p) => [
              `OK   [${new Date().toLocaleTimeString()}] Deep compliance scan finished: Integrity at ${state.stateIntegrity}%, 0 critical violations.`,
              ...p
            ]);
            return 0;
          }
          return prev + 25;
        });
      } , 500);
    }
    return () => clearInterval(interval);
  }, [isScanning, state.stateIntegrity]);

  const triggerScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setLogs((p) => [
      `INFO [${new Date().toLocaleTimeString()}] Triggering live compliance check across 55 sovereign regions...`,
      ...p
    ]);
  };

  const handleSimulateVeto = () => {
    setIsSimulatingVeto(true);
    setSimulationResponse("Analyzing veto parameters against dynamic economic indicators...");
    
    setTimeout(() => {
      setIsSimulatingVeto(false);
      const isViable = state.dividend < 500000000 && state.corruption < 45;
      if (isViable) {
        setSimulationResponse(
          `VETO DECREE SIGNED: Resolution "${customVetoInput.substring(0, 40)}" fits fiscal models. National ledger adjusted successfully.`
        );
        // Slightly tweak state to show impact
        onChangeState({
          ...state,
          trustIndex: Math.min(100, state.trustIndex + 1),
          stateIntegrity: Math.min(100, state.stateIntegrity + 2)
        });
      } else {
        setSimulationResponse(
          `VETO DECREE REJECTED: Proposed change violates physical thermodynamic resource limits or hyperinflation safety guidelines.`
        );
      }
    }, 1200);
  };

  const nationalValues = [
    {
      title: "1. Ketuhanan Yang Maha Esa",
      subtitle: "Sovereign Spiritual Invariant Protocol",
      description: "Menghormati keyakinan religio-kultural dan integritas filosofis manusia sebagai fondasi absolut nilai peradaban, mencegah manipulasi moral sewenang-wenang.",
      metric: "Spiritual Freedom Ratio",
      value: "99.8% Perfect Alignment",
      statusText: "IMMUTABLE CODE CONSTANT"
    },
    {
      title: "2. Kemanusiaan Yang Adil dan Beradab",
      subtitle: "Humanocentric AI Ethical Alignment",
      description: "Sistem kecerdasan otonom (AI, ARGI, NeuroOS) dilarang keras memotong asupan kalori, energi, atau hak dasar manusia demi 'efisiensi angka'. Manusia menempati prioritas absolut.",
      metric: "Human Dignity Ratio",
      value: `${aiSafetyMargin}% Safe margin`,
      statusText: "ACTIVE ENFORCEMENT"
    },
    {
      title: "3. Persatuan Indonesia",
      subtitle: "Hyper-Distributed Archipelago Mesh Unity",
      description: "Mencegah penumpukan data & kekuasaan moneter terpusat di satu pulau. Jaringan node-edge tangguh tersebar merata di seluruh wilayah pesisir dan pegunungan daerah Nusantara.",
      metric: "Decentralization Entropy",
      value: `${state.cyberResilience}% Fault Tolerant`,
      statusText: "LAZARUS FAILOVER READY"
    },
    {
      title: "4. Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan...",
      subtitle: "Legitimate Consensus & Democratic Human Veto",
      description: "Pengambilan keputusan strategis tidak diserahkan pada mayoritas emosional atau elit moneter, melainkan melalui simulasi kognitif yang diawasi oleh hak veto kedaulatan warga.",
      metric: "Active Veto Resolution",
      value: `${state.humanVetoPower}% Sovereign Power`,
      statusText: "CONSTITUTIONAL DIRECT-VOTE"
    },
    {
      title: "5. Keadilan Sosial bagi Seluruh Rakyat Indonesia",
      subtitle: "Universal Multi-Token Resource Dividend",
      description: "Distribusi adil sirkulasi peradaban (TM, ENPE, LUV) untuk seluruh rakyat berdasarkan kontribusi nyata demi membasmi kemiskinan sistemik dan menekan rasio gini mendekati nol.",
      metric: "Gini Index Offset",
      value: `0.11 Gini Rank (Live)`,
      statusText: "DYNAMIC TAX-FREE FLOW"
    }
  ];

  const clearLogs = () => {
    setLogs([`INFO [${new Date().toLocaleTimeString()}] Audit logs flushed by Council command.`]);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="constitutional-council-dashboard">
      
      {/* 1. Dashboard Header Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between relative overflow-hidden" id="card-compliance-score">
          <div className="absolute top-2 right-2 p-1.5 bg-indigo-950/40 text-indigo-400 rounded-lg">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">
              CONSTITUTIONAL COMPLIANCE
            </span>
            <span className="text-2xl font-mono font-semibold text-slate-100 block mt-2">
              {complianceScore}%
            </span>
          </div>
          <span className="text-[10px] text-slate-400 mt-2 block font-mono">
            Integrity check active on 55 regions
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between relative overflow-hidden" id="card-ai-safety">
          <div className="absolute top-2 right-2 p-1.5 bg-purple-950/40 text-purple-400 rounded-lg">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] font-mono font-bold text-purple-400 uppercase tracking-widest block">
              AI GOVERNANCE SECURITY
            </span>
            <span className="text-2xl font-mono font-semibold text-slate-100 block mt-2">
              {aiSafetyMargin}%
            </span>
          </div>
          <span className="text-[10px] text-slate-400 mt-2 block font-mono">
            Veto power vs autonomy ratio
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between relative overflow-hidden" id="card-veto-status">
          <div className="absolute top-2 right-2 p-1.5 bg-cyan-950/40 text-cyan-400 rounded-lg">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
              COUNCIL VETO POWER
            </span>
            <span className="text-2xl font-mono font-semibold text-slate-100 block mt-2">
              {state.humanVetoPower}%
            </span>
          </div>
          <span className="text-[10px] text-slate-400 mt-2 block font-mono">
            Democratic human intervention
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between relative overflow-hidden" id="card-governance-trend">
          <div className="absolute top-2 right-2 p-1.5 bg-amber-950/40 text-amber-400 rounded-lg">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
              SYSTEM TREND INDEX
            </span>
            <span className={`text-2xl font-mono font-medium block mt-2 ${
              threatLevel === "STABLE" ? "text-emerald-400" : "text-amber-400 animate-pulse"
            }`}>
              {threatLevel}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 mt-2 block font-mono">
            Realtime sandbox environmental strain
          </span>
        </div>

      </div>

      {/* 2. Main Two-Column Panel: Values & AI Oversight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: List of fundamental national values being protected */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between" id="values-protection-panel">
          
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 font-extrabold tracking-widest block uppercase">
                  CONSTITUTIONAL DECREES
                </span>
                <h3 className="text-sm font-bold text-slate-150 font-sans mt-0.5">
                  Fundamental National Values Protected (Pancasila 2.0)
                </h3>
              </div>
              <span className="text-[9px] font-mono bg-indigo-950 text-indigo-400 border border-indigo-900 px-2.5 py-0.5 rounded font-black">
                SECURED SYSTEM-LEVEL
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              Nilai-nilai fundamental Pancasila diwujudkan dalam enkripsi berdaulat, memandu koordinasi ekonomi dan pertahanan. Klik pada salah satu asas nilai untuk meninjau status monitoring telemetri:
            </p>

            <div className="space-y-2">
              {nationalValues.map((val, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedValueIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex justify-between items-center cursor-pointer ${
                    selectedValueIndex === idx
                      ? "bg-slate-950 border-indigo-500/60 shadow-lg"
                      : "bg-slate-950/40 border-slate-850 hover:bg-slate-950 hover:border-slate-800"
                  }`}
                  id={`btn-value-${idx}`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-200 block font-mono">
                      {val.title}
                    </span>
                    <span className="text-[9.5px] font-mono text-indigo-300 block">
                      {val.subtitle}
                    </span>
                  </div>
                  <span className="text-[9.5px] font-mono text-emerald-400 font-extrabold bg-emerald-950/30 px-2 py-0.5 border border-emerald-900/40 rounded uppercase">
                    ACTIVE
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Detail of Selected Value */}
          <div className="mt-5 bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-900">
              <span className="text-[9px] font-mono text-slate-500 uppercase font-black">
                SPECIFIC PROTOCOL AUDIT DETAILS
              </span>
              <span className="text-[9px] font-mono text-indigo-400 uppercase font-bold">
                {nationalValues[selectedValueIndex].statusText}
              </span>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-150 font-mono">
                {nationalValues[selectedValueIndex].title}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                {nationalValues[selectedValueIndex].description}
              </p>
            </div>

            <div className="bg-slate-900 p-2.5 rounded border border-slate-850 flex justify-between items-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Active Registry Indicator:
              </span>
              <span className="text-xs font-mono font-bold text-indigo-300">
                {nationalValues[selectedValueIndex].value}
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: AI Governance Oversight Console */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4" id="ai-governance-oversight-panel">
          
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] font-mono text-purple-400 font-extrabold tracking-widest block uppercase">
              AI OVERSIGHT CONSOLE
            </span>
            <h3 className="text-sm font-bold text-slate-150 font-sans mt-0.5">
              Autonomous Systems & Neural Anchor Monitor
            </h3>
          </div>

          <p className="text-[11px] text-slate-400 leading-normal">
            Mengaudit alokasi AI (ARGI & NeuroOS) agar senantiasa patuh pada parameter konstitusi sipil. Lakukan pemindaian kepatuhan instan untuk memverifikasi otonom kedaulatan:
          </p>

          {/* Verification Actions */}
          <div className="space-y-2">
            <button
              onClick={triggerScan}
              disabled={isScanning}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-slate-950 p-2.5 rounded-xl font-mono text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="btn-scan-compliance"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Pemindaian Aktif {scanProgress}%
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4" />
                  Run Constitutional Integrity Scan
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onChangeState({
                    ...state,
                    humanVetoPower: Math.min(100, state.humanVetoPower + 10),
                    aiAutonomy: Math.max(5, state.aiAutonomy - 5)
                  });
                  setLogs((p) => [
                    `INFO [${new Date().toLocaleTimeString()}] Manual Constitutional Override (Human Veto Elevated +10%). Autonomy scaled back.`,
                    ...p
                  ]);
                }}
                className="bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-200 p-2 rounded-lg font-mono text-[10.5px] font-bold transition text-center cursor-pointer"
                id="btn-manual-override"
              >
                Simulate Veto Override
              </button>
              <button
                type="button"
                onClick={clearLogs}
                className="bg-slate-950 border border-slate-850 hover:bg-slate-900 text-slate-400 p-2 rounded-lg font-mono text-[10.5px] font-bold transition text-center cursor-pointer"
                id="btn-flush-audit-logs"
              >
                Flush System Logs
              </button>
            </div>
          </div>

          {/* Interactive Compliance Logs Monitor Console */}
          <div className="bg-slate-955 rounded-xl border border-slate-850 overflow-hidden font-mono text-[10.5px]">
            <div className="bg-slate-950 p-2 border-b border-slate-850 flex justify-between items-center text-[9px] text-slate-400">
              <span className="flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                CONSTITUTIONAL COMPLIANCE TELEMETRY LOGS
              </span>
              <span className="text-emerald-450 uppercase font-bold tracking-tight animate-pulse">● LIVE CONSOLE</span>
            </div>

            <div className="p-3 bg-slate-955 max-h-[160px] overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-slate-900 text-slate-350 select-text">
              {logs.map((log, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-tight text-[10px]">
                  {log.startsWith("INFO") && <span className="text-blue-400 font-bold">INFO </span>}
                  {log.startsWith("OK") && <span className="text-emerald-400 font-bold">OK   </span>}
                  {log.startsWith("WARN") && <span className="text-amber-500 font-bold">WARN </span>}
                  {log.substring(5)}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 3. Bottom Sandbox Widget: Direct Democratic Council Sandbox */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4" id="direct-veto-sandbox">
        
        <div className="border-b border-slate-800 pb-3">
          <span className="text-[10px] font-mono text-cyan-400 font-extrabold tracking-widest block uppercase">
            DIRECT DEMOCRATIC INTERACTIVE PORTAL
          </span>
          <h3 className="text-sm font-bold text-slate-150 font-sans mt-0.5">
            Evaluate Sovereign Policy Directives
          </h3>
          <p className="text-xs text-slate-400">
            Usulkan arahan kebijakan fundamental secara langsung ke simulasi ARGI Council. Evaluasi kesesuaian konstitusi dan dampak terhadap masyarakat bebas pajak:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 space-y-1.5">
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
              Masukkan Deskripsi Rencana Amandemen / Veto Kebijakan:
            </label>
            <textarea
              value={customVetoInput}
              onChange={(e) => setCustomVetoInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-xs text-slate-100 focus:outline-none"
              rows={2}
              id="txt-veto-input"
              placeholder="e.g. Alokasikan 30% surplus energi fisik khusus ke daerah timur Maluku & Papua..."
            />
          </div>

          <div className="md:col-span-4 flex flex-col justify-end">
            <button
              onClick={handleSimulateVeto}
              disabled={isSimulatingVeto || !customVetoInput.trim()}
              className="w-full bg-indigo-650 hover:bg-indigo-600 disabled:opacity-40 text-white p-3 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer h-12"
              id="btn-run-veto-sim"
            >
              {isSimulatingVeto ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Evaluating Decree Integrity...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  Evaluate & Sign Decree
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results output panel */}
        <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex items-start gap-3">
          <div className="p-1.5 bg-slate-900 rounded border border-slate-800 text-indigo-400 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">
              ARGI Compliance Sandbox Result Log
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-mono select-all">
              {simulationResponse}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
