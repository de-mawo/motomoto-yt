import DashHeader from "@/components/common/DashHeader";
import LogOutBtn from "@/components/common/LogOutBtn";
import { AdminRoutes } from "@/components/common/routes";
import SideNavBar from "@/components/common/SideNavBar";
import ThemeToggle from "@/components/common/ThemeToggler";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-orange-50 dark:bg-black">
      <aside className="hidden w-16 bg-white p-4 dark:bg-black md:block">
        <Image src="/logo.png" width={50} height={50} alt="logo" />
        <SideNavBar items={AdminRoutes} showTooltip />
        <ThemeToggle />
        <Separator className="my-4" />
        <LogOutBtn withTooltip />
      </aside>

      <div className="mx-6 w-full flex-1 p-5">
        <DashHeader title="Admin Dashboard" />

        {children}
      </div>
    </div>
  );
}
