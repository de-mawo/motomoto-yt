"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { generateBookingNumber, generatePaymentToken } from "@/lib/utils";
import { BookingToAdd } from "@/types";

import { PaymentMethod } from "@prisma/client";

import { redirect } from "next/navigation";

//TODO: When paying with a card and calling an API, the paid value should be set to true upon success card payment

type AddBookingArgs = {
  bookings: BookingToAdd[];
  payMethod: string;
};

const getPaymentMethod = (payMethod: string): PaymentMethod => {
  switch (payMethod) {
    case "CARD":
      return PaymentMethod.CARD;
    case "CASH":
      return PaymentMethod.CASH;
    default:
      return PaymentMethod.CARD;
  }
};

export async function addBookings({ bookings, payMethod }: AddBookingArgs) {
  const session = await auth();
  const user = session?.user;
  const userId = session?.user?.id as string; // The person who is currently logged in

  if (!user) {
    throw new Error("Unauthorized");
  }

  const modifiedBookings = [];
  const instructorIds = new Set<string>(); // Use Set for efficient unique values

  for (const booking of bookings) {
    const timesToRemove = booking.times.map((time) => new Date(time));

    console.log("timesToRemove:-", timesToRemove);
    

    const instructorTimeSlots = await prisma.timeSlots.findFirst({
      where: {
        instructorId: booking.instructorId,
        date: new Date(booking.date), // Convert date string to Date object
      },
    });
 console.log("instructorTimeSlots", instructorTimeSlots  );
    console.log("Booking Date", new Date(booking.date)  );
    

    if (instructorTimeSlots) {
      const updatedTimes = instructorTimeSlots.times.filter(
        (time) =>
          !timesToRemove.some(
            (removeTime) => removeTime.getTime() === time.getTime(),
          ),
      );


      console.log("updatedTimes:-", updatedTimes);
      

      // Update the instructorTimeSlots with the filtered times to remove already selected times
      await prisma.timeSlots.update({
        where: { id: instructorTimeSlots.id },
        data: { times: updatedTimes },
      });
    }

    // Modify each booking object before inserting into the database
    const modifiedBooking = {
      ...booking,
      bookingNumber: generateBookingNumber(),
      paymentToken: generatePaymentToken(),
      paymentMethod: getPaymentMethod(payMethod),
      cost: booking.cost * booking.times.length,
      paid: getPaymentMethod(payMethod) === PaymentMethod.CARD, // Set paid to true if payment method is CARD
      userId,
      date: new Date(booking.date), // Convert date string to Date object
    };
    instructorIds.add(booking.instructorId);
    modifiedBookings.push(modifiedBooking);
  }

  // Insert modified bookings into the database
  await prisma.booking.createMany({
    data: modifiedBookings,
  });

  redirect("/user/bookings");
}
