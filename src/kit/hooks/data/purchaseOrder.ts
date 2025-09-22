import { API_VERSION, fetchAll } from "@/kit/hooks/data/fetchers";
import useSWR from "swr";
import type { CustomError } from "@/kit/models/CustomError";
import type { Params } from "@/kit/services/axiosService";
import { PurchaseOrderListResponse } from "@/kit/models/PurchaseOrderList";
import useSWRCreateOne from "./swr/useSWRCreateOne";
import { PurchaseOrderResponse } from "@/kit/models/PurchaseOrder";
import { CreatePurchaseOrderPayload } from "@/types/poRecommendation";
import { InventoryResponse } from "@/kit/models/Inventory";
import { PoOrderResponse } from "@/kit/models/PurchaseOrderStatus";

const PURCHASEORDER_PATH_NAME = "admin/purchase-order/list";
const PURCHASEORDER_PATH = "admin/purchase-order/store";
const INVENTORY_PATH_NAME = "admin/purchase-order/list";

const useGetAllPurchaseOrders = (params?: Params) => {
  const { data, error, isValidating, isLoading, mutate } = useSWR<
    PurchaseOrderListResponse,
    CustomError[]
  >(
    [`${API_VERSION}/${PURCHASEORDER_PATH_NAME}`, params],
    (): Promise<PurchaseOrderListResponse> =>
      fetchAll(PURCHASEORDER_PATH_NAME, params),
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      keepPreviousData: true,
    }
  );

  return {
    purchaseOrderList: data,
    purchaseOrderListError: error,
    isPurchaseOrderListLoading: isLoading,
    isValidatingPurchaseOrderList: isValidating,
    refreshPurchaseOrderList: mutate,
  };
};

export const useCreatePurchaseOrder = (params?: Params) => {
  const { data, error, isMutating, reset, create } =
    useSWRCreateOne<PurchaseOrderResponse>({
      path: PURCHASEORDER_PATH,
      key: params,
    });

  const typedCreate = create as (
    data: CreatePurchaseOrderPayload
  ) => Promise<PurchaseOrderResponse>;

  return {
    onCreatePurchaseOrder: data,
    createPurchaseOrderError: error,
    isCreatingPurchaseOrder: isMutating,
    createPurchaseOrderReset: reset,
    createPurchaseOrder: typedCreate,
  };
};

const useGetAllPOLateAndStatus = (params?: Params) => {
  const { data, error, isValidating, isLoading, mutate } = useSWR<
    PoOrderResponse,
    CustomError[]
  >(
    [`${INVENTORY_PATH_NAME}`, params],
    () => fetchAll(INVENTORY_PATH_NAME, params),
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      keepPreviousData: true,
    }
  );

  return {
    poStatus: data?.data ?? [],
    totalItems: data?.meta.totalItems ?? 0,
    totalPages: data?.meta.totalPages ?? 0,
    currentPage: data?.meta.currentPage ?? 1,
    poStatusError: error,
    isPoStatusLoading: isLoading,
    isValidatingPoStatus: isValidating,
    refreshPoStatus: mutate,
  };
};

export { useGetAllPurchaseOrders, useGetAllPOLateAndStatus };
