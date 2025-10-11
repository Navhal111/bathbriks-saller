"use client";

import KitTextInput from "@/kit/components/KitTextInput/KitTextInput";
import { Modal, Select, SelectOption, Title } from "rizzui";
import { Grid } from "rizzui";
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from "react";
import KitButton from "@/kit/components/KitButton/KitButton";
import { CustomErrorType } from "@/kit/models/CustomError";
import toast from "react-hot-toast";
import { STATUS_OPTIONS } from "@/config/categories";
import { useCreateBrand, useUpdateBrand } from "@/kit/hooks/data/brand";
import { BrandType } from "@/kit/models/Brand";

interface Props {
    isOpen: boolean
    onClose: () => void
    onRefresh?: () => void
    updateBrand?: BrandType
}

interface FormData {
    name: string
    slug: string
    image?: string
    // status: string
}

const formSchema = yup.object().shape({
    name: yup.string().required('Name is a required'),
    slug: yup.string().required('Slug is a required'),
    image: yup.string().optional()
    // status: yup.string().required('Status is a required'),
})

export default function AddUpdateBrandModal({ isOpen, onClose, onRefresh, updateBrand }: Props) {

    const { createBrand: onCreateBrand, isCreatingBrand } = useCreateBrand()
    const { update: onUpdateBrand, isUpdatingBrand } = useUpdateBrand(String(updateBrand?.id))

    const defaultValues: FormData = {
        name: updateBrand?.name || '',
        slug: updateBrand?.slug || '',
        image: ''
        // status: updateBrand?.status || '',
    }

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(formSchema)
    })

    const isBtnLoading = isCreatingBrand || isUpdatingBrand

    const onSubmit = async (data: FormData) => {
        const payload = {
            name: data.name,
            slug: data.slug,
            image: 'https://picsum.photos/200/300'
            // status: data.status,
        };

        try {
            if (updateBrand) {
                await onUpdateBrand(payload as Partial<BrandType>)
                toast.success('Brand updated successfully.')
            } else {
                await onCreateBrand(payload as Partial<BrandType>)
                toast.success('Brand created successfully.')
            }
            onClose()
            onRefresh?.()
        } catch (error) {
            toast.error((error as CustomErrorType)?.message)
        }
    }

    useEffect(() => {
        if (!updateBrand) return;
        reset(defaultValues)
    }, [updateBrand]);

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                overlayClassName="backdrop-blur"
                customSize="100%"
                containerClassName="!w-[40vw] !shadow-2xl"
            >
                <div className="m-auto px-7 pt-6 pb-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-2 flex items-center justify-between">
                            <Title as="h5">{updateBrand ? 'Update Brand' : 'Add Brand'}</Title>
                        </div>
                        <Grid >
                            <Grid.Col >
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <div className="w-full">
                                            <KitTextInput
                                                ref={ref}
                                                label="Name"
                                                required
                                                value={value}
                                                onChange={onChange}
                                                error={errors.name && errors.name.message}
                                                placeholder="Enter Name"
                                            />
                                        </div>
                                    )}
                                />
                            </Grid.Col>
                            <Grid.Col >
                                <Controller
                                    name="slug"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <div className="w-full">
                                            <KitTextInput
                                                ref={ref}
                                                label="Slug"
                                                required
                                                value={value}
                                                onChange={onChange}
                                                error={errors.slug && errors.slug.message}
                                                placeholder="Enter Slug"
                                            />
                                        </div>
                                    )}
                                />
                            </Grid.Col>
                            {/* <Grid.Col>
                                <Controller
                                    control={control}
                                    name="status"
                                    render={({ field }) => (
                                        <div>
                                            <Select
                                                label="Status"
                                                labelClassName="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500"
                                                placeholder="Select Status"
                                                options={STATUS_OPTIONS}
                                                value={STATUS_OPTIONS.find((opt) => opt.value === field.value) || null}
                                                displayValue={(selected: SelectOption | null) => selected?.label || ''}
                                                onChange={(selected: any) => field.onChange(selected?.value ?? null)}
                                                error={errors.status && errors.status.message}
                                            />
                                        </div>
                                    )}
                                />
                            </Grid.Col> */}
                        </Grid>
                        <Grid className="flex justify-end mt-3 gap-3">
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
                                {updateBrand ? 'Update' : 'Save'}
                            </KitButton>
                        </Grid>
                    </form>
                </div>
            </Modal>
        </div>
    );
}