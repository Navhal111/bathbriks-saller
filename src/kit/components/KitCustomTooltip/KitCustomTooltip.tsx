"use client";
import {
    ValueType,
    NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { TooltipProps } from "recharts";
import { Text } from "rizzui";
import cn from "@/utils/class-names";

function isValidHexColor(colorCode: string) {
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexColorRegex.test(colorCode);
}

function addSpacesToCamelCase(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
    prefix?: string;
    postfix?: string;
    className?: string;
    formattedNumber?: boolean;
}
function KitCustomTooltip({
    label,
    prefix,
    active,
    postfix,
    payload,
    className,
    formattedNumber,
    onHoverChange,
}: CustomTooltipProps & { onHoverChange?: (hovering: boolean) => void }) {
    const handleMouseEnter = () => onHoverChange?.(true);
    const handleMouseLeave = () => onHoverChange?.(false);

    if (!active) return null;

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "rounded-md border border-gray-300 bg-gray-0 shadow-2xl dark:bg-gray-100",
                "max-h-60 overflow-hidden",
                "pointer-events-auto",
                className
            )}
        >
            <Text className="label mb-0.5 block bg-gray-100 p-2 px-2.5 text-center font-lexend text-xs font-semibold capitalize text-gray-600 dark:bg-gray-200/60 dark:text-gray-700">
                {label}
            </Text>
            <div className="px-3 py-1.5 text-xs max-h-40 overflow-y-auto">
                {payload?.map((item: any, index: number) => (
                    <div
                        key={item.dataKey + index}
                        className="chart-tooltip-item flex items-center py-1.5"
                    >
                        <span
                            className="me-1.5 h-2 w-2 rounded-full"
                            style={{
                                backgroundColor: isValidHexColor(item.fill)
                                    ? item.fill === "#fff"
                                        ? item.stroke
                                        : item.fill
                                    : item.stroke,
                            }}
                        />
                        <Text>
                            <Text as="span" className="capitalize">
                                {addSpacesToCamelCase(item.dataKey)}:
                            </Text>{" "}
                            <Text
                                as="span"
                                className="font-medium text-gray-900 dark:text-gray-700"
                            >
                                {prefix && prefix}
                                {formattedNumber ? item.value : item.value}
                                {postfix && postfix}
                            </Text>
                        </Text>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default KitCustomTooltip
