'use client';

import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/use-TanStack-Table';
import TableFooter from '@/components/table/footer';
import { TableClassNameProps } from '@/components/table/table-types';
import { exportToCSV } from '@/utils/export-to-csv';
import { categoriesListColumns } from './columns';
import Filters from './filters';
import { CategoryType } from '@/kit/models/Category';
import { Meta } from '@/kit/models/_generic';
import ServerPagination from '@/kit/components/Table/ServerPagination';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends unknown> {
    handleEditRow?: (data: TData) => void;
    handleDeleteRow?: (data: TData) => void;
  }
}

export default function CategoriesTable({
  CategoryList,
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
  pageSize = 5,
  setPage,
  setPageSize,
  onEdit,
  onDelete,
}: {
  CategoryList: CategoryType[];
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
  onEdit: (data: CategoryType) => void;
  onDelete: (data: CategoryType) => void;
}) {

  const handleEditRow = (data: CategoryType) => {
    onEdit(data)
  }

  const handleDeleteRow = (data: CategoryType) => {
    onDelete(data)
  }

  const { table, setData } = useTanStackTable<CategoryType>({
    tableData: CategoryList,
    columnConfig: categoriesListColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: pageSize,
        },
      },
      meta: {
        handleDeleteRow,
        handleEditRow,
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
      {!hideFilters && <Filters table={table} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
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
