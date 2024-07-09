import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import BookingsFilter from "./BookingsFilter";
import BookingCard from "./BookingCard";
import { getUserBookings } from "@/lib/getBookings";

const UserBookings = async () => {
  const session = await getSession();
  const currentUser = session?.user;

  if (!currentUser) {
    redirect("/api/auth/signin?callbackUrl=/user");
  }
  const bookings = await getUserBookings();
  return (
    <div className="mx-4 md:mx-10">
      <BookingsFilter />
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            name={booking.instructor.name}
            img={booking.instructor.img as string}
            phone={booking.instructor.phone as string}
          />
        ))}
      </div>
    </div>
  );
};

export default UserBookings;
