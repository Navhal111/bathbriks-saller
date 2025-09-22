"use client";

import KitTextInput from "@/kit/components/KitTextInput/KitTextInput";
import { Modal, Select, SelectOption, Title } from "rizzui";
import { Grid } from "rizzui";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PencilIcon from "@/components/icons/pencil";
import KitButton from "@/kit/components/KitButton/KitButton";
import { InventoryAlert } from "@/kit/models/InventoryAlert";
import { useMemo } from "react";
import { useCreateTranfer } from "@/kit/hooks/data/stockTransfer";
import { useGetAllStores } from "@/kit/hooks/data/store";
import toast from "react-hot-toast";
import { CustomErrorType } from "@/kit/models/CustomError";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRefresh?: () => void;
  updateDeadStockTransfer?: InventoryAlert;
}

interface FormData {
  itemId: string;
  itemName: string;
  price: string;
  storeId: string;
  storeName?: string;
  currentStock: string;
  transferToStoreId: string;
  transferToStoreName?: string;
  transferStoreStock?: string;
  otherStockRequirement?: string;
  transferQty: string;
}

const formSchema = yup.object().shape({
  itemId: yup.string().required("Item Code is a required"),
  itemName: yup.string().required("Item Name is a required"),
  price: yup.string().required("HSN Code is a required"),
  storeId: yup.string().trim().required("Brand is required"),
  storeName: yup.string().optional(),
  currentStock: yup.string().trim().required("Sub Category is required"),
  transferToStoreId: yup
    .string()
    .trim()
    .required("Sub Category is required")
    .test(
      "not-same-as-storeId",
      "Transfer store cannot be same as current store",
      function (value) {
        const { storeId } = this.parent;
        return value !== storeId;
      }
    ),
  transferToStoreName: yup.string().optional(),
  transferStoreStock: yup.string().optional(),
  otherStockRequirement: yup.string().optional(),
  transferQty: yup.string().trim().required("GST Percentage is required"),
});

export default function AddUpdateTransferModal({
  isOpen,
  onClose,
  onRefresh,
  updateDeadStockTransfer,
}: Props) {
  const { stores, isStoreLoading } = useGetAllStores();
  const { create: onCreateTranfer, isMutating: isCreateLoading } =
    useCreateTranfer();

  const defaultValues: FormData = {
    itemId: updateDeadStockTransfer?.itemId || "",
    itemName: updateDeadStockTransfer?.itemName || "",
    price: String(updateDeadStockTransfer?.price) || "",
    storeId: updateDeadStockTransfer?.storeId || "",
    storeName: updateDeadStockTransfer?.storeName || "",
    currentStock: String(updateDeadStockTransfer?.stockQty) || "",
    transferToStoreId: "",
    transferToStoreName: "",
    transferStoreStock: "",
    otherStockRequirement: "",
    transferQty: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const isBtnLoading = isCreateLoading;

  const storeOptions = useMemo(
    () =>
      stores?.map((store) => ({
        label: store.storeName || "",
        value: store.id,
        original: store,
      })) || [],
    [stores]
  );

  const onSubmit = async (data: FormData) => {
    const selectedStore = storeOptions.find(
      (store) => String(store.value) === data.storeId
    );
    const payload = {
      itemId: data.itemId,
      itemName: data.itemName,
      price: data.price,
      storeId: data.storeId,
      storeName: selectedStore?.label || "",
      currentStock: data.currentStock,
      transferToStoreId: data.transferToStoreId,
      transferToStoreName: selectedStore?.label || "",
      transferStoreStock: "",
      otherStockRequirement: "",
      transferQty: data.transferQty,
    };
    try {
      await onCreateTranfer(payload);
      toast.success("Tranfer Created successfully.");
      onRefresh?.();
      onClose();
    } catch (error) {
      toast.error((error as CustomErrorType)?.message);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        overlayClassName="backdrop-blur"
        customSize="100%"
        containerClassName="!w-[70vw] !shadow-2xl"
      >
        <div className="m-auto px-7 pt-6 pb-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2 flex items-center justify-between">
              <Title as="h5">Item Information</Title>
            </div>
            <Grid columns="3" className="gap-4 py-2">
              <Grid.Col>
                <Controller
                  name="itemId"
                  control={control}
                  render={({ field: { value, onChange, ref } }) => (
                    <div className="w-full">
                      <KitTextInput
                        ref={ref}
                        label="Item Id"
                        required
                        disabled
                        value={value}
                        className={`text-sm rounded-md border border-gray-300 focus:ring-primary`}
                        onChange={onChange}
                        placeholder="Enter Item Id"
                        type="number"
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-", "."].includes(e.key))
                            e.preventDefault();
                        }}
                      />
                      {errors.itemId && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.itemId.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </Grid.Col>
              <Grid.Col colSpan="2">
                <Controller
                  name="itemName"
                  control={control}
                  render={({ field: { value, onChange, ref } }) => (
                    <div className="w-full">
                      <KitTextInput
                        ref={ref}
                        label="Item Name"
                        required
                        disabled
                        value={value}
                        onChange={onChange}
                        placeholder="Enter Item Name"
                      />
                      {errors.itemName && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.itemName.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </Grid.Col>
            </Grid>
            <Grid columns="3" className="gap-4 py-2">
              <Grid.Col>
                <Controller
                  name="price"
                  control={control}
                  render={({ field: { value, onChange, ref } }) => (
                    <div className="w-full">
                      <KitTextInput
                        ref={ref}
                        label="Price"
                        required
                        disabled
                        value={value}
                        onChange={onChange}
                        placeholder="Enter Price"
                        type="number"
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-", "."].includes(e.key))
                            e.preventDefault();
                        }}
                      />
                      {errors.price && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.price.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </Grid.Col>
              <Grid.Col>
                <Controller
                  name="storeId"
                  control={control}
                  render={({ field }) => {
                    const selectedOption = storeOptions.find(
                      (opt) => String(opt.value) === field.value
                    );

                    return (
                      <div className="w-full">
                        <Select
                          label="Store Name"
                          labelClassName="after:content-['*'] after:ml-0.5 after:text-red-500"
                          searchable
                          disabled
                          options={storeOptions}
                          value={selectedOption || null}
                          displayValue={(selected: SelectOption | null) =>
                            selected?.label || ""
                          }
                          onChange={(selected: any) => {
                            field.onChange(String(selected?.value || ""));
                          }}
                        />
                        {errors.storeId && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.storeId.message}
                          </p>
                        )}
                      </div>
                    );
                  }}
                />
              </Grid.Col>
              <Grid.Col>
                <Controller
                  name="currentStock"
                  control={control}
                  render={({ field: { value, onChange, ref } }) => (
                    <div className="w-full">
                      <KitTextInput
                        ref={ref}
                        label="Current Stock"
                        required
                        disabled
                        value={value}
                        onChange={onChange}
                        placeholder="Enter current Stock"
                        type="number"
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-", "."].includes(e.key))
                            e.preventDefault();
                        }}
                      />
                      {errors.currentStock && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.currentStock.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </Grid.Col>
            </Grid>
            <Grid columns="3" className="gap-4 py-2 mb-2">
              <Grid.Col colSpan="2">
                <Controller
                  name="transferToStoreId"
                  control={control}
                  render={({ field }) => {
                    const selectedOption = storeOptions.find(
                      (opt) => String(opt.value) === field.value
                    );

                    return (
                      <div className="w-full">
                        <Select
                          label="Transfer To StoreName"
                          labelClassName="after:content-['*'] after:ml-0.5 after:text-red-500"
                          searchable
                          options={storeOptions}
                          value={selectedOption || null}
                          displayValue={(selected: SelectOption | null) =>
                            selected?.label || ""
                          }
                          onChange={(selected: any) => {
                            field.onChange(String(selected?.value || ""));
                          }}
                        />
                        {errors.transferToStoreId && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.transferToStoreId.message}
                          </p>
                        )}
                      </div>
                    );
                  }}
                />
              </Grid.Col>

              <Grid.Col>
                <Controller
                  name="transferQty"
                  control={control}
                  render={({ field: { value, onChange, ref } }) => (
                    <div className="w-full">
                      <KitTextInput
                        ref={ref}
                        label="Transfer Qty"
                        required
                        value={value}
                        onChange={onChange}
                        placeholder="Enter Transfer Qty"
                        suffix={
                          <PencilIcon className="w-4 h-4 text-gray-500" />
                        }
                        type="number"
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-", "."].includes(e.key))
                            e.preventDefault();
                        }}
                      />
                      {errors.transferQty && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.transferQty.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </Grid.Col>
            </Grid>
            <Grid className="flex justify-end gap-3">
              <KitButton
                isLoading={false}
                variant="outline"
                color="primary"
                className="w-[80px]"
                onClick={onClose}
              >
                Cancel
              </KitButton>
              <KitButton
                variant="solid"
                color="primary"
                className="w-[80px]"
                type="submit"
                isLoading={isBtnLoading}
              >
                {updateDeadStockTransfer ? "Update" : "Save"}
              </KitButton>
            </Grid>
          </form>
        </div>
      </Modal>
    </div>
  );
}
