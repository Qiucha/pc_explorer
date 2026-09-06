import type { CableTextContent, FrontPanelPinTextContent } from "../types";

export const enCables: Record<string, CableTextContent> = {
  "cable_atx24": {
    "id": "cable_atx24",
    "name": "24-Pin ATX Main Power Harness",
    "fromName": "Power Supply Unit (PSU)",
    "toName": "Motherboard 24-Pin Socket",
    "voltage": "+12V, +5V, +3.3V, +5VSB, Ground",
    "pinCount": "24 pins (dual row 2x12)",
    "keyingRule": "Alternating square and beveled (rounded) pins make it physically impossible to plug in upside-down or reversed.",
    "gotcha": "Requires significant downward force until the side plastic snap clip latches over the retaining tooth on the motherboard header."
  },
  "cable_eps8": {
    "id": "cable_eps8",
    "name": "8-Pin (4+4) EPS CPU Power Cable",
    "fromName": "Power Supply Unit (PSU)",
    "toName": "CPU VRM Power Header (Top-Left)",
    "voltage": "+12V DC High Amperage",
    "pinCount": "8 pins (splits into 4+4)",
    "keyingRule": "Splits into two 4-pin blocks. Has distinctive rounded and square pin arrangements. Look for the label \"CPU\" on the connector housing.",
    "gotcha": "CRITICAL: Do NOT plug an 8-pin PCIe cable into this socket! Even though both have 8 pins, their voltages and grounds are inverted!"
  },
  "cable_pcie8": {
    "id": "cable_pcie8",
    "name": "8-Pin (6+2) PCIe Graphics Card Power",
    "fromName": "Power Supply Unit (PSU)",
    "toName": "GPU Power Sockets (Top Edge of GPU)",
    "voltage": "+12V DC High Power (Up to 150W per 8-pin)",
    "pinCount": "8 pins (splits into 6+2)",
    "keyingRule": "Splits into 6-pin and 2-pin clips so it can fit older 6-pin GPUs as well. Look for the stamped \"PCIe\" marking.",
    "gotcha": "Avoid daisy-chaining (pigtail) cables for high-wattage GPUs (over 220W). Run separate cables directly from the PSU to each socket."
  },
  "cable_12vhpwr": {
    "id": "cable_12vhpwr",
    "name": "12VHPWR / PCIe 5.0 (16-Pin) GPU Cable",
    "fromName": "ATX 3.0 Power Supply",
    "toName": "RTX 40/50 Series GPU Socket",
    "voltage": "+12V (Up to 600W) + 4 Micro Sense Pins",
    "pinCount": "16 pins (12 power + 4 sideband logic)",
    "keyingRule": "Ultra-dense micro connector with 4 tiny top sense pins that communicate power limits to the GPU firmware.",
    "gotcha": "FATAL MELTING RISK: Must be pushed 100% flush with ZERO visible gap between plug and socket! Do not bend within 35mm of connector."
  },
  "cable_front_panel": {
    "id": "cable_front_panel",
    "name": "Front Panel Switch & LED Wiring Bundle",
    "fromName": "Chassis Front Button & LED Array",
    "toName": "Motherboard JFP1 Header (Bottom-Right)",
    "voltage": "3.3V Logic / Ground",
    "pinCount": "9-pin array (single and dual pin leads)",
    "keyingRule": "Individual tiny 2-pin female plugs labeled POWER SW, RESET SW, HDD LED, POWER LED.",
    "gotcha": "Polarity matters for LEDs (+ pin must connect to + header pin, - to -). Polarity does NOT matter for momentary switches (POWER SW / RESET)."
  },
  "cable_sata": {
    "id": "cable_sata",
    "name": "SATA Data & Power Bundle",
    "category": "power",
    "fromName": "Motherboard & PSU",
    "toName": "2.5\" SATA SSD / 3.5\" HDD",
    "voltage": "+12V, +5V, +3.3V (Power) + 6Gbps (Data)",
    "pinCount": "7-Pin Data + 15-Pin Power",
    "keyingRule": "Both SATA data and SATA power cables feature an \"L-shaped\" keying notch that prevents backwards connection.",
    "gotcha": "SATA drives require TWO cables: a 15-pin flat power cable from the PSU, and a 7-pin slim data cable to the motherboard."
  },
  "cable_sata_pwr": {
    "id": "cable_sata_pwr",
    "name": "15-Pin SATA Drive Power Cable",
    "category": "power",
    "fromName": "Power Supply Unit (PSU)",
    "toName": "2.5\" SATA SSD (15-Pin Power Socket)",
    "voltage": "+12V (Motors), +5V (Logic), +3.3V DC",
    "pinCount": "15 pins (wide flat blade plug)",
    "keyingRule": "Wide L-shaped offset notch prevents plugging in upside down.",
    "gotcha": "CRITICAL: This cable ONLY supplies electrical power from the PSU. It does NOT transfer any data! You must also plug in a 7-pin SATA data cable to the motherboard for the drive to appear in BIOS or OS."
  },
  "cable_sata_data": {
    "id": "cable_sata_data",
    "name": "7-Pin SATA 6Gbps Data Cable",
    "category": "data",
    "fromName": "Motherboard SATA Controller",
    "toName": "2.5\" SATA SSD (7-Pin Data Port)",
    "voltage": "0.5V Differential Data Signaling",
    "pinCount": "7 pins (slim cable with metal locking latch)",
    "keyingRule": "Narrow L-shaped notch with a metal spring lock clip that clicks firmly into the socket.",
    "gotcha": "Connects to the MOTHERBOARD, not the PSU. Carries zero high-voltage power. Always press the metal release spring before unplugging to avoid ripping the motherboard socket off the PCB."
  },
  "cable_usb3": {
    "id": "cable_usb3",
    "name": "Front Panel USB 3.0 / 3.2 (19-Pin) Cable",
    "category": "data",
    "fromName": "Chassis Front USB-A Ports",
    "toName": "Motherboard USB 3.0 Internal Header",
    "voltage": "5V Bus Power + 5Gbps Differential Data",
    "pinCount": "19 pins (20-pin block with 1 key pin blocked)",
    "keyingRule": "Side notch keying tab and one single filled-in pin hole ensure it cannot be inserted backwards.",
    "gotcha": "BENT PIN HAZARD: The 19 pins on the motherboard header are notoriously thin and easy to crumple! Align the side notch carefully before applying gentle downward pressure."
  },
  "cable_hd_audio": {
    "id": "cable_hd_audio",
    "name": "Front Panel HD Audio (10-1 Pin) Cable",
    "category": "data",
    "fromName": "Chassis 3.5mm Headphone & Mic Jacks",
    "toName": "Motherboard AAFP Audio Header (Bottom-Left)",
    "voltage": "Analog Audio Signal + 3.3V Jack Detection",
    "pinCount": "9 pins (10-pin block with pin 8 blocked)",
    "keyingRule": "Pin position 8 is physically blocked on the plug to prevent accidentally inserting it into a USB 2.0 header.",
    "gotcha": "Often confused with 9-pin USB 2.0 headers! Check the keying pin: USB 2.0 has pin 9 blocked, while HD Audio has pin 8 blocked. Plug into the AAFP header near the bottom-left audio capacitors."
  },
  "cable_wifi_antenna": {
    "id": "cable_wifi_antenna",
    "name": "Wi-Fi 6E/7 & Bluetooth High-Gain Antenna (RP-SMA Coaxial)",
    "category": "data",
    "fromName": "Motherboard Wi-Fi/BT M.2 Module (via Rear RP-SMA Ports)",
    "toName": "Magnetic Desktop Base / High-Gain Antenna Array",
    "voltage": "2.4GHz, 5GHz & 6GHz RF Coaxial Signals (Zero DC Power)",
    "pinCount": "Dual RP-SMA Threaded Coaxial Connectors",
    "keyingRule": "Reverse-Polarity SMA (RP-SMA): Hand-tighten clockwise until snug. Center pin on cable matches the center hole on the motherboard gold post.",
    "gotcha": "CRITICAL BEGINNER TRAP: Both Wi-Fi AND Bluetooth share this external antenna! If not connected, the steel chassis acts as a Faraday cage—Bluetooth audio will stutter within 1 meter and Wi-Fi speeds drop by 99%."
  }
};

export const enFrontPanelPins: FrontPanelPinTextContent[] = [
  {
    "pinNumber": 1,
    "label": "+",
    "name": "HDLED+",
    "type": "led",
    "polarity": "+",
    "row": "top",
    "description": "Hard Drive Activity LED Positive"
  },
  {
    "pinNumber": 3,
    "label": "-",
    "name": "HDLED-",
    "type": "led",
    "polarity": "-",
    "row": "top",
    "description": "Hard Drive Activity LED Negative"
  },
  {
    "pinNumber": 5,
    "label": "-",
    "name": "GND",
    "type": "switch",
    "row": "top",
    "description": "Reset Switch Ground"
  },
  {
    "pinNumber": 7,
    "label": "+",
    "name": "RESET",
    "type": "switch",
    "row": "top",
    "description": "Reset Switch Signal"
  },
  {
    "pinNumber": 9,
    "label": "x",
    "name": "NC",
    "type": "empty",
    "row": "top",
    "description": "No Pin / Key notch"
  },
  {
    "pinNumber": 2,
    "label": "+",
    "name": "PLED+",
    "type": "led",
    "polarity": "+",
    "row": "bottom",
    "description": "Power Indicator LED Positive"
  },
  {
    "pinNumber": 4,
    "label": "-",
    "name": "PLED-",
    "type": "led",
    "polarity": "-",
    "row": "bottom",
    "description": "Power Indicator LED Negative"
  },
  {
    "pinNumber": 6,
    "label": "+",
    "name": "PWR_SW",
    "type": "switch",
    "row": "bottom",
    "description": "Power Button Signal (Ignites the PC!)"
  },
  {
    "pinNumber": 8,
    "label": "-",
    "name": "GND",
    "type": "switch",
    "row": "bottom",
    "description": "Power Button Ground"
  },
  {
    "pinNumber": 10,
    "label": "x",
    "name": "DUMMY",
    "type": "empty",
    "row": "bottom",
    "description": "Key / Unused Pin"
  }
];
