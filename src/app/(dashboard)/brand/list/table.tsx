'use client';

import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/use-TanStack-Table';
import { TableClassNameProps } from '@/components/table/table-types';
import { brandListColumns } from './columns';
import Filters from './filters';
import { Meta } from '@/kit/models/_generic';
import ServerPagination from '@/kit/components/Table/ServerPagination';
import { useEffect } from 'react';
import { BrandType } from '@/kit/models/Brand';

export default function BrandTable({
  BrandList,
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
}: {
  BrandList: BrandType[];
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
}) {

  const { table, setData } = useTanStackTable<BrandType>({
    tableData: BrandList,
    columnConfig: brandListColumns,
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

  useEffect(() => {
    if (Array.isArray(BrandList)) {
      setData(BrandList);
    }
  }, [BrandList, setData]);

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
