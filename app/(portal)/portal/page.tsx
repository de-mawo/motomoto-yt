import { BreadCrumbItem } from "@/components/common/bread-crumb-item";
import AddDateAndTimes from "./AddDateAndTimes";
import { getInstructorByUserId } from "@/lib/getUserData";
import getSession from "@/lib/getSession";
import InstructorTimeSlots from "./InstructorTimeSlots";
import { TimeSlots } from "@prisma/client";
import { redirect } from "next/navigation";

const InstructorPortal = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user || user.role !== "INSTRUCTOR") {
    redirect(user ? "/" : "/api/auth/signin?callbackUrl=/portal");
  }

  const userId = user?.id as string;

  const instructor = await getInstructorByUserId({ userId });
  const instructorId = instructor?.id as string;
  const slots = instructor?.timeslots as TimeSlots[];
  return (
    <>
      <BreadCrumbItem />
      <AddDateAndTimes instructorId={instructorId} />
      <InstructorTimeSlots slots={slots} />
    </>
  );
};

export default InstructorPortal;
