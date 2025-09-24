'use client';

import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/use-TanStack-Table';
import { TableClassNameProps } from '@/components/table/table-types';
import { OrderProducts } from '@/kit/models/Order';
import { Meta } from '@/kit/models/_generic';
import ServerPagination from '@/kit/components/Table/ServerPagination';
import { OrderViewProductsColumn } from './OrderViewProductsColumn';
import { useEffect } from 'react';


export default function OrderViewProductsTable({
  OrderList,
  isLoading,
  classNames = {
    container: 'border border-muted rounded-md',
    rowClassName: 'last:border-0',
  },
  // meta,
  // page,
  // setPage,
  // pageSize = 5,
  // setPageSize,
}: {
  OrderList: OrderProducts[];
  isLoading: boolean;
  classNames?: TableClassNameProps;
  // meta?: Meta
  // page: number;
  // setPage: (page: number) => void;
  // pageSize: number;
  // setPageSize: (size: number) => void;
}) {

  const { table, setData } = useTanStackTable<OrderProducts>({
    tableData: OrderList,
    columnConfig: OrderViewProductsColumn,
    options: {
      initialState: {
        // pagination: {
        //   pageIndex: 0,
        //   pageSize: pageSize,
        // },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    if (Array.isArray(OrderList)) {
      setData(OrderList);
    }
  }, [OrderList, setData]);

  return (
    <>
      <Table table={table} isLoading={isLoading} variant="modern" classNames={classNames} />
      {/* <ServerPagination
        pageIndex={meta?.currentPage ?? 1}
        pageSize={pageSize}
        totalPages={meta?.totalPages ?? 1}
        onPageChange={(page) => setPage(page)}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
        className="py-4"
      /> */}
    </>
  );
}
