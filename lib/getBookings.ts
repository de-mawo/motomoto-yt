import getSession from "./getSession";
import prisma from "./prisma";

export async function getUserBookings() {
    const session = await getSession();
    const user = session?.user;
    const userId = session?.user?.id as string;
  
    if (!user) {
      throw Error("Unathorized");
    }
  
    try {
      const bookings = await prisma.booking.findMany({
        where: {
          userId,
        },
        include: {
          instructor: {
            select: {
              name: true,
              img: true,
              phone: true,
            },
          },
        },
      });
  
      return bookings;
    } catch (error) {
      console.error("Error fetching  bookings:", error);
      throw new Error("Error fetching  bookings");
    }
  }