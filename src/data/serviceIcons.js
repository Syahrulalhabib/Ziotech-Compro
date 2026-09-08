import {
  Wrench,
  Building2,
  Activity,
  Cpu,
  Zap,
  Flame,
  ShieldCheck,
  Cog,
  HardHat,
  Factory,
  Truck,
  Droplet,
  Fan,
  Layers,
  Sparkles
} from 'lucide-react';

export const SERVICE_ICONS = [
  { id: 'Wrench', name: 'Wrench (Mekanikal/Tools)', icon: Wrench },
  { id: 'Activity', name: 'Activity (Pertambangan/Operasi)', icon: Activity },
  { id: 'Building2', name: 'Building (Konstruksi/Gedung)', icon: Building2 },
  { id: 'Cpu', name: 'Cpu (Digital/Teknologi)', icon: Cpu },
  { id: 'Zap', name: 'Zap (Elektrikal/Listrik)', icon: Zap },
  { id: 'Flame', name: 'Flame (Proteksi Kebakaran)', icon: Flame },
  { id: 'Droplet', name: 'Droplet (Plumbing/Air)', icon: Droplet },
  { id: 'Fan', name: 'Fan (HVAC/Ventilasi)', icon: Fan },
  { id: 'ShieldCheck', name: 'Shield (K3/Keamanan)', icon: ShieldCheck },
  { id: 'Cog', name: 'Cog (Mesin/Equipment)', icon: Cog },
  { id: 'HardHat', name: 'Hard Hat (Safety/Lapangan)', icon: HardHat },
  { id: 'Factory', name: 'Factory (Manufaktur/Industri)', icon: Factory },
  { id: 'Truck', name: 'Truck (Logistik/Alat Berat)', icon: Truck },
  { id: 'Layers', name: 'Layers (Struktur/Material)', icon: Layers },
  { id: 'Sparkles', name: 'Sparkles (Inovasi)', icon: Sparkles }
];

export const SERVICE_ICON_MAP = {
  FiTool: Wrench,
  Wrench: Wrench,
  FiSettings: Wrench,
  FiCheckSquare: Building2,
  Building2: Building2,
  FiTruck: Activity,
  Activity: Activity,
  FiTarget: Activity,
  FiCpu: Cpu,
  Cpu: Cpu,
  Zap: Zap,
  Flame: Flame,
  Droplet: Droplet,
  Fan: Fan,
  ShieldCheck: ShieldCheck,
  Cog: Cog,
  HardHat: HardHat,
  Factory: Factory,
  Truck: Truck,
  Layers: Layers,
  Sparkles: Sparkles
};

export const getServiceIcon = (iconKey, fallbackIdx = 0) => {
  if (iconKey && SERVICE_ICON_MAP[iconKey]) {
    return SERVICE_ICON_MAP[iconKey];
  }
  const defaultList = [Wrench, Building2, Activity, Cpu];
  return defaultList[fallbackIdx % defaultList.length];
};
