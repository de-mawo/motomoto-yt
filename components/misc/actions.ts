"use server";

import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

type EditUserArgs = {
  id: string;
  role: Role;
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
