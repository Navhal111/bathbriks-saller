'use client';

import PageHeader from '@/app/(dashboard)/shared/page-header';
import { useState } from 'react';
import KitDebouncedSearchInput from '@/kit/components/KitDebouncedSearchInput';
import { Box, cn } from "rizzui";
import { useGetAllWalletList } from '@/kit/hooks/data/wallet';
import { walletData } from '@/data/wallet-data';
import WalletTable from './list/table';
import WidgetCard from '@/components/cards/widget-card';
import WithdrawlPage from '@/views/withdrawl/WithdrawlPage';
import KitMetricCard from '@/kit/components/KitMetricCard/KitMetricCard';
import TicketIcon from '@/components/icons/ticket';
import MoneyInHand from '@/components/icons/money-in-hand';
import { WalletType } from '@/kit/models/Wallet';
import KitShow from '@/kit/components/KitShow/KitShow';
import WalletViewModal from '@/views/wallet/WalletViewModal';

const pageHeader = {
    title: 'Wallet',
    breadcrumb: [
        {
            href: "/dashboard",
            name: 'Dashboard',
        },
        {
            name: 'Wallet',
        },
    ],
};

const ticketStats = [
    {
        id: 1,
        icon: <MoneyInHand className="h-full w-full" />,
        title: 'Wallet Amount',
        metric: '1000',
    },
    {
        id: 2,
        icon: <TicketIcon className="h-full w-full" />,
        title: 'Pending',
        metric: '500',
    }
];


export default function WalletPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [search, setSearch] = useState({
        startDate: '',
        endDate: '',
    })
    const [selectedWallet, setSelectedWallet] = useState<WalletType>()
    const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false)

    const debouncedSearch = KitDebouncedSearchInput(searchQuery, 500);

    const { WalletList, isWalletListLoading, refreshWalletList } = useGetAllWalletList({ page, size: pageSize, search: debouncedSearch, startDate: search.startDate, endDate: search.endDate });

    const toggleWalletModal = () => setIsWalletModalOpen(!isWalletModalOpen)

    const orderView = (data: WalletType) => {
        setSelectedWallet(data)
        toggleWalletModal()
    }

    return (
        <>
            <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

            <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4 mb-4')}>
                {ticketStats.map((stat) => (
                    <KitMetricCard
                        key={stat.title + stat.id}
                        title={stat.title}
                        metric={`$${stat.metric}`}
                        icon={stat.icon}
                        iconClassName="bg-transparent w-11 h-11"
                    />
                ))}
            </div>

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
                            onView={orderView}
                        />
                    </div>
                </div>
            </Box>


            <KitShow show={isWalletModalOpen}>
                <WalletViewModal
                    isOpen={isWalletModalOpen}
                    onClose={toggleWalletModal}
                    selectedWallet={selectedWallet}
                />
            </KitShow>
        </>
    );
}
