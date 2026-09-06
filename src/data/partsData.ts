import type { ComponentPart } from '../types';

export const partsData: Record<string, ComponentPart> = {
  cpu: {
    id: 'cpu',
    name: 'CPU (Processor)',
    subtitle: 'Central Processing Unit',
    category: 'processing',
    color: '#f97316',
    iconName: 'Cpu',
    shapeDescription:
      'A dense, flat square metallic package (approx. 37.5mm to 45mm wide). The top is protected by a nickel-plated copper Integrated Heat Spreader (IHS) with laser-etched model branding. The bottom features thousands of microscopic gold contact pads (LGA) or gold pins (PGA).',
    physicalLandmarks: [
      'Gold triangle indicator on one corner (aligns with socket triangle)',
      'Subtle alignment notches on left/right edges preventing 90° or 180° rotation',
      'Flat nickel-plated copper Integrated Heat Spreader (IHS) on top',
      'Array of 1700+ gold contact pads on the underside (LGA 1700/AM5)'
    ],
    dimensionsStandard: 'Intel LGA1700: 45 x 37.5 mm | AMD AM5: 40 x 40 mm',
    motherboardPosition:
      'Dead-center in the upper half of the motherboard. Flanked by high-power VRM heatsinks on the top and left, and RAM slots immediately on the right.',
    socketType: 'LGA1700 / AM5 Zero-Insertion Force (ZIF) Socket',
    analogies: {
      kitchen: {
        title: 'The Master Chef',
        role: 'High-speed culinary decision maker & orchestrator',
        story:
          'The Master Chef stands in the center of the kitchen, barking orders, executing complex recipes, and making split-second decisions. The Chef doesn’t hold ingredients in their hands for long—they rely on assistants to bring items from the prep counter.',
        dataMovement:
          'Takes recipe orders, coordinates cooking steps, and delivers finished plates at 5 billion actions per second (5 GHz).',
        icon: 'ChefHat'
      },
      office: {
        title: 'The Lead Detective / Executive',
        role: 'Chief investigative analyst & logic solver',
        story:
          'The Lead Detective sits at the central command desk, analyzing evidence, solving complex mathematical riddles, and making operational calls. The detective cannot remember everything in their head, so they glance rapidly at the giant whiteboard right beside them.',
        dataMovement:
          'Processes urgent investigative leads, delegates paperwork, and solves case logic in clock cycles measured in nanoseconds.',
        icon: 'Search'
      },
      factory: {
        title: 'The Factory Automation Director',
        role: 'Central automated programmable logic controller (PLC)',
        story:
          'The Factory Director oversees the entire automated manufacturing floor. It receives master production schedules, coordinates high-speed robotic actuators, and synchronizes assembly lines.',
        dataMovement:
          'Dispatches millions of microscopic operational instructions per millisecond to all satellite stations.',
        icon: 'Activity'
      }
    },
    connections: [
      {
        target: 'Motherboard Socket',
        interfaceType: 'LGA / PGA Contact Array',
        cableOrSlot: 'Socket with steel retention clamp and lever arm',
        tactileFeedback: 'Zero-Insertion Force (drops smoothly); tension arm takes firm force to latch down.',
        note: 'Never force the lever down if the CPU is slightly tilted or misaligned!'
      },
      {
        target: 'RAM Slots',
        interfaceType: 'Direct Dual-Channel Memory Controller Bus',
        cableOrSlot: 'Internal motherboard traces (shortest copper paths possible)',
        tactileFeedback: 'Direct high-speed bus',
        note: 'Operates at up to 6400+ MT/s with sub-70ns latency.'
      },
      {
        target: 'Primary PCIe Slot & M.2',
        interfaceType: 'Direct PCIe 4.0 / 5.0 lanes (16x + 4x)',
        cableOrSlot: 'Motherboard embedded high-speed differential pairs',
        tactileFeedback: 'Direct PCIe pipeline to GPU & boot SSD',
        note: 'Direct link bypasses the motherboard chipset for minimal latency.'
      }
    ],
    gotchas: [
      {
        title: 'Bent Socket Pins (Disaster Alert)',
        explanation:
          'Modern LGA sockets have fragile gold spring pins on the motherboard itself. Dropping a CPU or touching the socket pins will bend or break them, destroying the motherboard.',
        severity: 'critical'
      },
      {
        title: 'Incorrect Orientation Angle',
        explanation:
          'Always locate the tiny embossed golden triangle on the corner of the CPU and match it to the dot/triangle marked on the motherboard socket frame.',
        severity: 'critical'
      },
      {
        title: 'Heatsink Pressure Distribution',
        explanation:
          'Tighten CPU cooler screws in a diagonal cross pattern (X-pattern) to evenly distribute mounting pressure and prevent uneven contact or pin detachment.',
        severity: 'warning'
      }
    ]
  },

  cooler: {
    id: 'cooler',
    name: 'CPU Cooler (Air / AIO Liquid)',
    subtitle: 'Thermal Dissipation System',
    category: 'cooling',
    color: '#38bdf8',
    iconName: 'Fan',
    shapeDescription:
      'Air cooler: Dense stack of razor-thin aluminum fins pierced by 4 to 6 copper heatpipes, capped with 1 or 2 120mm/140mm fans. AIO Liquid cooler: Copper cold plate pump block connected by braided tubes to a 240mm/360mm aluminum radiator with fans.',
    physicalLandmarks: [
      'Mirror-finish copper or aluminum contact baseplate',
      'Protective peel-off transparent plastic sticker on baseplate',
      '4-point spring-tensioned mounting screw bracket',
      '4-pin PWM female fan connector cable'
    ],
    dimensionsStandard: 'Air Tower: 155-165mm height | AIO Radiators: 240mm / 280mm / 360mm',
    motherboardPosition:
      'Clamped directly over the CPU socket, bolted through 4 motherboard mounting holes to a rigid backplate installed behind the motherboard.',
    socketType: 'Socket-specific mounting bracket (LGA1700 / AM5 / AM4)',
    analogies: {
      kitchen: {
        title: 'The Industrial Kitchen Range Hood & Exhaust AC',
        role: 'Continuous heat evacuation & kitchen climate control',
        story:
          'Cooking high-order feasts generates blistering heat. If the exhaust hood stops, the Master Chef collapses from heat stroke (thermal throttling) and the whole kitchen grinds to a dead halt.',
        dataMovement:
          'Draws boiling heat off the chef’s brow and shoots it through the rooftop exhaust flues.',
        icon: 'Wind'
      },
      office: {
        title: 'The Office Air Conditioning & Ventilation System',
        role: 'Thermodynamic comfort and burnout prevention',
        story:
          'When the Lead Detective is working at 100% capacity on an emergency case, coffee steam and electronic heat fill the room. Without powerful air conditioning, equipment crashes and cognitive speed drops.',
        dataMovement:
          'Continuously cycles cool air over hot workstations, pumping hot air into building return vents.',
        icon: 'ThermometerSnowflake'
      },
      factory: {
        title: 'The Industrial Cooling Tower & Heat Exchanger',
        role: 'Fluid thermodynamic heat loop',
        story:
          'Heavy industrial equipment generating hundreds of watts of thermal waste requires dedicated coolant piping and finned cooling towers to avoid melting mechanical seals.',
        dataMovement:
          'Transfers thermal calories away from the core stator to ambient air through forced convection.',
        icon: 'ShieldAlert'
      }
    },
    connections: [
      {
        target: 'Motherboard CPU_FAN Header',
        interfaceType: '4-Pin PWM Fan Connector',
        cableOrSlot: 'Keyed 4-pin female header cable',
        tactileFeedback: 'Slides onto 4 pins with a small plastic alignment tab.',
        note: 'PWM (Pulse Width Modulation) pin allows the motherboard to dynamically adjust fan speed based on CPU temperature.'
      },
      {
        target: 'CPU Heat Spreader (IHS)',
        interfaceType: 'Thermal Interface Material (Thermal Paste)',
        cableOrSlot: 'Direct physical compression clamp',
        tactileFeedback: 'Firm spring-loaded screw resistance; stops when bottomed out.',
        note: 'Thermal paste fills microscopic air pockets between metal surfaces. Air is an insulator!'
      }
    ],
    gotchas: [
      {
        title: 'THE FATAL PEEL STICKER!',
        explanation:
          'Almost every cooler comes with a transparent plastic warning sticker over the copper base. Forgetting to peel this sticker before mounting causes instant 100°C thermal throttling.',
        severity: 'critical'
      },
      {
        title: 'Plugging into SYS_FAN instead of CPU_FAN',
        explanation:
          'If you plug the cooler into a regular case fan header, the motherboard may trigger a "CPU Fan Error" on boot and refuse to start.',
        severity: 'warning'
      },
      {
        title: 'Thermal Paste Application',
        explanation:
          'A pea-sized dot or small X in the center of the CPU is optimal. Too little leaves dry hotspots; too much squishes out onto the PCB.',
        severity: 'tip'
      }
    ]
  },

  ram: {
    id: 'ram',
    name: 'RAM (Memory / DIMMs)',
    subtitle: 'Random Access Memory (DDR4 / DDR5)',
    category: 'memory',
    color: '#10b981',
    iconName: 'Layers',
    shapeDescription:
      'Long, narrow rectangular PCB (approx. 133mm long x 30-40mm tall) clad in aluminum heatspreaders. Features a bottom edge lined with 288 gold contact pins, split into two unequal sections by a center keying notch.',
    physicalLandmarks: [
      'Asymmetrical alignment notch on bottom gold edge (prevents backwards insertion)',
      'Notch is slightly offset from center (differs between DDR4 and DDR5)',
      'End locking notches that snap into motherboard DIMM latches',
      'Decorative aluminum heatshield (often with top RGB diffusion bar)'
    ],
    dimensionsStandard: 'Standard UDIMM: 133.35mm length x 31.25mm height',
    motherboardPosition:
      'Arrayed in 2 to 4 vertical slots parallel to each other, positioned directly to the right of the CPU socket for short trace lengths.',
    socketType: '288-pin DDR5 / DDR4 DIMM Slot with dual/single latch levers',
    analogies: {
      kitchen: {
        title: 'The Chef’s Prep Counter & Cutting Board',
        role: 'Instant-access working surface for immediate ingredients',
        story:
          'The prep counter holds the garlic, chopped onions, and spices needed for the dishes being prepared right this second. It’s ultra-fast to grab from, but at the end of the shift, the counters are scrubbed completely clean (volatile memory).',
        dataMovement:
          'Feeds raw ingredients into the chef’s pans in nanoseconds. Limited in surface area compared to the giant pantry.',
        icon: 'Utensils'
      },
      office: {
        title: 'The Giant Working Whiteboard',
        role: 'Active case visualization and rapid scratchpad',
        story:
          'The Lead Detective pins current suspect photos, phone logs, and active case clues onto the giant whiteboard right in front of the desk. When power is shut down at night, the cleaning crew erases the board clean. To save clues forever, they must be filed into the archive (SSD).',
        dataMovement:
          'Glanced at and updated in real time. Ultra-fast access compared to walking to the basement archive.',
        icon: 'FileText'
      },
      factory: {
        title: 'The High-Speed Conveyor Buffer',
        role: 'Intermediate temporary component hopper',
        story:
          'Parts ready for the immediate stamping cycle sit in the high-speed conveyor buffer next to the robot arms. It holds only what is needed for the current batch and is emptied when the line powers down.',
        dataMovement:
          'Supplies high-bandwidth feed rates (up to 60+ GB/s) directly into machine processing heads.',
        icon: 'RotateCw'
      }
    },
    connections: [
      {
        target: 'Motherboard DIMM Slot',
        interfaceType: '288-pin edge connector',
        cableOrSlot: 'Direct insertion slot with end retention latches',
        tactileFeedback: 'Requires significant downward thumb pressure until both ends snap shut with a loud "CLICK".',
        note: 'Make sure the slot latches are opened outward before pushing the stick down.'
      },
      {
        target: 'CPU Integrated Memory Controller (IMC)',
        interfaceType: '64-bit per channel DDR bus',
        cableOrSlot: 'Motherboard multi-layer copper traces',
        tactileFeedback: 'Direct ultra-short bus',
        note: 'Using two matched sticks in channels A2 and B2 unlocks 128-bit dual-channel bandwidth.'
      }
    ],
    gotchas: [
      {
        title: 'The Dual-Channel Slot 2 & 4 Rule (A2/B2)',
        explanation:
          'If you have 2 sticks and 4 slots, installing them into slots 1 & 2 runs them in slow single-channel mode. Always install into slots 2 and 4 (counting left to right from CPU) for double the memory bandwidth.',
        severity: 'critical'
      },
      {
        title: 'Incomplete Seating / Half-Click',
        explanation:
          'RAM requires firm, even pressure. If one end hasn’t clicked in completely, the PC will fail to boot and trigger a DRAM debug LED.',
        severity: 'critical'
      },
      {
        title: 'DDR4 vs DDR5 Incompatibility',
        explanation:
          'DDR4 and DDR5 notches are in different positions. They are physically incompatible and cannot be plugged into each other’s slots.',
        severity: 'warning'
      },
      {
        title: 'Enabling XMP / EXPO in BIOS',
        explanation:
          'High-speed RAM boots at baseline JEDEC speeds (e.g. 4800 MT/s) by default. You must enable XMP (Intel) or EXPO (AMD) in the BIOS to reach advertised speeds (e.g. 6000 MT/s).',
        severity: 'tip'
      }
    ]
  },

  ssd: {
    id: 'ssd',
    name: 'M.2 NVMe SSD (Storage)',
    subtitle: 'Non-Volatile Solid State Drive',
    category: 'storage',
    color: '#eab308',
    iconName: 'HardDrive',
    shapeDescription:
      'A slender green or black circuit board resembling a stick of chewing gum (standard M.2 2280 is 22mm wide by 80mm long). Houses NAND flash memory chips and a controller chip. Gold pins on one end, semicircular screw notch on the other.',
    physicalLandmarks: [
      'M-Key edge connector with 5 gold pins, a small key gap, and 59 pins',
      'Semicircular standoff mounting notch on the rear edge',
      'Flash NAND memory chips (stores data even when unpowered)',
      'Often mounted underneath motherboard aluminum heatshield armor'
    ],
    dimensionsStandard: 'M.2 2280 (22mm x 80mm) is the consumer standard',
    motherboardPosition:
      'Installed flush against the motherboard surface, typically placed between the CPU and the top PCIe x16 slot, or beneath lower decorative motherboard shields.',
    socketType: 'M.2 Socket 3 (M Key), supports PCIe 4.0 / 5.0 x4',
    analogies: {
      kitchen: {
        title: 'The Walk-in Freezer & Dry Pantry',
        role: 'Permanent, massive warehouse for bulk ingredients',
        story:
          'The walk-in freezer holds all 50-pound bags of flour, frozen meats, and secret recipe binders. It takes a few seconds to walk there compared to reaching for the cutting board, but when the lights are turned off at night, everything in the pantry stays safe.',
        dataMovement:
          'Loads games and operating system files from cold storage onto the prep counter (RAM) during boot/loading screens.',
        icon: 'Archive'
      },
      office: {
        title: 'The Basement Archive Vault',
        role: 'Permanent case record library & steel filing cabinets',
        story:
          'Every closed case file, background check, and evidence record is stored in the fireproof basement vault. Fetching a file takes an elevator ride, but the records will never vanish, even during a blackout.',
        dataMovement:
          'Transfers permanent archives into active RAM whiteboard space when a case file is opened.',
        icon: 'FolderLock'
      },
      factory: {
        title: 'The Automated Central Warehouse',
        role: 'High-density automated pallet racking',
        story:
          'Stores raw inventory, product firmware binaries, and packaging materials. High-speed automated cranes retrieve bins when production calls for them.',
        dataMovement:
          'Supplies bulk data blocks at up to 7,000+ MB/s over high-speed PCIe pipelines.',
        icon: 'Boxes'
      }
    },
    connections: [
      {
        target: 'Motherboard M.2 Slot',
        interfaceType: 'PCIe 4.0 / 5.0 x4 M-Key',
        cableOrSlot: 'Slot with 30-degree angled insertion, fixed by tiny screw or latch',
        tactileFeedback: 'Slides in at 30° angle, springs up lightly, then presses flat and screws down.',
        note: 'Do not overtighten the tiny M2 screw or you risk stripping the thread or cracking the board.'
      },
      {
        target: 'Motherboard M.2 Heatsink',
        interfaceType: 'Thermal Pad Contact',
        cableOrSlot: 'Aluminum heatsink clamped on top of SSD',
        tactileFeedback: 'Soft, cushioned squeeze on thermal pad.',
        note: 'Always peel the blue/clear plastic film off the heatsink thermal pad before installation!'
      }
    ],
    gotchas: [
      {
        title: 'Missing Standoff Screw Catastrophe',
        explanation:
          'The SSD must rest flat on top of a hex standoff screw. Screwing it down directly to the motherboard without the standoff will bend and crack the SSD circuit board.',
        severity: 'critical'
      },
      {
        title: 'Thermal Pad Plastic Film',
        explanation:
          'Motherboard M.2 heatsinks have thermal pads pre-applied with a blue protective film. Leaving this on will cause your SSD to overheat and throttle down to sluggish speeds.',
        severity: 'warning'
      },
      {
        title: 'Top Slot vs Lower Slot Bandwidth',
        explanation:
          'The top M.2 slot connects directly to the CPU lanes for lowest latency. Lower M.2 slots often route through the motherboard chipset, sharing bandwidth with other devices.',
        severity: 'tip'
      }
    ]
  },

  gpu: {
    id: 'gpu',
    name: 'GPU (Graphics Card)',
    subtitle: 'Dedicated Video & Compute Accelerator',
    category: 'expansion',
    color: '#a855f7',
    iconName: 'Tv',
    shapeDescription:
      'The largest and heaviest component in the PC (often 250mm to 340mm long, weighing 1 to 2 kg). Enclosed in an aerodynamic shroud with 2 or 3 large cooling fans, a massive aluminum fin stack, a rigid backplate, and an I/O bracket with DisplayPort and HDMI ports.',
    physicalLandmarks: [
      'Full-length PCIe x16 edge connector with 164 gold contact pins and retention notch',
      'Rear metal bracket with display outputs (DisplayPort, HDMI) screwed into case',
      'Power input headers on top edge (standard 8-pin PCIe or 12VHPWR 16-pin)',
      'Heavy structural backplate preventing PCB flex and protecting backside components'
    ],
    dimensionsStandard: 'Dual/Triple Slot: 280-330mm length x 120-140mm width x 50-65mm depth',
    motherboardPosition:
      'Mounted horizontally across the lower middle of the motherboard, seated into the topmost PCIe x16 slot, with its rear ports exposed through the back of the case.',
    socketType: 'PCI Express 5.0 / 4.0 x16 Slot with mechanical retention latch',
    analogies: {
      kitchen: {
        title: 'The Brigade of 5,000 Rapid Plating Artists',
        role: 'Massively parallel execution of repetitive visual tasks',
        story:
          'The Master Chef (CPU) handles complex logic and recipe timing, but when a banquet of 10,000 plates needs micro-drops of sauce, herbs positioned, and napkins folded in identical order, the Chef hands it off to 5,000 dedicated artists working simultaneously.',
        dataMovement:
          'Receives scene geometry and texture commands from CPU, rendering 60 to 240 complete frames per second.',
        icon: 'Palette'
      },
      office: {
        title: 'The Forensic Sketch & Video Surveillance Squad',
        role: 'Massive parallel video reconstruction & facial scanning',
        story:
          'While the Lead Detective solves case motives, this team of 5,000 forensic technicians simultaneously analyzes 4K security camera feeds across an entire city, reconstructing 3D crime scenes in real-time.',
        dataMovement:
          'Processes millions of pixels simultaneously over 256-bit or 384-bit ultra-wide memory buses.',
        icon: 'Video'
      },
      factory: {
        title: 'The Parallel Robotic Arm Welding & Painting Matrix',
        role: 'Mass-scale synchronized parallel production',
        story:
          'An entire warehouse bay filled with thousands of robotic paint-sprayers and laser-welders firing at once to finish millions of car chassis panels every hour.',
        dataMovement:
          'Executes trillions of floating-point operations per second (TFLOPS) in parallel lockstep.',
        icon: 'Cpu'
      }
    },
    connections: [
      {
        target: 'Motherboard Primary PCIe x16 Slot',
        interfaceType: 'PCIe 5.0 / 4.0 x16 Bus',
        cableOrSlot: 'Slot with rear retention latch',
        tactileFeedback: 'Firm push downward until rear plastic latch swings up and locks with a distinct snap.',
        note: 'Always release the rear latch with a soft tool/finger before pulling the GPU out to prevent tearing the slot off the board!'
      },
      {
        target: 'Power Supply (PSU)',
        interfaceType: '8-Pin (6+2) PCIe or 12VHPWR (16-Pin) Cable',
        cableOrSlot: 'Direct high-amperage 12V power cables from PSU',
        tactileFeedback: 'Top latch clicks onto connector ridge. Must be pushed 100% flush.',
        note: '12VHPWR connectors must be inserted fully with ZERO gap to prevent pin overheating.'
      },
      {
        target: 'Computer Monitor',
        interfaceType: 'DisplayPort 1.4/2.1 or HDMI 2.1',
        cableOrSlot: 'Cable running from GPU back bracket to monitor',
        tactileFeedback: 'DisplayPort cable latches; press release button to unplug.',
        note: 'Plug monitor cable into the GPU, NEVER into the motherboard back I/O!'
      }
    ],
    gotchas: [
      {
        title: 'THE #1 BEGINNER BLUNDER: Monitor into Motherboard',
        explanation:
          'If you plug your monitor into the motherboard HDMI port instead of the GPU, the computer will bypass your expensive GPU and run on weak integrated CPU graphics (or show a black screen).',
        severity: 'critical'
      },
      {
        title: '12VHPWR Cable Seating Gap',
        explanation:
          'On modern RTX 40/50 series GPUs, the 16-pin power cable must be pushed all the way in until there is zero visible gap between the plug and the socket. A loose connection causes thermal melting.',
        severity: 'critical'
      },
      {
        title: 'The Top Slot Rule',
        explanation:
          'Always install the GPU in the TOPMOST PCIe x16 slot. Lower PCIe slots often run at x4 or x8 speeds and route through the chipset with extra latency.',
        severity: 'warning'
      },
      {
        title: 'GPU Sag',
        explanation:
          'Modern 3-fan GPUs are so heavy they will bend the motherboard PCIe slot downward over time. Use an anti-sag support bracket under the far corner.',
        severity: 'tip'
      }
    ]
  },

  motherboard: {
    id: 'motherboard',
    name: 'Motherboard (Mainboard / PCB)',
    subtitle: 'System Backbone & Interconnect Hub',
    category: 'backbone',
    color: '#06b6d4',
    iconName: 'Server',
    shapeDescription:
      'A dense, multi-layer printed circuit board (standard ATX is 305mm x 244mm) woven with thousands of microscopic copper traces. Bristles with sockets, power delivery phases (VRMs), capacitors, expansion slots, data ports, and rear I/O connectors.',
    physicalLandmarks: [
      'Standard 9 ATX chassis mounting screw holes',
      '24-pin main ATX power socket along the right edge',
      '8-pin EPS CPU power sockets at the top-left edge',
      'Rear integrated I/O shield (USB, Ethernet, Audio, Wi-Fi antenna ports)',
      'Front-panel header pin block at bottom right corner'
    ],
    dimensionsStandard: 'ATX: 305 x 244 mm | Micro-ATX: 244 x 244 mm | Mini-ITX: 170 x 170 mm',
    motherboardPosition:
      'Bolted vertically against the inside tray of the PC chassis, elevated on brass standoff screws.',
    socketType: 'All sockets integrated onto PCB',
    analogies: {
      kitchen: {
        title: 'The Kitchen Building & Utility Infrastructure',
        role: 'Physical floors, countertops, plumbing, and gas conduits',
        story:
          'The building itself: the stainless steel counters, the gas lines feeding every stove, the electrical conduit in the walls, and the walkways between the pantry and the cooking line. Without it, the equipment is just a pile of metal on the sidewalk.',
        dataMovement:
          'High-speed copper traces act as express conveyor belts connecting the chef, prep tables, and pantry.',
        icon: 'LayoutGrid'
      },
      office: {
        title: 'The Office Headquarters & Communications Grid',
        role: 'Building structural floors, hallways, elevators, and phone switchboard',
        story:
          'The physical office building: walls, desks, high-speed fiber lines running through the ceiling, elevator shafts, and internal phone lines. It connects the detective’s desk to the archive vault and front reception desk.',
        dataMovement:
          'High-speed PCIe and DMI buses route signals across the building without cross-talk.',
        icon: 'Building'
      },
      factory: {
        title: 'The Factory Floor Plan & Infrastructure Grid',
        role: 'High-amperage busbars, pneumatic lines, and foundation slab',
        story:
          'The concrete reinforced factory floor with embedded power trenches, robotic guide tracks, and network trunk lines connecting all manufacturing cells.',
        dataMovement:
          'Carries high-speed telemetry and power synchronization across multi-layer circuit planes.',
        icon: 'Network'
      }
    },
    connections: [
      {
        target: 'PC Chassis Tray',
        interfaceType: 'Brass Standoff Screws (6-32 thread)',
        cableOrSlot: '9 screw mounting locations',
        tactileFeedback: 'Firm screw down; grounds the motherboard to the metal case.',
        note: 'Never install a motherboard without brass standoffs! Direct contact with the steel case causes a short circuit that can fry the board.'
      },
      {
        target: 'Power Supply (PSU)',
        interfaceType: '24-Pin ATX Main Power Cable',
        cableOrSlot: 'Heavy 24-pin cable with retention latch',
        tactileFeedback: 'Requires firm push until the side clip locks over the plastic tab.',
        note: 'Powers the chipset, PCIe slots (up to 75W), RAM, and motherboard logic.'
      }
    ],
    gotchas: [
      {
        title: 'Standoff Screw Short Circuit',
        explanation:
          'Only install standoffs where there are matching screw holes in the motherboard. An extra stray standoff underneath the board will touch solder joints and cause an instant short circuit.',
        severity: 'critical'
      },
      {
        title: 'I/O Shield Metal Grounding Tabs',
        explanation:
          'If your motherboard has a separate metal I/O shield, ensure the little metal spring tabs don’t poke INSIDE the USB or HDMI ports when sliding the board into place.',
        severity: 'warning'
      },
      {
        title: 'Clear CMOS Button / Jumper',
        explanation:
          'If you make bad BIOS changes and the PC won’t boot, shorting the 2-pin CLR_CMOS pins with a screwdriver resets BIOS settings to factory defaults.',
        severity: 'tip'
      }
    ]
  },

  psu: {
    id: 'psu',
    name: 'PSU (Power Supply Unit)',
    subtitle: 'AC-to-DC Regulated Power Station',
    category: 'power',
    color: '#facc15',
    iconName: 'Zap',
    shapeDescription:
      'A heavy steel rectangular enclosure (typically 150mm wide x 86mm tall x 140-180mm deep). Contains heavy transformers, inductors, and high-voltage capacitors. Features a 120/140mm cooling fan behind a mesh grille, an AC wall socket with master I/O toggle switch, and modular cable jacks.',
    physicalLandmarks: [
      'AC power receptacle with heavy-duty master rocker switch (I = ON, O = OFF)',
      '120mm/140mm bottom intake fan with silent zero-RPM eco switch',
      'Modular cable interface sockets labeled Motherboard, CPU, PCIe, SATA/PATA',
      '80 PLUS efficiency rating badge (Bronze, Gold, Platinum, Titanium)'
    ],
    dimensionsStandard: 'Standard ATX PSU: 150mm (W) x 86mm (H) x 140-180mm (L)',
    motherboardPosition:
      'Mounted in the bottom "basement" shroud of the PC case, isolated from the motherboard chamber to create independent thermal airflow.',
    socketType: 'Heavy multi-pin modular cable sockets',
    analogies: {
      kitchen: {
        title: 'The Municipal Power Substation & Gas Main',
        role: 'Regulated energy transformation & distribution',
        story:
          'Takes raw, dangerous 120V/240V high-voltage electricity and volatile gas pressure from the street and converts it into safe, steady, whisper-quiet currents for every stove, blender, and refrigerator in the building.',
        dataMovement:
          'Pumps clean, ripple-free +12V (motors/CPU), +5V (drives/logic), and +3.3V (sensors) power rails.',
        icon: 'Flame'
      },
      office: {
        title: 'The Central Power Transformer & Electrical Closet',
        role: 'Grid conversion and surge-suppressed power supply',
        story:
          'The building’s electrical transformer vault that steps down high-voltage utility power into safe 12V and 5V circuits that feed every office desk, server rack, and coffee machine without blowing fuses.',
        dataMovement:
          'Provides uninterrupted, surge-protected direct current 24/7 with over-current safety protections.',
        icon: 'Zap'
      },
      factory: {
        title: 'The High-Voltage Switchgear & Power Plant',
        role: 'Multi-phase industrial step-down transformer',
        story:
          'Massive industrial switchgear converting three-phase grid power into precisely filtered DC busbars that power the heavy drive motors and sensitive PLCs without voltage sag.',
        dataMovement:
          'Delivers up to 850W - 1200W of regulated continuous power across dedicated +12V rails.',
        icon: 'Power'
      }
    },
    connections: [
      {
        target: 'Motherboard 24-Pin Header',
        interfaceType: 'ATX 24-Pin Power',
        cableOrSlot: '24-pin thick bundled harness',
        tactileFeedback: 'Firm click as side latch snaps over tab.',
        note: 'Supplies +12V, +5V, +3.3V, and standby power to the entire system.'
      },
      {
        target: 'Motherboard Top-Left 8-Pin Header',
        interfaceType: 'EPS12V / CPU 8-Pin (4+4) Power',
        cableOrSlot: 'Dedicated 8-pin or 4+4 split cable',
        tactileFeedback: 'Top latch clicks onto header.',
        note: 'Do NOT confuse this with an 8-pin PCIe cable! Pinouts are completely different and keyed differently.'
      },
      {
        target: 'GPU Power Sockets',
        interfaceType: 'PCIe 8-Pin (6+2) or 12VHPWR (16-Pin)',
        cableOrSlot: 'High-current 12V cables',
        tactileFeedback: 'Audible snap; ensure no gap remains.',
        note: 'Always use separate PCIe cables from the PSU for high-power GPUs rather than a single daisy-chained cable.'
      }
    ],
    gotchas: [
      {
        title: 'NEVER MIX MODULAR CABLES FROM DIFFERENT PSUs!',
        explanation:
          'The connector shapes that plug into the PSU housing look similar, but their internal wiring pinouts are NOT standardized! Using a cable from a different brand or model can route 12V into ground, frying every drive and motherboard instantly.',
        severity: 'critical'
      },
      {
        title: 'The Master I/O Rocker Switch',
        explanation:
          'The most common "My new PC won’t turn on!" panic: forgetting to flip the rocker switch on the back of the PSU from "O" (Off) to "I" (On).',
        severity: 'tip'
      },
      {
        title: 'CPU 8-pin vs PCIe 8-pin Confusion',
        explanation:
          'CPU cables split into 4+4 pins; PCIe cables split into 6+2 pins. Plugging a PCIe cable into the CPU socket requires brute force and will short circuit the board.',
        severity: 'critical'
      }
    ]
  },

  case_fans: {
    id: 'case_fans',
    name: 'PC Case, Fans & Front Panel',
    subtitle: 'Chassis Airflow & User Interface Enclosure',
    category: 'airflow',
    color: '#0ea5e9',
    iconName: 'Airplay',
    shapeDescription:
      'Chassis: Steel/aluminum frame with front mesh panel for air intake, tempered glass side window, and bottom PSU shroud. Fans: 120mm or 140mm square plastic frames with 7-9 curved blades and 4 corner vibration-dampening rubber pads.',
    physicalLandmarks: [
      'Front I/O panel: Power button, Reset button, USB-A, USB-C, 3.5mm audio jack',
      'Tiny front-panel connector wire harness (+PWR_SW-, +RESET-, +HDD_LED-, +PWR_LED-)',
      'Directional airflow arrows molded onto fan frame edge (showing spin & airflow direction)',
      'Removable nylon mesh dust filters under the bottom PSU intake and behind front panel'
    ],
    dimensionsStandard: 'Fans: 120 x 120 x 25 mm or 140 x 140 x 25 mm | Case: Mid-Tower ATX',
    motherboardPosition:
      'The case encloses all parts. Front panel header pins connect to the bottom right corner of the motherboard.',
    socketType: '4-Pin PWM Fan Headers & 9-Pin Front Panel Header Array',
    analogies: {
      kitchen: {
        title: 'The Restaurant Dining Room Doors & Ventilation',
        role: 'Physical envelope, entrance doors, and ambient air current',
        story:
          'The physical doors and dining room structure that keep the elements out, along with the front entrance push-buttons and continuous fresh air supply that keeps patrons and staff comfortable.',
        dataMovement:
          'Carries the power switch signal to ignite the spark and maintains a unidirectional airflow tunnel.',
        icon: 'DoorOpen'
      },
      office: {
        title: 'The Office Front Reception & Climate Tunnel',
        role: 'Front door controls and building air circulation',
        story:
          'The front reception desk where the power button bell is pressed to start office operations, surrounded by building exterior windows and fans that keep fresh air circulating through all offices.',
        dataMovement:
          'Relays user button presses to motherboard logic and exhausts warm air to the outside.',
        icon: 'Building2'
      },
      factory: {
        title: 'The Protective Enclosure & Operator Console',
        role: 'Safety enclosure, emergency stop, and ambient ventilation',
        story:
          'The perimeter safety cage and operator control console with start/stop buttons, combined with positive-pressure HEPA intake blowers preventing dust buildup on equipment.',
        dataMovement:
          'Directs ambient cooling currents and handles human operator switch signals.',
        icon: 'Cpu'
      }
    },
    connections: [
      {
        target: 'Motherboard Front Panel Header (JFP1)',
        interfaceType: 'Tiny 2-Pin and 1-Pin Wire Leads',
        cableOrSlot: 'POWER_SW, RESET_SW, HDD_LED (+/-), POWER_LED (+/-)',
        tactileFeedback: 'Slides onto tiny bare pins.',
        note: 'Power SW and Reset SW are momentary switches (no polarity). LEDs have polarity (+ and - matter!).'
      },
      {
        target: 'Motherboard CHA_FAN Headers',
        interfaceType: '4-Pin PWM Fan Headers',
        cableOrSlot: 'Keyed female 4-pin fan cable',
        tactileFeedback: 'Alignment tab slides into socket guide.',
        note: 'PWM allows the BIOS to spin fans down to silent whisper speeds when temperatures are low.'
      }
    ],
    gotchas: [
      {
        title: 'The Front Panel Connector Puzzle',
        explanation:
          'The tiny 2-pin cables are notoriously confusing. Always consult the motherboard manual diagram: POWER_SW pins trigger the PC start. If plugged into the wrong pins, pressing the case power button does nothing!',
        severity: 'critical'
      },
      {
        title: 'Fan Orientation (Intake vs Exhaust)',
        explanation:
          'Air ALWAYS exhausts toward the side with the plastic motor frame/bracket and cables ("Faces suck, brackets blow"). Look for the two tiny arrows molded onto the side of the fan housing.',
        severity: 'warning'
      },
      {
        title: 'Positive vs Negative Air Pressure',
        explanation:
          'Having more intake fans than exhaust fans creates positive pressure inside the case, which forces dust out through cracks instead of sucking it in.',
        severity: 'tip'
      }
    ]
  }
};
