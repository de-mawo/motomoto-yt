import { BreadCrumbItem } from "@/components/common/bread-crumb-item";
import { instructorColumns } from "@/components/misc/admin-instructor-columns";
import { DataTable } from "@/components/misc/DataTable";
import { getInstructors } from "@/lib/getUserData";



const AdminInstructors = async () => {
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
