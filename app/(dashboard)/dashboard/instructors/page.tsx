import { BreadCrumbItem } from "@/components/common/bread-crumb-item";
import { instructorColumns } from "@/components/misc/admin-instructor-columns";
import { DataTable } from "@/components/misc/DataTable";
import getSession from "@/lib/getSession";
import { getInstructors } from "@/lib/getUserData";
import { redirect } from "next/navigation";



const AdminInstructors = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user || user.role !== "ADMIN") {
    redirect(user ? "/" : "/api/auth/signin?callbackUrl=/dashboard");
  }
  
  const instructors = await getInstructors();

  return (
    <div>
      <BreadCrumbItem />
      <DataTable
        search="email"
        columns={instructorColumns}
        data={instructors}
      />
    </div>
  );
};

export default AdminInstructors;
