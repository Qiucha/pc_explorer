export const en = {
  appTitle: 'PC Explorer',
  appSubtitle: 'Interactive Hardware Architecture & Blueprint',
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
    allLayers: 'All Components',
    powerLayer: '⚡ Power Delivery',
    dataLayer: '🔗 High-Speed PCIe & Memory',
    coolingLayer: '❄️ Cooling & Clearances',
    ioLayer: '🔌 I/O & Front Panel',
    xrayToggle: 'Ghost Component Armor',
    legend: 'Click any glowing socket or board element to inspect shape, fit, and mental model.'
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
    gotchasNotice: 'Critical Beginner Mistakes to Avoid'
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
    frontPanelHint: 'Hover over individual pins to decode power switches and LED polarities.'
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
    solutionLabel: 'Remediation Fix'
  }
};
