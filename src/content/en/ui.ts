import type { UITextContent } from '../types';

export const enUI: UITextContent = {
  appTitle: 'PC Explorer',
  appSubtitle: 'Interactive Hardware Architecture & Blueprint',
  footerTitle: 'PC Explorer • Interactive Hardware Architecture & Blueprint',
  footerSubtitle: 'Engineered with React 19 • High-Precision 2.5D SVG Canvas • Zero 3D Bloat',
  categories: {
    processing: 'Processing',
    cooling: 'Cooling & Thermal',
    memory: 'Fast Memory',
    storage: 'Storage Drive',
    expansion: 'Graphics / Expansion',
    backbone: 'Motherboard Backbone',
    power: 'Power Delivery',
    airflow: 'Chassis & Airflow'
  },
  modes: {
    anatomy: '1. Anatomy Explorer',
    wiring: '2. Wiring & Pinout Lab',
    assembly: '3. 7-Step Build Simulator'
  },
  metaphors: {
    label: 'Analogy Model',
    kitchen: '🍳 Kitchen',
    office: '📋 Whiteboard Office',
    factory: '🏭 Factory'
  },
  boardControls: {
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    reset: 'Reset View',
    layers: 'Filter Circuit Layers',
    allLayers: 'All',
    powerLayer: '⚡ Power',
    dataLayer: '🔗 Data/PCIe',
    coolingLayer: '❄️ Cooling',
    ioLayer: '🔌 I/O',
    xrayArmored: 'Armored (X-Ray On)',
    xrayBare: 'Bare PCB',
    xrayTitle: 'Toggle between bare motherboard and fully populated components',
    legend: 'Click any glowing socket or board element to inspect shape, fit, and mental model.',
    hoverPrompt: 'Click any socket, RAM channel, PCIe slot, or power header to inspect.',
    hoverPrefix: 'Hovering:',
    specsBadge: 'Standard ATX 305x244mm • PCIe 5.0 Ready'
  },
  inspector: {
    selectedPart: 'Selected Component',
    clickPrompt: 'Select a part or socket to inspect',
    tabs: {
      anatomy: 'Shape & Fit',
      analogy: 'Mental Model',
      connections: 'Connections',
      gotchas: 'Traps & Gotchas'
    },
    landmarksTitle: 'Key Physical Landmarks & Alignment Cues',
    dimensionsTitle: 'Standard Form Factor & Dimensions',
    motherboardLocationTitle: 'Motherboard Placement',
    socketSpecTitle: 'Socket / Interface Standard',
    howItConnectsTitle: 'Physical Interface & Insertion Dynamics',
    tactileFeedback: 'Tactile / Auditory Feedback',
    gotchasNotice: 'Critical Beginner Mistakes to Avoid',
    physicalAnatomyTitle: 'Physical Anatomy',
    roleLabel: 'Role:',
    dataFlowTitle: 'Data & Functional Flow',
    mechanismLabel: 'Mechanism:',
    tactileLabel: 'Tactile:',
    noteLabel: 'Note:'
  },
  wiring: {
    title: 'Interactive Wiring & Signal Flow Lab',
    subtitle: 'Trace regulated DC power rails, high-speed PCIe lanes, and front panel headers.',
    selectCable: 'Select Cable Harness',
    from: 'Source',
    to: 'Destination',
    voltage: 'Voltage Rails',
    pinCount: 'Pins & Form Factor',
    keyingMechanism: 'Keying Mechanism (Why you cannot plug it backwards)',
    frontPanelGuide: 'Front Panel (JFP1) 9-Pin Demystifier',
    frontPanelHint: 'Hover over individual pins to decode power switches and LED polarities.',
    harnessProfile: 'HARNESS PROFILE',
    criticalTrap: 'Critical Wiring Trap',
    modularWarningTitle: 'Never Mix Modular PSU Cables!',
    modularWarningDesc: 'PSU-side socket shapes are NOT standardized. Corsair cables on an EVGA or Seasonic PSU will invert 12V and ground, destroying motherboards and SSDs within milliseconds.'
  },
  assembly: {
    title: 'Gamified 7-Step PC Assembly Challenge',
    subtitle: 'Complete the assembly sequence from bare motherboard to first boot.',
    stepOf: 'Step {current} of {total}',
    installButton: 'Seat Component into Socket',
    installedSuccess: 'Installed & Latched!',
    nextStep: 'Next Step',
    previousStep: 'Previous Step',
    resetBuild: 'Restart Build',
    checklistHeader: 'Pre-Flight Verification Checklist',
    dangerMistake: 'Common Disaster Mistake',
    completedTitle: 'SYSTEM ASSEMBLED SUCCESSFULLY!',
    completedMessage: 'All components seated with correct torque, notch alignments, and power rails.',
    diagnosticsTitle: 'Virtual Hardware Diagnostic Lab',
    diagnosticsSubtitle: 'Test your troubleshooting knowledge with common real-world PC build errors.',
    symptomLabel: 'Symptom',
    causeLabel: 'Root Cause',
    solutionLabel: 'Remediation Fix',
    audioCueLabel: 'Audio Cue:',
    seatingInProgress: 'Seating & Latching...'
  }
};
