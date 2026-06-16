export interface CivilizationState {
  dividend: number; // Rp per person per month/year (baseline Rp 2 Billion)
  apathy: number; // 0 - 100
  corruption: number; // 0 - 100
  stateIntegrity: number; // 0 - 100
  energySupplyRate: number; // 0 - 100
  aiAutonomy: number; // 0 - 100
  humanVetoPower: number; // 0 - 100 % power
  cyberResilience: number; // 0 - 100
  geopoliticalTension: number; // 0 - 100
  activeMinisters: number; // usually 2 or 3 representing the "ministers"
  population: number; // millions
  year: number; // 2026 - 2226
  stabilityIndex: number; // 0 - 100
  gdpGrowth: number; // %
  currencyStability: number; // 0 - 100
  trustIndex: number; // 0 - 100
  culturalCohesion: number; // 0 - 100
  securityIndex: number; // 0 - 100
  legitimacyDecay: number; // 0 - 100
  successionRisk: number; // 0 - 100
  inflationRate: number; // %
}

export interface CoreConcept {
  id: number;
  name: string;
  description: string;
  status: 'operational' | 'at-risk' | 'compromised';
  vulnerability: string;
  mitigation: string;
}

export interface AttackVector {
  id: string;
  name: string;
  category: 'Constitutional' | 'EliteCapture' | 'Economic' | 'AIGovernance' | 'Cybersecurity' | 'Geopolitical';
  adversary: string; // e.g. "Hostile Intelligence Service", "Oligarch Guild"
  probability: number; // 0 - 100
  impact: number; // 0 - 100
  isMitigated: boolean;
  attackTree: string[];
  vulnerability: string;
  solution: string;
  description: string;
}

export interface SimulationResult {
  year: number;
  stabilityIndex: number;
  gdpGrowth: number;
  currencyStability: number;
  trustIndex: number;
  population: number;
  inflationRate: number;
  cyberResilience: number;
  activeMinisters: number;
}
