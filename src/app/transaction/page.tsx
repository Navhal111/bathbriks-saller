'use client';

import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { useState } from 'react';
import KitDebouncedSearchInput from '@/kit/components/KitDebouncedSearchInput';
import { useGetAllTransactionList } from '@/kit/hooks/data/transaction';
import { transactionsData } from '@/data/transaction-data';
import TransactionTable from './list/table';

const pageHeader = {
    title: 'Transactions',
    breadcrumb: [
        {
            href: "/",
            name: 'Dashboard',
        },
        {
            name: 'Transaction List',
        },
    ],
};

export default function TransactionPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [search, setSearch] = useState({
        startDate: '',
        endDate: '',
    })

    const debouncedSearch = KitDebouncedSearchInput(searchQuery, 500);

    const queryParams = {
        page: page,
        size: pageSize,
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(search.startDate && { startDate: search.startDate }),
        ...(search.endDate && { endDate: search.endDate }),
    }

    const { TransactionList, isTransactionListLoading } = useGetAllTransactionList(queryParams);

    return (
        <>
            <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
                <div className="mt-4 flex items-center gap-3 @lg:mt-0">
                    <ExportButton
                        data={transactionsData}
                        fileName="category_data"
                        header="ID,Amount,Transaction type,Date,Status"
                    />
                </div>
            </PageHeader>

            <TransactionTable
                TransactionList={transactionsData}
                isLoading={false}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                meta={TransactionList?.meta}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                search={search}
                setSearch={setSearch}
            />
        </>
    );
}
