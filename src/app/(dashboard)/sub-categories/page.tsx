'use client';

import PageHeader from '@/app/(dashboard)/shared/page-header';
import ExportButton from '@/app/(dashboard)/shared/export-button';
import SubCategoriesTable from './list/table';
import { useGetAllSubCategoryList } from '@/kit/hooks/data/subCategory';
import { useState } from 'react';
import KitDebouncedSearchInput from '@/kit/components/KitDebouncedSearchInput';

const pageHeader = {
  title: 'Sub Categories',
  breadcrumb: [
    {
      href: "/dashboard",
      name: 'Dashboard',
    },
    {
      name: 'Sub Categories List',
    },
  ],
};

export default function SubCategoriesPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = KitDebouncedSearchInput(searchQuery, 500);

  const { SubCategoryList, isSubCategoryListLoading } = useGetAllSubCategoryList({ page, size: pageSize, search: debouncedSearch });

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {SubCategoryList?.data?.items &&
            <ExportButton
              data={SubCategoryList?.data?.items.map(item => ({
                ID: item.id,
                Name: item.name,
                Slug: item.slug,
                Category: item.category?.name ?? '',
              }))}
              fileName="sub_category_data"
              header="ID,Name,Slug,Category"
            />
          }
        </div>
      </PageHeader>

      <SubCategoriesTable
        SubCategoryList={SubCategoryList?.data?.items ?? []}
        isLoading={isSubCategoryListLoading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        meta={SubCategoryList?.meta}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </>
  );
}
