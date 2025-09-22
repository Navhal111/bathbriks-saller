import KitButton from "@/kit/components/KitButton";
import { InventoryAlert } from "@/kit/models/InventoryAlert";
import { createColumnHelper } from "@tanstack/react-table";
import { Text } from "rizzui";
import Link from "next/link";

const columnHelper = createColumnHelper<InventoryAlert>();

export const InventoryStockOutColumn = [
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
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <div className="flex gap-2">
        <Link
          href={`/po-order-status?status=pending&vendorId=${row.original.vendorId}&itemId=${row.original.itemId}&storeId=${row.original.storeId}`}
        >
          <KitButton className="h-auto" size="sm">
            Wait for PO fulfill
          </KitButton>
        </Link>
        <Link href={`/po-order-status`}>
          <KitButton color="danger" className="h-auto" size="sm">
            PO Late
          </KitButton>
        </Link>
        <Link href={`/po-recommendation`}>
          <KitButton className="h-auto" size="sm">
            Generate PO
          </KitButton>
        </Link>
      </div>
    ),
  }),
];
