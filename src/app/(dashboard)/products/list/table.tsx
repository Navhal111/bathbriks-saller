'use client';

import { productsData } from '@/data/products-data';
import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/use-TanStack-Table';
import TablePagination from '@/components/table/pagination';
import { productsListColumns } from './columns';
import Filters from './filters';
import TableFooter from '@/components/table/footer';
import { TableClassNameProps } from '@/components/table/table-types';
import cn from '@/utils/class-names';
import { exportToCSV } from '@/utils/export-to-csv';
import { Meta } from '@/kit/models/_generic';
import { ProductData, ProductType } from '@/kit/models/Product';
import ServerPagination from '@/kit/components/Table/ServerPagination';
import { useEffect, useState } from 'react';
import SendReviewPopup from './send-review-popup';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends unknown> {
    handleEditRow?: (data: TData) => void;
    handleDeleteRow?: (data: TData) => void;
    handleSendForReview?: (data: TData) => void;
  }
}

export default function ProductsTable({
  ProductList,
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
  pageSize = 5,
  setPage,
  setPageSize,
  onEdit,
  onDelete,
  onRefresh,
}: {
  ProductList: ProductData[];
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
  onEdit: (data: ProductData) => void;
  onDelete: (data: ProductData) => void;
  onRefresh?: () => void;
}) {
  const [selectedProductForReview, setSelectedProductForReview] = useState<ProductData | null>(null);
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);

  const handleEditRow = (data: ProductData) => {
    onEdit(data)
  }

  const handleDeleteRow = (data: ProductData) => {
    onDelete(data)
  }

  const handleSendForReview = (data: ProductData) => {
    setSelectedProductForReview(data);
    setIsReviewPopupOpen(true);
  }

  const handleReviewSuccess = () => {
    onRefresh && onRefresh();
  }

  const handleCloseReviewPopup = () => {
    setIsReviewPopupOpen(false);
    setSelectedProductForReview(null);
  }

  const { table, setData } = useTanStackTable<ProductData>({
    tableData: ProductList,
    columnConfig: productsListColumns,
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
        handleSendForReview
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
      'ID,Name,Category,Sku,Price,Stock,Status,Rating',
      `product_data_${selectedData.length}`
    );
  }

  useEffect(() => {
    if (Array.isArray(ProductList)) {
      setData(ProductList);
    }
  }, [ProductList, setData]);

  return (
    <>
      {!hideFilters && <Filters table={table} />}
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

      <SendReviewPopup
        isOpen={isReviewPopupOpen}
        onClose={handleCloseReviewPopup}
        product={selectedProductForReview}
        onSuccess={handleReviewSuccess}
      />
    </>
  );
}
