'use client';

import PageHeader from '@/app/(dashboard)/shared/page-header';
import ExportButton from '@/app/(dashboard)/shared/export-button';
import { useState } from 'react';
import KitDebouncedSearchInput from '@/kit/components/KitDebouncedSearchInput';
import BrandTable from './list/table';
import { useGetAllBrandList } from '@/kit/hooks/data/brand';

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

    const debouncedSearch = KitDebouncedSearchInput(searchQuery, 500);

    const { BrandList, isBrandListLoading } = useGetAllBrandList({ page, size: pageSize, search: debouncedSearch });

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
                </div>
            </PageHeader>

            <BrandTable
                BrandList={BrandList?.data ?? []}
                isLoading={isBrandListLoading}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                meta={BrandList?.meta}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
        </>
    );
}
