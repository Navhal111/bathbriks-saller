"use client";

import React, { useEffect } from "react";
import { useTanStackTable } from "@/kit/components/Table/use-TanStack-Table";
import MainTable from "@/kit/components/Table";
import TablePagination from "@/kit/components/Table/pagination";
import { InventoryExcessStockColumn } from "./InventoryExcessStockColumn";
import { InventoryAlert } from "@/kit/models/InventoryAlert";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends unknown> {
    handleDeleteRow?: (data: TData) => void;
    handleTransferRow?: (data: TData) => void;
    handleMarkdownRow?: (data: TData) => void;
    handleCheckDisplayRow?: (data: TData) => void;
    handleReturnRow?: (data: TData) => void;
  }
}

interface InventoryExcessStockTableProps {
  inventoryStockout: InventoryAlert[];
  onDelete: (data: InventoryAlert) => void;
  onTranfer: (data: InventoryAlert) => void;
  onMarkdown: (data: InventoryAlert) => void;
  onCheckDisplay: (data: InventoryAlert) => void;
  onReturn: (data: InventoryAlert) => void;
  isAlertsLoading?: boolean;
}

export default function InventoryExcessStockTable({
  inventoryStockout,
  onDelete,
  onTranfer,
  onMarkdown,
  onCheckDisplay,
  onReturn,
}: InventoryExcessStockTableProps) {

  const handleDeleteRow = (data: InventoryAlert) => {
    onDelete(data);
  };

  const handleTransferRow = (data: InventoryAlert) => {
    onTranfer(data);
  };

  const handleMarkdownRow = (data: InventoryAlert) => {
    onMarkdown(data);
  };

  const handleCheckDisplayRow = (data: InventoryAlert) => {
    onCheckDisplay(data);
  };

  const handleReturnRow = (data: InventoryAlert) => {
    onReturn(data)
  };


  const { table, setData } = useTanStackTable<InventoryAlert>({
    tableData: [],
    columnConfig: InventoryExcessStockColumn,
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
        handleTransferRow,
        handleMarkdownRow,
        handleCheckDisplayRow,
        handleReturnRow,
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
