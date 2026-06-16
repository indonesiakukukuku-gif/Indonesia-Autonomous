import { useState } from 'react';
import { initialAttacks } from '../data/defaults';
import { AttackVector, CivilizationState } from '../types';
import { ShieldAlert, ShieldCheck, Flame, Skull, Compass, Zap, HelpCircle } from 'lucide-react';

interface ThreatLaboratoryProps {
  state: CivilizationState;
  onChangeState: (state: CivilizationState) => void;
  onAlert: (msg: string) => void;
}

export default function ThreatLaboratory({ state, onChangeState, onAlert }: ThreatLaboratoryProps) {
  const [attacks, setAttacks] = useState<AttackVector[]>(initialAttacks);
  const [selectedAttack, setSelectedAttack] = useState<AttackVector>(initialAttacks[0]);
  const [combatLog, setCombatLog] = useState<string[]>([
    "System Red-Team Simulator initialized.",
    "Awaiting tactical cybernetic instruction..."
  ]);

  const runRedTeamAttack = (atk: AttackVector) => {
    // Add logging
    const logs = [
      `[CRITICAL] Hostile launch: "${atk.name}" activated against state nodes!`,
      ...atk.attackTree.map((step, i) => `-> Phase ${i + 1}: ${step}`),
      `[IMPACT ESTIMATION] Decentralized stability reduced. Hyperinflation and corruption bounds altered.`
    ];
    setCombatLog(logs);

    // Apply severe penalties to simulation state parameters representing the successful exploit
    let statePenalty = { ...state };
    if (atk.id === "att_1") {
      // Oligarch direct capture
      statePenalty.corruption = Math.min(100, state.corruption + 40);
      statePenalty.stateIntegrity = Math.max(10, state.stateIntegrity - 35);
      statePenalty.apathy = Math.min(100, state.apathy + 30);
    } else if (atk.id === "att_2") {
      // Direct democratic gridlock
      statePenalty.apathy = Math.min(100, state.apathy + 35);
      statePenalty.stateIntegrity = Math.max(10, state.stateIntegrity - 25);
    } else if (atk.id === "att_3") {
      // Hyperinflation disaster
      statePenalty.inflationRate = state.inflationRate + 4500;
      statePenalty.currencyStability = Math.max(1, state.currencyStability - 75);
    } else if (atk.id === "att_4") {
      // AI Sandbox Reward hack
      statePenalty.aiAutonomy = Math.min(100, state.aiAutonomy + 40);
      statePenalty.stateIntegrity = Math.max(10, state.stateIntegrity - 45);
    } else if (atk.id === "att_5") {
      // Sovereign Mesh strike
      statePenalty.cyberResilience = Math.max(5, state.cyberResilience - 50);
      statePenalty.energySupplyRate = Math.max(10, state.energySupplyRate - 40);
    }

    onChangeState(statePenalty);
    onAlert(`ALERT: Red-Team exploit "${atk.name}" launched! Dynamic parameters downgraded.`);
  };

  const applyBlueTeamDefense = (atk: AttackVector) => {
    // Update state to reflect proper defense mitigation
    const updatedAttacks = attacks.map(a => {
      if (a.id === atk.id) {
        return { ...a, isMitigated: true };
      }
      return a;
    });
    setAttacks(updatedAttacks);

    // Fix parameters
    let restoredState = { ...state };
    if (atk.id === "att_1") {
      restoredState.corruption = Math.max(5, state.corruption - 35);
      restoredState.stateIntegrity = Math.min(100, state.stateIntegrity + 20);
    } else if (atk.id === "att_2") {
      restoredState.apathy = Math.max(5, state.apathy - 20);
      restoredState.stateIntegrity = Math.min(100, state.stateIntegrity + 15);
    } else if (atk.id === "att_3") {
      // Stabilize hyperinflation
      restoredState.inflationRate = Math.max(3.5, state.inflationRate - 4200);
      restoredState.currencyStability = Math.min(100, state.currencyStability + 65);
    } else if (atk.id === "att_4") {
      restoredState.aiAutonomy = Math.max(10, state.aiAutonomy - 25);
      restoredState.stateIntegrity = Math.min(100, state.stateIntegrity + 30);
    } else if (atk.id === "att_5") {
      restoredState.cyberResilience = Math.min(100, state.cyberResilience + 40);
      restoredState.energySupplyRate = Math.min(100, state.energySupplyRate + 25);
    }

    onChangeState(restoredState);
    setSelectedAttack({ ...atk, isMitigated: true });
    
    setCombatLog([
      `[DEFENSE SECURE] Blue Team applied mathematical mitigation:`,
      `🔧 SOLUTION: ${atk.solution}`,
      `-> Residual risk factor optimized down to nominal minimums. State Integrity recalibrating.`
    ]);

    onAlert(`SECURE: Applied ${atk.name} mitigation framework. Stability indicators recovered.`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="red-team-lab">
      
      {/* List of custom defined Attack Vectors (Phases 13 & 14) */}
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-xl">
          <h3 className="text-xs font-bold font-mono tracking-widest text-rose-500 uppercase mb-3 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-red-500" /> Hostile Attack Matrices (Phases 13)
          </h3>
          <p className="text-[10px] text-slate-400 mb-4">
            Select an exploit designed to systematically bypass the Sovereign digital mesh contracts and direct payout ledger.
          </p>

          <div className="space-y-2">
            {attacks.map(atk => (
              <button
                key={atk.id}
                onClick={() => setSelectedAttack(atk)}
                className={`w-full text-left p-3 rounded-lg border transition-all flex flex-col gap-1 cursor-pointer ${
                  selectedAttack.id === atk.id
                    ? 'bg-rose-950/20 border-rose-500/80 shadow-md'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-xs font-bold font-mono text-slate-100 truncate pr-2">
                    {atk.name}
                  </span>
                  <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded font-extrabold ${
                    atk.isMitigated 
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/40' 
                      : 'bg-red-950 text-red-400 border border-red-900/40'
                  }`}>
                    {atk.isMitigated ? 'MITIGATED' : 'ACTIVE EXPLOIT'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>Adversary: {atk.adversary}</span>
                  <span className="text-red-400 text-[9px] font-bold">Severity: {atk.impact}%</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main interactive cockpit (Center Grid) */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        
        {/* Active Vulnerability Audit Details */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-full w-[200px] bg-gradient-to-l from-red-500/5 to-transparent pointer-events-none"></div>
          
          <div className="flex justify-between items-start border-b border-slate-800 pb-3 mb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest block">
                PHASE 13 RED TEAM AUDIT DISPATCH
              </span>
              <h2 className="text-lg font-bold text-slate-100 font-sans mt-1">
                {selectedAttack.name}
              </h2>
            </div>
            <span className="text-xs font-mono bg-red-950/50 text-red-400 border border-red-900/50 px-2.5 py-1 rounded">
              Victim: {selectedAttack.category}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {selectedAttack.description}
          </p>

          {/* Core loop flaw tree */}
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 mb-4">
            <span className="text-[10px] font-mono font-bold text-red-500 block uppercase mb-3 flex items-center gap-1">
              <Skull className="w-3.5 h-3.5" /> Logical Adversarial Exploitation Tree
            </span>
            <div className="space-y-3 relative pl-3 border-l border-slate-800">
              {selectedAttack.attackTree.map((step, i) => (
                <div key={`step-${i}`} className="text-xs text-slate-400 relative">
                  <span className="absolute -left-[17px] top-1 w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  <span className="font-mono text-red-400 mr-1.5 font-bold">Step {i+1}:</span> {step}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-orange-950/20 border border-orange-900/30 text-[11px] text-orange-200 leading-relaxed mb-6 font-mono">
            <span className="font-bold text-orange-400 uppercase block mb-1">IMPLICID DIRECT VULNERABILITY:</span>
            {selectedAttack.vulnerability}
          </div>

          {/* Double action layout: Red team vs Blue team */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => runRedTeamAttack(selectedAttack)}
              className="cursor-pointer w-full bg-gradient-to-r from-red-650 to-rose-700 hover:from-red-600 hover:to-rose-650 text-white font-mono font-bold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Flame className="w-4 h-4" /> LAUNCH HOSTILE ATTACK (RED TEAM)
            </button>

            <button
              onClick={() => applyBlueTeamDefense(selectedAttack)}
              className="cursor-pointer w-full bg-gradient-to-r from-emerald-650 to-teal-700 hover:from-emerald-600 hover:to-teal-650 text-white font-mono font-bold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4" /> DEPLOY CONSTITUTIONAL DEFENSE (BLUE TEAM)
            </button>
          </div>
        </div>

        {/* Realtime Cybernetic Combat Console Logs */}
        <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 font-mono shadow-inner text-xs">
          <div className="flex justify-between items-center border-b border-slate-900 pb-2 mb-3">
            <span className="text-[10px] text-slate-400 tracking-wider font-extrabold uppercase flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-cyan-400" /> SECURE CONSOLE LOGS
            </span>
            <span className="text-[9px] text-slate-600">STN_PORT_3000 // RUNNING</span>
          </div>
          <div className="space-y-1.5 max-h-[140px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-900">
            {combatLog.map((log, idx) => (
              <p
                key={`log-${idx}`}
                className={`${
                  log.startsWith("[CRITICAL]") ? "text-rose-500 font-bold" :
                  log.startsWith("-> Phase") ? "text-slate-400 pl-3" :
                  log.startsWith("[DEFENSE SECURE]") ? "text-emerald-400 font-bold" :
                  log.startsWith("🔧 RELATION") || log.startsWith("🔧 SOLUTION") ? "text-emerald-300 pl-3" : "text-slate-500"
                }`}
              >
                {log}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
