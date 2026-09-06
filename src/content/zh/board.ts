import type { SocketZoneTextContent } from '../types';

export const zhBoardZones: Record<string, SocketZoneTextContent> = {
  socket_cpu: {
    id: 'socket_cpu',
    name: 'CPU 處理器插座 (LGA1700 / AM5)',
    label: 'CPU 插座',
    sublabel: 'LGA1700 / AM5 零插拔力插座 (ZIF)'
  },
  vrm_heatsinks: {
    id: 'vrm_heatsinks',
    name: '核心供電模組 (VRM) 側邊主散熱裝甲',
    label: 'VRM 主散熱裝甲',
    sublabel: '16+1+1 相純數位供電'
  },
  vrm_top: {
    id: 'vrm_top',
    name: '核心供電模組 (VRM) 頂部散熱片',
    label: 'VRM 頂部散熱片',
    sublabel: 'MOSFET / 高效電感散熱覆蓋'
  },
  eps_cpu_power: {
    id: 'eps_cpu_power',
    name: '8-Pin EPS CPU 處理器輔助供電插座',
    label: 'CPU 供電插座 (8-Pin)',
    sublabel: '+12V 大電流專用輸入'
  },
  ram_slot_1: {
    id: 'ram_slot_1',
    name: 'DDR5 記憶體插槽 1 (通道 A1)',
    label: '記憶體 A1',
    sublabel: '插槽 1 (次選副槽 / 建議留空)'
  },
  ram_slot_2: {
    id: 'ram_slot_2',
    name: 'DDR5 記憶體插槽 2 (通道 A2 - 推薦雙通道首選主槽)',
    label: '記憶體 A2 ★',
    sublabel: '插槽 2 (推薦雙通道首選主槽)'
  },
  ram_slot_3: {
    id: 'ram_slot_3',
    name: 'DDR5 記憶體插槽 3 (通道 B1)',
    label: '記憶體 B1',
    sublabel: '插槽 3 (次選副槽 / 四條插滿時使用)'
  },
  ram_slot_4: {
    id: 'ram_slot_4',
    name: 'DDR5 記憶體插槽 4 (通道 B2 - 推薦雙通道首選主槽)',
    label: '記憶體 B2 ★',
    sublabel: '插槽 4 (推薦雙通道首選主槽)'
  },
  cpu_fan_header: {
    id: 'cpu_fan_header',
    name: 'CPU 散熱器風扇專用插針 (4-Pin PWM)',
    label: 'CPU_FAN 風扇插針',
    sublabel: '4-Pin PWM 智慧溫控調速'
  },
  m2_slot_1: {
    id: 'm2_slot_1',
    name: '第一組 M.2 NVMe 固態硬碟插槽 (直連 CPU PCIe 5.0)',
    label: 'M.2 NVMe (直連主槽)',
    sublabel: '直連 CPU PCIe 5.0 x4 極速通道'
  },
  pcie_x16_1: {
    id: 'pcie_x16_1',
    name: '第一組 PCIe 5.0 x16 顯示卡直連全速插槽',
    label: 'PCIe 5.0 x16 (顯示卡主槽)',
    sublabel: 'CPU 直連滿血頻寬插槽'
  },
  m2_slot_2: {
    id: 'm2_slot_2',
    name: '第二組 M.2 NVMe 固態硬碟插槽 (晶片組通道)',
    label: 'M.2 NVMe (擴充副槽)',
    sublabel: '晶片組 PCIe 4.0 x4 通道'
  },
  pcie_x16_2: {
    id: 'pcie_x16_2',
    name: '第二組 PCIe x16 擴充插槽 (實體全長 / 電氣 x4 模式)',
    label: 'PCIe x16 (電氣 x4 頻寬)',
    sublabel: '晶片組總線擴充插槽'
  },
  chipset_heatsink: {
    id: 'chipset_heatsink',
    name: '主機板南橋晶片組 (PCH) 散熱裝甲',
    label: '晶片組散熱片 (PCH)',
    sublabel: 'B650 / Z790 晶片核心'
  },
  atx_24pin: {
    id: 'atx_24pin',
    name: '24-Pin ATX 主機板主供電插座',
    label: '24-Pin ATX 主供電',
    sublabel: '+12V / +5V / +3.3V 主迴路'
  },
  sata_ports: {
    id: 'sata_ports',
    name: 'SATA 6Gbps 儲存裝置資料傳輸埠群',
    label: 'SATA 6Gb/s 連接埠',
    sublabel: '2.5 吋 SSD / 3.5 吋 HDD'
  },
  front_panel_header: {
    id: 'front_panel_header',
    name: '機殼前面板控制跳線排針座 (JFP1)',
    label: '前面板跳線 (JFP1)',
    sublabel: '開機按鈕 / 重置鍵 / 狀態指示燈'
  },
  rear_io_block: {
    id: 'rear_io_block',
    name: '後置 I/O 輸出入連接埠區與一體化擋板',
    label: '後置 I/O 背板',
    sublabel: 'USB、2.5G 高速網口、音訊、Wi-Fi'
  },
  audio_codec: {
    id: 'audio_codec',
    name: '獨立音效解碼晶片與高階音響級電容',
    label: '高傳真音效解碼晶片',
    sublabel: '獨立音效隔離雜訊走線'
  }
};
