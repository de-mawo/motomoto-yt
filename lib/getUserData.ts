import { User } from "@prisma/client";
import getSession from "./getSession";
import prisma from "./prisma";


export async function getUsers(): Promise<User[]> {
    const session = await getSession();
    const userRole = session?.user?.role;
  
    if (userRole !== "ADMIN") {
      throw Error("Unathorized");
    }
  
    try {
      const users = await prisma.user.findMany({});
  
      return users;
    } catch (error) {
      console.error("Error fetching  users:", error);
      throw new Error("Error fetching  users");
    }
  }


  export async function getInstructors() {
    try {
      const instructors = await prisma.instructor.findMany({});
  
      return instructors;
    } catch (error) {
      console.error("Error fetching  users:", error);
      throw new Error("Error fetching  users");
    }
  }

  type GetUserArgs = {
    id?: string;
    email?: string;
  };
  
  export async function getUser({ id, email }: GetUserArgs) {
    const session = await getSession();
    const currentUserEmail = session?.user?.email;
    const userRole = session?.user?.role;
  
    if (userRole !== "ADMIN" && email !== currentUserEmail) {
      throw new Error("Unauthorized");
    }
  
    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ id }, { email }],
        },
        include: {
          instructor: true,
        },
      });
  
      return user;
    } catch (error) {
      console.error("Error fetching  user:", error);
      throw new Error("Error fetching  user");
    }
  }