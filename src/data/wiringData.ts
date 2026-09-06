import type { CablePath } from '../types';

export const cableRoutes: CablePath[] = [
  // --- Power Delivery Cables (From PSU) ---
  {
    id: 'cable_atx24',
    category: 'power',
    name: '24-Pin ATX Main Power Harness',
    partId: 'motherboard',
    fromName: 'Power Supply Unit (PSU)',
    toName: 'Motherboard 24-Pin Socket',
    voltage: '+12V, +5V, +3.3V, +5VSB, Ground',
    pinCount: '24 pins (dual row 2x12)',
    color: '#facc15',
    svgPath: 'M 340,388 C 450,388 605,330 605,220 C 605,170 595,160 575,160',
    keyingRule: 'Alternating square and beveled (rounded) pins make it physically impossible to plug in upside-down or reversed.',
    gotcha: 'Requires significant downward force until the side plastic snap clip latches over the retaining tooth on the motherboard header.'
  },
  {
    id: 'cable_eps8',
    category: 'power',
    name: '8-Pin (4+4) EPS CPU Power Cable',
    partId: 'cpu',
    fromName: 'Power Supply Unit (PSU)',
    toName: 'CPU VRM Power Header (Top-Left)',
    voltage: '+12V DC High Amperage',
    pinCount: '8 pins (splits into 4+4)',
    color: '#f97316',
    svgPath: 'M 340,404 C 200,404 75,410 75,320 L 75,115 C 75,90 120,90 162,90',
    keyingRule: 'Splits into two 4-pin blocks. Has distinctive rounded and square pin arrangements. Look for the label "CPU" on the connector housing.',
    gotcha: 'CRITICAL: Do NOT plug an 8-pin PCIe cable into this socket! Even though both have 8 pins, their voltages and grounds are inverted!'
  },
  {
    id: 'cable_pcie8',
    category: 'power',
    name: '8-Pin (6+2) PCIe Graphics Card Power',
    partId: 'gpu',
    fromName: 'Power Supply Unit (PSU)',
    toName: 'GPU Power Sockets (Top Edge of GPU)',
    voltage: '+12V DC High Power (Up to 150W per 8-pin)',
    pinCount: '8 pins (splits into 6+2)',
    color: '#a855f7',
    svgPath: 'M 340,419 C 420,419 487,310 487,181',
    keyingRule: 'Splits into 6-pin and 2-pin clips so it can fit older 6-pin GPUs as well. Look for the stamped "PCIe" marking.',
    gotcha: 'Avoid daisy-chaining (pigtail) cables for high-wattage GPUs (over 220W). Run separate cables directly from the PSU to each socket.'
  },
  {
    id: 'cable_12vhpwr',
    category: 'power',
    name: '12VHPWR / PCIe 5.0 (16-Pin) GPU Cable',
    partId: 'gpu',
    fromName: 'ATX 3.0 Power Supply',
    toName: 'RTX 40/50 Series GPU Socket',
    voltage: '+12V (Up to 600W) + 4 Micro Sense Pins',
    pinCount: '16 pins (12 power + 4 sideband logic)',
    color: '#c084fc',
    svgPath: 'M 340,419 C 400,419 465,330 487,240 L 487,181',
    keyingRule: 'Ultra-dense micro connector with 4 tiny top sense pins that communicate power limits to the GPU firmware.',
    gotcha: 'FATAL MELTING RISK: Must be pushed 100% flush with ZERO visible gap between plug and socket! Do not bend within 35mm of connector.'
  },
  {
    id: 'cable_sata_pwr',
    category: 'power',
    name: '15-Pin SATA SSD / HDD Power Cable',
    partId: 'ssd',
    fromName: 'Power Supply Unit (PSU)',
    toName: '2.5" SATA SSD / 3.5" HDD (15-Pin Socket)',
    voltage: '+12V, +5V, +3.3V DC',
    pinCount: '15 flat blade pins',
    color: '#f59e0b',
    svgPath: 'M 340,433 C 365,433 385,410 410,410',
    keyingRule: 'Features an elongated L-shaped notch. The power connector is significantly wider than the SATA data connector.',
    gotcha: 'Beware of cheap molded 4-pin Molex to SATA power adapters ("Molex to SATA, lose all your data" due to fire hazard). Always prefer native PSU SATA cables.'
  },

  // --- Data & Signal Cables (To Motherboard) ---
  {
    id: 'cable_sata_data',
    category: 'data',
    name: '7-Pin SATA 6Gbps Data Cable',
    partId: 'ssd',
    fromName: 'Motherboard SATA 6Gbps Header',
    toName: '2.5" SATA SSD / 3.5" HDD (7-Pin Socket)',
    voltage: '500mV Differential Signal (Zero DC Power)',
    pinCount: '7 pins (compact L-shape with metal latch)',
    color: '#06b6d4',
    svgPath: 'M 560,252 C 510,252 406,330 406,393',
    keyingRule: 'Compact L-shaped notch prevents inverted insertion. Quality cables include a metal spring-locking latch that clicks into place.',
    gotcha: 'This cable carries pure data only—it supplies ZERO electrical power to the drive! You must ALSO plug in the 15-pin SATA power cable from the PSU.'
  },
  {
    id: 'cable_front_panel',
    category: 'data',
    name: 'Front Panel Switch & LED Wiring Bundle',
    partId: 'case_fans',
    fromName: 'Chassis Front Button & LED Array',
    toName: 'Motherboard JFP1 Header (Bottom-Right)',
    voltage: '3.3V Logic / Ground Pulsing',
    pinCount: '9-pin array (single and dual pin leads)',
    color: '#38bdf8',
    svgPath: 'M 620,90 C 610,180 595,270 575,305 C 568,313 558,317 550,317',
    keyingRule: 'Individual tiny 2-pin female plugs labeled POWER SW, RESET SW, HDD LED, POWER LED.',
    gotcha: 'Polarity matters for LEDs (+ pin must connect to + header pin, - to -). Polarity does NOT matter for momentary switches (POWER SW / RESET).'
  },
  {
    id: 'cable_usb3',
    category: 'data',
    name: 'Internal USB 3.0 (19-Pin) Header Cable',
    partId: 'case_fans',
    fromName: 'Chassis Front USB 3.0 Type-A Ports',
    toName: 'Motherboard USB 3.0 19-Pin Header',
    voltage: '5Gbps Differential Signaling + 5V Bus VBUS',
    pinCount: '19 pins (20-1 keyed block)',
    color: '#10b981',
    svgPath: 'M 620,130 C 610,200 590,260 560,290',
    keyingRule: 'Exterior side notch tab aligns with the shroud opening; one pin location is blocked to prevent 180-degree reversed insertion.',
    gotcha: 'PINS BEND EXTREMELY EASILY: The 19 internal pins are notoriously fragile. Align the center key notch perfectly before applying any insertion pressure!'
  },
  {
    id: 'cable_hd_audio',
    category: 'data',
    name: 'HD Audio Front Panel (10-1 Pin) Cable',
    partId: 'case_fans',
    fromName: 'Chassis Front 3.5mm Headphone & Mic Jacks',
    toName: 'Motherboard AAFP Audio Header (Bottom-Left)',
    voltage: 'Analog Line Audio / Jack Detection Logic',
    pinCount: '9 active pins (10-1 keyed pin 8 blocked)',
    color: '#ec4899',
    svgPath: 'M 620,150 C 610,360 250,350 160,325',
    keyingRule: 'Pin 8 is dummy/blocked inside the female plug, matching the missing pin on the motherboard AAFP header.',
    gotcha: 'Do not confuse with legacy AC97 audio cables or USB 2.0 9-pin headers (which have pin 9 blocked instead of pin 8).'
  },
  {
    id: 'cable_wifi_antenna',
    category: 'data',
    name: 'Wi-Fi 6E/7 & Bluetooth High-Gain Antenna (RP-SMA Coaxial)',
    partId: 'motherboard',
    fromName: 'Motherboard Wi-Fi/BT M.2 Module (via Rear RP-SMA)',
    toName: 'Magnetic Desktop Base / High-Gain Antenna Array',
    voltage: '2.4GHz / 5GHz / 6GHz RF Radio Waves (Zero DC Power)',
    pinCount: 'Dual RP-SMA Threaded Coaxial (Center Pin & Collar)',
    color: '#0ea5e9',
    svgPath: 'M 148,139 L 120,139 C 95,139 75,100 75,64',
    keyingRule: 'Reverse-Polarity SMA (RP-SMA): Threaded collar with center receptacle on motherboard and center pin on antenna cable. Hand-tighten clockwise.',
    gotcha: 'CRITICAL BEGINNER TRAP: Both Wi-Fi AND Bluetooth share this external antenna! Without it, your metal PC case forms a Faraday cage that blocks wireless signals—Bluetooth headphones will stutter within 1 meter and Wi-Fi will drop to 1 bar.'
  }
];

export interface FrontPanelPin {
  pinNumber: number;
  label: string;
  name: string;
  type: 'switch' | 'led' | 'empty' | 'ground';
  polarity?: '+' | '-';
  row: 'top' | 'bottom';
  description: string;
}

export const frontPanelPins: FrontPanelPin[] = [
  { pinNumber: 1, label: '+', name: 'HDLED+', type: 'led', polarity: '+', row: 'top', description: 'Hard Drive Activity LED Positive' },
  { pinNumber: 3, label: '-', name: 'HDLED-', type: 'led', polarity: '-', row: 'top', description: 'Hard Drive Activity LED Negative' },
  { pinNumber: 5, label: '-', name: 'GND', type: 'switch', row: 'top', description: 'Reset Switch Ground' },
  { pinNumber: 7, label: '+', name: 'RESET', type: 'switch', row: 'top', description: 'Reset Switch Signal' },
  { pinNumber: 9, label: 'x', name: 'NC', type: 'empty', row: 'top', description: 'No Pin / Key notch' },

  { pinNumber: 2, label: '+', name: 'PLED+', type: 'led', polarity: '+', row: 'bottom', description: 'Power Indicator LED Positive' },
  { pinNumber: 4, label: '-', name: 'PLED-', type: 'led', polarity: '-', row: 'bottom', description: 'Power Indicator LED Negative' },
  { pinNumber: 6, label: '+', name: 'PWR_SW', type: 'switch', row: 'bottom', description: 'Power Button Signal (Ignites the PC!)' },
  { pinNumber: 8, label: '-', name: 'GND', type: 'switch', row: 'bottom', description: 'Power Button Ground' },
  { pinNumber: 10, label: 'x', name: 'DUMMY', type: 'empty', row: 'bottom', description: 'Key / Unused Pin' }
];
