import { BreadCrumbItem } from "@/components/common/bread-crumb-item";
import { adminTimeSlotsColumns } from "@/components/misc/admin-timeslots-columns";
import { DataTable } from "@/components/misc/DataTable";
import getSession from "@/lib/getSession";
import { getTimeSlots } from "@/lib/getTimeSlots";
import { redirect } from "next/navigation";

export default async function AdminTimeSlots() {
  const session = await getSession();
  const user = session?.user;

  if (!user || user.role !== "ADMIN") {
    redirect(user ? "/" : "/api/auth/signin?callbackUrl=/dashboard");
  }

  const timeSlots = await getTimeSlots();
  const transformedTimeSlots = timeSlots.map((slot) => ({
    ...slot,
    ...slot.instructor, // Flatten instructor properties because the Instructor type in the columns for the Table is not the same as the type being fetched
  }));

  return (
    <>
      <BreadCrumbItem />

      <DataTable
        columns={adminTimeSlotsColumns}
        data={transformedTimeSlots}
        search="name"
      />
    </>
  );
}
