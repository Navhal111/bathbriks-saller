import { DropdownOptions } from "@/types/dropdown-options";

export const ORDER_STATUS_OPTIONS: DropdownOptions[] = [
    {
        label: 'order started',
        value: 'order_started',
    },
    {
        label: 'dispatched',
        value: 'dispatched',
    },
    {
        label: 'cancelled',
        value: 'cancelled',
    },
    {
        label: 'return',
        value: 'return',
    },
    {
        label: 'delivered',
        value: 'delivered',
    },
]

export const LIVE_ORDER_STATUS_OPTIONS: DropdownOptions[] = [
    {
        label: 'order started',
        value: 'order_started',
    },
    {
        label: 'dispatched',
        value: 'dispatched',
    },
    {
        label: 'return',
        value: 'return',
    },
]