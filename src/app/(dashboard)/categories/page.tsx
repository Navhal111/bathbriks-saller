'use client';

import PageHeader from '@/app/(dashboard)/shared/page-header';
import ExportButton from '@/app/(dashboard)/shared/export-button';
import CategoriesTable from './list/table';
import { useState } from 'react';
import { useGetAllCategoryList } from '@/kit/hooks/data/category';
import KitDebouncedSearchInput from '@/kit/components/KitDebouncedSearchInput';

const pageHeader = {
    title: 'Categories',
    breadcrumb: [
        {
            href: "/dashboard",
            name: 'Dasboard',
        },
        {
            name: 'Categories List',
        },
    ],
};

export default function CategoriesPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");

    const debouncedSearch = KitDebouncedSearchInput(searchQuery, 500);

    const { CategoryList, isCategoryListLoading } = useGetAllCategoryList({ page, size: pageSize, search: debouncedSearch });

    return (
        <>
            <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
                <div className="mt-4 flex items-center gap-3 @lg:mt-0">
                    {CategoryList?.data &&
                        <ExportButton
                            data={CategoryList?.data}
                            fileName="category_data"
                            header="ID,Name,Slug,Status,createdAt,updatedAt"
                        />
                    }
                </div>
            </PageHeader>

            <CategoriesTable
                CategoryList={CategoryList?.data ?? []}
                isLoading={isCategoryListLoading}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                meta={CategoryList?.meta}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
        </>
    );
}
