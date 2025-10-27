import WidgetCard from "@/components/cards/widget-card";
import { SellerStatus } from "@/config/enums";
import { useAuth } from "@/kit/hooks/useAuth";
import Header from "@/layouts/hydrogen/header";
import Sidebar from "@/layouts/hydrogen/sidebar";

export default function HydrogenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const { user } = useAuth()

    const status = user?.status
  return (
    <main className="flex min-h-screen flex-grow">
      <Sidebar className="fixed hidden xl:block dark:bg-gray-50" />
      <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
        {status === SellerStatus.PENDING && 
           <WidgetCard
             title={'Your account is not pending approval.'}
             descriptionClassName="text-gray-500 mt-1.5"
             className="!m-6 !mb-0 !py-3 !bg-[#ffb5b5]"
           />}
        <Header />
        <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
          {children}
        </div>
      </div>
    </main>
  );
}
