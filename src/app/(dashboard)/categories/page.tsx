'use client';

import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui/button';
import PageHeader from '@/app/(dashboard)/shared/page-header';
import ExportButton from '@/app/(dashboard)/shared/export-button';
import CategoriesTable from './list/table';
import KitShow from '@/kit/components/KitShow/KitShow';
import { useEffect, useState } from 'react';
import AddUpdateCategoryModal from '@/views/category/AddUpdateCategoryModal';
import { CategoryType } from '@/kit/models/Category';
import { useDeleteCategory, useGetAllCategoryList } from '@/kit/hooks/data/category';
import toast from 'react-hot-toast';
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
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>()
    const [categoryId, setCategoryId] = useState<string>('');
    const [isAddUpdateCategoryModalOpen, setIsAddUpdateCategoryModalOpen] = useState<boolean>(false)

    const debouncedSearch = KitDebouncedSearchInput(searchQuery, 500);

    const { CategoryList, isCategoryListLoading, refreshCategoryList } = useGetAllCategoryList({ page, size: pageSize, search: debouncedSearch });
    const { deleteRecord, isDeleting } = useDeleteCategory(categoryId || '');

    const toggleAddUpdateCategoryModal = () => setIsAddUpdateCategoryModalOpen(!isAddUpdateCategoryModalOpen)

    const handleAddCategory = () => {
        setSelectedCategory(undefined)
        toggleAddUpdateCategoryModal()
    }

    const categoryEdit = (data: CategoryType) => {
        setSelectedCategory(data)
        toggleAddUpdateCategoryModal()
    };

    const categoryDelete = (data: CategoryType) => {
        setCategoryId(String(data.id));
        setSelectedCategory(data)
    };

    useEffect(() => {
        const deleteCategory = async () => {
            if (categoryId && selectedCategory) {
                try {
                    await deleteRecord(selectedCategory);
                    toast.success("Category Deleted successfully!");
                    refreshCategoryList();
                } catch (error) {
                    toast.error("Failed to delete");
                } finally {
                    setCategoryId('');
                    setSelectedCategory(undefined);
                }
            }
        };

        deleteCategory();
    }, [categoryId]);

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
                    <Button as="span" className="w-full @lg:w-auto" onClick={handleAddCategory}>
                        <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                        Add Category
                    </Button>
                </div>
            </PageHeader>

            <CategoriesTable
                CategoryList={CategoryList?.data ?? []}
                isLoading={isCategoryListLoading || isDeleting}
                onEdit={categoryEdit}
                onDelete={categoryDelete}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                meta={CategoryList?.meta}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />

            <KitShow show={isAddUpdateCategoryModalOpen}>
                <AddUpdateCategoryModal
                    isOpen={isAddUpdateCategoryModalOpen}
                    onClose={toggleAddUpdateCategoryModal}
                    onRefresh={refreshCategoryList}
                    updateCategory={selectedCategory}
                />
            </KitShow>
        </>
    );
}
