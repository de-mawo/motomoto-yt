import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { TimeSlots } from "@prisma/client";

import { User } from "next-auth";
import ServicesRendered from "./ServicesRendered";
import LessonTypeSelector from "./LessonTypeSelector";
import CustomCalendar from "./CustomCalendar";
import TimeSelector from "./TimeSelector";

type InstructorTabsProps = {
  services: string;
  timeSlots: TimeSlots[];
  user: User;
  dcost: number;
  lcost: number;
  instructorId: string;
};

export function InstructorTabs({
  services,
  timeSlots,
  user,
  dcost,
  lcost,
  instructorId,
}: InstructorTabsProps) {
  return (
    <Tabs defaultValue="booking" className="">
      <TabsList className="my-12 grid w-full grid-cols-2">
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="booking">Booking</TabsTrigger>
      </TabsList>
      <TabsContent value="services">
        <ServicesRendered services={services} />
      </TabsContent>
      <TabsContent value="booking">
        <LessonTypeSelector />

        <div className="grid grid-cols-1 gap-3 rounded-md border border-orange-300 p-3 md:grid-cols-2">
          <CustomCalendar />
          <TimeSelector
            timeSlots={timeSlots}
            dcost={dcost}
            lcost={lcost}
            instructorId={instructorId}
            user={user}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
