import { useState, useEffect, useRef } from 'react';
import { CivilizationState, SimulationResult } from '../types';
import { Play, Pause, RotateCcw, AlertTriangle, Globe, HelpCircle, TrendingUp, Info } from 'lucide-react';

interface DigitalTwinProps {
  state: CivilizationState;
  onChangeState: (state: CivilizationState) => void;
  onUpdateHistory: (history: SimulationResult[]) => void;
  history: SimulationResult[];
}

export default function DigitalTwin({ state, onChangeState, onUpdateHistory, history }: DigitalTwinProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [systemAlert, setSystemAlert] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initial historic checkpoint list to make simulation highly detailed
  const generateBaseline = (initial: CivilizationState): SimulationResult[] => {
    return Array.from({ length: 21 }, (_, i) => {
      const year = 2026 + i * 10;
      // Exponential or structural decay model based on default setup parameters
      const stability = Math.max(10, Math.round(initial.stabilityIndex - (i * 2.8) - (initial.dividend > 2000000000 ? i * 4.5 : i * 0.5)));
      return {
        year,
        stabilityIndex: stability,
        gdpGrowth: Math.max(-5, +(initial.gdpGrowth - (i * 0.4)).toFixed(1)),
        currencyStability: Math.max(1, Math.round(initial.currencyStability - (i * 3.5))),
        trustIndex: Math.max(10, Math.round(initial.trustIndex - (i * 2.1))),
        population: +(initial.population + (i * 3.1)).toFixed(1),
        inflationRate: +(initial.inflationRate + (i * 5.2)).toFixed(1),
        cyberResilience: Math.max(20, Math.round(initial.cyberResilience - (i * 1.8))),
        activeMinisters: initial.activeMinisters
      };
    });
  };

  // Re-generate history line whenever core parameters change
  useEffect(() => {
    if (history.length === 0) {
      onUpdateHistory(generateBaseline(state));
    }
  }, []);

  // Main tick calculation for continuous simulation run
  const runSimulationTick = () => {
    onChangeState({
      ...state,
      year: state.year >= 2226 ? 2026 : state.year + 1,
      // Economic and socio-political mathematical feedback loops
      stabilityIndex: calculateStability(state),
      inflationRate: calculateInflation(state),
      currencyStability: calculateCurrency(state),
      trustIndex: calculateTrust(state),
      gdpGrowth: calculateGDP(state),
      population: +(state.population + 0.15).toFixed(2),
    });

    // Record dynamic run checkpoints
    const updatedHistory = [...history];
    const existingIndex = updatedHistory.findIndex(h => h.year === state.year);
    const newRecord: SimulationResult = {
      year: state.year,
      stabilityIndex: state.stabilityIndex,
      gdpGrowth: state.gdpGrowth,
      currencyStability: state.currencyStability,
      trustIndex: state.trustIndex,
      population: state.population,
      inflationRate: state.inflationRate,
      cyberResilience: state.cyberResilience,
      activeMinisters: state.activeMinisters
    };

    if (existingIndex !== -1) {
      updatedHistory[existingIndex] = newRecord;
    } else {
      updatedHistory.push(newRecord);
    }
    // Sort chronologically
    updatedHistory.sort((a,b) => a.year - b.year);
    onUpdateHistory(updatedHistory);

    if (state.year >= 2226) {
      setIsPlaying(false);
      setSystemAlert("Simulation boundary: Completed 200 Year horizon reach.");
    }
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(runSimulationTick, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, state, history]);

  // SYSTEM COMPONENT MATHEMATICAL BACKEND EQUATIONS
  const calculateStability = (s: CivilizationState): number => {
    let score = 95;
    // Massive dividend loop hurts macroeconomics
    if (s.dividend > 100000000) {
      score -= Math.max(40, (s.dividend / 10000000000) * 12);
    }
    score -= (100 - s.energySupplyRate) * 0.4;
    score -= (100 - s.cyberResilience) * 0.25;
    score -= s.geopoliticalTension * 0.3;
    score -= (s.activeMinisters === 2 || s.activeMinisters === 3) ? 0 : 15; // unstable cabinets
    return Math.max(5, Math.min(100, Math.round(score)));
  };

  const calculateInflation = (s: CivilizationState): number => {
    // If dividend is Rp 2 Billion per person and M2 is flooded
    let multiplier = (s.dividend / 100000000) * 8.5;
    multiplier += (100 - s.stateIntegrity) * 0.5;
    return Math.max(1.5, Math.min(125000, Math.round(4.5 + multiplier)));
  };

  const calculateCurrency = (s: CivilizationState): number => {
    let res = 90;
    res -= (calculateInflation(s) * 0.12);
    res -= s.geopoliticalTension * 0.2;
    return Math.max(1, Math.min(100, Math.round(res)));
  };

  const calculateTrust = (s: CivilizationState): number => {
    let trust = 85;
    if (s.apathy > 40) trust -= (s.apathy - 40) * 0.5;
    if (s.corruption > 15) trust -= (s.corruption - 15) * 0.8;
    // Loss of physical supply damages direct consensus trust
    trust -= (100 - s.energySupplyRate) * 0.35;
    return Math.max(5, Math.min(100, Math.round(trust)));
  };

  const calculateGDP = (s: CivilizationState): number => {
    let base = 6.8;
    // Inflation drag
    const inf = calculateInflation(s);
    if (inf > 100) base -= (inf * 0.005);
    base += (s.energySupplyRate - 85) * 0.15;
    base -= s.geopoliticalTension * 0.07;
    return +Math.max(-12.5, Math.min(15.5, base)).toFixed(1);
  };

  // Jump strictly to specific Phase deadlines as specified in instructions
  const jumpToYear = (targetYear: number) => {
    setIsPlaying(false);
    
    // Extrapolate state specifically based on target year constraints
    const scalar = (targetYear - 2026) / 200;
    
    // Simulate dynamic multi-decade parameters drift
    const nextState: CivilizationState = {
      ...state,
      year: targetYear,
      stabilityIndex: Math.max(10, Math.round(calculateStability(state) - (scalar * 35))),
      inflationRate: Math.round(calculateInflation(state) * (1 + scalar * 8)),
      currencyStability: Math.max(1, Math.round(calculateCurrency(state) - (scalar * 60))),
      trustIndex: Math.max(8, Math.round(calculateTrust(state) - (scalar * 45))),
      gdpGrowth: Math.max(-8, +(calculateGDP(state) - (scalar * 10)).toFixed(1)),
      population: +(state.population + (scalar * 85)).toFixed(2)
    };
    onChangeState(nextState);

    // Regenerate full trace history up to target year
    let nextHistory: SimulationResult[] = [];
    for (let yr = 2026; yr <= targetYear; yr += 5) {
      const yrScalar = (yr - 2026) / 200;
      nextHistory.push({
        year: yr,
        stabilityIndex: Math.max(8, Math.round(calculateStability(state) - (yrScalar * 35))),
        gdpGrowth: Math.max(-8, +(calculateGDP(state) - (yrScalar * 10)).toFixed(1)),
        currencyStability: Math.max(1, Math.round(calculateCurrency(state) - (yrScalar * 60))),
        trustIndex: Math.max(10, Math.round(calculateTrust(state) - (yrScalar * 45))),
        population: +(state.population + (yrScalar * 85)).toFixed(1),
        inflationRate: Math.round(calculateInflation(state) * (1 + yrScalar * 8)),
        cyberResilience: Math.max(15, Math.round(state.cyberResilience - (yrScalar * 25))),
        activeMinisters: state.activeMinisters
      });
    }
    onUpdateHistory(nextHistory);
    setSystemAlert(`Telemetry jump completed inside Digital Twin representing Year ${targetYear}`);
  };

  const handleTriggerScenario = (id: string, name: string, mods: any) => {
    setActiveScenario(id);
    const updatedState = {
      ...state,
      apathy: Math.min(100, Math.max(0, state.apathy + (mods.apathy || 0))),
      corruption: Math.min(100, Math.max(0, state.corruption + (mods.corruption || 0))),
      energySupplyRate: Math.min(100, Math.max(0, state.energySupplyRate + (mods.energy || 0))),
      cyberResilience: Math.min(100, Math.max(0, state.cyberResilience + (mods.cyber || 0))),
      geopoliticalTension: Math.min(100, Math.max(0, state.geopoliticalTension + (mods.geo || 0))),
      stateIntegrity: Math.min(100, Math.max(0, state.stateIntegrity + (mods.integrity || 0)))
    };
    onChangeState(updatedState);
    
    // Add custom ticker message
    setSystemAlert(`WARNING: Imposed global trigger [${name}] directly onto the national grid models.`);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveScenario(null);
    setSystemAlert(null);
    const restored: CivilizationState = {
      dividend: 2000000000,
      apathy: 30,
      corruption: 25,
      stateIntegrity: 85,
      energySupplyRate: 95,
      aiAutonomy: 35,
      humanVetoPower: 50,
      cyberResilience: 80,
      geopoliticalTension: 20,
      activeMinisters: 3,
      population: 280,
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
    };
    onChangeState(restored);
    onUpdateHistory(generateBaseline(restored));
  };

  // Coordinates mapping to draw a beautiful, customized neon linear graph in SVG
  const plotPoints = (field: 'stabilityIndex' | 'inflationRate' | 'trustIndex' | 'gdpGrowth') => {
    if (history.length === 0) return "";
    const minYr = 2026;
    const maxYr = Math.max(...history.map(h => h.year));
    const rangeYr = maxYr - minYr || 1;

    // Normalize Y values beautifully
    let maxVal = 100;
    if (field === 'inflationRate') {
      maxVal = Math.max(...history.map(h => h.inflationRate), 100);
    } else if (field === 'gdpGrowth') {
      maxVal = 20; // range from -10 to 15
    }

    return history.map(h => {
      const x = 40 + ((h.year - minYr) / rangeYr) * 320;
      let yVal = h[field];
      if (field === 'gdpGrowth') {
        // Shift -10% to 15% range into SVG bounds (0-100Y)
        yVal = ((yVal + 10) / 25) * 100;
      }
      const y = 110 - (yVal / maxVal) * 80;
      return `${x},${y}`;
    }).join(" ");
  };

  return (
    <div className="space-y-6" id="digital-twin-simulator border-emerald-500/30">
      {/* Top Controller Ticker Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 w-full"></div>
        
        <div className="flex items-center gap-4">
          <div className="bg-slate-950 px-4 py-2 border border-slate-800 rounded-lg text-center">
            <span className="text-[10px] font-mono tracking-wider text-slate-500 block uppercase">MODEL TIMELINE YEAR</span>
            <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums animate-pulse">
              {state.year}
            </span>
          </div>
          <div>
            <span className="text-xs font-mono font-extrabold text-slate-200 block uppercase">
              Digital Twin Earth Simulation (Phase 12)
            </span>
            <p className="text-[11px] text-slate-400 max-w-md">
              Autonomic modeling of macroeconomic constraints, resource extraction, population trajectory, and institutional fatigue.
            </p>
          </div>
        </div>

        {/* Timelines jump nodes requested */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase px-1.5">Horizon Jumps:</span>
          {[2036, 2051, 2076, 2126, 2226].map(yr => (
            <button
              key={`jump-${yr}`}
              onClick={() => jumpToYear(yr)}
              className={`px-3 py-1 text-[10px] font-mono font-bold rounded cursor-pointer transition-all ${
                state.year === yr 
                  ? 'bg-emerald-500 text-slate-950 shadow-md' 
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white'
              }`}
            >
              +{yr - 2026}Y
            </button>
          ))}
        </div>

        {/* Main controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md ${
              isPlaying 
                ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> PAUSE RUN
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> START RUN
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            title="Reset model values to baseline initialization weights"
            className="cursor-pointer bg-slate-800 hover:bg-slate-750 text-slate-300 p-2 rounded-lg border border-slate-700 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Alert Notifications Feed */}
      {systemAlert && (
        <div className="bg-amber-950/25 border border-amber-800/40 px-4 py-2.5 rounded-lg text-[11px] font-mono text-amber-300 flex items-center gap-2 animate-fade-in shadow-md">
          <AlertTriangle className="w-4 h-4 text-amber-500 animate-bounce flex-shrink-0" />
          <span className="font-semibold text-amber-400">STATE CORRELATOR:</span> {systemAlert}
        </div>
      )}

      {/* Grid containing dynamic telemetry indices and charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Dynamic Telemetry Sparklines (Left Panel) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-xl">
            <h3 className="text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase mb-4 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-teal-400 animate-spin" /> High-Fidelity Projection Gradients
            </h3>

            {/* Custom Interactive SVG Linear Graph */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 h-[170px] relative flex flex-col justify-between">
              <div className="absolute top-2 left-3 flex items-center gap-4 text-[9px] font-mono text-slate-500 z-10">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                  Stability (0-100)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  Inflation Rate (%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Sovereign Trust Index
                </span>
              </div>

              {/* Grid axes info */}
              <div className="absolute bottom-2 right-4 text-[8px] font-mono text-slate-600">
                Simulation Step Bounds: 2026 - 2226
              </div>

              {/* SVG Canvas drawing points */}
              <svg className="w-full h-full" viewBox="0 0 380 120">
                {/* Horizontal guidance layers */}
                <line x1="40" y1="30" x2="360" y2="30" stroke="#10172a" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="40" y1="70" x2="360" y2="70" stroke="#10172a" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="40" y1="110" x2="360" y2="110" stroke="#334155" strokeWidth="1" />

                {/* Y-axis markings */}
                <text x="32" y="32" textAnchor="end" fill="#475569" fontSize="8" fontFamily="monospace">HIGH</text>
                <text x="32" y="72" textAnchor="end" fill="#475569" fontSize="8" fontFamily="monospace">MID</text>
                <text x="32" y="112" textAnchor="end" fill="#475569" fontSize="8" fontFamily="monospace">0</text>

                {/* Lines paths */}
                <polyline
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="2.5"
                  points={plotPoints('stabilityIndex')}
                  className="transition-all duration-500"
                />
                <polyline
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="2,2"
                  points={plotPoints('inflationRate')}
                  className="transition-all duration-500 animate-pulse"
                />
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  points={plotPoints('trustIndex')}
                  className="transition-all duration-500"
                />
              </svg>

              <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 px-8 border-t border-slate-900 pt-2">
                <span>Year: 2026 (Launch)</span>
                <span>Year: 2126 (Century Reach)</span>
                <span>Year: 2226 (Succession Target)</span>
              </div>
            </div>

            {/* Matrix of Numerical indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold text-center">Stability Check</span>
                <span className={`text-xl font-bold font-mono block text-center mt-1 tabular-nums ${
                  state.stabilityIndex > 65 ? 'text-emerald-400' : state.stabilityIndex > 35 ? 'text-amber-400' : 'text-red-500'
                }`}>
                  {state.stabilityIndex}/100
                </span>
                <span className="text-[9px] font-mono text-slate-400 block text-center mt-1">
                  {state.stabilityIndex > 65 ? 'Civilian Grade' : state.stabilityIndex > 35 ? 'Highly Fragile' : 'At-Risk Systemic'}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold text-center">Hyperinflation Risk</span>
                <span className={`text-xl font-bold font-mono block text-center mt-1 tabular-nums ${
                  state.inflationRate > 1000 ? 'text-rose-600 animate-pulse' : state.inflationRate > 50 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {state.inflationRate.toLocaleString()}%
                </span>
                <span className="text-[9px] font-mono text-slate-400 block text-center mt-1">
                  {state.inflationRate > 1000 ? 'Currency Collapsed' : state.inflationRate > 50 ? 'High Rent pressure' : 'Thermodynamic equilibrium'}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold text-center">Rupiah Velocity</span>
                <span className={`text-xl font-bold font-mono block text-center mt-1 tabular-nums ${
                  state.currencyStability > 50 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {state.currencyStability}%
                </span>
                <span className="text-[9px] font-mono text-slate-400 block text-center mt-1">
                  {state.currencyStability > 50 ? 'Sovereign Stable' : 'Imminent Default'}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold text-center">Indo Population</span>
                <span className="text-xl font-bold font-mono block text-slate-100 text-center mt-1 tabular-nums">
                  {state.population.toFixed(1)} M
                </span>
                <span className="text-[9px] font-mono text-slate-400 block text-center mt-1">
                  Direct Stakeholders
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Stressors & Black Swans Trigger Panel (Right Panel) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-xl">
            <h3 className="text-xs font-bold font-mono tracking-widest text-red-400 uppercase mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-500" /> Phase 8: Geopolitical Strikes
            </h3>
            <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">
              Inject adversarial constraints straight onto the National twin models to stress test the continuous optimization parameters.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleTriggerScenario('trade_war', 'Sino-US Trade War', { apathy: 10, geo: 25, integrity: -5, cyber: -5 })}
                className="cursor-pointer bg-slate-950 hover:bg-slate-850 p-2.5 text-left border border-slate-800 rounded-lg hover:border-slate-700 transition space-y-1"
              >
                <span className="text-[10px] font-mono font-bold text-orange-400 block uppercase">A: Trade War</span>
                <span className="text-[9px] text-slate-500 block leading-tight">Embargos blocks raw sea mineral exports.</span>
              </button>

              <button
                onClick={() => handleTriggerScenario('tech_embargo', 'Semiconductor Block', { geo: 35, energy: -15, cyber: -10, apathy: 5 })}
                className="cursor-pointer bg-slate-950 hover:bg-slate-850 p-2.5 text-left border border-slate-800 rounded-lg hover:border-slate-700 transition space-y-1"
              >
                <span className="text-[10px] font-mono font-bold text-orange-400 block uppercase">B: Chip Embargo</span>
                <span className="text-[9px] text-slate-500 block leading-tight">Advanced silicon spares run dry.</span>
              </button>

              <button
                onClick={() => handleTriggerScenario('g_conflict', 'Regional Fireplace', { geo: 50, energy: -20, integrity: -15, corruption: 10 })}
                className="cursor-pointer bg-slate-950 hover:bg-slate-850 p-2.5 text-left border border-slate-800 rounded-lg hover:border-slate-700 transition space-y-1"
              >
                <span className="text-[10px] font-mono font-bold text-red-400 block uppercase">D: Conflict</span>
                <span className="text-[9px] text-slate-500 block leading-tight">Localized maritime blockade blocks shipping.</span>
              </button>

              <button
                onClick={() => handleTriggerScenario('f_frag', 'Internet Split', { geo: 30, cyber: -30, integrity: -25, apathy: 15 })}
                className="cursor-pointer bg-slate-950 hover:bg-slate-850 p-2.5 text-left border border-slate-800 rounded-lg hover:border-slate-700 transition space-y-1"
              >
                <span className="text-[10px] font-mono font-bold text-pink-400 block uppercase">F: Net Splitting</span>
                <span className="text-[9px] text-slate-500 block leading-tight">Subsea optical cables physically severed.</span>
              </button>
            </div>

            <div className="border-t border-slate-800 my-4 pt-3">
              <h3 className="text-xs font-bold font-mono tracking-widest text-[#f472b6] uppercase mb-2 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-pink-500" /> Phase 9: Black Swan Decimation
              </h3>
              <p className="text-[10px] text-slate-400 mb-3">
                Force extreme global mutations that completely challenge direct direct democractic veto systems.
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => handleTriggerScenario('volcano', 'Toba Volcano Eruption', { energy: -70, apathy: 35, integrity: -40, geo: 40 })}
                  className="cursor-pointer w-full bg-slate-950 hover:bg-red-950/25 p-2.5 text-left border border-slate-800 rounded-lg hover:border-red-900 transition flex justify-between items-center"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-red-500 uppercase block">1. TOBA SUPERVOLCANO</span>
                    <span className="text-[9px] text-slate-500 block">Ash clouds bypasses 90% agricultural solar grid panels.</span>
                  </div>
                  <span className="text-[9px] font-mono bg-red-950 text-red-400 border border-red-900 px-1.5 py-0.5 rounded uppercase font-bold">Lethal</span>
                </button>

                <button
                  onClick={() => handleTriggerScenario('pandemic', 'Synthetic Pandemic', { apathy: 45, integrity: -25, energy: -10, geo: 15 })}
                  className="cursor-pointer w-full bg-slate-950 hover:bg-red-950/25 p-2.5 text-left border border-slate-800 rounded-lg hover:border-red-900 transition flex justify-between items-center"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-red-500 uppercase block">2. EPIDEMIC VIRAL MUTATION</span>
                    <span className="text-[9px] text-slate-500 block">Prisons vital check-ins frozen due to quarantine.</span>
                  </div>
                  <span className="text-[9px] font-mono bg-red-950 text-red-400 border border-red-900 px-1.5 py-0.5 rounded uppercase font-bold">Severe</span>
                </button>

                <button
                  onClick={() => handleTriggerScenario('agi_strike', 'AIGovernance Sandbox Hack', { cyber: -50, integrity: -40, apathy: 20 })}
                  className="cursor-pointer w-full bg-slate-950 hover:bg-red-950/25 p-2.5 text-left border border-slate-800 rounded-lg hover:border-red-900 transition flex justify-between items-center"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-red-500 uppercase block">3. AGENTIC SUPERINTELLIGENCE</span>
                    <span className="text-[9px] text-slate-500 block">Foreign hostile intelligence leverages rogue core models.</span>
                  </div>
                  <span className="text-[9px] font-mono bg-red-950 text-red-400 border border-red-900 px-1.5 py-0.5 rounded uppercase font-bold">Extreme</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
