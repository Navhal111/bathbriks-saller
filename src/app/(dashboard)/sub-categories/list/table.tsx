'use client';

import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/use-TanStack-Table';
import TableFooter from '@/components/table/footer';
import { TableClassNameProps } from '@/components/table/table-types';
import { exportToCSV } from '@/utils/export-to-csv';
import { subCategoriesListColumns } from './column';
import Filters from './filters';
import { SubCategoryType } from '@/kit/models/SubCategory';
import { Meta } from '@/kit/models/_generic';
import ServerPagination from '@/kit/components/Table/ServerPagination';

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
  onEdit,
  onDelete
}: {
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
  SubCategoryList: SubCategoryType[];
  isLoading: boolean;
  onEdit: (data: SubCategoryType) => void;
  onDelete: (data: SubCategoryType) => void;
}) {

  const handleEditRow = (data: SubCategoryType) => {
    onEdit(data)
  }

  const handleDeleteRow = (data: SubCategoryType) => {
    onDelete(data)
  }

  const { table, setData } = useTanStackTable<SubCategoryType>({
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

  const selectedData = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  function handleExportData() {
    exportToCSV(
      selectedData,
      'ID,Name,Category,Status,Description',
      `sub_category_data_${selectedData.length}`
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
