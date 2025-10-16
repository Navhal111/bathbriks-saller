'use client';

import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/use-TanStack-Table';
import { TableClassNameProps } from '@/components/table/table-types';
import { Meta } from '@/kit/models/_generic';
import ServerPagination from '@/kit/components/Table/ServerPagination';
import { walletColumns } from './column';
import { WalletType } from '@/kit/models/Wallet';
import Filters from './filter';

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends unknown> {
        handleView?: (data: TData) => void;
    }
}

export default function WalletTable({
    WalletList,
    isLoading,
    hideFilters = false,
    hidePagination = false,
    classNames = {
        container: 'border border-muted rounded-md',
        rowClassName: 'last:border-0',
    },
    searchQuery,
    setSearchQuery,
    meta,
    page,
    setPage,
    pageSize = 5,
    setPageSize,
    search,
    setSearch,
    onView
}: {
    WalletList: WalletType[];
    isLoading: boolean;
    hideFilters?: boolean;
    hidePagination?: boolean;
    classNames?: TableClassNameProps;
    searchQuery?: string;
    setSearchQuery?: (query: string) => void;
    meta?: Meta
    page: number;
    setPage: (page: number) => void;
    pageSize: number;
    setPageSize: (size: number) => void;
    search?: { startDate: string; endDate: string };
    setSearch?: (search: { startDate: string; endDate: string }) => void;
    onView: (data: WalletType) => void;
}) {

    const handleView = (data: WalletType) => {
        onView(data)
    }

    const { table, setData } = useTanStackTable<WalletType>({
        tableData: WalletList,
        columnConfig: walletColumns,
        options: {
            initialState: {
                pagination: {
                    pageIndex: 0,
                    pageSize: pageSize,
                },
            },
            meta: {
                handleView
            },
            enableColumnResizing: false,
        },
    });

    return (
        <>
            {!hideFilters && <Filters table={table} searchQuery={searchQuery} setSearchQuery={setSearchQuery} search={search} setSearch={setSearch} />}
            <Table table={table} isLoading={isLoading} variant="modern" classNames={classNames} />
            {!hidePagination && (
                <ServerPagination
                    pageIndex={meta?.currentPage ?? 1}
                    pageSize={pageSize}
                    totalPages={meta?.totalPages ?? 1}
                    onPageChange={(page) => setPage(page)}
                    onPageSizeChange={(size) => {
                        setPageSize(size);
                        setPage(1);
                    }}
                    className="py-4"
                />
            )}
        </>
    );
}
