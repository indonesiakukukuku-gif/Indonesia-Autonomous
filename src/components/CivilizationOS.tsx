import { useState } from 'react';
import { CivilizationState } from '../types';
import { 
  Brain, Fingerprint, Shield, Coins, MessageSquare, Cpu, Database, 
  Activity, Award, Scale, Terminal, Network, ChevronDown, ChevronUp, 
  Globe, RefreshCw, Sliders, HelpCircle, Briefcase, HeartPulse, 
  GraduationCap, User, FolderLock, Layers, CheckCircle, Zap, AlertCircle, 
  Smartphone, Send, ArrowRight, ShieldAlert, Wifi, Layers2, Lock, Eye, FileText
} from 'lucide-react';

interface CivilizationOSProps {
  state: CivilizationState;
  onChangeState: (state: CivilizationState) => void;
}

export default function CivilizationOS({ state, onChangeState }: CivilizationOSProps) {
  // Layer details toggle states
  const [expandedLayer, setExpandedLayer] = useState<number | null>(0);

  // AuraLang Translate Simulator state
  const [auraInput, setAuraInput] = useState<string>("Bantuan sosial merata berdasarkan kontribusi nyata masyarakat.");
  const [auraLang, setAuraLang] = useState<string>("en");
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  // Dynamic IID Generator state
  const [citizenName, setCitizenName] = useState<string>("EJHN");
  const [citizenCity, setCitizenCity] = useState<string>("062"); // Indonesia ISD code
  const [citizenSector, setCitizenSector] = useState<string>("001"); // Elite Founders

  // Three Currency Dialect contribution calculator state
  const [contrEconomic, setContrEconomic] = useState<number>(40);
  const [contrEducation, setContrEducation] = useState<number>(30);
  const [contrSocial, setContrSocial] = useState<number>(20);
  const [contrEnvironment, setContrEnvironment] = useState<number>(10);

  // Lazarus redundant nodes failover trigger
  const [edgeNodes, setEdgeNodes] = useState([
    { name: "Node Jakarta Raya (Primary)", code: "JKT-01", latency: "4ms", status: "Operational", load: "42%" },
    { name: "Node Jayapura Papua (Edge)", code: "DJY-03", latency: "18ms", status: "Operational", load: "19%" },
    { name: "Node Banda Aceh (Edge)", code: "BAC-02", latency: "12ms", status: "Operational", load: "28%" },
    { name: "Node Surabaya (Active-Backup)", code: "SBY-04", latency: "6ms", status: "Operational", load: "31%" },
    { name: "Node Samarinda (Edge)", code: "SMD-05", latency: "14ms", status: "Operational", load: "15%" },
  ]);
  const [lazarusStatus, setLazarusStatus] = useState<string>("STANDBY");

  // Active Super App category tabs
  const [activeAppTab, setActiveAppTab] = useState<string>("wallet");

  // Constitutional Intelligence Council (MPR Transformasi) states
  const [selectedCivilizationPath, setSelectedCivilizationPath] = useState<string>("teknologi");
  const [isPathSimulating, setIsPathSimulating] = useState<boolean>(false);
  const [simulatedPathResult, setSimulatedPathResult] = useState<string>("Konsensus MPR: Kedaulatan Silikon. Node-node cadangan Lazarus ditingkatkan kapasitasnya ke 10 Gbps kuantum ZK.");
  const [selectedVesselPart, setSelectedVesselPart] = useState<string>("mpr");

  const handleCivilizationPathChange = (path: string) => {
    setSelectedCivilizationPath(path);
    setIsPathSimulating(true);
    setTimeout(() => {
      setIsPathSimulating(false);
      if (path === "agraris") {
        setSimulatedPathResult("Konsensus MPR: Pangan Berdaulat. AI mengalokasikan 45% daya komputasi ke satelit monitoring tanah & optimalisasi jaringan logistik pupuk organik.");
      } else if (path === "industri") {
        setSimulatedPathResult("Konsensus MPR: Hilirisasi Manufaktur. Output energi nasional (ENPE) otonom ditingkatkan untuk menyuplai smelter elektrik ramah lingkungan.");
      } else if (path === "teknologi") {
        setSimulatedPathResult("Konsensus MPR: Kedaulatan Silikon. Node-node cadangan Lazarus ditingkatkan kapasitasnya ke 10 Gbps dengan enkripsi kuantum ZK.");
      } else if (path === "kesejahteraan") {
        setSimulatedPathResult("Konsensus MPR: Dividen Semesta. Jaminan sosial terikat dengan IID universal, menyinkronkan LUV secara langsung berdasarkan kontribusi nyata.");
      }
    }, 1000);
  };

  // AuraLang Translation Dictionary matching user's 55 countries goal
  const getAuraTranslation = (text: string, lang: string) => {
    if (lang === "en") {
      return "Sovereign social relief distributed purely based on tangible citizen contribution telemetry.";
    }
    if (lang === "de") {
      return "Souveräne Sozialhilfe, die ausschließlich auf der Grundlage konkreter Telemetriedaten der Bürgerbeiträge verteilt wird.";
    }
    if (lang === "ja") {
      return "市民の具体的貢献テレメトリーにのみ基づき、公平に分配される主権型社会的支援。";
    }
    return "Mesh-Node Broadcast: " + text.split("").reverse().join("");
  };

  const currentIID = `IID-${citizenSector.padStart(3, '0')}-${citizenCity.padStart(3, '0')}-${citizenName.toUpperCase().replace(/\s+/g, '').substring(0, 4).padEnd(4, '0')}0001`;

  // Dynamic Value coordinator algorithm outputs
  const calculatedTM = Math.round((contrSocial * 12 + contrEducation * 8 + contrEnvironment * 15) * (1 - state.corruption / 200));
  const calculatedENPE = Math.round((contrEconomic * 15 + contrEducation * 5) * (state.energySupplyRate / 100));
  const calculatedLUV = Math.round((contrSocial * 20 + contrEducation * 10) * (state.trustIndex / 100));
  const calculatedINDEUR = Math.round((calculatedENPE * 0.6 + calculatedLUV * 0.4) * (state.currencyStability / 100));

  const triggerLazarusFailover = () => {
    setLazarusStatus("RECONSTR_INITIATED");
    const damagedNodes = edgeNodes.map((n, idx) => {
      if (idx === 0) return { ...n, status: "DEGRADED", latency: "99ms", load: "98%" };
      return n;
    });
    setEdgeNodes(damagedNodes);

    setTimeout(() => {
      setLazarusStatus("SELF_HEALING");
      setTimeout(() => {
        const healedNodes = edgeNodes.map((n, idx) => {
          if (idx === 0) return { ...n, status: "ROUTED_BACKUP", latency: "8ms", load: "5%" };
          if (idx === 3) return { ...n, name: "Node Surabaya (Elevated Primary)", load: "78%" };
          return n;
        });
        setEdgeNodes(healedNodes);
        setLazarusStatus("SECURE_RESTORED");
      }, 1800);
    }, 1200);
  };

  const resetLazarus = () => {
    setEdgeNodes([
      { name: "Node Jakarta Raya (Primary)", code: "JKT-01", latency: "4ms", status: "Operational", load: "42%" },
      { name: "Node Jayapura Papua (Edge)", code: "DJY-03", latency: "18ms", status: "Operational", load: "19%" },
      { name: "Node Banda Aceh (Edge)", code: "BAC-02", latency: "12ms", status: "Operational", load: "28%" },
      { name: "Node Surabaya (Active-Backup)", code: "SBY-04", latency: "6ms", status: "Operational", load: "31%" },
      { name: "Node Samarinda (Edge)", code: "SMD-05", latency: "14ms", status: "Operational", load: "15%" },
    ]);
    setLazarusStatus("STANDBY");
  };

  return (
    <div className="space-y-8 animate-fade-in" id="civilization-os-dashboard">
      
      {/* 1. Core Operating System Strategic Positioning Cards */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="border-b border-slate-800 pb-3 mb-5">
          <span className="text-[10px] font-mono text-cyan-400 font-extrabold tracking-widest block uppercase">
            OPERATIONAL ARCHITECTURE STATUS
          </span>
          <h2 className="text-base font-bold text-slate-100 font-sans mt-0.5">
            Sovereign Civilization Operating System (NeuroOS)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Understanding the distinction of authorities inside the decentralized digital mesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-pink-900/40 relative overflow-hidden group hover:border-pink-500/50 transition">
            <div className="absolute top-2 right-2 p-1 bg-pink-950/40 text-pink-400 rounded">
              <Scale className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-mono font-bold text-pink-400 block uppercase">
              CONSTITUSI
            </span>
            <h3 className="text-sm font-bold text-slate-100 mt-1">Sumber Otoritas</h3>
            <p className="text-[10.5px] text-slate-400 mt-2 leading-relaxed">
              Ground truth, direct cryptographic invariants setting physical limits on ledger parameters. AI absolutely cannot edit this.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-pink-300">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
              CORE DIRECT RELIABILITY
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-cyan-900/40 relative overflow-hidden group hover:border-cyan-500/50 transition">
            <div className="absolute top-2 right-2 p-1 bg-cyan-950/40 text-cyan-400 rounded">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-mono font-bold text-cyan-400 block uppercase">
              PEMERINTAH
            </span>
            <h3 className="text-sm font-bold text-slate-100 mt-1">Pembuat Kebijakan</h3>
            <p className="text-[10.5px] text-slate-400 mt-2 leading-relaxed">
              Human officials & democratic cabinets proposing amendments. AI only serves to simulate outcomes in sandboxes.
            </p>
            <div className="mt-3 text-[10px] font-mono text-cyan-400">
              Cabinet: {state.activeMinisters} Leaders
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/40 relative overflow-hidden group hover:border-emerald-500/50 transition">
            <div className="absolute top-2 right-2 p-1 bg-emerald-950/40 text-emerald-400 rounded">
              <Coins className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-mono font-bold text-emerald-400 block uppercase">
              EKONOMI
            </span>
            <h3 className="text-sm font-bold text-slate-100 mt-1">Mesin Aktivitas</h3>
            <p className="text-[10.5px] text-slate-400 mt-2 leading-relaxed">
              Active currency transaction nodes, trade velocity, UMKM initiatives, national energy surplus, digital treasury assets.
            </p>
            <div className="mt-3 text-[10px] font-mono text-emerald-400">
              Growth: +{state.gdpGrowth}% GDP
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-purple-900/40 relative overflow-hidden group hover:border-purple-500/50 transition">
            <div className="absolute top-2 right-2 p-1 bg-purple-950/40 text-purple-400 rounded">
              <Brain className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-mono font-bold text-purple-400 block uppercase">
              INTELLIGENCE LAYER
            </span>
            <h3 className="text-sm font-bold text-slate-100 mt-1">Mesin Koordinasi</h3>
            <p className="text-[10.5px] text-slate-400 mt-2 leading-relaxed">
              Cognitive monitoring mechanisms (ARGI, AI Guard, Lazarus), auditing compliance anomalies across edge nodes in real-time.
            </p>
            <div className="mt-3 text-[10px] font-mono text-purple-400">
              Autonomy Ratio: {state.aiAutonomy}%
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-amber-900/40 relative overflow-hidden group hover:border-amber-500/50 transition">
            <div className="absolute top-2 right-2 p-1 bg-amber-950/40 text-amber-400 rounded">
              <Network className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-mono font-bold text-amber-400 block uppercase">
              NEUROSPHERE MESH
            </span>
            <h3 className="text-sm font-bold text-slate-100 mt-1">Konektivitas Lintas</h3>
            <p className="text-[10.5px] text-slate-400 mt-2 leading-relaxed">
              Decentralized physical transceivers, IoT grids, zero-knowledge tunnels keeping the geographic archipelago seamlessly in sync.
            </p>
            <div className="mt-3 text-[10px] font-mono text-amber-400">
              Cyber Resilience: {state.cyberResilience}%
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE KINDNESS CIVILIZATION STACK: Layer 0 -> Layer 10 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Stack Sidebar (Columns 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-xl">
            <h3 className="text-xs font-semibold tracking-wider text-pink-500 uppercase mb-3 font-mono">
              THE KINDNESS CIVILIZATION STACK (11 LAYERS)
            </h3>
            <p className="text-[10.5px] text-slate-400 mb-4Leading-relaxed">
              Explore how each layer operates dynamically to serve the primary human layer.
            </p>

            <div className="space-y-1.5 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-850">
              {[
                { id: 0, name: "Layer 0 - Human Layer", role: "Manusia & Kualitas Hidup", color: "border-l-4 border-red-500" },
                { id: 1, name: "Layer 1 - Identity Layer", role: "IID Universal Wallet Registry", color: "border-l-4 border-blue-500" },
                { id: 2, name: "Layer 2 - Communication Layer", role: "NeuroLang & AuraLang Translator", color: "border-l-4 border-indigo-500" },
                { id: 3, name: "Layer 3 - Intelligence Layer", role: "ARGI / AI Guard / Lazarus Engine", color: "border-l-4 border-purple-500" },
                { id: 4, name: "Layer 4 - Technology Money Layer", role: "Three Currency Dialect Distribution", color: "border-l-4 border-yellow-500" },
                { id: 5, name: "Layer 5 - Economic Layer", role: "UMKM real-time ledger monitors", color: "border-l-4 border-emerald-500" },
                { id: 6, name: "Layer 6 - Public Service Layer", role: "Education, Health, Welfare Anchor", color: "border-l-4 border-teal-500" },
                { id: 7, name: "Layer 7 - Edge Computing Layer", role: "Decoupled Local Node Cluster", color: "border-l-4 border-cyan-500" },
                { id: 8, name: "Layer 8 - Autonomous Governance Layer", role: "Policy loop feedback pipelines", color: "border-l-4 border-orange-500" },
                { id: 9, name: "Layer 9 - Neuro OS Orchestrator", role: "Coordination core system engine", color: "border-l-4 border-pink-500" },
                { id: 10, name: "Layer 10 - NeuroSphere Super App", role: "Citizen Interface Cockpit applet", color: "border-l-4 border-rose-500" },
              ].map(layer => (
                <button
                  key={layer.id}
                  onClick={() => setExpandedLayer(layer.id)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all flex flex-col gap-0.5 cursor-pointer ${
                    expandedLayer === layer.id
                      ? `bg-slate-950 border-slate-700 shadow-md ${layer.color}`
                      : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[11px] font-bold font-mono text-slate-150 truncate">
                      {layer.name}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">
                      ID: 0{layer.id}
                    </span>
                  </div>
                  <span className="text-[9.5px] font-mono text-slate-400 truncate">
                    {layer.role}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Interactive Sandbox Layer Viewer Panel (Columns 7) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-xl flex flex-col justify-between">
          <div>
            
            {/* Expanded Layer 0 Detail: HUMAN LAYER */}
            {expandedLayer === 0 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 font-mono">
                    <HeartPulse className="w-4 h-4 text-rose-500" /> LAYER 0: HUMAN LAYER
                  </h3>
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-950/40 border border-rose-900 px-2 py-0.5 rounded uppercase font-bold">
                    The Absolute Center
                  </span>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-850">
                  <strong>Tujuan Akhir Sistem Bukanlah Uang atau AI, Melainkan Manusia.</strong> Segala keputusan, koordinasi, dan emisi moneter didesain mutlak untuk menaikkan parameter kesejahteraan warga secara fisik dan psikologis.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-850">
                    <span className="text-[9px] text-slate-500 block uppercase font-mono">Kualitas Hidup</span>
                    <span className="text-xs font-bold font-mono text-emerald-400">-{calculatedLUV > 65 ? "Optimal" : "Slightly Low"}-</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-850">
                    <span className="text-[9px] text-slate-500 block uppercase font-mono">Kebebasan Sipil</span>
                    <span className="text-xs font-bold font-mono text-cyan-400">Safe (MPC Secured)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-850">
                    <span className="text-[9px] text-slate-500 block uppercase font-mono">Indeks Kebaikan</span>
                    <span className="text-xs font-bold font-mono text-pink-400">{calculatedLUV} (LUV Matrix)</span>
                  </div>
                </div>

                <div className="p-3 bg-rose-950/20 border border-rose-900/40 rounded text-[10.5px] text-rose-200 font-mono leading-relaxed">
                  <span className="font-bold uppercase block text-rose-400 text-[10px] mb-1">Human Layer Constraint:</span>
                  "Semua layer di atasnya melayani layer ini. Jika sistem AI mencoba memotong jatah energi atau mengeksploitasi biosfer demi 'nomor efisiensi' tanpa veto manusia, sistem akan melakukan shutdown darurat."
                </div>
              </div>
            )}

            {/* Expanded Layer 1 Detail: IDENTITY LAYER */}
            {expandedLayer === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 font-mono">
                    <Fingerprint className="w-4 h-4 text-blue-500" /> LAYER 1: IDENTITY LAYER (IID)
                  </h3>
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-950/40 border border-blue-910 px-2 py-0.5 rounded uppercase font-bold">
                    Anchor of Trust
                  </span>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed">
                  <strong>NeuroSphere Identity (IID)</strong>: Identitas digital universal, kepemilikan aset, hak akses, dan pemberian layanan langsung tanpa perantara. Berfungsi mencegah kebocoran anggaran dan mempercepat audit real-time.
                </p>

                {/* Live Interactive IID Register Generator */}
                <div className="bg-slate-950 p-4 border border-blue-900/40 rounded-xl space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-full w-[120px] bg-blue-500/5 pointer-events-none"></div>
                  <span className="text-[9.5px] font-mono font-bold text-blue-400 uppercase tracking-wider block">
                    LIVE REGISTRATION PREVIEW
                  </span>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[9px] font-mono text-slate-500 block">NAME PREFIX:</label>
                      <input
                        type="text"
                        value={citizenName}
                        onChange={(e) => setCitizenName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-[10.5px] text-slate-100 focus:outline-none focus:border-blue-500"
                        placeholder="EJHN"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-mono text-slate-500 block">CITY COORDINATE:</label>
                      <input
                        type="text"
                        value={citizenCity}
                        onChange={(e) => setCitizenCity(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-[10.5px] text-slate-100 focus:outline-none"
                        placeholder="062"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-mono text-slate-500 block">SECTOR SEED:</label>
                      <input
                        type="text"
                        value={citizenSector}
                        onChange={(e) => setCitizenSector(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-[10.5px] text-slate-100 focus:outline-none"
                        placeholder="001"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-blue-900/60 p-3.5 rounded-lg flex justify-between items-center font-mono">
                    <div className="space-y-1">
                      <span className="text-[8.5px] text-slate-400 uppercase font-semibold block">GENERATED BIOMETRIC IID HASH</span>
                      <span className="text-xs font-bold text-blue-300 block">{currentIID}</span>
                    </div>
                    <span className="text-[9px] font-black bg-blue-950 text-blue-400 border border-blue-900 px-2 py-0.5 rounded animate-pulse">
                      SECURED NODE
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Expanded Layer 2 Detail: COMMUNICATION LAYER */}
            {expandedLayer === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 font-mono font-bold">
                    <MessageSquare className="w-4 h-4 text-indigo-400" /> LAYER 2: COMMUNICATION LAYER
                  </h3>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-900 px-2 py-0.5 rounded uppercase font-bold">
                    System Translation
                  </span>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed">
                  Menyediakan dualitas komunikasi peradaban:
                  <br />
                  1. <strong>NeuroLang</strong>: Bahasa mesin peradaban (komunikasi tertutup, cepat, aman antarmodul & AI).
                  <br />
                  2. <strong>AuraLang</strong>: Bahasa manusia dengan target dynamic real-time translations ke <strong>55 negara dan 20+ bahasa</strong> secara simultan.
                </p>

                {/* Live AuraLang Dynamic Translate Emulator */}
                <div className="bg-slate-950 p-4 border border-indigo-900/40 rounded-xl space-y-3">
                  <span className="text-[9.5px] font-mono font-bold text-indigo-400 uppercase tracking-widest block flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" /> AURALANG REAL-TIME TRANSLATOR TERMINAL
                  </span>
                  
                  <textarea
                    value={auraInput}
                    onChange={(e) => setAuraInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 p-2 text-xs rounded text-slate-200 focus:outline-none focus:border-indigo-500"
                    placeholder="Tulis kalimat Indonesia di sini..."
                    rows={2}
                  />

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono text-slate-500">TARGET COUNTRY CODE:</span>
                      <select
                        value={auraLang}
                        onChange={(e) => setAuraLang(e.target.value)}
                        className="bg-slate-900 border border-slate-850 p-1 rounded text-[10px] font-mono text-indigo-400 focus:outline-none"
                      >
                        <option value="en">ENGLISH (US/UK) - [54 Countries Limit]</option>
                        <option value="de">GERMANY (EU) - [4 Countries Limit]</option>
                        <option value="ja">JAPANESE (JP) - [East-Asia Segment]</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsTranslating(true);
                        setTimeout(() => setIsTranslating(false), 600);
                      }}
                      className="cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-slate-950 px-3 py-1 rounded text-[10.5px] font-mono font-bold"
                    >
                      EXECUTE
                    </button>
                  </div>

                  <div className="bg-slate-900 p-3 rounded border border-slate-850 font-mono text-xs">
                    <div className="flex justify-between items-center mb-1 text-[9px] text-slate-500">
                      <span>{isTranslating ? "COMPUTING TRANSLATE..." : "TRANSLATION OUTCROP REPRESENTATION:"}</span>
                      <span className="text-emerald-400 font-bold uppercase">{auraLang} MATCH</span>
                    </div>
                    <p className="text-indigo-200 leading-normal font-sans text-[11px]">
                      {isTranslating ? "Translating signal arrays..." : getAuraTranslation(auraInput, auraLang)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Expanded Layer 3 Detail: INTELLIGENCE LAYER */}
            {expandedLayer === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 font-mono">
                    <Brain className="w-4 h-4 text-purple-400 animate-pulse" /> LAYER 3: INTELLIGENCE LAYER
                  </h3>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-950/40 border border-purple-900 px-2 py-0.5 rounded uppercase font-bold">
                    Autonomous Checkers
                  </span>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed">
                  Terdiri atas tiga pilar utama koordinasi kognitif:
                  <br />
                  1. <strong>ARGI (Autonomous Regenerative General Intelligence)</strong>: Melakukan simulasi makroekonomi, mitigasi risiko siber, prediksi kesejahteraan.
                  <br />
                  2. <strong>AI Guard</strong>: Audit kepatuhan konstitusional secara saksama.
                  <br />
                  3. <strong>Lazarus Engine</strong>: Disaster recovery & redundancy. Apabila server utama terganggu, Lazarus mempartisi beban kerja sipil ke node-node cadangan secara otonom dalam 2 detik.
                </p>

                {/* Lazarus System Failure Trigger Simulation */}
                <div className="bg-slate-950 p-4 border border-purple-900/40 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest block">
                      LAZARUS FAILOVER AND FAILSAFE RELIABILITY
                    </span>
                    <span className={`text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded border ${
                      lazarusStatus === "STANDBY" ? "bg-slate-900 text-slate-400 border-slate-800" :
                      lazarusStatus === "RECONSTR_INITIATED" ? "bg-red-950 text-red-400 border-red-900 animate-pulse" :
                      lazarusStatus === "SELF_HEALING" ? "bg-amber-950 text-amber-400 border-amber-900 animate-pulse" :
                      "bg-emerald-950 text-emerald-400 border-emerald-900"
                    }`}>
                      {lazarusStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {edgeNodes.map((n, idx) => (
                      <div key={idx} className="bg-slate-900 p-2 rounded border border-slate-850 font-mono text-[9px] text-center">
                        <span className="text-slate-500 block font-semibold truncate">{n.name.split(" ")[0]}</span>
                        <span className={`text-[10px] font-bold block ${
                          n.status === "DEGRADED" ? "text-red-500 animate-pulse" :
                          n.status === "ROUTED_BACKUP" ? "text-cyan-400" : "text-emerald-400"
                        }`}>{n.status}</span>
                        <span className="text-slate-400 block mt-0.5">Delay: {n.latency}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={triggerLazarusFailover}
                      disabled={lazarusStatus.startsWith("RECONSTR") || lazarusStatus === "SELF_HEALING"}
                      className="cursor-pointer flex-1 bg-red-650 hover:bg-red-600 disabled:opacity-40 text-white py-2 px-3 rounded-lg text-xs font-mono font-bold"
                    >
                      SIMULATE LIVE NODE CRASH (TEST LAZARUS REDUNDANCY)
                    </button>
                    {lazarusStatus === "SECURE_RESTORED" && (
                      <button
                        type="button"
                        onClick={resetLazarus}
                        className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-100 p-2 rounded-lg text-xs font-mono font-bold"
                      >
                        RESET NODES
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Expanded Layer 4 Detail: TECHNOLOGY MONEY */}
            {expandedLayer === 4 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 font-mono">
                    <Coins className="w-4 h-4 text-amber-400" /> LAYER 4: TECHNOLOGY MONEY LAYER
                  </h3>
                  <span className="text-[10px] font-mono text-amber-500 bg-amber-950/40 border border-amber-900 px-2 py-0.5 rounded uppercase font-bold">
                    Value Coordination Engine
                  </span>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-850">
                  <strong>Technology Money is NOT commodity fiat money.</strong> Ini adalah 'Value Coordination Engine' mengukur kontribusi, kreativitas, inovasi, kebaikan, dan produktivitas lingkungan. Diatur dalam dialek empat macam nilai terintegrasi.
                </p>

                {/* Interactive Dynamic Value Coordinator */}
                <div className="bg-slate-950 p-4 border border-amber-900/40 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                      THREE CURRENCY DIALECT & VALUE INDEX CODES
                    </span>
                    <span className="text-[8px] font-mono text-slate-500">INDONESIAN ANCHORS BY INDIENATION</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[9.5px] font-mono text-slate-400 uppercase font-bold block">Adjust Your Contribution Ratio:</span>
                    <div className="grid grid-cols-2 gap-3 font-mono text-[10px]">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Economic:</span>
                          <span className="text-emerald-400">{contrEconomic}%</span>
                        </div>
                        <input
                          type="range"
                          min="0" max="100"
                          value={contrEconomic}
                          onChange={(e) => setContrEconomic(parseInt(e.target.value))}
                          className="w-full accent-emerald-500 h-1 cursor-pointer bg-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Education:</span>
                          <span className="text-blue-400">{contrEducation}%</span>
                        </div>
                        <input
                          type="range"
                          min="0" max="100"
                          value={contrEducation}
                          onChange={(e) => setContrEducation(parseInt(e.target.value))}
                          className="w-full accent-blue-500 h-1 cursor-pointer bg-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Social Care:</span>
                          <span className="text-pink-400">{contrSocial}%</span>
                        </div>
                        <input
                          type="range"
                          min="0" max="100"
                          value={contrSocial}
                          onChange={(e) => setContrSocial(parseInt(e.target.value))}
                          className="w-full accent-pink-500 h-1 cursor-pointer bg-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Environment:</span>
                          <span className="text-teal-400">{contrEnvironment}%</span>
                        </div>
                        <input
                          type="range"
                          min="0" max="100"
                          value={contrEnvironment}
                          onChange={(e) => setContrEnvironment(parseInt(e.target.value))}
                          className="w-full accent-teal-500 h-1 cursor-pointer bg-slate-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 bg-slate-900 p-2.5 rounded-lg text-center font-mono text-[10.5px]">
                    <div className="border-r border-slate-800">
                      <span className="text-purple-400 block font-bold text-[10px]">TM</span>
                      <span className="text-slate-350 block mt-0.5">{calculatedTM} pts</span>
                      <span className="text-[8px] text-slate-500 block leading-tight">Reputasi / Kontribusi</span>
                    </div>
                    <div className="border-r border-slate-800">
                      <span className="text-emerald-400 block font-bold text-[10px]">ENPE</span>
                      <span className="text-slate-350 block mt-0.5">{calculatedENPE} pts</span>
                      <span className="text-[8px] text-slate-500 block leading-tight">Produktivitas Lay</span>
                    </div>
                    <div className="border-r border-slate-800">
                      <span className="text-rose-400 block font-bold text-[10px]">LUV</span>
                      <span className="text-slate-350 block mt-0.5">{calculatedLUV} pts</span>
                      <span className="text-[8px] text-slate-500 block leading-tight">Kindness Social</span>
                    </div>
                    <div>
                      <span className="text-amber-400 block font-bold text-[10px]">IND-EUR</span>
                      <span className="text-slate-350 block mt-0.5">{calculatedINDEUR} pts</span>
                      <span className="text-[8px] text-slate-500 block leading-tight">Stability Anchor</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Expanded Layer 5 Detail: ECONOMIC LAYER */}
            {expandedLayer === 5 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 font-mono">
                    <Activity className="w-4 h-4 text-emerald-400" /> LAYER 5: ECONOMIC LAYER
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900 px-2 py-0.5 rounded uppercase font-bold">
                    Mesin Aktivitas
                  </span>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-850">
                  <strong>Digital National Activity Center:</strong> Real-time monitoring of UMKM, enterprise trades, logistic tracks and export-import balance. Fully integrated with IID to compute regional surplus ratios instantly.
                </p>

                <div className="grid grid-cols-2 gap-3 font-mono text-[10.5px]">
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-850">
                    <span className="text-slate-500 block">UMKM PARTICIPATION:</span>
                    <span className="text-emerald-400 font-bold">88.4% (Live Registration)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-850">
                    <span className="text-slate-500 block">LOGISTICS BOTTLENECK:</span>
                    <span className="text-emerald-400 font-bold">0.45% (Flow Optimal)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Expanded Layer 6 Detail: PUBLIC SERVICE LAYER */}
            {expandedLayer === 6 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 font-mono">
                    <GraduationCap className="w-4 h-4 text-blue-500" /> LAYER 6: PUBLIC SERVICE LAYER
                  </h3>
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-950/40 border border-blue-900 px-2 py-0.5 rounded uppercase font-bold">
                    Universal Service
                  </span>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-850">
                  Pendidikan (Learning Center), Kesehatan (Health diagnostics center), dan Bantuan sosial (Welfare program) terikat secara absolut dengan kepemilikan biometric IID unik guna memotong calo dan perantara korup.
                </p>
              </div>
            )}

            {/* Expanded Layer 7 Detail: EDGE COMPUTING LAYER */}
            {expandedLayer === 7 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 font-mono">
                    <Wifi className="w-4 h-4 text-cyan-400" /> LAYER 7: EDGE COMPUTING LAYER
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-900 px-2 py-0.5 rounded uppercase font-bold">
                    Anti Network Bottleneck
                  </span>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed">
                  Menghilangkan penumpukan data terpusat (Cloud Centralized Single Point of Failure) dengan menaruh server-mini tangguh di setiap kota, kabupaten dan provinsi di seluruh Indonesia.
                </p>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                  <span className="text-[10px] font-mono text-cyan-300 font-bold block mb-1">LOCAL SUNDANESE & PAPUAN NODES STATUS</span>
                  <div className="space-y-1 text-[10px] text-slate-400 font-mono">
                    <div className="flex justify-between"><span>Java Nodes (Jakarta/Bandung):</span> <span className="text-emerald-400">Green (03ms latency)</span></div>
                    <div className="flex justify-between"><span>Sumatran Mesh Nodes (Aceh/Medan):</span> <span className="text-emerald-400">Green (11ms latency)</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* Expanded Layer 8 Detail: AUTONOMOUS GOVERNANCE */}
            {expandedLayer === 8 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 font-mono">
                    <Scale className="w-4 h-4 text-orange-400" /> LAYER 8: AUTONOMOUS GOVERNANCE LAYER
                  </h3>
                  <span className="text-[10px] font-mono text-orange-400 bg-orange-950/40 border border-orange-900 px-2 py-0.5 rounded uppercase font-bold">
                    The Decision Loop
                  </span>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-850 font-mono">
                  <strong>The Operational Algorithm:</strong>
                  <br />
                  Data Pipeline Telemetry ↓ AI Cognitive Processing ↓ Sandbox Simulation Running ↓ Policy Recommendation Drafts ↓ Cabinet Reviews ↓ Direct Human Veto Checks ↓ Active Implementation Executed.
                </p>
              </div>
            )}

            {/* Expanded Layer 9 Detail: NEUROOS ORCHESTRATOR */}
            {expandedLayer === 9 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 font-mono">
                    <Brain className="w-4 h-4 text-pink-400 animate-pulse" /> LAYER 9: NEURO OS (THE COORDINATION CORE)
                  </h3>
                  <span className="text-[10px] font-mono text-pink-400 bg-pink-950/40 border border-pink-900 px-2 py-0.5 rounded uppercase font-bold">
                    The Orchestrator
                  </span>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed">
                  Menghubungkan biosecurity, IID cryptographic signatures, dialek mata uang (TM/ENPE/LUV), komunikasi model-to-model NeuroLang, integrasi Edge, dan citizen portal menjadi satu kesatuan interaktif tak terpisahkan.
                </p>
              </div>
            )}

            {/* Expanded Layer 10 Detail: SUPER APP INTERFACES */}
            {expandedLayer === 10 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-800 pb-1">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 font-mono">
                    <Smartphone className="w-4 h-4 text-rose-400" /> LAYER 10: NEUROSPHERE SUPER APP EMULATOR
                  </h3>
                  <span className="text-[9.5px] font-mono text-rose-400 bg-rose-950/40 border border-rose-900 px-1.5 py-0.5 rounded uppercase font-bold">
                    Citizen Gate
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Visual demo of what is rendered on citizens' portable devices. High-fidelity interface fully linked to biometric hashes.
                </p>

                {/* THE EXTREMELY POLISHED SUPER APP EMULATOR */}
                <div className="bg-slate-950 border-2 border-slate-850 rounded-2xl p-3 shadow-2xl relative max-w-[340px] mx-auto overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-4 bg-slate-900 flex justify-between px-3 text-[8.5px] font-mono text-slate-500 rounded-t-2xl">
                    <span>STN-NET</span> <span>10:42 PM</span> <span>100% [BATTERY]</span>
                  </div>

                  <div className="mt-3 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-950 border border-pink-500/30 flex items-center justify-center text-xs text-pink-500">IND</div>
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 block font-bold leading-none">IID STAKEHOLDER</span>
                        <span className="text-[10px] font-mono text-slate-200 mt-0.5 block">{currentIID.substring(0, 15)}...</span>
                      </div>
                    </div>
                    <span className="text-[8px] bg-emerald-950 border border-emerald-900/60 p-0.5 text-emerald-400 font-mono rounded">ACTIVE</span>
                  </div>

                  {/* Super App mini tabs */}
                  <div className="grid grid-cols-4 gap-1 mt-4 border-b border-slate-900 pb-1 bg-slate-900/20 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setActiveAppTab("wallet")}
                      className={`text-[9px] font-mono font-bold py-1 rounded transition ${activeAppTab === 'wallet' ? "bg-pink-650 text-white" : "text-slate-500"}`}
                    >
                      Balances
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveAppTab("edu")}
                      className={`text-[9px] font-mono font-bold py-1 rounded transition ${activeAppTab === 'edu' ? "bg-pink-650 text-white" : "text-slate-500"}`}
                    >
                      Learning
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveAppTab("health")}
                      className={`text-[9px] font-mono font-bold py-1 rounded transition ${activeAppTab === 'health' ? "bg-pink-650 text-white" : "text-slate-500"}`}
                    >
                      Health Hub
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveAppTab("counselor")}
                      className={`text-[9px] font-mono font-bold py-1 rounded transition ${activeAppTab === 'counselor' ? "bg-pink-650 text-white" : "text-slate-500"}`}
                    >
                      AI Agent
                    </button>
                  </div>

                  {/* Super App mini Content display */}
                  <div className="mt-3 min-h-[90px] text-[10.5px] font-mono p-2 bg-slate-900/35 rounded-lg border border-slate-850 leading-relaxed text-slate-350">
                    {activeAppTab === "wallet" && (
                      <div className="space-y-1">
                        <span className="text-[9px] text-[#f472b6] block uppercase tracking-wider font-extrabold text-center mb-1">IID TOKENS BALANCE</span>
                        <div className="flex justify-between"><span>Technology Money (TM):</span> <span className="text-white">{calculatedTM} pts</span></div>
                        <div className="flex justify-between"><span>ENPE Productivity:</span> <span className="text-white">{calculatedENPE} pts</span></div>
                        <div className="flex justify-between"><span>LUV Social Dividend:</span> <span className="text-white">{calculatedLUV} pts</span></div>
                        <div className="flex justify-between border-t border-slate-850/60 pt-0.5 mt-0.5"><span>IND-EUR Index:</span> <span className="text-amber-400 font-extrabold">{calculatedINDEUR} pts</span></div>
                      </div>
                    )}

                    {activeAppTab === "edu" && (
                      <div className="space-y-1 text-center">
                        <span className="text-[9px] text-[#3b82f6] block uppercase tracking-wider font-bold mb-1">CIVIC KNOWLEDGE SUITE</span>
                        <p className="text-[9.5px]">Completed Module 4: "Thermodynamic Monetary Stability and velocity vectors" +30 TM reward.</p>
                      </div>
                    )}

                    {activeAppTab === "health" && (
                      <div className="space-y-1 text-center text-slate-300 text-[10px]">
                        <span className="text-[9.5px] text-emerald-400 block uppercase font-bold">HEALTH BIOTRACK CONSENSUS</span>
                        <p>Weekly local biological integrity verified at center point. Next checkout in 2 days.</p>
                      </div>
                    )}

                    {activeAppTab === "counselor" && (
                      <div className="space-y-1 text-[9.5px]">
                        <span className="text-[9px] text-purple-400 block uppercase font-bold text-center">ARGI COGNITIVE AGENT</span>
                        <div className="p-1 rounded bg-slate-900 border border-slate-800 text-[9px] italic text-purple-200">
                          "Hello EJHN. Dividend emission parameters are currently stable. Would you like me to simulate Java microgrid allocation amendments?"
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Default display details */}
            {expandedLayer === null && (
              <p className="text-xs text-slate-400 leading-normal">
                Select any layer of THE KINDNESS CIVILIZATION STACK to inspect live telemetry endpoints, interactive calculations, failure redundancy backups, and mobile rendering simulations.
              </p>
            )}

          </div>

          <div className="border-t border-slate-850 pt-3 mt-4 text-[10px] font-mono text-slate-500 flex justify-between items-center">
            <span>Layer Calibration System: ACTIVE</span>
            <span className="text-pink-400 font-extrabold uppercase">HUMAN LAYER ALWAYS DOMINATING</span>
          </div>
        </div>

      </div>

      {/* NEW: TRANSFORMASI MPR - CONSTITUTIONAL INTELLIGENCE COUNCIL */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6 relative overflow-hidden" id="constitutional-intelligence-council">
        <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse"></span>
          <span className="text-[9px] font-mono font-medium tracking-wider text-indigo-400 uppercase bg-indigo-950/40 border border-indigo-900 px-2 py-0.5 rounded">
            CONSTITUTIONAL SECURITY GUARDIAN
          </span>
        </div>

        <div className="border-b border-slate-800 pb-3">
          <span className="text-[10px] font-mono text-indigo-400 font-extrabold tracking-widest block uppercase">
            TRANSFORMASI FUNGSI KONSTITUSIONAL MPR INDONESIA
          </span>
          <h2 className="text-lg font-extrabold text-slate-100 font-sans mt-0.5">
            Constitutional Intelligence Council (Majelis Permusyawaratan Rakyat 2.0)
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Dari rapat manual, sidang, berkas laporan fisik menjadi penjaga peta negara berbasis data real-time, digital twin, simulasi dampak kebijakan, dan audit otomatis AI-assisted governance.
          </p>
        </div>

        {/* 1. Interactive Ship of State Analogy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950/60 p-4 rounded-xl border border-slate-850">
          
          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase block tracking-wider">
                ANALOGI KAPAL NEGARA (VESSEL SCHEMATIC)
              </span>
              <h3 className="text-sm font-bold text-slate-150 mt-0.5">
                Struktur Sinkronisasi Otoritas Pelayaran Bangsa
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Negara adalah kapal besar di samudra peradaban. Klik bagian kapal untuk melihat otoritas dan fungsinya:
              </p>
            </div>

            {/* Ship Interactive Grid Buttons */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "rakyat", label: "👥 Rakyat (Pemilik Kapal)", desc: "Kedaulatan mutlak & pemilik sah arah peradaban." },
                { id: "konstitusi", label: "📜 Konstitusi (Peta Pelayaran)", desc: "Hukum dasar, panduan absolut, invarian kriptografis." },
                { id: "mpr", label: "🏛️ MPR / Council (Penjaga Peta)", desc: "Menguji arah jangka panjang, merevisi peta, mengawasi kemudi." },
                { id: "presiden", label: "👑 Presiden (Kapten Kapal)", desc: "Pemimpin eksekutif pengarah mesin pelayaran harian." },
                { id: "kementerian", label: "💼 Kementerian (Awak Kapal)", desc: "Menjaga keandalan logistik beras, jalan, administrasi harian." },
                { id: "argi", label: "🧠 ARGI (Asisten Navigasi AI)", desc: "Meramal konsumsi energi, simulasi jalur badai makroekonomi." },
                { id: "neuroos", label: "⚡ NeuroOS (Sistem Operasi)", desc: "Sistem digital terdesentralisasi, koordinasi mesh nasional." },
                { id: "superapp", label: "📱 Super App (Interface)", desc: "Panel kontrol penumpang melaporkan anomali, transfer TM harian." },
              ].map(part => (
                <button
                  key={part.id}
                  onClick={() => setSelectedVesselPart(part.id)}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs font-mono font-bold transition flex flex-col gap-1 cursor-pointer ${
                    selectedVesselPart === part.id
                      ? "bg-indigo-950/60 border-indigo-500/60 text-indigo-200"
                      : "bg-slate-900/40 border-slate-900 text-slate-400 hover:border-slate-800"
                  }`}
                >
                  <span>{part.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Ship Part Detail Screen */}
          <div className="lg:col-span-6 bg-slate-900/60 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-indigo-900/40 pb-2">
                <span className="text-[9.5px] font-mono text-indigo-400 font-extrabold uppercase">
                  ACTIVE VESSEL COMPARTMENT TELEMETRY
                </span>
                <span className="text-[10px] bg-slate-950 font-mono text-slate-400 px-2 py-0.5 rounded border border-slate-850">
                  ID: {selectedVesselPart.toUpperCase()}
                </span>
              </div>

              {selectedVesselPart === "rakyat" && (
                <div className="space-y-2 animate-fade-in">
                  <h4 className="text-sm font-bold text-slate-100 font-mono">Rakyat • Pemilik Sah Kapal Negara</h4>
                  <p className="text-xs text-slate-350 leading-relaxed">
                    Kedaulatan berada di tangan rakyat dan dilaksanakan menurut Undang-Undang Dasar. Dalam kerangka otonom, rakyat adalah pemilik kedaulatan mutlak (<strong>Sovereign Stakeholder</strong>). Seluruh sistem, emisi moneter, dan mitigasi krisis diarahkan murni pada kualitas hidup masyarakat tanpa kecuali.
                  </p>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-850 text-[10.5px] font-mono text-emerald-400">
                    STATUS: Pemegang Hak Veto Demokratis Utama
                  </div>
                </div>
              )}

              {selectedVesselPart === "konstitusi" && (
                <div className="space-y-2 animate-fade-in">
                  <h4 className="text-sm font-bold text-slate-100 font-mono">Konstitusi • Peta Pelayaran Absolut</h4>
                  <p className="text-xs text-slate-350 leading-relaxed">
                    Konstitusi menentukan batas gerak aman negara. Berfungsi sebagai <strong>Ground Truth / Invarian Kriptografis</strong> yang dirancang secara fisik di dalam kode ledger peradaban. AI, ARGI, maupun kabinet pemerintahan tidak diizinkan mengubah koordinat batas ini tanpa persetujuan konstitusional rakyat.
                  </p>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-850 text-[10.5px] font-mono text-pink-400">
                    STATUS: Immutable Cryptographic Constant
                  </div>
                </div>
              )}

              {selectedVesselPart === "mpr" && (
                <div className="space-y-2 animate-fade-in">
                  <h4 className="text-sm font-bold text-slate-100 font-mono">Constitutional Council • Penjaga Peta Pelayaran</h4>
                  <p className="text-xs text-slate-350 leading-relaxed">
                    MPR bertransformasi menjadi <strong>Constitutional Intelligence Council</strong>. Fungsinya tidak mengurusi urusan harian taktis (seperti harga beras atau izin jalan), melainkan menjaga arah visi peradaban jangka panjang negara (agraris, teknologi, industri, kesejahteraan) dan memverifikasi integritas algoritma AI governance agar senantiasa setia kepada kemanusiaan & nilai Pancasila.
                  </p>
                  <div className="p-2.5 bg-indigo-950/50 border border-indigo-900 rounded text-[10.5px] font-mono text-indigo-300">
                    FUNGSI KHUSUS: Mengawasi ARGI, NeuroOS, dan Menyetujui Amandemen Strategis.
                  </div>
                </div>
              )}

              {selectedVesselPart === "presiden" && (
                <div className="space-y-2 animate-fade-in">
                  <h4 className="text-sm font-bold text-slate-100 font-mono">Presiden • Kapten Kapal Pelaksana</h4>
                  <p className="text-xs text-slate-350 leading-relaxed">
                    Kepala Pemerintahan Eksekutif. Presiden mengarahkan kabinetnya untuk menjalankan operasional harian negara berdasarkan parameter taktis. Kabinet modern dalam simulasi ini dipangkas efisien menjadi <strong>2-3 menteri utama</strong> yang bertanggung jawab atas keberlangsungan pasokan energi fisik, siber, dan stabilitas moneter nasional.
                  </p>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-850 text-[10.5px] font-mono text-cyan-400">
                    ACTIVE MINISTERS CABINET: {state.activeMinisters} Pelaksana Lapangan
                  </div>
                </div>
              )}

              {selectedVesselPart === "kementerian" && (
                <div className="space-y-2 animate-fade-in">
                  <h4 className="text-sm font-bold text-slate-100 font-mono">Kementerian • Awak Kapal Operasional</h4>
                  <p className="text-xs text-slate-350 leading-relaxed">
                    Bertanggung jawab atas administrasi taktis sehari-hari, distribusi logistik fisik, pemeliharaan infrastruktur penting, jalan raya, pendidikan, sanitasi, dan perizinan. Mereka adalah pelaksana lapangan yang memastikan kapal tetap terapung dan penumpang terlayani dengan optimal.
                  </p>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-850 text-[10.5px] font-mono text-slate-400">
                    KPI TARGET: Optimalisasi Alokasi Sumber Daya Daerah Terpapar
                  </div>
                </div>
              )}

              {selectedVesselPart === "argi" && (
                <div className="space-y-2 animate-fade-in">
                  <h4 className="text-sm font-bold text-slate-100 font-mono">ARGI • Asisten Navigasi Cerdas (AI Co-Pilot)</h4>
                  <p className="text-xs text-slate-350 leading-relaxed">
                    Sistem kecerdasan buatan umum otonom (<strong>Autonomous Regenerative General Intelligence</strong>). Berfungsi sebagai asisten navigasi yang mensimulasikan dampak makroekonomi, menghitung risiko geopolitik, meramalkan inflasi, dan mengusulkan solusi operasional terbaik. Namun, ARGI tidak memiliki legitimasi politik maupun konstitusional - pilihan akhir berada di tangan manusia.
                  </p>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-850 text-[10.5px] font-mono text-purple-400">
                    PROJECTION COMPLEXITY: 140+ Variable Sandbox Simulators
                  </div>
                </div>
              )}

              {selectedVesselPart === "neuroos" && (
                <div className="space-y-2 animate-fade-in">
                  <h4 className="text-sm font-bold text-slate-100 font-mono">NeuroOS • Jaringan Mesin Terpadu Kapal</h4>
                  <p className="text-xs text-slate-350 leading-relaxed">
                    Sistem operasi nirkabel yang mengorkestrasikan mesh jaringan fisik, menghitung indeks LUV dan ENPE regional secara real-time, mengoordinasikan node-edge failover (Lazarus), serta melayani verifikasi biometrik IID secara aman di seluruh wilayah kepulauan Indonesia.
                  </p>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-850 text-[10.5px] font-mono text-amber-500">
                    NETWORK COORDINATION VELOCITY: Near-Zero Lag Edge Comm
                  </div>
                </div>
              )}

              {selectedVesselPart === "superapp" && (
                <div className="space-y-2 animate-fade-in">
                  <h4 className="text-sm font-bold text-slate-100 font-mono">Super App Cockpit • Panel Layanan Penumpang</h4>
                  <p className="text-xs text-slate-350 leading-relaxed">
                    Gerbang portal digital personal warga negara. Melalui aplikasi ini warga berinteraksi langsung dengan data anggaran riil, jaminan sosial (dividend), dompet multi-aset TM/ENPE/LUV, serta menyampaikan suara veto konstitusional langsung ke dashboard MPR secara transparan tanpa calo.
                  </p>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-850 text-[10.5px] font-mono text-rose-400">
                    INTEGRASI PORTABLE: Mobile Android & Web Client SDK
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-850 text-[10.5px] font-sans text-slate-400 leading-normal flex items-start gap-1.5">
              <span className="text-amber-500">ℹ️</span>
              <span>
                Meskipun navigasi AI (ARGI) sangat canggih, tetap diperlukan <strong>Penjaga Peta (MPR)</strong> untuk menjawab arah esensial: <em>"Ke mana arah kapal peradaban kita akan berlayar hari ini?"</em>.
              </span>
            </div>
          </div>

        </div>

        {/* 2. Interactive Destiny selector: Arah Peradaban */}
        <div className="space-y-3">
          <div>
            <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase block tracking-wider">
              CONSTITUTIONAL AMENDMENT INTERACTIVE SANDBOX
            </span>
            <h3 className="text-sm font-bold text-slate-150">
              Menentukan Arah Peradaban Bangsa (Legitimate Civilization Focus)
            </h3>
            <p className="text-[11px] text-slate-400">
              Pilih fokus arah pembangunan jangka panjang nasional. Klik salah satu kartu untuk mensimulasikan keputusan politik MPR ke dalam sandbox ARGI:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { 
                id: "agraris", 
                title: "🚜 Negara Agraris Unggul", 
                theme: "border-emerald-500/30 hover:border-emerald-500 text-emerald-400 bg-emerald-950/10",
                desc: "Kedaulatan pangan nasional penuh, pemulihan ekologis tanah kepulauan, UMKM tani termodern." 
              },
              { 
                id: "industri", 
                title: "🏭 Negara Industri Berdaulat", 
                theme: "border-cyan-500/30 hover:border-cyan-500 text-cyan-400 bg-cyan-950/10",
                desc: "Smelter otonom industri berat, ekspor barang jadi, integrasi logistik laut Nusantara." 
              },
              { 
                id: "teknologi", 
                title: "🛰️ Negara Teknologi Masa Depan", 
                theme: "border-purple-500/30 hover:border-purple-500 text-purple-400 bg-purple-950/10",
                desc: "Pabrik semikonduktor canggih, komputasi kuantum, otonomi sistem sandboxing ARGI." 
              },
              { 
                id: "kesejahteraan", 
                title: "❤️ Negara Kesejahteraan Rakyat", 
                theme: "border-rose-500/30 hover:border-rose-500 text-rose-400 bg-rose-950/10",
                desc: "Keseimbangan pembagian modal merata, dividen jaminan kemiskinan berbasis biometrik IID." 
              },
            ].map(path => (
              <button
                key={path.id}
                type="button"
                onClick={() => handleCivilizationPathChange(path.id)}
                className={`cursor-pointer text-left p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between h-40 ${
                  selectedCivilizationPath === path.id
                    ? path.theme.split(" ")[1] + " " + path.theme.split(" ")[3] + " border-solid shadow-md bg-slate-950"
                    : "border-slate-800 text-slate-400 bg-slate-900/10"
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold font-mono tracking-tight">{path.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                    {path.desc}
                  </p>
                </div>
                <span className="text-[9px] font-mono block text-slate-500">
                  {selectedCivilizationPath === path.id ? "● ACTIVE SELECTION" : "○ CLICK TO SIMULATE"}
                </span>
              </button>
            ))}
          </div>

          {/* Simulated result log terminal */}
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-900/30 font-mono text-xs space-y-2">
            <div className="flex justify-between items-center text-[9px] text-slate-500">
              <span className="flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                CONSTITUTIONAL SIMULATION LOGGER (ARGI SANDBOX v1.9)
              </span>
              <span className="text-emerald-450 font-bold uppercase">MPR_VETO_APPROVED: TRUE</span>
            </div>
            
            {isPathSimulating ? (
              <div className="flex items-center gap-2 text-indigo-300 py-1.5">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>ARGI running multi-variable simulation constraints... Enforcing physical system limits...</span>
              </div>
            ) : (
              <div className="space-y-1 py-1 text-slate-300">
                <p className="text-indigo-200">
                  <span className="text-slate-500 mr-2">[COUNCIL SYSTEM]:</span>
                  {simulatedPathResult}
                </p>
                <p className="text-[10px] text-slate-450">
                  <span className="text-slate-500 mr-2">[ARGI FEEDBACK]:</span>
                  "System metrics stable. National priority registers updated. Legislative compliance veto at L3 confirmed."
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 3. New 8-Layer Sovereign Authority Cascade Tree */}
        <div className="pt-2">
          <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase block tracking-wider mb-2 text-center">
            THE SYSTEM ARCHITECTURE CASCADE (8-STAGE REFINED AUTONIC MODEL)
          </span>
          <div className="grid grid-cols-2 md:grid-cols-8 gap-3 font-mono text-[9.5px]">
            {[
              { stage: "L1. Rakyat", sub: "Status: Berdaulat", theme: "border-red-900/40 text-red-300 bg-red-950/20" },
              { stage: "L2. Konstitusi", sub: "Status: Batas physical limit", theme: "border-pink-900/40 text-pink-300 bg-pink-950/20" },
              { stage: "L3. MPR Council", sub: "Status: Penjaga Peta", theme: "border-indigo-905/40 text-indigo-300 bg-indigo-950/30" },
              { stage: "L4. Presiden", sub: "Status: Pelaksana Taktis", theme: "border-cyan-900/40 text-cyan-300 bg-cyan-950/20" },
              { stage: "L5. ARGI AI", sub: "Status: Simulator", theme: "border-purple-900/40 text-purple-300 bg-purple-950/20" },
              { stage: "L6. NeuroOS", sub: "Status: Orkestrator Jkt", theme: "border-amber-900/40 text-amber-300 bg-amber-950/20" },
              { stage: "L7. Super App", sub: "Status: Portal Sipil", theme: "border-rose-900/40 text-rose-300 bg-rose-950/20" },
              { stage: "L8. Masyarakat", sub: "Status: Distribusi LUV", theme: "border-emerald-900/40 text-emerald-300 bg-emerald-950/20" },
            ].map((node, i) => (
              <div key={i} className={`p-2.5 border rounded-lg text-center flex flex-col justify-between ${node.theme}`}>
                <span className="font-bold leading-tight block">{node.stage}</span>
                <span className="text-[8px] text-slate-450 block mt-1 leading-none">{node.sub}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. REFINED 5 COGNITIVE & ARCHITECTURE CORE SYSTEMS (The newly perfected core layers) */}
      <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 shadow-2xl relative overflow-hidden" id="sandbox-refined-security-audit">
        <div className="border-b border-slate-850 pb-3 mb-5">
          <span className="text-[10px] font-mono text-[#a855f7] tracking-widest font-extrabold block uppercase flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> REFINED SECURITY & SYSTEM CORNERSTONES
          </span>
          <h2 className="text-base font-bold text-slate-100 font-sans mt-0.5">
            Five Pillars Completing the Autonic Operating System Architecture
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Resolving previous operational design gaps through robust cryptographic compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
          
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800/80 space-y-3">
            <div className="flex items-center gap-1.5 text-[#ec4899] font-bold font-mono">
              <FolderLock className="w-4 h-4" /> 1. Data Governance Layer
            </div>
            <p className="text-[10.5px] text-slate-400 leading-relaxed">
              Establishes explicit, audited read/write structures using localized Zero-Knowledge key agreements. Individual identity stays encrypted at the local edge node.
            </p>
            <div className="bg-slate-950 p-2 rounded text-[9.5px] font-mono text-pink-400/80 uppercase">
              ZK AUDIT KEY: ACTIVE
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800/80 space-y-3">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold font-mono">
              <ShieldAlert className="w-4 h-4" /> 2. Constitutional AI
            </div>
            <p className="text-[10.5px] text-slate-400 leading-relaxed">
              AI Guard establishes absolute legal boundaries preventing models from altering rights, amending fundamental decrees, or launching actions without sovereign human authentication.
            </p>
            <div className="bg-slate-950 p-2 rounded text-[9.5px] font-mono text-cyan-400 uppercase">
              REPUTATION CHECK: ENABLED
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800/80 space-y-3">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono">
              <Eye className="w-4 h-4" /> 3. Open Audit Layer
            </div>
            <p className="text-[10.5px] text-slate-400 leading-relaxed">
              Public decentralized dashboard plotting treasury payments, resource outflows, and program execution transparently. Budget movements are verifiable via cryptographic hashes.
            </p>
            <div className="bg-slate-950 p-2 rounded text-[9.5px] font-mono text-emerald-400 uppercase">
              M2 DISPATCHES HASHED
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800/80 space-y-3">
            <div className="flex items-center gap-1.5 text-indigo-400 font-bold font-mono">
              <Layers className="w-4 h-4 animate-pulse" /> 4. Digital Twin Layer
            </div>
            <p className="text-[10.5px] text-slate-400 leading-relaxed">
              ARGI virtual sandbox models replicate every single water valve, local sub-station, and enterprise activity inside standard physical limits before policy updates.
            </p>
            <div className="bg-slate-950 p-2 rounded text-[9.5px] font-mono text-indigo-400 uppercase">
              EMERGENCE SIMULATOR: LIVE
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800/80 space-y-3">
            <div className="flex items-center gap-1.5 text-[#eab308] font-bold font-mono">
              <Zap className="w-4 h-4" /> 5. Resilience Layer
            </div>
            <p className="text-[10.5px] text-slate-400 leading-relaxed">
              Protects against extreme solar flares, systemic kinetic blackouts, electromagnetic cyber strikes, and localized network partitions through secure high-redundancy backup nodes.
            </p>
            <div className="bg-slate-950 p-2 rounded text-[9.5px] font-mono text-amber-400 uppercase">
              FALLS_GRID_ONLINE: YES
            </div>
          </div>

        </div>
      </div>

      {/* 4. THE FINAL ARCHITECTURE PIPELINE CHART (As requested by user prompt) */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col items-center text-center space-y-4 relative overflow-hidden" id="sandbox-final-pipeline">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-cyan-500/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-2xl font-mono">
          <span className="text-[9.5px] text-pink-500 tracking-widest font-extrabold uppercase block">
            THE FINAL INTEGRATED STATE PIPELINE FLOW
          </span>
          <h3 className="text-sm font-bold text-slate-100 mt-1 uppercase">
            End-to-End Systemic Authority Cascade
          </h3>
          <p className="text-[11px] text-slate-400 mt-2 font-sans leading-relaxed">
            The comprehensive visual structure of the automatic state. Direct policies are derived from humanity and constrained by mathematically immutable rules.
          </p>
        </div>

        {/* Scalable and beautiful responsive pipeline diagram */}
        <div className="w-full bg-slate-950 border border-slate-850 p-4 rounded-2xl overflow-x-auto select-none scrollbar-thin">
          <div className="flex items-center justify-between min-w-[1020px] px-4 font-mono text-[10px]">
            
            <div className="bg-red-950/40 border border-red-500/60 text-red-200 px-3 py-1.5 rounded-lg text-center shadow-md">
              <span className="font-extrabold block">Human Civ</span>
              <span className="text-[8px] text-slate-400">L0 Center</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />

            <div className="bg-pink-950/40 border border-pink-500/60 text-pink-200 px-3 py-1.5 rounded-lg text-center shadow-md">
              <span className="font-extrabold block">Constitution</span>
              <span className="text-[8px] text-slate-400">Legal Bounds</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />

            <div className="bg-cyan-950/40 border border-cyan-500/60 text-cyan-200 px-3 py-1.5 rounded-lg text-center shadow-md">
              <span className="font-extrabold block">Governance</span>
              <span className="text-[8px] text-slate-400">Cabinet Loop</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />

            <div className="bg-purple-950/40 border border-purple-500/60 text-purple-200 px-3 py-1.5 rounded-lg text-center shadow-md">
              <span className="font-extrabold block">ARGI Core</span>
              <span className="text-[8px] text-slate-400">Simulation Engine</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />

            <div className="bg-pink-950/40 border border-[#f472b6]/60 text-pink-200 px-3 py-1.5 rounded-lg text-center shadow-md">
              <span className="font-extrabold block">NeuroOS</span>
              <span className="text-[8px] text-slate-400">Orchestration</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />

            <div className="bg-yellow-950/40 border border-yellow-500/60 text-yellow-205 px-3 py-1.5 rounded-lg text-center shadow-md">
              <span className="font-extrabold block">Tech Money</span>
              <span className="text-[8px] text-slate-400">Value Dialects</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />

            <div className="bg-blue-950/40 border border-blue-500/60 text-blue-200 px-3 py-1.5 rounded-lg text-center shadow-md">
              <span className="font-extrabold block">Identity</span>
              <span className="text-[8px] text-slate-400">Secure IID</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />

            <div className="bg-teal-950/40 border border-teal-500/60 text-teal-200 px-3 py-1.5 rounded-lg text-center shadow-md">
              <span className="font-extrabold block">Edge Compute</span>
              <span className="text-[8px] text-slate-400">Prov Nodes</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />

            <div className="bg-rose-950/40 border border-rose-500/60 text-rose-200 px-3 py-1.5 rounded-lg text-center shadow-md">
              <span className="font-extrabold block">Super App</span>
              <span className="text-[8px] text-slate-400">Citizen UI</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />

            <div className="bg-emerald-950/40 border border-emerald-500/60 text-emerald-200 px-3 py-1.5 rounded-lg text-center shadow-md">
              <span className="font-extrabold block">Experience</span>
              <span className="text-[8px] text-slate-400">Sovereign Life</span>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
