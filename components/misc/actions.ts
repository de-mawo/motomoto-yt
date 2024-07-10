"use server";

import prisma from "@/lib/prisma";
import { Role, BookingStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

type EditUserArgs = {
  id: string;
  role: Role;
};

type EditBookingArgs = {
  id: string;
  status: BookingStatus;
};

export async function editUser({ id, role }: EditUserArgs) {
  try {
    await prisma.user.update({
      where: { id },
      data: { role },
    });
    revalidatePath("/dashboard/users");
    return { message: `User with id ${id} updated` };
  } catch (e) {
    return { message: `Failed to update because of ${e} ` };
  }
}

export async function editBooking({ id, status }: EditBookingArgs) {
  try {
    await prisma.booking.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/portal/bookings");
    return { message: `Booking with id ${id} updated` };
  } catch (e) {
    return { message: `Failed to update because of ${e} ` };
  }
}
