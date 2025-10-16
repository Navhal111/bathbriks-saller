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

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends unknown> {
    handleEditRow?: (data: TData) => void;
    handleDeleteRow?: (data: TData) => void;
  }
}

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
  onEdit,
  onDelete
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
  onEdit: (data: SubCategoryData) => void;
  onDelete: (data: SubCategoryData) => void;
}) {

  const handleEditRow = (data: SubCategoryData) => {
    onEdit(data)
  }

  const handleDeleteRow = (data: SubCategoryData) => {
    onDelete(data)
  }

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
      meta: {
        handleDeleteRow,
        handleEditRow
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
