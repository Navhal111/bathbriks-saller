'use client';

import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/use-TanStack-Table';
import TableFooter from '@/components/table/footer';
import { TableClassNameProps } from '@/components/table/table-types';
import { exportToCSV } from '@/utils/export-to-csv';
import { Meta } from '@/kit/models/_generic';
import ServerPagination from '@/kit/components/Table/ServerPagination';
import { walletColumns } from './column';
import { WalletType } from '@/kit/models/Wallet';
import Filters from './filter';

export default function WalletTable({
    WalletList,
    isLoading,
    hideFilters = false,
    hidePagination = false,
    hideFooter = false,
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
    setSearch
}: {
    WalletList: WalletType[];
    isLoading: boolean;
    hideFilters?: boolean;
    hidePagination?: boolean;
    hideFooter?: boolean;
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
}) {

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
            enableColumnResizing: false,
        },
    });

    const selectedData = table
        .getSelectedRowModel()
        .rows.map((row) => row.original);

    function handleExportData() {
        exportToCSV(
            selectedData,
            'ID,Name,Description,Status',
            `category_data_${selectedData.length}`
        );
    }

    return (
        <>
            {!hideFilters && <Filters table={table} searchQuery={searchQuery} setSearchQuery={setSearchQuery} search={search} setSearch={setSearch} />}
            <Table table={table} isLoading={isLoading} variant="modern" classNames={classNames} />
            {!hideFooter && <TableFooter table={table} onExport={handleExportData} />}
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
