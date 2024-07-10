import { BreadCrumbItem } from "@/components/common/bread-crumb-item";
import { adminBookingsColumns } from "@/components/misc/admin-bookings-columns";
import { DataTable } from "@/components/misc/DataTable";
import { getAllBookings } from "@/lib/getBookings";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function AdminBookings() {
  const session = await getSession();
  const user = session?.user;

  if (!user || user.role !== "ADMIN") {
    redirect(user ? "/" : "/api/auth/signin?callbackUrl=/dashboard");
  }

  const bookings = await getAllBookings();

  const transformedBookings = bookings.map((booking) => ({
    ...booking,
    ...booking.user, // Flatten instructor properties because the Instructor type in the columns for the Table is not the same as the type being fetched
  }));

  return (
    <>
      <BreadCrumbItem />

      <DataTable
        columns={adminBookingsColumns}
        data={transformedBookings}
        search="email"
      />
    </>
  );
}
