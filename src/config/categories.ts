import { DropdownOptions } from "@/types/dropdown-options";

export const STATUS_OPTIONS: DropdownOptions[] = [
    {
        label: 'Draft',
        value: 'draft',
    },
    {
        label: 'Published',
        value: 'published',
    },
    {
        label: 'Pending',
        value: 'pending',
    },
]

export type StatusType =
    | 'draft'
    | 'published'
    | 'pending';