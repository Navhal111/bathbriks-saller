"use client";

import cn from "@/utils/class-names";
import { Badge, Flex, Text } from "rizzui";
import { replaceUnderscoreDash } from "@/utils/replace-underscore-dash";

const statusColors = {
    success: ["text-green-dark", "bg-green-200"],
    warning: ["text-orange-dark", "bg-orange-200"],
    danger: ["text-red-dark", "bg-red-200"],
    default: ["text-gray-900", "bg-gray-200"],
};

export const allStatus = {
    online: statusColors.success,
    offline: statusColors.default,
    pending: statusColors.warning,
    paid: statusColors.success,
    overdue: statusColors.danger,
    completed: statusColors.success,
    cancelled: statusColors.danger,
    publish: statusColors.success,
    approved: statusColors.success,
    rejected: statusColors.danger,
    active: statusColors.success,
    deactivated: statusColors.danger,
    on_going: statusColors.warning,
    at_risk: statusColors.danger,
    delayed: statusColors.default,
    draft: statusColors.default,
    refunded: statusColors.default,
    order_started: statusColors.default,
    dispatched: statusColors.success,
    cancel: statusColors.danger,
    return: statusColors.warning,
};

export type StatusTypes = keyof typeof allStatus;

export function getBadge(status: string) {
    const statusLower = status.toLowerCase() as StatusTypes;
    if (statusLower in allStatus) {
        return (
            <Flex align="center" gap="2" className="w-auto">
                <Badge
                    variant="flat"
                    className={allStatus[statusLower][1]}
                >
                    <Text className={cn("font-medium capitalize", allStatus[statusLower][0])}>
                        {replaceUnderscoreDash(statusLower)}
                    </Text>
                </Badge>
            </Flex>
        );
    }
    return (
        <Flex align="center" gap="2" className="w-auto">
            <Badge renderAsDot className="bg-gray-600" />
            <Text className="font-medium capitalize text-gray-600">
                {replaceUnderscoreDash(statusLower)}
            </Text>
            <Badge
                variant="flat"
                className='bg-gray-200'
            >
                <Text className={cn("font-medium capitalize bg-gray-dark")}>
                    {replaceUnderscoreDash(statusLower)}
                </Text>
            </Badge>
        </Flex>
    );
}
