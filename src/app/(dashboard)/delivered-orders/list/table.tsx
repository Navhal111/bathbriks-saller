'use client';

import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/use-TanStack-Table';
import TableFooter from '@/components/table/footer';
import { TableClassNameProps } from '@/components/table/table-types';
import { exportToCSV } from '@/utils/export-to-csv';
import { SellerOrderType } from '@/kit/models/Order';
import Filters from './filters';
import { Meta } from '@/kit/models/_generic';
import ServerPagination from '@/kit/components/Table/ServerPagination';
import { filterParamsProps } from '../page';
import { useEffect } from 'react';
import { ordersListColumns } from './columns';

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends unknown> {
        handleDeleteRow?: (data: TData) => void;
        handleView?: (data: TData) => void;
    }
}

export default function DeliveredOrdersTable({
    DeliveredOrderList,
    isLoading,
    hideFilters = false,
    hidePagination = false,
    hideFooter = false,
    classNames = {
        container: 'border border-muted rounded-md',
        rowClassName: 'last:border-0',
    },
    paginationClassName,
    searchQuery,
    setSearchQuery,
    meta,
    page,
    setPage,
    pageSize = 5,
    setPageSize,
    onDelete,
    onView,
    search,
    setSearch
}: {
    DeliveredOrderList: SellerOrderType[];
    isLoading: boolean;
    hideFilters?: boolean;
    hidePagination?: boolean;
    hideFooter?: boolean;
    classNames?: TableClassNameProps;
    paginationClassName?: string;
    searchQuery?: string;
    setSearchQuery?: (query: string) => void;
    meta?: Meta
    page: number;
    setPage: (page: number) => void;
    pageSize: number;
    setPageSize: (size: number) => void;
    onDelete: (data: SellerOrderType) => void;
    onView: (data: SellerOrderType) => void;
    search?: filterParamsProps;
    setSearch?: (search: filterParamsProps) => void;
}) {

    const handleView = (data: SellerOrderType) => {
        onView(data)
    }

    const handleDeleteRow = (data: SellerOrderType) => {
        onDelete(data)
    };

    const { table, setData } = useTanStackTable<SellerOrderType>({
        tableData: DeliveredOrderList,
        columnConfig: ordersListColumns,
        options: {
            initialState: {
                pagination: {
                    pageIndex: 0,
                    pageSize: pageSize,
                },
            },
            meta: {
                handleDeleteRow,
                handleView
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

    useEffect(() => {
        if (Array.isArray(DeliveredOrderList)) {
            setData(DeliveredOrderList);
        }
    }, [DeliveredOrderList, setData]);

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


