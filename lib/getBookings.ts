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

  export async function getAllBookings() {
    const session = await getSession();
    const userRole = session?.user?.role;
  
    if (userRole !== "ADMIN") {
      throw new Error("Unauthorized");
    }
  
    try {
      const bookings = await prisma.booking.findMany({
        include: {
          instructor: {
            select: {
              name: true,
              phone: true,
            },
          },
          user: {
            select: {
              name: true,
              email: true,
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
  
  export async function getInstructorBookings() {
    const session = await getSession();
    const userRole = session?.user?.role;
    const userId = session?.user?.id;
  
    if (userRole !== "INSTRUCTOR") {
      throw new Error("Unauthorized");
    }
  
    try {
      const instructor = await prisma.instructor.findFirst({
        where: {
          userId,
        },
      });
      const instructorId = instructor?.id;
      const bookings = await prisma.booking.findMany({
        where: { instructorId },
        include: {
          user: {
            select: {
              name: true,
              email: true,
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