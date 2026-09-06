import type { SocketZoneTextContent } from "../types";

export const enBoardZones: Record<string, SocketZoneTextContent> = {
  "socket_cpu": {
    "id": "socket_cpu",
    "name": "CPU Socket (LGA1700 / AM5)",
    "label": "CPU Socket",
    "sublabel": "LGA1700 / AM5 ZIF"
  },
  "vrm_heatsinks": {
    "id": "vrm_heatsinks",
    "name": "Power Delivery VRM Heatsinks",
    "label": "VRM Heatsink (Main)",
    "sublabel": "16+1+1 Power Phases"
  },
  "vrm_top": {
    "id": "vrm_top",
    "name": "VRM Top Heatsink",
    "label": "VRM Heatsink (Top)",
    "sublabel": "MOSFET / Chokes"
  },
  "eps_cpu_power": {
    "id": "eps_cpu_power",
    "name": "8-Pin EPS CPU Power Header",
    "label": "CPU Power (8-Pin)",
    "sublabel": "+12V High Current"
  },
  "ram_slot_1": {
    "id": "ram_slot_1",
    "name": "DDR5 DIMM Slot 1 (A1)",
    "label": "DIMM A1",
    "sublabel": "Slot 1 (Secondary)"
  },
  "ram_slot_2": {
    "id": "ram_slot_2",
    "name": "DDR5 DIMM Slot 2 (A2 - Recommended Dual Channel)",
    "label": "DIMM A2 ★",
    "sublabel": "Slot 2 (Primary Dual Channel)"
  },
  "ram_slot_3": {
    "id": "ram_slot_3",
    "name": "DDR5 DIMM Slot 3 (B1)",
    "label": "DIMM B1",
    "sublabel": "Slot 3 (Secondary)"
  },
  "ram_slot_4": {
    "id": "ram_slot_4",
    "name": "DDR5 DIMM Slot 4 (B2 - Recommended Dual Channel)",
    "label": "DIMM B2 ★",
    "sublabel": "Slot 4 (Primary Dual Channel)"
  },
  "cpu_fan_header": {
    "id": "cpu_fan_header",
    "name": "CPU_FAN Header (4-Pin PWM)",
    "label": "CPU_FAN",
    "sublabel": "PWM Fan Header"
  },
  "m2_slot_1": {
    "id": "m2_slot_1",
    "name": "Primary M.2 NVMe Slot (CPU Direct PCIe 5.0)",
    "label": "M.2 NVMe (Primary)",
    "sublabel": "Direct CPU PCIe 5.0 x4"
  },
  "pcie_x16_1": {
    "id": "pcie_x16_1",
    "name": "Primary PCIe 5.0 x16 Slot (GPU)",
    "label": "PCIe 5.0 x16 (GPU)",
    "sublabel": "Full Bandwidth Direct Slot"
  },
  "m2_slot_2": {
    "id": "m2_slot_2",
    "name": "Secondary M.2 NVMe Slot (Chipset)",
    "label": "M.2 NVMe (Secondary)",
    "sublabel": "Chipset PCIe 4.0 x4"
  },
  "pcie_x16_2": {
    "id": "pcie_x16_2",
    "name": "Secondary PCIe x16 (x4 Mode)",
    "label": "PCIe x16 (x4 Electrical)",
    "sublabel": "Chipset Expansion Slot"
  },
  "chipset_heatsink": {
    "id": "chipset_heatsink",
    "name": "Motherboard PCH Chipset",
    "label": "Chipset (PCH)",
    "sublabel": "B650 / Z790 Hub"
  },
  "atx_24pin": {
    "id": "atx_24pin",
    "name": "24-Pin ATX Main Power Header",
    "label": "24-Pin ATX Power",
    "sublabel": "+12V / +5V / +3.3V Rail"
  },
  "sata_ports": {
    "id": "sata_ports",
    "name": "SATA 6Gbps Data Ports",
    "label": "SATA 6Gb/s Ports",
    "sublabel": "2.5\" SSD / 3.5\" HDD"
  },
  "front_panel_header": {
    "id": "front_panel_header",
    "name": "Front Panel Header Array (JFP1)",
    "label": "Front Panel (JFP1)",
    "sublabel": "Power SW / Reset / LEDs"
  },
  "rear_io_block": {
    "id": "rear_io_block",
    "name": "Rear I/O Shield & Ports",
    "label": "Rear I/O Shield",
    "sublabel": "USB, LAN, Audio, Wi-Fi"
  },
  "audio_codec": {
    "id": "audio_codec",
    "name": "Audio Codec & Capacitors",
    "label": "HD Audio Codec",
    "sublabel": "Isolated PCB Traces"
  }
};
