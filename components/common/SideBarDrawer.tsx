"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { TiThMenu } from "react-icons/ti";
import SideNavBar from "./SideNavBar";
import { UserRoutes } from "./routes";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

const SideBarDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger className="rounded-full bg-orange-100 p-2 text-orange-500">
        <TiThMenu size={24} />
      </DrawerTrigger>
      <DrawerContent className="fixed inset-0 mt-0 h-screen w-40">
        <DrawerHeader>
          <div className="flex justify-center">
          <Avatar>
              <AvatarImage src="/img/logo.png" alt="de-mawo" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </div>
        </DrawerHeader>
        <SideNavBar items={UserRoutes} className="p-4" />
        <Separator className="my-4" />
        <div className="space-y-3 p-4">
          <p>Dark/light</p>
          <p>Sign out</p>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SideBarDrawer;
