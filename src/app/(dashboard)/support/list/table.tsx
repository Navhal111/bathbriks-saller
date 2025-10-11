'use client';

import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/use-TanStack-Table';
import { TableClassNameProps } from '@/components/table/table-types';
import { supportListColumns } from './columns';
import Filters from './filters';
import { Meta } from '@/kit/models/_generic';
import ServerPagination from '@/kit/components/Table/ServerPagination';
import { useEffect } from 'react';
import { SupoortType } from '@/kit/models/Supoort';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends unknown> {
    handlChatRow?: (data: TData) => void;
    handleDeleteRow?: (data: TData) => void;
  }
}

export default function SupportTable({
  SupportList,
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
  pageSize = 5,
  setPage,
  setPageSize,
  onChat,
  onDelete
}: {
  SupportList: SupoortType[];
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
  onChat: (data: SupoortType) => void;
  onDelete: (data: SupoortType) => void;
}) {

  const handlChatRow = (data: SupoortType) => {
    onChat(data)
  }

  const handleDeleteRow = (data: SupoortType) => {
    onDelete(data)
  }

  const { table, setData } = useTanStackTable<SupoortType>({
    tableData: SupportList,
    columnConfig: supportListColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: pageSize,
        },
      },
      meta: {
        handlChatRow,
        handleDeleteRow
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    if (Array.isArray(SupportList)) {
      setData(SupportList);
    }
  }, [SupportList, setData]);

  return (
    <>
      {!hideFilters && <Filters table={table} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
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
