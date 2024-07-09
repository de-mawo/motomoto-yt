import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { TimeSlots } from "@prisma/client";
  import { format } from "date-fns";
  import {  HiOutlineEye } from "react-icons/hi2";
  import { GoTrash } from "react-icons/go";
  
  const InstructorTimeSlots = ({ slots }: { slots: TimeSlots[] }) => {
    return (
      <div className="my-8">
        <h2 className="py-4 text-center text-2xl font-bold tracking-tight">
          Current Time Slots
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {slots &&
            slots?.map((slot) => (
              <Card key={slot.id}>
                <CardHeader className="p-3">
                  <CardTitle className="text-lg">
                    {format(slot.date as Date, "PPP")}
                  </CardTitle>
                  <CardDescription>Type: {slot.type}</CardDescription>
                </CardHeader>
  
                <CardFooter className="flex justify-between ">
                  <button>
                    <HiOutlineEye size={20} />{" "}
                  </button>
                  <button>
                    <GoTrash size={20} />{" "}
                  </button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    );
  };
  
  export default InstructorTimeSlots;
  