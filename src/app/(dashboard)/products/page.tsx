'use client';

import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui/button';
import PageHeader from '@/app/(dashboard)/shared/page-header';
import ProductsTable from '@/app/(dashboard)/products/list/table';
import { productsData } from '@/data/products-data';
import ExportButton from '@/app/(dashboard)/shared/export-button';
import { useEffect, useState } from 'react';
import KitDebouncedSearchInput from '@/kit/components/KitDebouncedSearchInput';
import { useDeleteProduct, useGetAllProductList } from '@/kit/hooks/data/product';
import { ProductData } from '@/kit/models/Product';
import toast from 'react-hot-toast';

const pageHeader = {
  title: 'Products',
  breadcrumb: [
    {
      href: "/dashboard",
      name: 'Dashboard',
    },
    {
      href: "/products",
      name: 'Products',
    },
    {
      name: 'List',
    },
  ],
};

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductData>()
  const [productId, setProductId] = useState<string>('');

  const debouncedSearch = KitDebouncedSearchInput(searchQuery, 500);

  const { ProductList, isProductListLoading, refreshProductList } = useGetAllProductList({ page, size: pageSize, search: debouncedSearch });
  const { deleteRecord, isDeleting } = useDeleteProduct(productId);

  const productDelete = (data: ProductData) => {
    setProductId(String(data.id));
    setSelectedProduct(data)
  };

  useEffect(() => {
    const deleteProduct = async () => {
      if (productId && selectedProduct) {
        try {
          await deleteRecord(selectedProduct);
          toast.success("Product Deleted successfully!");
          refreshProductList();
        } catch (error) {
          toast.error("Failed to delete");
        } finally {
          setProductId('');
          setSelectedProduct(undefined);
        }
      }
    };

    deleteProduct();
  }, [productId]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={productsData}
            fileName="product_data"
            header="ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating"
          />
          <Link
            href={"/products/new"}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Product
            </Button>
          </Link>
        </div>
      </PageHeader>

      <ProductsTable
        ProductList={ProductList?.data?.items ?? []}
        isLoading={isProductListLoading || isDeleting}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        meta={ProductList?.meta}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        onDelete={productDelete}
      />
    </>
  );
}
