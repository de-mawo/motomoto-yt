import { BreadCrumbItem } from "@/components/common/bread-crumb-item";
import AddDateAndTimes from "./AddDateAndTimes";
import { getInstructorByUserId } from "@/lib/getUserData";
import getSession from "@/lib/getSession";
import InstructorTimeSlots from "./InstructorTimeSlots";
import { TimeSlots } from "@prisma/client";

const InstructorPortal = async () => {
  const session = await getSession();
  const user = session?.user;

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
