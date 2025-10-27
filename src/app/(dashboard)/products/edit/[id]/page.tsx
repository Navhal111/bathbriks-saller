'use client'

import CreateEditProduct from '@/app/(dashboard)/shared/product/create-edit';
import PageHeader from '@/app/(dashboard)/shared/page-header';
import { useParams } from 'next/navigation';
import { useGetOneProduct } from '@/kit/hooks/data/product';

const pageHeader = {
    title: 'Update Product',
    breadcrumb: [
        {
            href: "/products",
            name: 'Products',
        },
        {
            name: 'Update',
        },
    ],
};

export default function UpdateProductPage() {
    const { id } = useParams()

    const { data: productDetails, isLoading: isProductDetailsLoading } = useGetOneProduct(id as string)

    return (
        <>
            <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
            <CreateEditProduct
                productDetails={productDetails?.data}
                productLoading={isProductDetailsLoading}
            />
        </>
    );
}
