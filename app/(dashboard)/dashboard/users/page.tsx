import { BreadCrumbItem } from "@/components/common/bread-crumb-item";
import { userColumns } from "@/components/misc/admin-user-columns";
import { DataTable } from "@/components/misc/DataTable";
import getSession from "@/lib/getSession";
import { getUsers } from "@/lib/getUserData";
import { redirect } from "next/navigation";

export default async function AdminUsers() {
  const session = await getSession();
  const user = session?.user;
 
  if (!user || user.role !== "ADMIN") {
    redirect(user ? "/" : "/api/auth/signin?callbackUrl=/dashboard");
  }
  const users = await getUsers()
  return (
    <>
      <BreadCrumbItem />
      <DataTable columns={userColumns} data={users} search="email" />
    </>
  );
}
