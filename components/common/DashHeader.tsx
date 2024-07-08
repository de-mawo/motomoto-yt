import { auth } from "@/auth";
import { User } from "next-auth";
import SideBarDrawer from "./SideBarDrawer";
import { Role } from "@prisma/client";
import NotifyBtn from "./NotifyBtn";
import { AvatarNav } from "./AvatarNav";


const DashHeader = async ({ title }: { title: string }) => {
  const session = await auth();
  const user = session?.user as User;
  const role = user?.role as Role;
  return (
    <div className="flex items-center justify-between bg-white p-3 dark:bg-black">
      <div className="flex items-center justify-start">
        <div className="md:hidden">
          <SideBarDrawer role={role} />
        </div>
        <h2 className="hidden text-xl font-extrabold leading-tight md:block lg:text-2xl">
          {title}
        </h2>
      </div>

      <div className="flex flex-row gap-2">
        <AvatarNav user={user} />
        <NotifyBtn />
      </div>
    </div>
  );
};

export default DashHeader;
