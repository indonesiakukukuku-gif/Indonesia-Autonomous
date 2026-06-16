import { useState } from 'react';
import { CivilizationState, SimulationResult } from './types';
import { phaseAudits } from './data/defaults';
import CivMap from './components/CivMap';
import DigitalTwin from './components/DigitalTwin';
import ThreatLaboratory from './components/ThreatLaboratory';
import StrategicCounsel from './components/StrategicCounsel';
import CivLongevity from './components/CivLongevity';
import CivilizationOS from './components/CivilizationOS';

import { 
  Network, 
  BarChart3, 
  ShieldAlert, 
  Users, 
  Sparkles, 
  Coins, 
  CheckCircle,
  AlertTriangle,
  Flame,
  Globe,
  Settings,
  X,
  Compass,
  Layers,
  Award
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('civilization-os');
  const [stateAlert, setStateAlert] = useState<string | null>(null);

  // Core state representing the active configuration of the automatic Indonesian mesh
  const [state, setState] = useState<CivilizationState>({
    dividend: 2000000000, // Rp 2 Billion / Month / Person
    apathy: 30, // %
    corruption: 25, // %
    stateIntegrity: 85, // %
    energySupplyRate: 95, // %
    aiAutonomy: 35, // %
    humanVetoPower: 50, // %
    cyberResilience: 80, // %
    geopoliticalTension: 20, // %
    activeMinisters: 3, // only 2 - 3 baseline
    population: 280, // millions
    year: 2026,
    stabilityIndex: 78,
    gdpGrowth: 5.5,
    currencyStability: 85,
    trustIndex: 80,
    culturalCohesion: 75,
    securityIndex: 85,
    legitimacyDecay: 10,
    successionRisk: 5,
    inflationRate: 6.5
  });

  // Projection history tracking over the 200 years timeline
  const [history, setHistory] = useState<SimulationResult[]>([]);

  // Dynmic validation parameter multipliers
  const calculateFinalScorecard = () => {
    // Phase 15 Scorecard calculator
    const hasUnmitigatedHyperinflation = state.dividend > 100000000;
    const isExtremeCorruption = state.corruption > 45;
    const isFragileMesh = state.cyberResilience < 45;

    let scoreMap = {
      constitutional: Math.round(Math.max(10, 95 - (state.apathy * 0.4) - (100 - state.stateIntegrity) * 0.5)),
      political: Math.round(Math.max(10, 85 - (state.corruption * 0.8) - (state.apathy * 0.3))),
      economics: Math.round(Math.max(5, hasUnmitigatedHyperinflation ? 15 : 90 - (state.inflationRate * 0.15))),
      infrastructure: Math.round(Math.max(10, state.energySupplyRate * 0.95 - (state.geopoliticalTension * 0.2))),
      security: Math.round(Math.max(10, state.cyberResilience * 0.9 - (100 - state.stateIntegrity) * 0.3)),
      aiGovernance: Math.max(10, Math.round(100 - state.aiAutonomy * 1.5 - (100 - state.stateIntegrity) * 0.4)),
      civilizationLongevity: Math.max(5, Math.round(75 - state.legitimacyDecay * 2.1 - state.successionRisk * 1.8))
    };

    return scoreMap;
  };

  const scores = calculateFinalScorecard();
  const averageQualityScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length);

  const getFinalVerdict = () => {
    // Phase 16 FINAL VERDICT CHANGER
    if (state.dividend > 100000000) {
      return {
        verdict: "A. NON-VIABLE (MACROECONOMIC MASS DEATH)",
        color: "text-red-500 border-red-500/30 bg-red-950/20",
        message: "Flooding the sovereign ledger with Rp 2 Billion checks monthly for 280 Million citizens generates catastrophic M2 velocity hyperinflation. Rupiah collapses instantly. Food supply ends within 3 weeks."
      };
    }
    if (state.corruption > 50 || state.cyberResilience < 40) {
      return {
        verdict: "B. EXPERIMENTAL (HIGH DENSITY FRAGMENTATION)",
        color: "text-amber-500 border-amber-500/30 bg-amber-950/20",
        message: "System survives Gen 1 under founders supervision but undergoes swift capture by regional cartels using leased biometrics identities, leading to state mesh partitions."
      };
    }
    if (averageQualityScore > 75) {
      return {
        verdict: "D. HIGHLY RESILIENT (CIVILIZATION GRADE)",
        color: "text-emerald-400 border-emerald-500/35 bg-emerald-950/20",
        message: "Dynamic model successfully mitigates value drift. Dividing resource surplus index rather than paper currency notes ensures thermodynamic survival over 200 years."
      };
    }
    return {
      verdict: "C. CONDITIONALLY VIABLE",
      color: "text-blue-400 border-blue-500/30 bg-blue-950/20",
      message: "The system remains resilient in regional operations, provided the Human Veto layer remains active and semiconductor spares are continuously sourced from peer nets."
    };
  };

  const verdict = getFinalVerdict();

  const handleAlert = (msg: string) => {
    setStateAlert(msg);
    setTimeout(() => setStateAlert(null), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-6 select-none selection:bg-pink-500 selection:text-white flex flex-col justify-between">
      
      {/* Absolute Header - Neon Garuda thematic cyber banner representing the uploaded mockup */}
      <header className="border-2 border-cyan-500/35 bg-slate-900 rounded-2xl p-4 md:p-6 mb-6 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Decorative holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-pink-500/5 to-transparent"></div>
        <div className="absolute top-0 right-0 h-full w-[350px] bg-[radial-gradient(#1e293b_1.2px,transparent_1.2px)] [background-size:14px_14px] opacity-25"></div>

        <div className="flex items-center gap-4 z-10">
          {/* Neon Logo Crest resembling the Garuda layout inside uploaded mockup */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 via-pink-500 to-amber-500 p-[2px] shadow-lg shadow-cyan-500/30 flex items-center justify-center relative group">
            <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-xl font-black text-cyan-400">
              🇮🇩
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/40 border border-emerald-900/60 px-2 py-0.5 rounded">
                PEMERINTAHAN OPEN SOURCE
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-pink-500 uppercase bg-pink-950/40 border border-pink-900/60 px-2 py-0.5 rounded">
                REWARD GRATIS Rp 2 MILYAR / ORANG
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-100 mt-1 font-mono uppercase bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-slate-300 to-slate-400">
              Sovereign Civilization Simulator
            </h1>
            <p className="text-[11px] text-slate-400 font-medium font-mono leading-tight">
              THE UNIFIED LIVING SOVEREIGN CIVILIZATION ARCHITECTURE • COCKPIT v1.8
            </p>
          </div>
        </div>

        {/* Global Overview Indicators */}
        <div className="flex items-center gap-4 z-10 flex-wrap">
          <div className="text-center bg-slate-950 px-3.5 py-1.5 rounded-lg border border-slate-800">
            <span className="text-[9px] font-mono text-slate-500 uppercase block font-semibold">Survival Index</span>
            <span className={`text-sm font-bold font-mono tracking-tight ${
              averageQualityScore > 65 ? 'text-emerald-400' : 'text-rose-500'
            }`}>
              {averageQualityScore}%
            </span>
          </div>
          <div className="text-center bg-slate-950 px-3.5 py-1.5 rounded-lg border border-slate-800">
            <span className="text-[9px] font-mono text-slate-500 uppercase block font-semibold">Cabinet Minsters</span>
            <span className="text-sm font-bold text-cyan-400 font-mono">
              {state.activeMinisters} Baseline
            </span>
          </div>
          <div className="text-center bg-slate-950 px-3.5 py-1.5 rounded-lg border border-slate-800">
            <span className="text-[9px] font-mono text-slate-500 uppercase block font-semibold">OMNI AUTHORITY</span>
            <span className="text-[10px] font-bold text-amber-500 font-mono block">
              INDIE-Founder E J H N
            </span>
          </div>
        </div>
      </header>

      {/* State alerts dispatch */}
      {stateAlert && (
        <div className="bg-rose-950/40 border border-rose-900 text-rose-200 p-3 rounded-lg mb-4 text-xs font-mono flex items-center justify-between shadow-md">
          <span className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <strong>ALERT:</strong> {stateAlert}
          </span>
          <button onClick={() => setStateAlert(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Main Multi-grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1 mb-8" id="sandbox-grid-workspace">
        
        {/* Parameter configuration cabinet sidebar (Left Hand Side) */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-2 mb-2">
            <h2 className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase flex items-center gap-1.5">
              <Settings className="w-4 h-4" /> Parameters Cabinet
            </h2>
            <span className="text-[10px] text-slate-500 leading-normal block">Tweak inputs below to run realtime macro stabilization algorithms.</span>
          </div>

          {/* Dividend volume slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-slate-400 uppercase">MONTHLY DIVIDEND</span>
              <span className={`${state.dividend > 100000000 ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}`}>
                Rp {state.dividend.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="1000000"
              max="2000000000"
              step="1000000"
              value={state.dividend}
              onChange={(e) => setState({ ...state, dividend: parseInt(e.target.value) })}
              className="w-full accent-pink-500 cursor-pointer h-1.5 bg-slate-955 rounded"
            />
            <span className="text-[9px] font-mono text-slate-500 block leading-none">
              {state.dividend > 100000000 ? "WARNING: Unbacked printing causes hyperinflation cash melt" : "Stable dividend asset backing active"}
            </span>
          </div>

          {/* Citizen Apathy slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-slate-400 uppercase">CITIZEN APATHY</span>
              <span className="text-slate-250 font-bold">{state.apathy}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={state.apathy}
              onChange={(e) => setState({ ...state, apathy: parseInt(e.target.value) })}
              className="w-full accent-blue-500 cursor-pointer h-1.5"
            />
          </div>

          {/* Corruption index */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-slate-400 uppercase">CLASSIC CORRUPTION</span>
              <span className="text-slate-250 font-bold">{state.corruption}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={state.corruption}
              onChange={(e) => setState({ ...state, corruption: parseInt(e.target.value) })}
              className="w-full accent-emerald-500 cursor-pointer h-1.5"
            />
          </div>

          {/* Cyber Resilience slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-slate-400 uppercase">CYBER RESILIENCE</span>
              <span className="text-cyan-400 font-bold">{state.cyberResilience}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={state.cyberResilience}
              onChange={(e) => setState({ ...state, cyberResilience: parseInt(e.target.value) })}
              className="w-full accent-cyan-500 cursor-pointer h-1.5"
            />
          </div>

          {/* Cabinet Ministers layout picker */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
              Active ministers Layout:
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {[2, 3, 34].map(num => (
                <button
                  key={`minister-${num}`}
                  onClick={() => setState({ ...state, activeMinisters: num })}
                  className={`py-1 text-[10px] font-mono font-bold rounded cursor-pointer transition ${
                    state.activeMinisters === num 
                      ? "bg-pink-600 text-white" 
                      : "bg-slate-900 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {num === 34 ? "Classic (34)" : `${num} Ministers`}
                </button>
              ))}
            </div>
            <span className="text-[8.5px] font-mono text-slate-500 block leading-none">
              The blueprint restricts cabinet size specifically to 2 or 3 managers.
            </span>
          </div>

          {/* AI core autonomy */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-slate-400 uppercase">AI SANDBOX AUTONOMY</span>
              <span className="text-[#a855f7] font-bold">{state.aiAutonomy}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              value={state.aiAutonomy}
              onChange={(e) => setState({ ...state, aiAutonomy: parseInt(e.target.value) })}
              className="w-full accent-purple-500 cursor-pointer h-1.5"
            />
          </div>

        </div>

        {/* Tab workspace area (Center Stage Panel - 9 Columns) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Main workspace navigation tabs */}
          <div className="flex flex-wrap gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800 shadow-lg justify-start">
            <button
              onClick={() => setActiveTab('civilization-os')}
              className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition ${
                activeTab === 'civilization-os'
                  ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/60 text-pink-200'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4 text-pink-400 animate-pulse" />
              0. CIVILIZATION OS
            </button>

            <button
              onClick={() => setActiveTab('sys-mapping')}
              className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition ${
                activeTab === 'sys-mapping'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/60 text-cyan-200'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Network className="w-4 h-4 text-cyan-400" />
              1. SYS-MAPPING
            </button>

            <button
              onClick={() => setActiveTab('audit-ledger')}
              className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition ${
                activeTab === 'audit-ledger'
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-pink-550/60 text-pink-250'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-pink-400" />
              2. AUDIT LEDGER
            </button>

            <button
              onClick={() => setActiveTab('twin-sim')}
              className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition ${
                activeTab === 'twin-sim'
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/60 text-emerald-250'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4 text-emerald-400 animate-pulse" />
              3. TWIN-SIMULATOR
            </button>

            <button
              onClick={() => setActiveTab('red-lab')}
              className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition ${
                activeTab === 'red-lab'
                  ? 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/60 text-rose-200'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4 text-red-500" />
              4. RED-LABORATORY
            </button>

            <button
              onClick={() => setActiveTab('longevity')}
              className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition ${
                activeTab === 'longevity'
                  ? 'bg-gradient-to-r from-pink-500/20 to-amber-500/20 border border-amber-500/60 text-amber-200'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 text-amber-500" />
              5. LONGEVITY-DRIFT
            </button>

            <button
              onClick={() => setActiveTab('strategic-counsel')}
              className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition ${
                activeTab === 'strategic-counsel'
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/60 text-indigo-200'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              6. COOPERATIVE COUNSEL
            </button>
          </div>

          {/* Active Tab rendering */}
          <div className="transition-all duration-300">
            {activeTab === 'civilization-os' && <CivilizationOS state={state} onChangeState={setState} />}
            {activeTab === 'sys-mapping' && <CivMap />}
            {activeTab === 'twin-sim' && (
              <DigitalTwin 
                state={state} 
                onChangeState={setState} 
                onUpdateHistory={setHistory} 
                history={history}
              />
            )}
            {activeTab === 'red-lab' && (
              <ThreatLaboratory 
                state={state} 
                onChangeState={setState} 
                onAlert={handleAlert}
              />
            )}
            {activeTab === 'strategic-counsel' && <StrategicCounsel state={state} />}
            {activeTab === 'longevity' && <CivLongevity />}
            
            {activeTab === 'audit-ledger' && (
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-sm font-bold font-mono tracking-widest text-[#ec4899] uppercase mb-1.5 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4" /> Multi-Phase Constitutional Audits Ledger
                  </h3>
                  <p className="text-xs text-slate-400">
                    Detailed strategic assessments for Phases 1 through 11. Custom models are dynamically calibrated based on parameter variables.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(phaseAudits).map(([phase, data]: any) => (
                    <div key={phase} className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[9px] font-mono text-cyan-400 uppercase font-extrabold tracking-widest">
                            PHASE_0{phase}
                          </span>
                          <span className={`text-xs font-mono font-bold ${
                            data.score > 65 ? 'text-emerald-400' : data.score > 35 ? 'text-amber-400' : 'text-rose-500 animate-pulse'
                          }`}>
                            Score: {data.score}/100
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-tight mb-2">
                          {data.title}
                        </h4>
                        <div className="text-[10.5px] text-slate-400 leading-relaxed font-sans space-y-1 max-h-[140px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-900">
                          {data.analysis.split('\n').map((line: string, i: number) => {
                            if (line.startsWith('###') || line.startsWith('#')) return null;
                            if (line.startsWith('-')) return <p key={i} className="pl-2 border-l border-slate-800 text-slate-500">{line}</p>;
                            return <p key={i} className="mb-1">{line}</p>;
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Side scorecard & Final Verdict indicators layout */}
          <div className="bg-slate-900 border-2 border-slate-800 p-5 rounded-2xl shadow-2xl relative overflow-hidden" id="sandbox-executive-scorecard">
            <div className="absolute top-0 left-0 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[8px] font-mono uppercase px-2 py-0.5 rounded-br-lg font-extrabold tracking-widest leading-none z-10">
              Sovereign Report
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              {/* Score indicators */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-sm font-extrabold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-5 h-5 text-amber-500 animate-pulse" /> Phase 15 Scorecard
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Aggregate real-time safety scores computed under active simulation constraints.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-850">
                  <div className="text-center md:text-left">
                    <span className="text-[9px] font-mono text-slate-500 uppercase block font-semibold">Constitutional</span>
                    <span className="text-xs font-mono font-bold text-slate-100">{scores.constitutional}/100</span>
                  </div>
                  <div className="text-center md:text-left">
                    <span className="text-[9px] font-mono text-slate-500 uppercase block font-semibold">Political Stability</span>
                    <span className="text-xs font-mono font-bold text-slate-100">{scores.political}/100</span>
                  </div>
                  <div className="text-center md:text-left">
                    <span className="text-[9px] font-mono text-slate-500 uppercase block font-semibold">Macroeconomics</span>
                    <span className={`text-xs font-mono font-bold ${scores.economics > 50 ? 'text-emerald-400' : 'text-red-400 animate-pulse'}`}>{scores.economics}/100</span>
                  </div>
                  <div className="text-center md:text-left">
                    <span className="text-[9px] font-mono text-slate-500 uppercase block font-semibold">Cyber Security</span>
                    <span className="text-xs font-mono font-bold text-slate-100">{scores.security}/100</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Verdict banner */}
              <div className={`p-4 rounded-xl border flex-shrink-0 max-w-full md:max-w-[325px] w-full text-center md:text-left transition-all ${verdict.color}`}>
                <span className="text-[10px] font-mono font-bold block uppercase tracking-wider text-slate-350 mb-0.5">
                  PHASE 16 DECISION VERDICT
                </span>
                <span className="text-xs font-mono font-black block tracking-tight">
                  {verdict.verdict}
                </span>
                <p className="text-[10.5px] font-sans mt-2 leading-relaxed text-slate-300">
                  {verdict.message}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

      <footer className="text-center text-[10px] font-mono text-slate-600 border-t border-slate-900/60 pt-4 mt-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>SOVEREIGN ARCHITECT SIMULATOR • LICENSED UNDER OMNI OPEN-SOURCE JURISDICTION</span>
        <span>INDONESIAN METRIC ANCHORS BY INDIENATION FOUNDATION & CLOSE 2 U GROUP</span>
      </footer>

    </div>
  );
}
