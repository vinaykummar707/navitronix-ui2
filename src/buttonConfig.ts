import { Eye, ToggleRight, Thermometer, Cpu, Calendar, Database, Power, BadgeCent, BadgeCheck, ClipboardList, Globe, Hash, Truck, User, type LucideIcon, Barcode, File, Text, Settings, Repeat, Clock, LinkIcon, RefreshCw, FileText, Lightbulb, Columns, Rows, Trash2, ListChecks, Zap, BatteryWarning, Flame, Sun } from "lucide-react";

// Define available types of operations
export type OperationType = "read" | "write";

// Define the config type for each button
export interface ButtonConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  endpoint: string;
  payload?: Record<string, any>;
  disabled?: boolean;
  category?: string; // ADDED: to indicate grouping/category
}

// Categorized configs
const boardInfoConfigs: ButtonConfig[] = [
    { id: "hardware-revision", label: "Hardware Revision", icon: BadgeCheck, endpoint: "/api/board/hw-revision", category: "Board Info" },
    { id: "serial-no", label: "Serial No", icon: Hash, endpoint: "/api/board/serial-no", category: "Board Info" },
    { id: "article-no-sign-level", label: "Article No Sign Level", icon: Barcode, endpoint: "/api/board/article-sign-level", category: "Board Info" },
    { id: "production-date", label: "Production Date", icon: Calendar, endpoint: "/api/board/production-date", category: "Board Info" },
    { id: "end-customer", label: "End Customer", icon: User, endpoint: "/api/board/end-customer", category: "Board Info" },
    { id: "order-no", label: "Order No", icon: ClipboardList, endpoint: "/api/board/order-no", category: "Board Info" },
    { id: "vehicle-type", label: "Vehicle Type", icon: Truck, endpoint: "/api/board/vehicle-type", category: "Board Info" },
    { id: "bus-builder-no", label: "Bus Builder No", icon: BadgeCent, endpoint: "/api/board/bus-builder-no", category: "Board Info" },
    { id: "language", label: "Language", icon: Globe, endpoint: "/api/board/language", category: "Board Info" },
  ];

  const cpuInfoConfigs: ButtonConfig[] = [
    { id: "cpu-part-no", label: "CPU Part No", icon: Cpu, endpoint: "/api/cpu/part-no", category: "CPU Info" },
    { id: "cpu-qualification", label: "CPU Qualification", icon: BadgeCheck, endpoint: "/api/cpu/qualification", category: "CPU Info" },
    { id: "cpu-temp-range", label: "CPU Temparature Range", icon: Thermometer, endpoint: "/api/cpu/temp-range", category: "CPU Info" },
    { id: "internal-cpu-temp", label: "Internal CPU Temp", icon: Thermometer, endpoint: "/api/cpu/internal-temp", category: "CPU Info" },
    { id: "min-temp-cpu", label: "Min Temp CPU", icon: Thermometer, endpoint: "/api/cpu/min-temp", category: "CPU Info" },
    { id: "max-temp-cpu", label: "MAX Temp CPU", icon: Thermometer, endpoint: "/api/cpu/max-temp", category: "CPU Info" },
  ];

  const firmwareInfoConfigs: ButtonConfig[] = [
    { id: "boot-loader-sw-rev", label: "Boot Loader S/W Rev", icon: Database, endpoint: "/api/fw/bootloader", category: "Firmware Info" },
    { id: "application-sw-rev", label: "Application S/W Rev", icon: File, endpoint: "/api/fw/app-sw", category: "Firmware Info" },
    { id: "font-library-rev", label: "Font Library Rev", icon: Text, endpoint: "/api/fw/font-lib", category: "Firmware Info" },
    { id: "fw-compile-datetime", label: "Compilation of FW Date Time", icon: Calendar, endpoint: "/api/fw/compile-datetime", category: "Firmware Info" },
    { id: "flash-update-status", label: "Flash Update Status", icon: Settings, endpoint: "/api/fw/flash-update-status", category: "Firmware Info" },
  ];

  const tempInfoConfigs: ButtonConfig[] = [
    { id: "board-temp-sensor", label: "Board Temp Sensor", icon: Thermometer, endpoint: "/api/board/temp-sensor", category: "Temperature Info" },
    { id: "max-temp-board", label: "MAX Temp Board", icon: Thermometer, endpoint: "/api/board/max-temp", category: "Temperature Info" },
    { id: "min-temp-board", label: "Min Temp Board", icon: Thermometer, endpoint: "/api/board/min-temp", category: "Temperature Info" },
  ];
  
  const voltageInfoConfigs: ButtonConfig[] = [
    { id: "max-input-power-volt", label: "MAX Input Power Volt", icon: Power, endpoint: "/api/board/max-power", category: "Voltage Info" },
    { id: "min-input-power-volt", label: "Min Input Power Volt", icon: Power, endpoint: "/api/board/min-power", category: "Voltage Info" },
  ];
  
  const operationInfoConfigs: ButtonConfig[] = [
    { id: "operating-hours", label: "Operating Hours", icon: Clock, endpoint: "/api/board/operating-hours", category: "Operation Info" },
    { id: "no-of-resets", label: "No of Resets", icon: Repeat, endpoint: "/api/board/no-of-resets", category: "Operation Info" },
    { id: "test-date-time", label: "Test Date Time", icon: Calendar, endpoint: "/api/board/test-datetime", category: "Operation Info" },
  ];

  const basicOperationConfigs: ButtonConfig[] = [
    { id: "operation-data", label: "Data", icon: Database, endpoint: "/api/operation/data", category: "Basic Operations" },
    { id: "operation-link", label: "Link", icon: LinkIcon, endpoint: "/api/operation/link", category: "Basic Operations" },
    { id: "operation-reset", label: "Reset", icon: RefreshCw, endpoint: "/api/operation/reset", category: "Basic Operations" },
    { id: "operation-test", label: "Test", icon: FileText, endpoint: "/api/operation/test", category: "Basic Operations" },
    { id: "operation-led", label: "LED", icon: Lightbulb, endpoint: "/api/operation/led", category: "Basic Operations" },
    { id: "operation-column", label: "Column", icon: Columns, endpoint: "/api/operation/column", category: "Basic Operations" },
    { id: "operation-row", label: "Row", icon: Rows, endpoint: "/api/operation/row", category: "Basic Operations" },
    { id: "operation-delete", label: "Delete", icon: Trash2, endpoint: "/api/operation/delete", category: "Basic Operations" },
  ];

  const dtcOperationConfigs: ButtonConfig[] = [
    { id: "dtc-high-voltage", label: "High Voltage", icon: Zap, endpoint: "/api/dtc/high-voltage", category: "DTC Operations" },
    { id: "dtc-low-voltage", label: "Low Voltage", icon: BatteryWarning, endpoint: "/api/dtc/low-voltage", category: "DTC Operations" },
    { id: "dtc-over-heat", label: "Over Heat", icon: Flame, endpoint: "/api/dtc/over-heat", category: "DTC Operations" },
  ];

  const intensityConfig: ButtonConfig[] = [
    { id: "intensity", label: "Intensity", icon: Sun, endpoint: "/api/dtc/intensity", category: "Intensity" },
  ];

 

// Default/example configs
export const buttonConfigs: ButtonConfig[] = [
  {
    id: "read-board-status",
    label: "Read Board Status",
    icon: Eye,
    endpoint: "/api/board/status",
  },
  {
    id: "write-board-toggle",
    label: "Toggle Board",
    icon: ToggleRight,
    endpoint: "/api/board/toggle",
    payload: { state: "toggle" },
  },
];

// --- Export categorized variable objects as requested ---

export {
  boardInfoConfigs,
  cpuInfoConfigs,
  firmwareInfoConfigs,
  tempInfoConfigs,
  voltageInfoConfigs,
  operationInfoConfigs,
  basicOperationConfigs,
  dtcOperationConfigs,
  intensityConfig
};

// ...rest of code...