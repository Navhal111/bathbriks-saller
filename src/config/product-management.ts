import { DropdownOptions } from "@/types/dropdown-options";

export const PAKE_SIZE_OPTIONS: DropdownOptions[] = [
  { value: "kilograms", label: "Kilograms" },
  { value: "grams", label: "Grams" },
  { value: "meters", label: "Meters" },
  { value: "inches", label: "Inches" },
  { value: "liters", label: "Liters" },
  { value: "milliliters", label: "Milliliters" },
  { value: "bags", label: "Bags" },
  { value: "pieces", label: "Pieces" },
  { value: "pages", label: "Pages" },
  { value: "tablets", label: "Tablets" },
];

export const EDIBILITY_OPTIONS: DropdownOptions[] = [
  { value: "food", label: "Food" },
  { value: "nonFood", label: "Non Food" },
];

export const FIELD_MANAGEMENT_OPTIONS: DropdownOptions[] = [
  {
    label: "GST",
    value: "gst",
  },
  {
    label: "Pack Size",
    value: "packSize",
  },
  {
    label: "Main Category",
    value: "mainCategory",
  },
  {
    label: "Sub Category",
    value: "subCategory",
  },
];
