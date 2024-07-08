import { BreadCrumbItem } from "@/components/common/bread-crumb-item";
import { userColumns } from "@/components/misc/admin-user-columns";
import { DataTable } from "@/components/misc/DataTable";
import { getUsers } from "@/lib/getUserData";

export default async function AdminUsers() {
  const users = await getUsers()
  return (
    <>
      <BreadCrumbItem />
      <DataTable columns={userColumns} data={users} search="email" />
    </>
  );
}
