'use client';

import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/use-TanStack-Table';
import { TableClassNameProps } from '@/components/table/table-types';
import { subCategoriesListColumns } from './column';
import Filters from './filters';
import { Meta } from '@/kit/models/_generic';
import ServerPagination from '@/kit/components/Table/ServerPagination';
import { SubCategoryData } from '@/kit/models/SubCategory';
import { useEffect } from 'react';


export default function SubCategoriesTable({
  SubCategoryList,
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
}: {
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
  SubCategoryList: SubCategoryData[];
  isLoading: boolean;
}) {

  const { table, setData } = useTanStackTable<SubCategoryData>({
    tableData: SubCategoryList,
    columnConfig: subCategoriesListColumns,
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
    if (Array.isArray(SubCategoryList)) {
      setData(SubCategoryList);
    }
  }, [SubCategoryList, setData]);

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
