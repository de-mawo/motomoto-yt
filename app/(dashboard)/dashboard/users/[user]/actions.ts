"use server";

import { makeSlug } from "@/lib/utils";
import { nanoid } from "nanoid";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { InstructorSchema } from "@/lib/zod-validations";

type AddInstructorArgs = {
  formData: FormData;
  areas: string[];
  userId: string;
};

export async function AddInstructor({
  formData,
  areas,
  userId,
}: AddInstructorArgs) {
  const values = Object.fromEntries(formData.entries());

  const {
    name,
    image,
    phone,
    email,
    certificate,
    experience,
    bio,
    services,
    dcost,
    lcost,
    transmission,
    location,
  } = InstructorSchema.parse(values);

  const slug = `${makeSlug(name)}-${nanoid(10)}`;

  let img: string | undefined;

  if (image) {
    img = `/img/instructors/${image.name}`;
  } else {
    img = undefined;
  }

  await prisma.instructor.create({
    data: {
      userId,
      slug,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      img,
      certificate: certificate?.trim(),
      experience,
      bio: bio?.trim(),
      services: services?.trim(),
      dcost: parseInt(dcost as string),
      lcost: parseInt(lcost as string),
      transmission,
      location: location?.trim(),
      areas,
    },
  });

  redirect("/dashboard/instructors");
}
