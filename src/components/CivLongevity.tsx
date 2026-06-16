import { useState } from 'react';
import { ShieldAlert, Users, Layers, Activity, Calendar, Compass } from 'lucide-react';

interface GenMetric {
  id: number;
  name: string;
  era: string;
  legitimacy: number; // 0-100
  valueDrift: number; // 0-100
  fatigue: number; // 0-100
  successionAlert: string;
  summary: string;
}

export default function CivLongevity() {
  const [activeGenId, setActiveGenId] = useState<number>(1);

  const generations: GenMetric[] = [
    {
      id: 1,
      name: "Gen 1: The Founders",
      era: "Years 0 - 25 // 2026 - 2051",
      legitimacy: 98,
      valueDrift: 2,
      fatigue: 10,
      successionAlert: "None. Extreme founding motivation.",
      summary: "High ideological cohesion. Founders (like E J H N) hold supreme command and verify system correctness constantly. Public is highly active and thankful for the initial free dividend wealth rollout."
    },
    {
      id: 2,
      name: "Gen 2: The Adapters",
      era: "Years 25 - 50 // 2051 - 2076",
      legitimacy: 82,
      valueDrift: 15,
      fatigue: 25,
      successionAlert: "Low. Initial power transfer to secondary arrays matches planned state blueprint.",
      summary: "First succession occurs. Original architects pass. Automatic state holds stability, but minor semantic captures appear as classic legal teams attempt to recheck code invariants under democratic terms."
    },
    {
      id: 3,
      name: "Gen 3: The Beneficiaries",
      era: "Years 50 - 75 // 2076 - 2101",
      legitimacy: 65,
      valueDrift: 35,
      fatigue: 45,
      successionAlert: "Moderate. Rise of populist movements demanding override of the silicon Integrity Engine.",
      summary: "Public born into a continuous automated welfare world takes sovereign dividends for granted. Civic literacy collapses. Citizens lose the dynamic knowledge of cryptographic verification and view state engines as unyielding machines."
    },
    {
      id: 4,
      name: "Gen 4: The Sceptics",
      era: "Years 75 - 100 // 2101 - 2126",
      legitimacy: 45,
      valueDrift: 55,
      fatigue: 68,
      successionAlert: "High. Mass voter strikes weaponizing the direct democratic Veto to paralyze major transit lines.",
      summary: "Extreme value drift. General populace experiences psychological apathy, feeling like small cogs inside an algorithmic matrix. Ideological networks demand a dismantlement of state AI sandboxes."
    },
    {
      id: 5,
      name: "Gen 5: The Dissidents",
      era: "Years 100 - 130 // 2126 - 2156",
      legitimacy: 30,
      valueDrift: 78,
      fatigue: 85,
      successionAlert: "CRITICAL. Emergence of regional cyber clans and armed guilds exploiting offline hardware sensors.",
      summary: "Traditionalist regional movements return, rejecting logical mathematical directives. General trust collapses. Classic black market networks operated by corrupt local cartels systematically bypass automated IoT gates."
    },
    {
      id: 6,
      name: "Gen 6: The Splitters",
      era: "Years 130 - 160 // 2156 - 2186",
      legitimacy: 18,
      valueDrift: 90,
      fatigue: 92,
      successionAlert: "EXCESSIVE. Sovereign network partitions into fragmented technological domains.",
      summary: "Major outer provinces completely isolate their local mesh antennas from the central Constitution. Regional state forks run custom contracts, enabling the total return of classic feudal warlords."
    },
    {
      id: 7,
      name: "Gen 7: The Silences",
      era: "Years 160 - 190 // 2186 - 2216",
      legitimacy: 10,
      valueDrift: 95,
      fatigue: 97,
      successionAlert: "CATASTROPHIC. Continuous system deadlocks freeze public physical dispatches.",
      summary: "Civic cohesion is non-existent. Over 95% of active capital is recaptured by the Cartels using leased identity farms. The state is structurally hollowed into a digital Potemkin facade."
    },
    {
      id: 8,
      name: "Gen 8: The Remnants",
      era: "Years 190 - 220 // 2216 - 2246",
      legitimacy: 4,
      valueDrift: 98,
      fatigue: 99,
      successionAlert: "EXTINCTION BOUND. Central state engine is an archaic uneditable hardware relic.",
      summary: "The automated state engine exists as a forgotten physical monument. The code continues executing, but the human population operates on parallel barter systems fully disjoint from the digital net."
    }
  ];

  const currentGen = generations.find(g => g.id === activeGenId) || generations[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="longevity-auditor">
      
      {/* Generation selector sidebar (Phase 10) */}
      <div className="lg:col-span-5 space-y-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-xl">
          <h3 className="text-xs font-bold font-mono tracking-widest text-[#ec4899] uppercase mb-1.5 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-pink-500" /> Multi-Generational Timeline
          </h3>
          <p className="text-[10px] text-slate-400 mb-4Leading-relaxed">
            Select a target generations demographic to audit value drift, institutional fatigue, and succession stability thresholds across the next 200 years.
          </p>

          <div className="grid grid-cols-2 gap-2">
            {generations.map(gen => (
              <button
                key={gen.id}
                onClick={() => setActiveGenId(gen.id)}
                className={`text-left p-3 rounded-lg border transition-all cursor-pointer flex flex-col gap-1 ${
                  activeGenId === gen.id
                    ? 'bg-pink-950/20 border-pink-500 text-pink-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] font-mono font-bold block">
                  {gen.name}
                </span>
                <span className="text-[8px] font-mono text-slate-500 block">
                  Click to inspect
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main active Generations assessment panel (Phase 11 & Succession risks) */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-xl relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 h-full w-[250px] bg-gradient-to-l from-pink-550/5 to-transparent pointer-events-none"></div>

        <div>
          <div className="flex justify-between items-start border-b border-slate-800 pb-3 mb-4">
            <div>
              <span className="text-[10.5px] font-mono text-[#f472b6] tracking-widest font-extrabold uppercase flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> PHASE 10 LONGEVITY ASSESSMENT
              </span>
              <h2 className="text-base font-bold text-slate-100 font-sans mt-1">
                {currentGen.name}
              </h2>
              <span className="text-[10px] font-mono text-slate-500 block mt-1">
                {currentGen.era}
              </span>
            </div>
            <span className="text-[10px] font-mono bg-pink-950/40 text-pink-400 border border-pink-900/45 px-2.5 py-1 rounded">
              GEN_SEQUENCE_0{currentGen.id}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-6 bg-slate-950 p-4 rounded-lg border border-slate-850">
            {currentGen.summary}
          </p>

          {/* Core thermodynamic drift parameters bar graph */}
          <div className="space-y-4 mb-6">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-2 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-pink-500" /> Eras Drift & Fatigue parameters
            </span>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400 font-semibold">STATE LEGITIMACY FACTOR</span>
                  <span className={`${currentGen.legitimacy > 60 ? 'text-emerald-400' : 'text-red-400'} font-bold`}>
                    {currentGen.legitimacy}%
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded overflow-hidden border border-slate-850">
                  <div
                    className={`h-full transition-all duration-500 ${
                      currentGen.legitimacy > 60 ? 'bg-emerald-500' : currentGen.legitimacy > 30 ? 'bg-amber-500' : 'bg-red-500 animate-pulse'
                    }`}
                    style={{ width: `${currentGen.legitimacy}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400 font-semibold">CULTURAL VALUE SYSTEM DRIFT</span>
                  <span className={`${currentGen.valueDrift > 50 ? 'text-rose-500' : 'text-emerald-400'} font-bold`}>
                    {currentGen.valueDrift}%
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded overflow-hidden border border-slate-850">
                  <div
                    className={`h-full transition-all duration-500 ${
                      currentGen.valueDrift > 50 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${currentGen.valueDrift}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400 font-semibold">INSTITUTIONAL DECAY & FATIGUE</span>
                  <span className={`${currentGen.fatigue > 60 ? 'text-rose-500 font-extrabold' : 'text-emerald-400'} font-bold`}>
                    {currentGen.fatigue}%
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded overflow-hidden border border-slate-850">
                  <div
                    className={`h-full transition-all duration-500 ${
                      currentGen.fatigue > 60 ? 'bg-red-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${currentGen.fatigue}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 11 Succession Alert status */}
        <div className={`p-4 rounded-xl border flex flex-col md:flex-row gap-3 items-center text-xs leading-relaxed ${
          currentGen.id > 3 
            ? 'bg-rose-950/20 border-rose-900/40 text-rose-200' 
            : 'bg-emerald-950/20 border-emerald-900/40 text-emerald-200'
        }`}>
          <div className="p-2.5 rounded-lg bg-black/40 flex-shrink-0">
            <ShieldAlert className={`w-5 h-5 ${currentGen.id > 3 ? 'text-red-400 animate-bounce' : 'text-emerald-400'}`} />
          </div>
          <div>
            <span className="font-mono text-[9px] block uppercase font-extrabold tracking-wider mb-0.5">
              PHASE 11 SUCCESSION RISK DISCORD
            </span>
            <p className="font-sans leading-relaxed">
              {currentGen.successionAlert}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
