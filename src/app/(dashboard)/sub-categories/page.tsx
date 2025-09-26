'use client';

import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui/button';
import PageHeader from '@/app/(dashboard)/shared/page-header';
import ExportButton from '@/app/(dashboard)/shared/export-button';
import SubCategoriesTable from './list/table';
import { useDeleteSubCategory, useGetAllSubCategoryList } from '@/kit/hooks/data/subCategory';
import KitShow from '@/kit/components/KitShow/KitShow';
import { useEffect, useState } from 'react';
import { SubCategoryData } from '@/kit/models/SubCategory';
import AddUpdateSubCategoryModal from '@/views/subCategory/AddUpdateSubCategoryModal';
import toast from 'react-hot-toast';
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
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryData>()
  const [subCategoryId, setSubCategoryId] = useState<string>('');
  const [isAddUpdateSubCategoryModalOpen, setIsAddUpdateSubCategoryModalOpen] = useState<boolean>(false)

  const debouncedSearch = KitDebouncedSearchInput(searchQuery, 500);

  const { SubCategoryList, isSubCategoryListLoading, refreshSubCategoryList } = useGetAllSubCategoryList({ page, size: pageSize, search: debouncedSearch });
  const { deleteRecord, isDeleting } = useDeleteSubCategory(subCategoryId);

  const toggleAddUpdateSubCategoryModal = () => setIsAddUpdateSubCategoryModalOpen(!isAddUpdateSubCategoryModalOpen)

  const handleAddSubCategory = () => {
    setSelectedSubCategory(undefined)
    toggleAddUpdateSubCategoryModal()
  }

  const subCategoryDelete = (data: SubCategoryData) => {
    setSubCategoryId(String(data.id));
    setSelectedSubCategory(data)
  };

  const subCategoryEdit = (data: SubCategoryData) => {
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
          <Button as="span" className="w-full @lg:w-auto" onClick={handleAddSubCategory}>
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Sub Category
          </Button>
        </div>
      </PageHeader>

      <SubCategoriesTable
        SubCategoryList={SubCategoryList?.data?.items ?? []}
        isLoading={isSubCategoryListLoading || isDeleting}
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
