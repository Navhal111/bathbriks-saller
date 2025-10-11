import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import CreateEditProduct from '@/app/(dashboard)/shared/product/create-edit';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/(dashboard)/shared/page-header';
import { Button } from 'rizzui/button';
import { routes } from '@/config/routes';

export const metadata = {
  ...metaObject('Create Product'),
};

const pageHeader = {
  title: 'Create Product',
  breadcrumb: [
    {
      href: "/products",
      name: 'Products',
    },
    {
      name: 'Create',
    },
  ],
};

export default function CreateProductPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditProduct />
    </>
  );
}
