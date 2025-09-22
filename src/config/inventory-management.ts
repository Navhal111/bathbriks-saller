import { DropdownOptions } from "@/types/dropdown-options";

export const DEFAULT_MAX_WOS = 8;

export const INVENTORY_MANAGEMENT_OPTIONS: DropdownOptions[] = [
  {
    label: "Stockout Alerts",
    value: "stockOut_alerts",
  },
  {
    label: "Negative Stock",
    value: "negative_stock",
  },
  {
    label: "Excess Stock",
    value: "excess_stock",
  },
  {
    label: "Dead Stock",
    value: "dead_stock",
  },
];
