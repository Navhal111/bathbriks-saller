import PageHeader from "@/app/(dashboard)/shared/page-header";
import ProfileSettingsNav from "@/app/(dashboard)/shared/account-settings/navigation";

const pageHeader = {
  title: "Account Settings",
  breadcrumb: [
    {
      href: "/dashboard",
      name: "Dashboard",
    },
    {
      name: "Account Settings",
    },
  ],
};

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProfileSettingsNav />
      {children}
    </>
  );
}
