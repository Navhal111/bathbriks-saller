'use client';

import PageHeader from '@/app/shared/page-header';
import { useState } from 'react';
import KitDebouncedSearchInput from '@/kit/components/KitDebouncedSearchInput';
import { useGetAllTransactionList } from '@/kit/hooks/data/transaction';
// import TransactionTable from './list/table';
import { Box, Grid, Text, Title } from "rizzui";
import { useGetAllWalletList } from '@/kit/hooks/data/wallet';
import { walletData } from '@/data/wallet-data';
import WalletTable from './list/table';
import WidgetCard from '@/components/cards/widget-card';
import WithdrawlPage from '@/views/withdrawl/WithdrawlPage';

const pageHeader = {
    title: 'Wallet',
    breadcrumb: [
        {
            href: "/",
            name: 'Dashboard',
        },
        {
            name: 'Wallet',
        },
    ],
};

export default function WalletPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [search, setSearch] = useState({
        startDate: '',
        endDate: '',
    })

    const debouncedSearch = KitDebouncedSearchInput(searchQuery, 500);

    const { WalletList, isWalletListLoading, refreshWalletList } = useGetAllWalletList({ page, size: pageSize, search: debouncedSearch, startDate: search.startDate, endDate: search.endDate });

    return (
        <>
            <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

            <Box className="mb-4 inline-block w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col items-start gap-2 bg-green-200 rounded-lg p-4">
                        <Text className="text-xl font-semibold">Wallet Amount</Text>
                        <Text className="text-xl font-semibold">$1000</Text>
                    </div>
                    <div className="flex flex-col items-start gap-2 bg-red-200 rounded-lg p-4">
                        <Text className="text-xl font-semibold">Pending</Text>
                        <Text className="text-xl font-semibold">$500</Text>
                    </div>
                </div>
            </Box>

            <Box className="mb-4 inline-block w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <WidgetCard
                        className="p-4 @container lg:p-4"
                        titleClassName="whitespace-nowrap font-inter"
                    >
                        <WithdrawlPage onRefresh={refreshWalletList} />
                    </WidgetCard>
                    <div className='flex flex-col'>
                        {/* <Title className="mb-2 text-lg lg:text-xl 4xl:text-2xl">Wallet List</Title> */}
                        <WalletTable
                            WalletList={walletData}
                            isLoading={false}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            meta={WalletList?.meta}
                            page={page}
                            setPage={setPage}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            search={search}
                            setSearch={setSearch}
                        />
                    </div>
                </div>
            </Box>
        </>
    );
}
