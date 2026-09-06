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
    "fromName": "Motherboard & PSU",
    "toName": "2.5\" SATA SSD / 3.5\" HDD",
    "voltage": "+12V, +5V, +3.3V (Power) + 6Gbps (Data)",
    "pinCount": "7-Pin Data + 15-Pin Power",
    "keyingRule": "Both SATA data and SATA power cables feature an \"L-shaped\" keying notch that prevents backwards connection.",
    "gotcha": "SATA drives require TWO cables: a 15-pin flat power cable from the PSU, and a 7-pin slim data cable to the motherboard."
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
