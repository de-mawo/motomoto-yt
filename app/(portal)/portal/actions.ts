"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { addTimeSlotsSchema } from "@/lib/zod-validations";
import { LessonType } from "@prisma/client";
import { revalidatePath } from "next/cache";

type AddSlotsArgs = {
  instructorId: string;
  formData: FormData;
};

export async function addSlots({ instructorId, formData }: AddSlotsArgs) {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "INSTRUCTOR") {
    throw new Error("Unauthorized");
  }

  const entries = Object.fromEntries(formData.entries());
  const values: { [key: string]: any } = {};

  // Convert date from string to Date object
  if (entries.date) {
    values.date = new Date(entries.date as string);
  }

  // Convert times from JSON string to array of Date objects
  if (entries.times) {
    values.times = JSON.parse(entries.times as string).map(
      (time: string) => new Date(time),
    );
  }

  // Copy other entries directly
  Object.keys(entries).forEach((key) => {
    if (key !== "date" && key !== "times") {
      values[key] = entries[key];
    }
  });
  const { date, type, times } = addTimeSlotsSchema.parse(values);

  const lessonType = type as LessonType;

  try {
    const existingSlot = await prisma.timeSlots.findFirst({
      where: { date },
    });
    if (existingSlot) {
      return { message: `Time Slot with date ${date} already exists` };
    }

    if (!instructorId) {
      throw new Error("Instructor not found");
    }

    await prisma.timeSlots.create({
      data: { type: lessonType, instructorId, times, date: new Date(date) },
    });
    revalidatePath("/portal");
    return { message: `Time Slot added` };
  } catch (error: any) {
    console.error(error);
    throw new Error(`Failed to update because of ${error.message}`);
  }
}
