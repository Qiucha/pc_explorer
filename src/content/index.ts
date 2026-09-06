import type {
  PartId,
  Language,
  ComponentPart,
  SocketZone,
  CablePath,
  MotherboardDataFlow,
  AssemblyStep,
  FrontPanelPin,
  DiagnosticCase,
  ComponentCategory,
  MetaphorType
} from '../types';
import type { UITextContent } from './types';

import { enParts } from './en/parts';
import { zhParts } from './zh/parts';
import { enAssemblySteps, enDiagnosticCases } from './en/assembly';
import { zhAssemblySteps, zhDiagnosticCases } from './zh/assembly';
import { enCables, enFrontPanelPins } from './en/wiring';
import { zhCables, zhFrontPanelPins } from './zh/wiring';
import { enBoardFlows } from './en/boardFlows';
import { zhBoardFlows } from './zh/boardFlows';
import { enBoardZones } from './en/board';
import { zhBoardZones } from './zh/board';
import { enUI } from './en/ui';
import { zhUI } from './zh/ui';

// Structural metadata for hardware parts (colors, categories, icons)
const partMetadata: Record<
  PartId,
  { id: PartId; category: ComponentCategory; color: string; iconName: string }
> = {
  cpu: { id: 'cpu', category: 'processing', color: '#f97316', iconName: 'Cpu' },
  cooler: { id: 'cooler', category: 'cooling', color: '#38bdf8', iconName: 'Fan' },
  ram: { id: 'ram', category: 'memory', color: '#10b981', iconName: 'Layers' },
  ssd: { id: 'ssd', category: 'storage', color: '#eab308', iconName: 'HardDrive' },
  gpu: { id: 'gpu', category: 'expansion', color: '#a855f7', iconName: 'Tv' },
  motherboard: { id: 'motherboard', category: 'backbone', color: '#06b6d4', iconName: 'Server' },
  psu: { id: 'psu', category: 'power', color: '#facc15', iconName: 'Zap' },
  case_fans: { id: 'case_fans', category: 'airflow', color: '#0ea5e9', iconName: 'Airplay' }
};

// Structural metadata for motherboard canvas zones (SVG coordinates & sizes)
const baseMotherboardZones: Array<{
  id: string;
  partId: PartId;
  x: number;
  y: number;
  width: number;
  height: number;
  layer: SocketZone['layer'];
  recommendedSlot?: boolean;
}> = [
  { id: 'socket_cpu', partId: 'cpu', x: 230, y: 150, width: 150, height: 160, layer: 'processing' },
  { id: 'vrm_heatsinks', partId: 'motherboard', x: 130, y: 110, width: 80, height: 210, layer: 'power' },
  { id: 'vrm_top', partId: 'motherboard', x: 210, y: 80, width: 190, height: 55, layer: 'power' },
  { id: 'eps_cpu_power', partId: 'psu', x: 130, y: 40, width: 70, height: 45, layer: 'power' },
  { id: 'ram_slot_1', partId: 'ram', x: 430, y: 120, width: 22, height: 220, layer: 'memory', recommendedSlot: false },
  { id: 'ram_slot_2', partId: 'ram', x: 465, y: 120, width: 22, height: 220, layer: 'memory', recommendedSlot: true },
  { id: 'ram_slot_3', partId: 'ram', x: 500, y: 120, width: 22, height: 220, layer: 'memory', recommendedSlot: false },
  { id: 'ram_slot_4', partId: 'ram', x: 535, y: 120, width: 22, height: 220, layer: 'memory', recommendedSlot: true },
  { id: 'cpu_fan_header', partId: 'cooler', x: 390, y: 70, width: 50, height: 35, layer: 'cooling' },
  { id: 'm2_slot_1', partId: 'ssd', x: 210, y: 345, width: 190, height: 52, layer: 'storage', recommendedSlot: true },
  { id: 'pcie_x16_1', partId: 'gpu', x: 170, y: 430, width: 320, height: 48, layer: 'expansion', recommendedSlot: true },
  { id: 'm2_slot_2', partId: 'ssd', x: 210, y: 510, width: 190, height: 52, layer: 'storage' },
  { id: 'pcie_x16_2', partId: 'gpu', x: 170, y: 590, width: 320, height: 40, layer: 'expansion', recommendedSlot: false },
  { id: 'chipset_heatsink', partId: 'motherboard', x: 430, y: 530, width: 140, height: 140, layer: 'io' },
  { id: 'atx_24pin', partId: 'psu', x: 600, y: 220, width: 55, height: 160, layer: 'power' },
  { id: 'sata_ports', partId: 'ssd', x: 600, y: 470, width: 60, height: 100, layer: 'storage' },
  { id: 'front_panel_header', partId: 'case_fans', x: 540, y: 770, width: 110, height: 50, layer: 'io' },
  { id: 'rear_io_block', partId: 'motherboard', x: 50, y: 100, width: 60, height: 290, layer: 'io' },
  { id: 'audio_codec', partId: 'motherboard', x: 60, y: 640, width: 70, height: 120, layer: 'io' }
];

// Structural metadata for cable routes (SVG path coordinates & colors)
const baseCablePaths: Array<{
  id: string;
  category: 'power' | 'data';
  partId: PartId;
  color: string;
  svgPath: string;
}> = [
  // --- Power Delivery Cables (From PSU) ---
  { id: 'cable_atx24', category: 'power', partId: 'motherboard', color: '#facc15', svgPath: 'M 340,388 C 450,388 605,330 605,220 C 605,170 595,160 575,160' },
  { id: 'cable_eps8', category: 'power', partId: 'cpu', color: '#f97316', svgPath: 'M 340,404 C 200,404 75,410 75,320 L 75,115 C 75,90 120,90 162,90' },
  { id: 'cable_pcie8', category: 'power', partId: 'gpu', color: '#a855f7', svgPath: 'M 340,419 C 420,419 487,310 487,181' },
  { id: 'cable_12vhpwr', category: 'power', partId: 'gpu', color: '#c084fc', svgPath: 'M 340,419 C 400,419 465,330 487,240 L 487,181' },
  { id: 'cable_sata_pwr', category: 'power', partId: 'ssd', color: '#f59e0b', svgPath: 'M 340,433 C 365,433 385,410 406,410' },

  // --- Data & Signal Cables (To Motherboard) ---
  { id: 'cable_sata_data', category: 'data', partId: 'ssd', color: '#06b6d4', svgPath: 'M 560,252 C 510,252 406,330 406,393' },
  { id: 'cable_front_panel', category: 'data', partId: 'case_fans', color: '#38bdf8', svgPath: 'M 620,90 C 610,180 595,270 575,305 C 568,313 558,317 550,317' },
  { id: 'cable_usb3', category: 'data', partId: 'case_fans', color: '#10b981', svgPath: 'M 620,130 C 610,200 590,260 560,290' },
  { id: 'cable_hd_audio', category: 'data', partId: 'case_fans', color: '#ec4899', svgPath: 'M 620,150 C 610,360 250,350 160,325' },
  { id: 'cable_wifi_antenna', category: 'data', partId: 'motherboard', color: '#0ea5e9', svgPath: 'M 148,139 L 120,139 C 95,139 75,100 75,64' }
];

// Base step to socket mapping for assembly simulator
const stepZoneMapping: Record<number, string> = {
  1: 'socket_cpu',
  2: 'ram_slot_2',
  3: 'm2_slot_1',
  4: 'cpu_fan_header',
  5: 'vrm_heatsinks',
  6: 'pcie_x16_1',
  7: 'atx_24pin'
};

const analogyIcons: Record<PartId, Record<MetaphorType, string>> = {
  cpu: { kitchen: 'ChefHat', office: 'Search', factory: 'Activity' },
  cooler: { kitchen: 'Wind', office: 'ThermometerSnowflake', factory: 'ShieldAlert' },
  ram: { kitchen: 'Utensils', office: 'FileText', factory: 'RotateCw' },
  ssd: { kitchen: 'Archive', office: 'FolderLock', factory: 'Boxes' },
  gpu: { kitchen: 'Palette', office: 'Video', factory: 'Cpu' },
  motherboard: { kitchen: 'LayoutGrid', office: 'Building', factory: 'Network' },
  psu: { kitchen: 'Flame', office: 'Zap', factory: 'Power' },
  case_fans: { kitchen: 'DoorOpen', office: 'Building2', factory: 'Cpu' }
};

/**
 * Returns localized hardware parts dictionary.
 */
export function getPartsData(lang: Language): Record<PartId, ComponentPart> {
  const partsText = lang === 'zh' ? zhParts : enParts;
  const result = {} as Record<PartId, ComponentPart>;

  (Object.keys(partMetadata) as PartId[]).forEach(partId => {
    const meta = partMetadata[partId];
    const text = partsText[partId] || enParts[partId];
    const analogies = {
      kitchen: {
        ...text.analogies.kitchen,
        icon: analogyIcons[partId].kitchen
      },
      office: {
        ...text.analogies.office,
        icon: analogyIcons[partId].office
      },
      factory: {
        ...text.analogies.factory,
        icon: analogyIcons[partId].factory
      }
    };

    result[partId] = {
      ...meta,
      ...text,
      analogies
    };
  });

  return result;
}

/**
 * Returns localized motherboard hotspot zones.
 */
export function getMotherboardZones(lang: Language): SocketZone[] {
  const zonesText = lang === 'zh' ? zhBoardZones : enBoardZones;
  return baseMotherboardZones.map(base => {
    const text = zonesText[base.id] || enBoardZones[base.id] || {
      id: base.id,
      name: base.id,
      label: base.id,
      sublabel: ''
    };
    return {
      ...base,
      name: text.name,
      label: text.label,
      sublabel: text.sublabel
    };
  });
}

/**
 * Returns localized cable routes for the wiring lab.
 */
export function getCableRoutes(lang: Language): CablePath[] {
  const cablesText = lang === 'zh' ? zhCables : enCables;
  return baseCablePaths.map(base => {
    const text = cablesText[base.id] || enCables[base.id];
    return {
      ...base,
      name: text.name,
      fromName: text.fromName,
      toName: text.toName,
      voltage: text.voltage,
      pinCount: text.pinCount,
      keyingRule: text.keyingRule,
      gotcha: text.gotcha
    };
  });
}

/**
 * Returns localized motherboard internal data highways.
 */
export function getMotherboardFlows(lang: Language): MotherboardDataFlow[] {
  return lang === 'zh' ? zhBoardFlows : enBoardFlows;
}

/**
 * Returns localized front panel JFP1 pins.
 */
export function getFrontPanelPins(lang: Language): FrontPanelPin[] {
  return lang === 'zh' ? zhFrontPanelPins : enFrontPanelPins;
}

/**
 * Returns localized 7-step PC assembly guide.
 */
export function getAssemblySteps(lang: Language): AssemblyStep[] {
  const stepsText = lang === 'zh' ? zhAssemblySteps : enAssemblySteps;
  return stepsText.map(step => ({
    step: step.step,
    partId: step.partId,
    title: step.title,
    instruction: step.instruction,
    checklist: step.checklist,
    audioFeedback: step.audioFeedback,
    commonMistake: step.commonMistake,
    correctZoneId: stepZoneMapping[step.step] || ''
  }));
}

/**
 * Returns localized diagnostic troubleshooting scenarios.
 */
export function getDiagnosticCases(lang: Language): DiagnosticCase[] {
  return lang === 'zh' ? zhDiagnosticCases : enDiagnosticCases;
}

/**
 * Returns localized UI text strings.
 */
export function getUI(lang: Language): UITextContent {
  return lang === 'zh' ? zhUI : enUI;
}
