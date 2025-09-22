"use client";

import MainTable from "@/kit/components/Table";
import TablePagination from "@/kit/components/Table/pagination";
import { useTanStackTable } from "@/kit/components/Table/use-TanStack-Table";
import { InventoryAlert } from "@/kit/models/InventoryAlert";
import { InventoryStockOutColumn } from "./InventoryStockOutColumn";
import { useEffect } from "react";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends unknown> {
    handleDeleteRow?: (data: TData) => void;
  }
}

interface InventoryStockoutTableProps {
  inventoryStockout: InventoryAlert[];
  onDelete: (data: InventoryAlert) => void;
  isAlertsLoading?: boolean;
}

export default function InventoryStockOutTable({
  inventoryStockout,
  onDelete,
}: InventoryStockoutTableProps) {
  const handleDeleteRow = (data: InventoryAlert) => {
    onDelete(data);
  };

  const { table, setData } = useTanStackTable<InventoryAlert>({
    tableData: inventoryStockout,
    columnConfig: InventoryStockOutColumn,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      enableColumnResizing: false,
      meta: {
        handleDeleteRow,
      },
    },
  });

  useEffect(() => {
    if (Array.isArray(inventoryStockout)) {
      setData(inventoryStockout);
    }
  }, [inventoryStockout, setData]);

  return (
    <>
      <MainTable
        table={table}
        isLoading={false}
        variant="modern"
        classNames={{
          container: "border border-muted rounded-md",
          rowClassName: "last:border-0",
        }}
      />
      <TablePagination table={table} className="py-4" />
    </>
  );
}
