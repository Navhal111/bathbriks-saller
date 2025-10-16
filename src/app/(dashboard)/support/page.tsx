'use client';

import PageHeader from '@/app/(dashboard)/shared/page-header';
import ExportButton from '@/app/(dashboard)/shared/export-button';
import KitShow from '@/kit/components/KitShow/KitShow';
import { useState } from 'react';
import KitDebouncedSearchInput from '@/kit/components/KitDebouncedSearchInput';
import { useGetAllBrandList } from '@/kit/hooks/data/brand';
import SupportTable from './list/table';
import SupportChatModal from '@/views/support/SupportChatModal';
import { supportData } from '@/data/support-data';
import { SupoortType } from '@/kit/models/Supoort';

const pageHeader = {
    title: 'Support',
    breadcrumb: [
        {
            href: "/support-module",
            name: 'Support',
        },
        {
            name: 'List',
        },
    ],
};

export default function SupportPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEnquiry, setSelectedEnquiry] = useState<SupoortType>()
    const [enquiryId, setEnquiryId] = useState<string>('');
    const [isSupportChatModalOpen, setIsSupportChatModalOpen] = useState<boolean>(false)

    const debouncedSearch = KitDebouncedSearchInput(searchQuery, 500);

    const { BrandList, isBrandListLoading, refreshBrandList } = useGetAllBrandList({ page, size: pageSize, search: debouncedSearch });

    const toggleSupportChatModal = () => setIsSupportChatModalOpen(!isSupportChatModalOpen)

    const supportChat = (data: SupoortType) => {
        setSelectedEnquiry(data)
        toggleSupportChatModal()
    };

    const supportDelete = (data: SupoortType) => {
        setSelectedEnquiry(data)
    }

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

            <SupportTable
                SupportList={supportData ?? []}
                isLoading={false}
                onChat={supportChat}
                onDelete={supportDelete}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                meta={BrandList?.meta}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />

            <KitShow show={isSupportChatModalOpen}>
                <SupportChatModal
                    isOpen={isSupportChatModalOpen}
                    onClose={toggleSupportChatModal}
                    onRefresh={refreshBrandList}
                // updateBrand={selectedEnquiry}
                />
            </KitShow>
        </>
    );
}
