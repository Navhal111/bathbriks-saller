'use client';

import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui/button';
import PageHeader from '@/app/(dashboard)/shared/page-header';
import ExportButton from '@/app/(dashboard)/shared/export-button';
import KitShow from '@/kit/components/KitShow/KitShow';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import KitDebouncedSearchInput from '@/kit/components/KitDebouncedSearchInput';
import BrandTable from './list/table';
import AddUpdateBrandModal from '@/views/brand/AddUpdateBrandModal';
import { useDeleteBrand, useGetAllBrandList } from '@/kit/hooks/data/brand';
import { BrandType } from '@/kit/models/Brand';

const pageHeader = {
    title: 'Brand',
    breadcrumb: [
        {
            href: "/brand",
            name: 'Brand',
        },
        {
            name: 'Brands List',
        },
    ],
};

export default function BrandPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBrand, setSelectedBrand] = useState<BrandType>()
    const [brandId, setBrandId] = useState<string>('');
    const [isAddUpdateBrandModalOpen, setIsAddUpdateBrandModalOpen] = useState<boolean>(false)

    const debouncedSearch = KitDebouncedSearchInput(searchQuery, 500);

    const { BrandList, isBrandListLoading, refreshBrandList } = useGetAllBrandList({ page, size: pageSize, search: debouncedSearch });
    const { deleteRecord, isDeleting } = useDeleteBrand(brandId);

    const toggleAddUpdateBrandModal = () => setIsAddUpdateBrandModalOpen(!isAddUpdateBrandModalOpen)

    const handleAddBrand = () => {
        setSelectedBrand(undefined)
        toggleAddUpdateBrandModal()
    }

    const brandEdit = (data: BrandType) => {
        setSelectedBrand(data)
        toggleAddUpdateBrandModal()
    };

    const brandDelete = (data: BrandType) => {
        setBrandId(String(data.id));
        setSelectedBrand(data)
    };

    useEffect(() => {
        const deleteBrand = async () => {
            if (brandId && selectedBrand) {
                try {
                    await deleteRecord(selectedBrand);
                    toast.success("Brand Deleted successfully!");
                    refreshBrandList();
                } catch (error) {
                    toast.error("Failed to delete");
                } finally {
                    setBrandId('');
                    setSelectedBrand(undefined);
                }
            }
        };

        deleteBrand();
    }, [brandId]);

    return (
        <>
            <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
                <div className="mt-4 flex items-center gap-3 @lg:mt-0">
                    {BrandList?.data &&
                        <ExportButton
                            data={BrandList?.data.map(item => ({
                                ID: item.id,
                                Name: item.name,
                                Slug: item.slug
                            }))}
                            fileName="brand_data"
                            header="ID,Name,Slug"
                        />
                    }
                    <Button as="span" className="w-full @lg:w-auto" onClick={handleAddBrand}>
                        <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                        Add Brand
                    </Button>
                </div>
            </PageHeader>

            <BrandTable
                BrandList={BrandList?.data ?? []}
                isLoading={isBrandListLoading || isDeleting}
                onEdit={brandEdit}
                onDelete={brandDelete}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                meta={BrandList?.meta}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />

            <KitShow show={isAddUpdateBrandModalOpen}>
                <AddUpdateBrandModal
                    isOpen={isAddUpdateBrandModalOpen}
                    onClose={toggleAddUpdateBrandModal}
                    onRefresh={refreshBrandList}
                    updateBrand={selectedBrand}
                />
            </KitShow>
        </>
    );
}
