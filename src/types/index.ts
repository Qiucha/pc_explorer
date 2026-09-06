export type PartId =
  | 'cpu'
  | 'cooler'
  | 'ram'
  | 'ssd'
  | 'gpu'
  | 'motherboard'
  | 'psu'
  | 'case_fans';

export type MetaphorType = 'kitchen' | 'office' | 'factory';

export type AppMode = 'anatomy' | 'wiring' | 'assembly';

export type Language = 'en' | 'zh';

export type ComponentCategory =
  | 'processing'
  | 'cooling'
  | 'memory'
  | 'storage'
  | 'expansion'
  | 'backbone'
  | 'power'
  | 'airflow';

export interface GotchaItem {
  title: string;
  explanation: string;
  severity: 'critical' | 'warning' | 'tip';
}

export interface ConnectionSpec {
  target: string;
  interfaceType: string;
  cableOrSlot: string;
  tactileFeedback: string;
  note: string;
}

export interface AnalogyDetails {
  title: string;
  role: string;
  story: string;
  dataMovement: string;
  icon: string;
}

export interface ComponentPart {
  id: PartId;
  name: string;
  subtitle: string;
  category: ComponentCategory;
  color: string;
  iconName: string;
  shapeDescription: string;
  physicalLandmarks: string[];
  dimensionsStandard: string;
  motherboardPosition: string;
  socketType: string;
  analogies: Record<MetaphorType, AnalogyDetails>;
  connections: ConnectionSpec[];
  gotchas: GotchaItem[];
}

export interface SocketZone {
  id: string;
  partId: PartId;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  layer: 'processing' | 'memory' | 'storage' | 'expansion' | 'power' | 'cooling' | 'io';
  label: string;
  sublabel: string;
  recommendedSlot?: boolean;
}

export interface CablePath {
  id: string;
  name: string;
  partId: PartId;
  fromName: string;
  toName: string;
  voltage: string;
  pinCount: string;
  color: string;
  svgPath: string;
  keyingRule: string;
  gotcha: string;
}

export interface AssemblyStep {
  step: number;
  partId: PartId;
  title: string;
  instruction: string;
  checklist: string[];
  correctZoneId: string;
  audioFeedback: string;
  commonMistake: {
    title: string;
    consequence: string;
  };
}
