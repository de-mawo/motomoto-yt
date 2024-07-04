import { auth } from "@/auth";
import { AvatarNav } from "./AvatarNav";
import BasketItem from "./basket-item";
import NotifyBtn from "./NotifyBtn";
import SideBarDrawer from "./SideBarDrawer";
import { Role } from "@prisma/client";
import { User } from "next-auth";
import DialogWrapper from "./DialogWrapper";
import AuthForm from "./auth-form";



const Header = async () => {
  const session = await auth();
  const user = session?.user as User;
  const role = user?.role as Role;

  return (
    <header className="sticky top-0 z-10 rounded-md bg-white shadow-sm dark:bg-black">
      <nav className="p-4 transition-all">
        <div className="mx-8 flex flex-wrap items-center justify-between">
          {/* LEFT SIDE */}
          <div className="flex items-center justify-start">
            <SideBarDrawer role={role} />
          </div>

          {/* RIGHT SIDE  */}

          <div className="flex items-center space-x-3 md:space-x-6">
            {user ? (
              <>
                <AvatarNav user={user} />
                <NotifyBtn />
                <BasketItem />
              </>
            ) : (
              <DialogWrapper isBtn btnTitle="Sign In">
                <AuthForm callbackUrl="/" />
              </DialogWrapper>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
