import { DEFAULT_MAX_WOS } from "@/config/inventory-management";
import KitButton from "@/kit/components/KitButton";
import { InventoryAlert } from "@/kit/models/InventoryAlert";
import { createColumnHelper } from "@tanstack/react-table";
import { Text } from "rizzui";

const columnHelper = createColumnHelper<InventoryAlert>();

export const InventoryExcessStockColumn = [
  columnHelper.accessor("itemId", {
    id: "itemId",
    size: 100,
    header: "Item Id",
    cell: ({ row }) => <Text>{row.original.itemId}</Text>,
  }),
  columnHelper.accessor("itemName", {
    id: "itemName",
    size: 100,
    header: "Item Name",
    cell: ({ row }) => <Text>{row.original.itemName}</Text>,
  }),
  columnHelper.accessor("pCategory", {
    id: "pCategory",
    size: 100,
    header: "P Category",
    cell: ({ row }) => <Text>{row.original.pCategory}</Text>,
  }),
  columnHelper.accessor("location", {
    id: "location",
    size: 100,
    header: "Store Name",
    cell: ({ row }) => <Text>{row.original.location}</Text>,
  }),
  columnHelper.accessor("brand", {
    id: "brand",
    size: 100,
    header: "Brand name",
    cell: ({ row }) => <Text>{row.original.brand}</Text>,
  }),
  columnHelper.accessor("stockQty", {
    id: "stockQty",
    size: 100,
    header: "Current Stock",
    cell: ({ row }) => <Text>{row.original.stockQty}</Text>,
  }),
  columnHelper.accessor("stockQty", {
    id: "excessQty",
    size: 100,
    header: "Excess Stock",
    cell: ({ row }) => (
      <Text>
        {row.original.stockQty -
          DEFAULT_MAX_WOS * parseInt(row.original.avgWeeklySale)}
      </Text>
    ),
  }),
  columnHelper.accessor("price", {
    id: "price",
    size: 100,
    header: "Sale Price",
    cell: ({ row }) => <Text>{row.original.price}</Text>,
  }),
  columnHelper.accessor("avgWeeklySale", {
    id: "avgWeeklySale",
    size: 100,
    header: "Avg Weekly Sale",
    cell: ({ row }) => <Text>{row.original.avgWeeklySale}</Text>,
  }),
  columnHelper.accessor("lastSixMonthVolume", {
    id: "lastSixMonthVolume",
    size: 100,
    header: "Last 6 month Volume",
    cell: ({ row }) => <Text>{row.original.lastSixMonthVolume}</Text>,
  }),
  columnHelper.display({
    id: "actions",
    header: "Action",
    cell: ({ row, table }) => (
      <div className="flex gap-2">
        <KitButton color="danger" className="h-auto" size="sm" onClick={() => table.options.meta?.handleReturnRow?.(row.original)}>
          Return
        </KitButton>
        <KitButton color="secondary" className="h-auto" size="sm" onClick={() => table.options.meta?.handleCheckDisplayRow?.(row.original)}>
          Check Display
        </KitButton>
        <KitButton color="danger" className="h-auto" size="sm" onClick={() => table.options.meta?.handleTransferRow?.(row.original)}>
          Transfer
        </KitButton>
        <KitButton color="primary" className="h-auto" size="sm" onClick={() => table.options.meta?.handleMarkdownRow?.(row.original)}>
          Markdown
        </KitButton>
      </div>
    ),
  }),
];
