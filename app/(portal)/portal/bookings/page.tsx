import { BreadCrumbItem } from "@/components/common/bread-crumb-item";
import { DataTable } from "@/components/misc/DataTable";
import InstructorBookingsColumns from "@/components/misc/instructor-bookings-columns";
import { getInstructorBookings } from "@/lib/getBookings";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

const InstructorBookingPage = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user || user.role !== "INSTRUCTOR") {
    redirect(user ? "/" : "/api/auth/signin?callbackUrl=/portal");
  }

  const bookings = await getInstructorBookings();

  const transformedBookings = bookings.map((booking) => ({
    ...booking,
    ...booking.user, // Flatten instructor properties because the Instructor type in the columns for the Table is not the same as the type being fetched
  }));

  return (
    <>
      <BreadCrumbItem />
      <DataTable
        columns={InstructorBookingsColumns}
        data={transformedBookings}
        search="email"
      />
    </>
  );
};

export default InstructorBookingPage;
