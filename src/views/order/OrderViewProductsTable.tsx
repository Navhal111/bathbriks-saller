'use client';

import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/use-TanStack-Table';
import { TableClassNameProps } from '@/components/table/table-types';
import { OrderProducts } from '@/kit/models/Order';
import { OrderViewProductsColumn } from './OrderViewProductsColumn';
import { useEffect } from 'react';


export default function OrderViewProductsTable({
  OrderList,
  classNames = {
    container: 'border border-muted rounded-md',
    rowClassName: 'last:border-0',
  },
}: {
  OrderList: OrderProducts[];
  classNames?: TableClassNameProps;
}) {

  const { table, setData } = useTanStackTable<OrderProducts>({
    tableData: OrderList,
    columnConfig: OrderViewProductsColumn,
    options: {
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
      <Table table={table} variant="modern" classNames={classNames} />
    </>
  );
}
