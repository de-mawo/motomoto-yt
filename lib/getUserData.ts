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