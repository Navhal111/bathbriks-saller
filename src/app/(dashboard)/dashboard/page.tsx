'use client';

import RecentOrder from "@/views/dashboard/recent-order";
import SalesReport from "@/views/dashboard/sales-report";
import StatCards from "@/views/dashboard/stat-cards";
import { ordersData } from '@/data/orders-data';

export default function Home() {

    return (
        <div className="@container">
            <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">

                <StatCards className="@2xl:grid-cols-4 @3xl:gap-6 @4xl:col-span-2 @7xl:col-span-12" />

                <SalesReport className="@4xl:col-span-2 @7xl:col-span-12" />

                <RecentOrder
                    OrderList={(ordersData || []).slice(0, 5)}
                    isLoading={false}
                    className="relative @4xl:col-span-2 @7xl:col-span-12"
                />
            </div>
        </div>
    );
}