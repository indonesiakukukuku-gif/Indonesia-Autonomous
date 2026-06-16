import { useState } from 'react';
import { initialConcepts } from '../data/defaults';
import { CoreConcept } from '../types';
import { Network, Activity, ArrowRightLeft, ShieldAlert, Zap, Layers, RefreshCw } from 'lucide-react';

interface CivMapProps {
  onSelectConcept?: (concept: CoreConcept) => void;
}

type MapType = 'architecture' | 'trust' | 'economic' | 'propagation';

export default function CivMap({ onSelectConcept }: CivMapProps) {
  const [selectedMap, setSelectedMap] = useState<MapType>('architecture');
  const [activeConcept, setActiveConcept] = useState<CoreConcept>(initialConcepts[0]);

  const selectAndEmit = (concept: CoreConcept) => {
    setActiveConcept(concept);
    if (onSelectConcept) onSelectConcept(concept);
  };

  // Node position coordinates for a beautiful, organic multi-tier circular cluster
  const nodes = [
    { id: 1, x: 250, y: 150, radius: 24, label: "Constitution Root", conceptId: 1, color: "#ec4899" },
    { id: 2, x: 120, y: 220, radius: 18, label: "Sovereign ID", conceptId: 2, color: "#3b82f6" },
    { id: 3, x: 380, y: 220, radius: 18, label: "National Data Grid", conceptId: 3, color: "#10b981" },
    { id: 4, x: 250, y: 280, radius: 22, label: "State Integrity Engine", conceptId: 4, color: "#a855f7" },
    { id: 5, x: 100, y: 350, radius: 16, label: "Crypto Verify", conceptId: 5, color: "#f59e0b" },
    { id: 6, x: 400, y: 350, radius: 16, label: "AI Sandbox", conceptId: 6, color: "#06b6d4" },
    { id: 7, x: 250, y: 400, radius: 20, label: "Human Veto", conceptId: 7, color: "#ef4444" },
    { id: 8, x: 140, y: 470, radius: 16, label: "Execution Engine", conceptId: 8, color: "#10b981" },
    { id: 9, x: 360, y: 470, radius: 16, label: "Feedback Loop", conceptId: 9, color: "#ec4899" },
    { id: 10, x: 250, y: 560, radius: 22, label: "Global Mesh", conceptId: 11, color: "#3b82f6" }
  ];

  // Defining relative linkage paths
  const links = [
    { from: 1, to: 4, type: "immutable-const" },
    { from: 2, to: 4, type: "auth" },
    { from: 3, to: 4, type: "telemetry" },
    { from: 5, to: 2, type: "crypto-sign" },
    { from: 6, to: 4, type: "policy-draft" },
    { from: 7, to: 4, type: "override" },
    { from: 4, to: 8, type: "execute" },
    { from: 8, to: 9, type: "metrics" },
    { from: 9, to: 6, type: "calibrate" },
    { from: 10, to: 3, type: "p2p-transit" },
    { from: 7, to: 8, type: "veto-intercept" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="civ-map-view">
      {/* Sidebar Selector & Information Details */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-xl">
          <h3 className="text-sm font-semibold tracking-wider text-pink-500 uppercase mb-3 font-mono flex items-center gap-2">
            <Layers className="w-4 h-4" /> Choose Simulation Perspective
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Cycle topologies to audit different operational aspects of the automatic state.
          </p>
          
          <div className="space-y-2">
            <button
              onClick={() => setSelectedMap('architecture')}
              className={`w-full text-left p-3 rounded-lg text-xs font-semibold font-mono flex items-center justify-between border transition-all ${
                selectedMap === 'architecture'
                  ? 'bg-blue-950/40 border-blue-500/80 text-blue-200 shadow-lg'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <Network className="w-4 h-4 text-blue-400" />
                SYSTEM ARCHITECTURE MAP
              </span>
              <span className="text-[10px] bg-blue-500/10 px-1.5 py-0.5 rounded text-blue-300">Phase 1</span>
            </button>

            <button
              onClick={() => setSelectedMap('trust')}
              className={`w-full text-left p-3 rounded-lg text-xs font-semibold font-mono flex items-center justify-between border transition-all ${
                selectedMap === 'trust'
                  ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200 shadow-lg'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                CRYPTOGRAPHIC TRUST MAP
              </span>
              <span className="text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded text-emerald-300">Phase 5</span>
            </button>

            <button
              onClick={() => setSelectedMap('economic')}
              className={`w-full text-left p-3 rounded-lg text-xs font-semibold font-mono flex items-center justify-between border transition-all ${
                selectedMap === 'economic'
                  ? 'bg-amber-950/40 border-amber-500/80 text-amber-200 shadow-lg'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-amber-400" />
                ECONOMIC DIVIDEND FLOWS
              </span>
              <span className="text-[10px] bg-amber-500/10 px-1.5 py-0.5 rounded text-amber-300">Phase 4</span>
            </button>

            <button
              onClick={() => setSelectedMap('propagation')}
              className={`w-full text-left p-3 rounded-lg text-xs font-semibold font-mono flex items-center justify-between border transition-all ${
                selectedMap === 'propagation'
                  ? 'bg-rose-950/40 border-rose-500/80 text-rose-200 shadow-lg'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                FAILURE PROPAGATION PATHS
              </span>
              <span className="text-[10px] bg-rose-500/10 px-1.5 py-0.5 rounded text-rose-300">Stress Test</span>
            </button>
          </div>
        </div>

        {/* Node Detail Inspection Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
            <span className="text-xs font-mono font-bold tracking-widest text-pink-500">
              LAYER AUDIT PANEL
            </span>
            <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-400">
              ID: {activeConcept.id.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                {activeConcept.name}
              </h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {activeConcept.description}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/40 space-y-1.5">
              <span className="text-[10px] font-mono text-red-400 uppercase font-bold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> High-Density Adversarial Hole
              </span>
              <p className="text-xs text-red-200 leading-relaxed">
                {activeConcept.vulnerability}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 space-y-1.5">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> Constitutional Fix
              </span>
              <p className="text-xs text-emerald-200 leading-relaxed">
                {activeConcept.mitigation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cybernetic Grid Canvas View */}
      <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl p-4 relative flex flex-col justify-between overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>
        <div className="flex justify-between items-center border-b border-slate-800/80 pb-3 mb-4 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest">
              {selectedMap === 'architecture' && "Unified Sovereign Architecture Mesh (Phase 1)"}
              {selectedMap === 'trust' && "Cryptographic Sovereign Signature Relays (Phase 5)"}
              {selectedMap === 'economic' && "Thermodynamic Dividend Liquidity Router (Phase 4)"}
              {selectedMap === 'propagation' && "Rogue Cascading Fracture Simulation"}
            </span>
          </div>
          <div className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            Node Count: 10 | Live Telemetry
          </div>
        </div>

        {/* Dynamic Holographic Interactive SVG Map */}
        <div className="relative w-full h-[380px] flex items-center justify-center bg-slate-900/40 rounded-xl border border-slate-800/50">
          <svg viewBox="50 100 400 500" className="w-[85%] h-[85%] select-none z-10">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#3b82f6" opacity="0.6" />
              </marker>
              <marker id="arrow-emerald" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" opacity="0.6" />
              </marker>
              <marker id="arrow-amber" viewBox="0 0 10 10" refX="18" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" opacity="0.6" />
              </marker>
              <marker id="arrow-rose" viewBox="0 0 10 10" refX="18" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" opacity="0.7" />
              </marker>
            </defs>

            {/* Links / Vectors */}
            {links.map((link, idx) => {
              const fromNode = nodes.find(n => n.id === link.from);
              const toNode = nodes.find(n => n.id === link.to);
              if (!fromNode || !toNode) return null;

              // Color of the line depends on the perspective
              let strokeColor = "rgba(148, 163, 184, 0.2)";
              let markerId = "arrow";
              let strokeDash = undefined;

              if (selectedMap === 'trust') {
                strokeColor = (link.from === 5 || link.from === 2) ? "rgba(16, 185, 129, 0.6)" : "rgba(148, 163, 184, 0.1)";
                markerId = "arrow-emerald";
              } else if (selectedMap === 'economic') {
                strokeColor = (link.from === 2 || link.from === 4 || link.to === 8) ? "rgba(245, 158, 11, 0.6)" : "rgba(148, 163, 184, 0.1)";
                markerId = "arrow-amber";
                strokeDash = "3,3";
              } else if (selectedMap === 'propagation') {
                strokeColor = (link.from === 2 || link.to === 4 || link.to === 7) ? "rgba(239, 68, 68, 0.8)" : "rgba(148, 163, 184, 0.1)";
                markerId = "arrow-rose";
                if (link.from === 2 || link.to === 4) strokeDash = "2,4";
              } else {
                strokeColor = "rgba(59, 130, 246, 0.4)";
              }

              return (
                <line
                  key={`link-${idx}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={strokeColor}
                  strokeWidth={selectedMap === 'propagation' && (link.from === 2 || link.to === 4) ? 3 : 2}
                  strokeDasharray={strokeDash}
                  markerEnd={`url(#${markerId})`}
                  className="transition-colors duration-500"
                />
              );
            })}

            {/* Interactive Nodes */}
            {nodes.map(node => {
              const isActive = activeConcept.id === node.conceptId;
              const mappedConcept = initialConcepts.find(c => c.id === node.conceptId)!;
              
              // Color shifts based on state selection
              let fillGradient = node.color;
              if (selectedMap === 'propagation' && [2, 4, 7].includes(node.id)) {
                fillGradient = "#ef4444"; // failure warning
              } else if (selectedMap === 'economic' && [2, 8, 4].includes(node.id)) {
                fillGradient = "#f59e0b"; // dividend flow
              } else if (selectedMap === 'trust' && [5, 2, 1].includes(node.id)) {
                fillGradient = "#10b981"; // trust anchors
              }

              return (
                <g 
                  key={`node-${node.id}`} 
                  onClick={() => selectAndEmit(mappedConcept)}
                  className="cursor-pointer group/node"
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.radius + (isActive ? 3 : 0)}
                    fill="#020617"
                    stroke={isActive ? "#ec4899" : fillGradient}
                    strokeWidth={isActive ? 3.5 : 2}
                    className="transition-all duration-300 hover:scale-110"
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.radius - 4}
                    fill={fillGradient}
                    opacity={isActive ? 0.45 : 0.25}
                    className="animate-pulse"
                  />
                  
                  {/* Subtle inner center dot */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isActive ? 5 : 3}
                    fill={isActive ? "#ec4899" : fillGradient}
                  />

                  {/* Node Label Text */}
                  <text
                    x={node.x}
                    y={node.y - node.radius - 8}
                    textAnchor="middle"
                    fill={isActive ? "#f472b6" : "#cbd5e1"}
                    fontSize="9.5"
                    fontWeight="bolder"
                    fontFamily="monospace"
                    className="bg-black/80 px-1 py-0.5 pointer-events-none drop-shadow-md select-none transition-colors duration-300"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Quick Stats Overlays */}
          <div className="absolute bottom-3 left-3 bg-slate-900/95 border border-slate-800 p-2.5 rounded-lg z-20 max-w-[200px] text-[10px] font-mono leading-relaxed shadow-lg">
            <span className="text-pink-500 font-bold block mb-1">INTERACTIVE LEGEND</span>
            {selectedMap === 'architecture' && <p className="text-slate-400">Click any holographic node to inspect cryptographic and democratic architecture constraints directly.</p>}
            {selectedMap === 'trust' && <p className="text-emerald-400">Green paths represent quantum-resistant MPC signature relays keeping provinces cohesive.</p>}
            {selectedMap === 'economic' && <p className="text-amber-400">Dotted amber streams trace how printed Rp 2 Billion checks move through validation servers.</p>}
            {selectedMap === 'propagation' && <p className="text-red-400">Red flashing indicators locate high-risk feedback lockouts during regional disruption.</p>}
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-900/90 border border-slate-800 px-2 py-1 rounded text-[10px] font-mono font-semibold text-slate-400 z-10">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-pink-500" /> SIMULATOR ACTIVE
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-3 mt-4 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Click dynamic nodes to load constitutional defense coordinates into the left inspect panel.</span>
          <span className="font-mono text-slate-500">SYSTEM STABILITY MAP v1.0.9</span>
        </div>
      </div>
    </div>
  );
}
