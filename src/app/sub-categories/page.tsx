'use client';

import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui/button';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import ExportButton from '@/app/shared/export-button';
import { subCategoriesData } from '@/data/sub-categories-data';
import SubCategoriesTable from './list/table';
import { useDeleteSubCategory, useGetAllSubCategoryList } from '@/kit/hooks/data/subCategory';
import KitShow from '@/kit/components/KitShow/KitShow';
import { useEffect, useState } from 'react';
import { SubCategoryType } from '@/kit/models/SubCategory';
import AddUpdateSubCategoryModal from '@/views/subCategory/AddUpdateSubCategoryModal';
import toast from 'react-hot-toast';
import KitDebouncedSearchInput from '@/kit/components/KitDebouncedSearchInput';

const pageHeader = {
  title: 'Sub Categories',
  breadcrumb: [
    {
      href: "/",
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
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryType>()
  const [subCategoryId, setSubCategoryId] = useState<string>('');
  const [isAddUpdateSubCategoryModalOpen, setIsAddUpdateSubCategoryModalOpen] = useState<boolean>(false)

  const debouncedSearch = KitDebouncedSearchInput(searchQuery, 500);

  const { SubCategoryList, isSubCategoryListLoading, refreshSubCategoryList } = useGetAllSubCategoryList({ page, size: pageSize, search: debouncedSearch });
  const { deleteRecord, isDeleting } = useDeleteSubCategory(subCategoryId || '');

  const toggleAddUpdateSubCategoryModal = () => setIsAddUpdateSubCategoryModalOpen(!isAddUpdateSubCategoryModalOpen)

  const handleAddSubCategory = () => {
    setSelectedSubCategory(undefined)
    toggleAddUpdateSubCategoryModal()
  }

  const subCategoryDelete = (data: SubCategoryType) => {
    setSubCategoryId(String(data.id));
    setSelectedSubCategory(data)
  };

  const subCategoryEdit = (data: SubCategoryType) => {
    setSelectedSubCategory(data)
    toggleAddUpdateSubCategoryModal()
  };

  useEffect(() => {
    const deleteSubCategory = async () => {
      if (subCategoryId && selectedSubCategory) {
        try {
          await deleteRecord(selectedSubCategory);
          toast.success("Sub Category Deleted successfully!");
          refreshSubCategoryList();
        } catch (error) {
          toast.error("Failed to delete");
        } finally {
          setSubCategoryId('');
          setSelectedSubCategory(undefined);
        }
      }
    };

    deleteSubCategory();
  }, [subCategoryId]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={subCategoriesData}
            fileName="category_data"
            header="ID,Name,Description,Category,Status"
          />
          <Button as="span" className="w-full @lg:w-auto" onClick={handleAddSubCategory}>
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Sub Category
          </Button>
        </div>
      </PageHeader>

      <SubCategoriesTable
        SubCategoryList={subCategoriesData}
        isLoading={false}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        meta={SubCategoryList?.meta}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        onEdit={subCategoryEdit}
        onDelete={subCategoryDelete}
      />

      <KitShow show={isAddUpdateSubCategoryModalOpen}>
        <AddUpdateSubCategoryModal
          isOpen={isAddUpdateSubCategoryModalOpen}
          onClose={toggleAddUpdateSubCategoryModal}
          onRefresh={refreshSubCategoryList}
          updateSubCategory={selectedSubCategory}
        />
      </KitShow>
    </>
  );
}
