import getSession from "./getSession";
import prisma from "./prisma";

export async function getTimeSlots() {
  const session = await getSession();

  const userRole = session?.user?.role;

  if (userRole !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  try {
    const timeSlots = await prisma.timeSlots.findMany({
      include: {
        instructor: {
          select: {
            name: true,
            img: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return timeSlots;
  } catch (error) {
    console.error("Error fetching  users:", error);
    throw new Error("Error fetching  users");
  }
}
