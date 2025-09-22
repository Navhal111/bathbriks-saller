export interface InventoryData {
  inventories: string[];
  totalItems: number;
}

export interface InventoryResponse {
  status: number;
  responseCode: number;
  success: boolean;
  message: string;
  data: InventoryData;
  err: null;
}

export interface InventoryStockOutAlert {
  id: string;
  name: string;
  mrp: string;
  brand: string;
  store: string;
  closingStock: string;
  avgWeeklySale: string;
  itemSpeed: string;
}

export interface InventoryExcessStock {
  id: string;
  name: string;
  mrp: string;
  brand: string;
  store: string;
  closingStock: string;
  avgWeeklySale: string;
  itemSpeed: string;
  last2mSale: string;
}

export interface InventoryDeadStock {
  id: string;
  name: string;
  mrp: string;
  brand: string;
  store: string;
  closingStock: string;
  last6mSale: string;
  itemSpeed: string;
  daySinceLastSale: string;
  dayInInventory: string;
}
