import type { AssemblyStep } from '../types';

export const assemblySteps: AssemblyStep[] = [
  {
    step: 1,
    partId: 'cpu',
    title: 'Install CPU into Motherboard Socket',
    instruction:
      'Lift the metal tension arm and swing the socket load plate open. Gently align the golden corner triangle on the CPU with the embossed dot on the socket frame. Lower it with Zero Insertion Force (ZIF). Close the load plate and press the lever arm down under the retention hook.',
    checklist: [
      'Locate the gold triangle on the corner of the CPU',
      'Verify socket pins are straight and untouched',
      'Drop CPU straight down with ZERO pushing force',
      'Engage lever arm into the locking notch'
    ],
    correctZoneId: 'socket_cpu',
    audioFeedback: 'Metal lever arm tension snap (Solid click)',
    commonMistake: {
      title: 'Forcing the Lever When Tilted',
      consequence: 'Permanently bends the motherboard LGA socket pins, ruining the board.'
    }
  },
  {
    step: 2,
    partId: 'ram',
    title: 'Seat RAM Sticks into Slots 2 & 4 (A2 & B2)',
    instruction:
      'Push open the plastic latches at the ends of DIMM slots 2 and 4. Align the offset notch on the bottom edge of the memory stick with the ridge in the slot. Apply firm, even pressure with both thumbs until the latches snap upward with an audible double-click.',
    checklist: [
      'Open the slot retention clips',
      'Match the asymmetrical key notch (never force backwards)',
      'Install into slots 2 & 4 (A2/B2) for dual-channel speed',
      'Listen for the distinct mechanical click on both ends'
    ],
    correctZoneId: 'ram_slot_2',
    audioFeedback: 'Dual mechanical latch click (Snap-click!)',
    commonMistake: {
      title: 'Placing in Adjacent Slots (1 & 2)',
      consequence: 'Halves memory bandwidth by forcing single-channel mode.'
    }
  },
  {
    step: 3,
    partId: 'ssd',
    title: 'Install M.2 NVMe SSD & Secure Heatsink',
    instruction:
      'Remove the motherboard primary M.2 heatsink cover. Slide the M.2 SSD into the M-Key slot at a 30-degree upward angle until the gold pins disappear. Gently push the drive flat against the standoff screw and secure it with the mounting screw. Peel the protective blue plastic film from the heatsink thermal pad and reinstall the heatsink.',
    checklist: [
      'Insert gold contacts into slot at a 30° angle',
      'Gently push flat onto hex standoff',
      'Tighten M2 screw until snug (do not overtighten)',
      'PEEL the plastic film off the heatsink thermal pad'
    ],
    correctZoneId: 'm2_slot_1',
    audioFeedback: 'Screw thread tightening and thermal pad compression',
    commonMistake: {
      title: 'Leaving Plastic Film on Thermal Pad',
      consequence: 'Thermal pad cannot conduct heat; SSD thermal throttles under read/write loads.'
    }
  },
  {
    step: 4,
    partId: 'cooler',
    title: 'Mount CPU Cooler & Connect PWM Fan',
    instruction:
      'Peel the protective plastic film from the copper baseplate of the cooler! Apply a pea-sized dot of thermal paste to the center of the CPU IHS. Lower the cooler onto the mounting bracket and tighten the screws in an alternating diagonal pattern (X-pattern) to equalize pressure. Plug the 4-pin fan cable into the CPU_FAN header.',
    checklist: [
      'PEEL the transparent warning sticker off the cooler base!',
      'Apply pea-sized thermal paste dot in the center',
      'Tighten screws diagonally in an X-pattern',
      'Plug 4-pin female connector into CPU_FAN header'
    ],
    correctZoneId: 'cpu_fan_header',
    audioFeedback: 'Diagonal spring-screw bottoming out',
    commonMistake: {
      title: 'Forgetting to Peel the Baseplate Sticker',
      consequence: 'CPU reaches 100°C within 15 seconds of boot and constantly thermal throttles.'
    }
  },
  {
    step: 5,
    partId: 'motherboard',
    title: 'Mount Motherboard into Case on Standoffs',
    instruction:
      'Verify that brass standoffs are installed in the chassis ONLY where your motherboard has screw holes. Align the rear I/O shield with the case opening, slide the motherboard into place against the standoffs, and secure all 9 screws with a magnetic screwdriver.',
    checklist: [
      'Check standoff positions match motherboard form factor (ATX)',
      'Ensure no extra stray standoff touches bare PCB',
      'Slide I/O ports through rear chassis cutout',
      'Secure motherboard screws firmly without overtightening'
    ],
    correctZoneId: 'vrm_heatsinks',
    audioFeedback: 'Chassis ground screw snugging',
    commonMistake: {
      title: 'Stray Standoff Behind Motherboard',
      consequence: 'Metal standoff shorts motherboard solder traces, causing dead power-on failure.'
    }
  },
  {
    step: 6,
    partId: 'gpu',
    title: 'Lock Graphics Card into Primary PCIe x16 Slot',
    instruction:
      'Remove the top two rear expansion slot covers from the PC case. Press open the plastic retention latch at the right end of the top PCIe x16 slot. Lower the GPU straight down, guiding the rear metal bracket into the chassis gap. Press firmly until the rear latch snaps upward and locks. Fasten the two bracket screws to the case frame.',
    checklist: [
      'Use the TOPMOST PCIe x16 slot for full CPU bandwidth',
      'Push open the rear slot retention lock',
      'Press firmly until the retention latch snaps locked',
      'Screw bracket to chassis to prevent GPU sag and slot strain'
    ],
    correctZoneId: 'pcie_x16_1',
    audioFeedback: 'Heavy PCIe latch snap and bracket screw drive',
    commonMistake: {
      title: 'Installing in Lower PCIe Slot',
      consequence: 'Forces GPU to run over limited chipset lanes (x4 speed) instead of full x16.'
    }
  },
  {
    step: 7,
    partId: 'psu',
    title: 'Plug Power Harnesses & Front Panel Header',
    instruction:
      'Connect the thick 24-pin ATX power harness to the right motherboard edge. Connect the 8-pin (4+4) EPS cable to the top-left CPU power header. Connect dedicated 8-pin PCIe or 12VHPWR cables to the GPU. Finally, connect the front panel POWER_SW wire leads to the JFP1 header pins.',
    checklist: [
      'Push 24-pin ATX connector until side clip snaps',
      'Connect 8-pin CPU cable (labeled CPU, NOT PCIe)',
      'Connect GPU power cables with zero gap',
      'Align front panel POWER_SW with motherboard manual pins'
    ],
    correctZoneId: 'atx_24pin',
    audioFeedback: 'Multi-pin latch clicks and PSU master rocker switch click',
    commonMistake: {
      title: 'Plugging Monitor into Motherboard instead of GPU',
      consequence: 'PC turns on, but monitor shows a black screen or runs on sluggish integrated graphics!'
    }
  }
];

export interface DiagnosticCase {
  id: string;
  symptom: string;
  cause: string;
  solution: string;
  component: string;
  severity: 'fatal' | 'performance' | 'no-boot';
}

export const diagnosticCases: DiagnosticCase[] = [
  {
    id: 'diag_black_screen',
    symptom: 'PC turns on with fans spinning, but monitor displays "No Signal" (Black Screen).',
    cause: 'DisplayPort/HDMI cable was plugged into the motherboard back panel instead of the dedicated GPU.',
    solution: 'Move display cable down to the HDMI/DisplayPort jack on the graphics card bracket.',
    component: 'GPU',
    severity: 'no-boot'
  },
  {
    id: 'diag_overheat',
    symptom: 'CPU temperature shoots to 95°C-100°C immediately in BIOS; PC shuts down after 3 minutes.',
    cause: 'Transparent protective plastic sticker was left on the copper base of the CPU cooler heatsink.',
    solution: 'Dismount cooler, peel off the warning sticker, clean and reapply thermal paste, remount cooler.',
    component: 'CPU Cooler',
    severity: 'fatal'
  },
  {
    id: 'diag_single_channel',
    symptom: 'Game frame rates stutter, and memory bandwidth is 50% lower than advertised.',
    cause: 'RAM sticks were placed side-by-side in slots 1 & 2 instead of dual-channel slots 2 & 4 (A2 & B2).',
    solution: 'Power off PC and reseat the RAM sticks into alternating slots (Slots 2 & 4 from left).',
    component: 'RAM',
    severity: 'performance'
  },
  {
    id: 'diag_no_power_button',
    symptom: 'Pressing the PC case power button does absolutely nothing (no lights, no fan spin).',
    cause: 'The tiny 2-pin POWER_SW lead from the case is plugged into the wrong pins or is completely disconnected.',
    solution: 'Check motherboard manual JFP1 pinout diagram and reseat POWER_SW on pins 6 & 8.',
    component: 'Front Panel / Case',
    severity: 'no-boot'
  },
  {
    id: 'diag_psu_rocker',
    symptom: 'Completely dead build; no standby LEDs on motherboard.',
    cause: 'The master I/O toggle rocker switch on the back of the power supply is set to "O" (Off).',
    solution: 'Flip the switch to "I" (On). The "I" represents a closed circuit.',
    component: 'PSU',
    severity: 'no-boot'
  }
];
