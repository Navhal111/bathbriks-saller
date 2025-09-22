"use client";

import MainTable from "@/kit/components/Table";
import TablePagination from "@/kit/components/Table/pagination";
import { useTanStackTable } from "@/kit/components/Table/use-TanStack-Table";
import { InventoryAlert } from "@/kit/models/InventoryAlert";
import { InventoryNegativeStockColumn } from "./InventoryNegativeStockColumn";
import { useEffect } from "react";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends unknown> {
    handleDeleteRow?: (data: TData) => void;
    handleCheckDisplayRow?: (data: TData) => void;
  }
}

interface InventoryNegativeStockTableProps {
  inventoryStockout: InventoryAlert[];
  onDelete: (data: InventoryAlert) => void;
  onCheckDisplay: (data: InventoryAlert) => void;
  isAlertsLoading?: boolean;
}

export default function InventoryNegativeStockTable({
  inventoryStockout,
  onDelete,
  onCheckDisplay,
  isAlertsLoading,
}: InventoryNegativeStockTableProps) {
  const handleDeleteRow = (data: InventoryAlert) => {
    onDelete(data);
  };

  const handleCheckDisplayRow = (data: InventoryAlert) => {
    onCheckDisplay(data);
  };

  const { table, setData } = useTanStackTable<InventoryAlert>({
    tableData: inventoryStockout,
    columnConfig: InventoryNegativeStockColumn,
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
        handleCheckDisplayRow,
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
        isLoading={isAlertsLoading}
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
