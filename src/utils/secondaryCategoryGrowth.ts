import { SecondaryCategoryMonthlyRevenueData } from "@/kit/models/SecondaryCategoryRevenue";

export function calculateMoMStats(data: SecondaryCategoryMonthlyRevenueData[]) {
        const mergedByMonth = data.reduce((acc, item) => {
            const month = item.month;

            if (!acc[month]) {
                acc[month] = {
                    month: item.month,
                    monthly_revenue: parseFloat(item.monthly_revenue),
                    monthly_customers: parseFloat(item.monthly_customers),
                    monthly_invoices: parseFloat(item.monthly_invoices),
                };
            } else {
                acc[month].monthly_revenue += parseFloat(item.monthly_revenue);
                acc[month].monthly_customers += parseFloat(item.monthly_customers);
                acc[month].monthly_invoices += parseFloat(item.monthly_invoices);
            }

            return acc;
        }, {} as Record<string, { month: string; monthly_revenue: number; monthly_customers: number; monthly_invoices: number }>);

        const mergedArray = Object.values(mergedByMonth).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
        if (mergedArray.length < 2) return null;

        const firstMonth = mergedArray[0];
        const currentMonth = mergedArray[mergedArray.length - 1];

        const firstVolume = firstMonth.monthly_invoices;
        const currentVolume = currentMonth.monthly_invoices;
        const volumeGrowth = ((currentVolume - firstVolume) / (firstVolume || 1)) * 100;

        const firstRevenue = firstMonth.monthly_revenue;
        const currentRevenue = currentMonth.monthly_revenue;
        const revenueGrowth = ((currentRevenue - firstRevenue) / (firstRevenue || 1)) * 100;

        const firstCustomers = firstMonth.monthly_customers;
        const currentCustomers = currentMonth.monthly_customers;
        const customerPercent = ((currentCustomers - firstCustomers) / (firstCustomers || 1)) * 100;

        return {
            volumeGrowth: volumeGrowth.toFixed(1),
            revenueGrowth: revenueGrowth.toFixed(1),
            customerPercent: customerPercent.toFixed(1),
            isVolumeUp: volumeGrowth >= 0,
            isRevenueUp: revenueGrowth >= 0
        };
    }
