'use client'

import { HiOutlineHome } from "react-icons/hi";
import { MdImportantDevices, MdOutlineMenuBook } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { HiOutlineUserGroup, HiOutlineUser } from "react-icons/hi2";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsStopwatch } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { TbMessage } from "react-icons/tb";

export const InstructorRoutes = [
  {
    title: "Home",
    href: "/",
    icon: HiOutlineHome,
  },
  {
    title: "Portal",
    href: "/portal",
    icon: MdImportantDevices,
  },
  {
    title: "Bookings",
    href: "/portal/bookings",
    icon: MdOutlineMenuBook,
  },
  {
    title: "Messages",
    href: "/portal/messages",
    icon: TbMessage,
  },
  {
    title: "Settings",
    href: "/portal/settings",
    icon: IoSettingsOutline,
  },
];

export const AdminRoutes = [
  {
    title: "Home",
    href: "/",
    icon: HiOutlineHome,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: HiOutlineUserGroup,
  },
  {
    title: "Instructors",
    href: "/dashboard/instructors",
    icon: LiaChalkboardTeacherSolid,
  },
  {
    title: "TimeSlots",
    href: "/dashboard/timeslots",
    icon: BsStopwatch,
  },
  {
    title: "Bookings",
    href: "/dashboard/bookings",
    icon: MdOutlineMenuBook,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: IoSettingsOutline,
  },
];

export const UserRoutes = [
  {
    title: "Home",
    href: "/",
    icon: HiOutlineHome,
  },
  {
    title: "Account",
    href: "/user",
    icon: HiOutlineUser,
  },
  {
    title: "Bookings",
    href: "/user/bookings",
    icon: MdOutlineMenuBook,
  },
  {
    title: "Messages",
    href: "/user/messages",
    icon: TbMessage,
  },
];

export const LoginRoute = [
  {
    title: "Login",
    href: "/login",
    icon: CiLogin,
  },
];
