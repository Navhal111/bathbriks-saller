"use client";

import KitTextInput from "@/kit/components/KitTextInput/KitTextInput";
import { Modal, Select, SelectOption, Title } from "rizzui";
import { Grid } from "rizzui";
import { Controller, Resolver, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useMemo } from "react";
import KitButton from "@/kit/components/KitButton/KitButton";
import { CustomErrorType } from "@/kit/models/CustomError";
import toast from "react-hot-toast";
import { STATUS_OPTIONS } from "@/config/categories";
import { useGetAllCategoryList } from "@/kit/hooks/data/category";
import { SubCategoryData } from "@/kit/models/SubCategory";
import { useCreateSubCategory, useUpdateSubCategory } from "@/kit/hooks/data/subCategory";
import KitLoader from "@/kit/components/KitLoader/KitLoader";
import KitShow from "@/kit/components/KitShow/KitShow";


interface Props {
    isOpen: boolean
    onClose: () => void
    onRefresh?: () => void
    updateSubCategory?: SubCategoryData
}

interface FormData {
    name: string
    slug: string
    // status: string
    categoryId: number | null
}

const formSchema = yup.object().shape({
    name: yup.string().required('Name is a required'),
    slug: yup.string().required('Slug is a required'),
    // status: yup.string().required('Status is a required'),
    categoryId: yup
        .number()
        .nullable()
        .transform((value, originalValue) => originalValue === '' ? null : value)
        .typeError('Category Id is required')
        .required('Category Id is required'),
})

export default function AddUpdateSubCategoryModal({ isOpen, onClose, onRefresh, updateSubCategory }: Props) {

    const { CategoryList, isCategoryListLoading } = useGetAllCategoryList({ page: 1, size: 10000 });
    const { createSubCategory: onCreateSubCategory, isCreatingSubCategory } = useCreateSubCategory()
    const { update: onUpdateSubCategory, isUpdatingSubCategory } = useUpdateSubCategory(String(updateSubCategory?.id))

    const defaultValues: FormData = {
        name: updateSubCategory?.name || '',
        slug: updateSubCategory?.slug || '',
        // status: updateSubCategory?.status || '',
        categoryId: updateSubCategory?.category_id ?? null,
    }

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(formSchema) as Resolver<FormData>,
    })

    const isBtnLoading = isCreatingSubCategory || isUpdatingSubCategory

    const onSubmit = async (data: FormData) => {
        const payload = {
            name: data.name,
            slug: data.slug,
            // status: data.status,
            categoryId: Number(data.categoryId),
        };

        try {
            if (updateSubCategory) {
                await onUpdateSubCategory(payload as Partial<SubCategoryData>)
                toast.success('Sub Category updated successfully.')
            } else {
                await onCreateSubCategory(payload as Partial<SubCategoryData>)
                toast.success('Sub Category created successfully.')
            }
            onClose()
            onRefresh?.()
        } catch (error) {
            toast.error((error as CustomErrorType)?.message)
        }
    }

    const mainCategoryOptions = useMemo(() =>
        Array.isArray(CategoryList?.data)
            ? CategoryList.data.map(cat => ({
                label: cat.name,
                value: cat.id ?? 0,
            }))
            : [],
        [CategoryList?.data]
    );

    useEffect(() => {
        if (!updateSubCategory) return;
        reset(defaultValues)
    }, [updateSubCategory]);

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
                    <>
                        <KitShow show={isCategoryListLoading}>
                            <div className='h-screen flex justify-center'>
                                <KitLoader isLoading={true} />
                            </div>
                        </KitShow>
                        <KitShow show={!isCategoryListLoading}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-2 flex items-center justify-between">
                                    <Title as="h5">{updateSubCategory ? 'Update Sub Category' : 'Add Sub Category'}</Title>
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
                                                        value={value}
                                                        onChange={onChange}
                                                        required
                                                        error={errors.slug && errors.slug.message}
                                                        placeholder="Enter Slug"
                                                    />
                                                </div>
                                            )}
                                        />
                                    </Grid.Col>
                                    <Grid.Col>
                                        <Grid.Col>
                                            <Controller
                                                control={control}
                                                name="categoryId"
                                                render={({ field }) => (
                                                    <div>
                                                        <Select
                                                            label="Category"
                                                            labelClassName="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500"
                                                            placeholder="Select Main Category"
                                                            options={mainCategoryOptions}
                                                            value={mainCategoryOptions.find((opt) => opt.value === field.value) || null}
                                                            displayValue={(selected: SelectOption | null) => selected?.label || ''}
                                                            onChange={(selected: any) => field.onChange(selected?.value ?? null)}
                                                            error={errors.categoryId && errors.categoryId.message}
                                                        />
                                                    </div>
                                                )}
                                            />
                                        </Grid.Col>
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
                                        {updateSubCategory ? 'Update' : 'Save'}
                                    </KitButton>
                                </Grid>
                            </form>
                        </KitShow>
                    </>
                </div>
            </Modal>
        </div>
    );
}