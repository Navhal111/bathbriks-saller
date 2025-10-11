'use client';

import { Text } from 'rizzui';
import { PiCaretDoubleUpDuotone, PiCaretDoubleDownDuotone, PiGiftDuotone, PiBankDuotone, PiChartPieSliceDuotone } from 'react-icons/pi';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import cn from '@/utils/class-names';
import KitMetricCard from '@/kit/components/KitMetricCard/KitMetricCard';

const orderData = [
    {
        day: 'Sunday',
        sale: 4000,
        cost: 2400,
    },
    {
        day: 'Monday',
        sale: 3000,
        cost: 1398,
    },
    {
        day: 'Tuesday',
        sale: 2000,
        cost: 9800,
    },
    {
        day: 'Wednesday',
        sale: 2780,
        cost: 3908,
    },
    {
        day: 'Thursday',
        sale: 1890,
        cost: 4800,
    },
    {
        day: 'Friday',
        sale: 2390,
        cost: 3800,
    },
    {
        day: 'Saturday',
        sale: 3490,
        cost: 4300,
    },
];

const salesData = [
    {
        day: 'Sunday',
        sale: 2000,
        cost: 2400,
    },
    {
        day: 'Monday',
        sale: 3000,
        cost: 1398,
    },
    {
        day: 'Tuesday',
        sale: 2000,
        cost: 9800,
    },
    {
        day: 'Wednesday',
        sale: 2780,
        cost: 3908,
    },
    {
        day: 'Thursday',
        sale: 1890,
        cost: 4800,
    },
    {
        day: 'Friday',
        sale: 2390,
        cost: 3800,
    },
    {
        day: 'Saturday',
        sale: 3490,
        cost: 4300,
    },
];

const revenueData = [
    {
        day: 'Sunday',
        sale: 2000,
        cost: 2400,
    },
    {
        day: 'Monday',
        sale: 2800,
        cost: 1398,
    },
    {
        day: 'Tuesday',
        sale: 3500,
        cost: 9800,
    },
    {
        day: 'Wednesday',
        sale: 2780,
        cost: 3908,
    },
    {
        day: 'Thursday',
        sale: 1890,
        cost: 4800,
    },
    {
        day: 'Friday',
        sale: 2390,
        cost: 3800,
    },
    {
        day: 'Saturday',
        sale: 3490,
        cost: 4300,
    },
];

const eComDashboardStatData = [
    {
        id: '4',
        icon: <PiBankDuotone className="h-6 w-6" />,
        title: 'Total Products',
        metric: '100',
        increased: true,
        decreased: false,
        percentage: '+32.40',
        style: 'text-[#7928ca]',
        fill: '#7928ca',
        chart: revenueData,
    },
    {
        id: '1',
        icon: <PiGiftDuotone className="h-6 w-6" />,
        title: 'New Orders',
        metric: '1,390',
        increased: true,
        decreased: false,
        percentage: '+32.40',
        style: 'text-[#3872FA]',
        fill: '#3872FA',
        chart: orderData,
    },
    {
        id: '2',
        icon: <PiChartPieSliceDuotone className="h-6 w-6" />,
        title: 'Sales',
        metric: '₹57,890',
        increased: false,
        decreased: true,
        percentage: '-4.40',
        style: 'text-[#10b981]',
        fill: '#10b981',
        chart: salesData,
    },
    {
        id: '3',
        icon: <PiBankDuotone className="h-6 w-6" />,
        title: 'Revenue',
        metric: '₹12,390',
        increased: true,
        decreased: false,
        percentage: '+32.40',
        style: 'text-[#7928ca]',
        fill: '#7928ca',
        chart: revenueData,
    }
];

export default function StatCards({ className }: { className?: string }) {
    return (
        <div
            className={cn('grid grid-cols-1 gap-5 3xl:gap-8 4xl:gap-9', className)}
        >
            {eComDashboardStatData.map((stat) => (
                <KitMetricCard
                    key={stat.title + stat.id}
                    title={stat.title}
                    metric={stat.metric}
                    metricClassName="lg:text-[22px]"
                    icon={stat.icon}
                    iconClassName={cn(
                        '[&>svg]:w-10 [&>svg]:h-8 lg:[&>svg]:w-11 lg:[&>svg]:h-9 w-auto h-auto p-0 bg-transparent -mx-1.5',
                        stat.id === '1' &&
                        '[&>svg]:w-9 [&>svg]:h-7 lg:[&>svg]:w-[42px] lg:[&>svg]:h-[34px]',
                        stat.style
                    )}
                    chart={
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart barSize={5} barGap={2} data={stat.chart}>
                                <Bar dataKey="sale" fill={stat.fill} radius={5} />
                            </BarChart>
                        </ResponsiveContainer>
                    }
                    chartClassName="hidden @[200px]:flex @[200px]:items-center h-14 w-24"
                    className="@container [&>div]:items-center"
                />
            ))}
        </div>
    );
}
