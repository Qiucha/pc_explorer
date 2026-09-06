import type { PartId, MetaphorType, ComponentCategory } from '../types';

export interface PartTextContent {
  name: string;
  subtitle: string;
  shapeDescription: string;
  physicalLandmarks: string[];
  dimensionsStandard: string;
  motherboardPosition: string;
  socketType: string;
  analogies: Record<
    MetaphorType,
    {
      title: string;
      role: string;
      story: string;
      dataMovement: string;
    }
  >;
  connections: Array<{
    target: string;
    interfaceType: string;
    cableOrSlot: string;
    tactileFeedback: string;
    note: string;
  }>;
  gotchas: Array<{
    title: string;
    explanation: string;
    severity: 'critical' | 'warning' | 'tip';
  }>;
}

export interface AssemblyStepTextContent {
  step: number;
  partId: PartId;
  title: string;
  instruction: string;
  checklist: string[];
  audioFeedback: string;
  commonMistake: {
    title: string;
    consequence: string;
  };
}

export interface DiagnosticCaseTextContent {
  id: string;
  symptom: string;
  cause: string;
  solution: string;
  component: string;
  severity: 'fatal' | 'performance' | 'no-boot';
}

export interface CableTextContent {
  id: string;
  name: string;
  fromName: string;
  toName: string;
  voltage: string;
  pinCount: string;
  keyingRule: string;
  gotcha: string;
}

export interface FrontPanelPinTextContent {
  pinNumber: number;
  label: string;
  name: string;
  type: 'switch' | 'led' | 'empty' | 'ground';
  polarity?: '+' | '-';
  row: 'top' | 'bottom';
  description: string;
}

export interface SocketZoneTextContent {
  id: string;
  name: string;
  label: string;
  sublabel: string;
}

export interface UITextContent {
  appTitle: string;
  appSubtitle: string;
  footerTitle: string;
  footerSubtitle: string;
  categories: Record<ComponentCategory, string>;
  modes: {
    anatomy: string;
    wiring: string;
    assembly: string;
  };
  metaphors: {
    label: string;
    kitchen: string;
    office: string;
    factory: string;
  };
  boardControls: {
    zoomIn: string;
    zoomOut: string;
    reset: string;
    layers: string;
    allLayers: string;
    powerLayer: string;
    dataLayer: string;
    coolingLayer: string;
    ioLayer: string;
    xrayArmored: string;
    xrayBare: string;
    xrayTitle: string;
    legend: string;
    hoverPrompt: string;
    hoverPrefix: string;
    specsBadge: string;
  };
  inspector: {
    selectedPart: string;
    clickPrompt: string;
    tabs: {
      anatomy: string;
      analogy: string;
      connections: string;
      gotchas: string;
    };
    landmarksTitle: string;
    dimensionsTitle: string;
    motherboardLocationTitle: string;
    socketSpecTitle: string;
    howItConnectsTitle: string;
    tactileFeedback: string;
    gotchasNotice: string;
    physicalAnatomyTitle: string;
    roleLabel: string;
    dataFlowTitle: string;
    mechanismLabel: string;
    tactileLabel: string;
    noteLabel: string;
  };
  wiring: {
    title: string;
    subtitle: string;
    selectCable: string;
    from: string;
    to: string;
    voltage: string;
    pinCount: string;
    keyingMechanism: string;
    frontPanelGuide: string;
    frontPanelHint: string;
    harnessProfile: string;
    criticalTrap: string;
    modularWarningTitle: string;
    modularWarningDesc: string;
  };
  assembly: {
    title: string;
    subtitle: string;
    stepOf: string;
    installButton: string;
    installedSuccess: string;
    nextStep: string;
    previousStep: string;
    resetBuild: string;
    checklistHeader: string;
    dangerMistake: string;
    completedTitle: string;
    completedMessage: string;
    diagnosticsTitle: string;
    diagnosticsSubtitle: string;
    symptomLabel: string;
    causeLabel: string;
    solutionLabel: string;
    audioCueLabel: string;
    seatingInProgress: string;
  };
}
