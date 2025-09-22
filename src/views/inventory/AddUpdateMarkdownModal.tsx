"use client";

import KitTextInput from "@/kit/components/KitTextInput/KitTextInput";
import { Modal, MultiSelect, Select, SelectOption, Title } from "rizzui";
import { Grid } from "rizzui";
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import PencilIcon from "@/components/icons/pencil";
import KitButton from "@/kit/components/KitButton/KitButton";
import { InventoryAlert } from "@/kit/models/InventoryAlert";
import { useMemo } from "react";
import { useCreateMarddown } from "@/kit/hooks/data/mardDown";
import { useGetAllStores } from "@/kit/hooks/data/store";
import toast from "react-hot-toast";
import { CustomErrorType } from "@/kit/models/CustomError";

interface Props {
    isOpen: boolean
    onClose: () => void
    onRefresh?: () => void
    updateMarkdownModal?: InventoryAlert
}

interface FormData {
    itemId: string
    itemName: string
    mrp: string
    salePrice: string
    purchasePrice: string
    storeId: string[]
    storeName?: string
    currentStock: string
    newSalePrice: string
}

const formSchema = yup.object().shape({
    itemId: yup.string().required('Item Code is a required'),
    itemName: yup.string().required('Item Name is a required'),
    mrp: yup.string().required('MRP is a required'),
    salePrice: yup.string().trim().required('Sale Price is required'),
    purchasePrice: yup.string().trim().required('Purchase Price is required'),
    storeId: yup
        .array()
        .of(yup.string().required())
        .required('Select at least one store')
        .min(1, 'Select at least one store'),
    storeName: yup.string().optional(),
    currentStock: yup.string().trim().required('Current Stock is required'),
    newSalePrice: yup.string().trim().required('New Sale Price Price is required'),
})

export default function AddUpdateMarkdownModal({ isOpen, onClose, onRefresh, updateMarkdownModal }: Props) {

    const { stores, isStoreLoading } = useGetAllStores();
    const { create: onCreateMarddown, isMutating: isCreateLoading } = useCreateMarddown()

    const defaultValues: FormData = {
        itemId: updateMarkdownModal?.itemId || '',
        itemName: updateMarkdownModal?.itemName || '',
        mrp: String(updateMarkdownModal?.price) || '',
        salePrice: String(updateMarkdownModal?.price) || '',
        purchasePrice: String(updateMarkdownModal?.price) || '',
        storeId: updateMarkdownModal?.storeId ? [updateMarkdownModal.storeId] : [],
        storeName: updateMarkdownModal?.storeName || '',
        currentStock: String(updateMarkdownModal?.stockQty) || '',
        newSalePrice: updateMarkdownModal?.newSalePrice ? String(updateMarkdownModal?.newSalePrice) : '',
    }

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty, isValid }
    } = useForm<FormData>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(formSchema)
    })

    const isBtnLoading = isCreateLoading

    const storeOptions = useMemo(
        () =>
            stores?.map((store) => ({
                label: store.storeName || "",
                value: String(store.id),
                original: store,
            })) || [],
        [stores]
    );

    const onSubmit = async (data: FormData) => {
        const selectedStores = storeOptions.filter(opt => data.storeId.includes(String(opt.value)));
        const storeNames = selectedStores.map(s => s.label).join(', ');
        const storeIdsAsNumbers = data.storeId.map(id => Number(id));

        const payload = {
            itemId: data.itemId,
            itemName: data.itemName,
            mrp: data.mrp,
            salePrice: data.salePrice,
            purchasePrice: data.purchasePrice,
            storeId: storeIdsAsNumbers,
            storeName: storeNames,
            currentStock: data.currentStock,
            newSalePrice: data.newSalePrice,
        }
        try {
            await onCreateMarddown(payload)
            toast.success('Marddown Created successfully.')
            onRefresh?.()
            onClose()
        } catch (error) {
            toast.error((error as CustomErrorType)?.message)
        }
    }

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
                            <Title as="h5">Mark Down Information</Title>
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
                                                label='Item Id'
                                                required
                                                disabled
                                                value={value}
                                                className={`text-sm rounded-md border border-gray-300 focus:ring-primary`}
                                                onChange={onChange}
                                                placeholder="Enter Item Id"
                                                type="number"
                                                onKeyDown={(e) => {
                                                    if (['e', 'E', '+', '-', '.'].includes(e.key)) e.preventDefault();
                                                }}
                                            />
                                            {errors.itemId && <p className="mt-1 text-xs text-red-500">{errors.itemId.message}</p>}
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
                                            {errors.itemName && <p className="mt-1 text-xs text-red-500">{errors.itemName.message}</p>}
                                        </div>
                                    )}
                                />
                            </Grid.Col>

                        </Grid>
                        <Grid columns="3" className="gap-4 py-2">
                            <Grid.Col>
                                <Controller
                                    name="mrp"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <div className="w-full">
                                            <KitTextInput
                                                ref={ref}
                                                label='MRP'
                                                required
                                                disabled
                                                value={value}
                                                className={`text-sm rounded-md border border-gray-300 focus:ring-primary`}
                                                onChange={onChange}
                                                placeholder="Enter MRP"
                                                type="number"
                                                onKeyDown={(e) => {
                                                    if (['e', 'E', '+', '-', '.'].includes(e.key)) e.preventDefault();
                                                }}
                                            />
                                            {errors.mrp && <p className="mt-1 text-xs text-red-500">{errors.mrp.message}</p>}
                                        </div>
                                    )}
                                />
                            </Grid.Col>
                            <Grid.Col>
                                <Controller
                                    name="salePrice"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <div className="w-full">
                                            <KitTextInput
                                                ref={ref}
                                                label='Sale Price'
                                                required
                                                disabled
                                                value={value}
                                                onChange={onChange}
                                                placeholder="Enter Sale Price"
                                                type="number"
                                                onKeyDown={(e) => {
                                                    if (['e', 'E', '+', '-', '.'].includes(e.key)) e.preventDefault();
                                                }}
                                            />
                                            {errors.salePrice && <p className="mt-1 text-xs text-red-500">{errors.salePrice.message}</p>}
                                        </div>
                                    )}
                                />
                            </Grid.Col>
                            <Grid.Col>
                                <Controller
                                    name="purchasePrice"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <div className="w-full">
                                            <KitTextInput
                                                ref={ref}
                                                label='Purchase Price'
                                                required
                                                disabled
                                                value={value}
                                                onChange={onChange}
                                                placeholder="Enter Purchase Price"
                                                type="number"
                                                onKeyDown={(e) => {
                                                    if (['e', 'E', '+', '-', '.'].includes(e.key)) e.preventDefault();
                                                }}
                                            />
                                            {errors.purchasePrice && <p className="mt-1 text-xs text-red-500">{errors.purchasePrice.message}</p>}
                                        </div>
                                    )}
                                />
                            </Grid.Col>
                        </Grid>
                        <Grid columns="3" className="gap-4 py-2 mb-2">
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
                                                placeholder="Enter Current Stock"
                                                type="number"
                                                onKeyDown={(e) => {
                                                    if (['e', 'E', '+', '-', '.'].includes(e.key)) e.preventDefault();
                                                }}
                                            />
                                            {errors.currentStock && <p className="mt-1 text-xs text-red-500">{errors.currentStock.message}</p>}
                                        </div>
                                    )}
                                />
                            </Grid.Col>
                            <Grid.Col>
                                <Controller
                                    name="storeId"
                                    control={control}
                                    render={({ field }) => {

                                        return (
                                            <div className="w-full">
                                                <MultiSelect
                                                    label="Store"
                                                    labelClassName="after:content-['*'] after:ml-0.5 after:text-red-500"
                                                    value={field.value ?? []}
                                                    clearable={true}
                                                    searchable={true}
                                                    options={storeOptions}
                                                    onChange={(selected: string[]) => field.onChange(selected)}
                                                    onClear={() => field.onChange([])}
                                                />
                                                {errors.storeId && (
                                                    <p className="mt-1 text-xs text-red-500">{errors.storeId.message}</p>
                                                )}
                                            </div>
                                        );
                                    }}
                                />
                            </Grid.Col>
                            <Grid.Col>
                                <Controller
                                    name="newSalePrice"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <div className="w-full">
                                            <KitTextInput
                                                ref={ref}
                                                label="New Sale Price"
                                                required
                                                value={value}
                                                onChange={onChange}
                                                placeholder="Enter New Sale Price"
                                                suffix={<PencilIcon className="w-4 h-4 text-gray-500" />}
                                            />
                                            {errors.newSalePrice && <p className="mt-1 text-xs text-red-500">{errors.newSalePrice.message}</p>}
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
                                className='w-[80px]'
                                onClick={onClose}
                            >
                                Cancel
                            </KitButton>
                            <KitButton
                                variant="solid"
                                color="primary"
                                className='w-[80px]'
                                type="submit"
                                isLoading={isBtnLoading}
                            >
                                {'Save'}
                            </KitButton>
                        </Grid>
                    </form>
                </div>
            </Modal>
        </div>
    );
}