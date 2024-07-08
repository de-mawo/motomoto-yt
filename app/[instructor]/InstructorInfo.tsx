import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Instructor } from "@prisma/client";
import Image from "next/image";
import { HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";
import { IoStar } from "react-icons/io5";
import { GrCertificate } from "react-icons/gr";
import MarkDownComponent from "@/components/common/Markdown";
import {
  automaticTransmission,
  bothTransmissions,
  manualTransmission,
} from "@/components/home/transmissions";

const InfoRow = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  return (
    <p className="flex items-center space-x-2 text-sm">
      {icon} <span>{text}</span>
    </p>
  );
};

const InstructorInfo = ({ instructor }: { instructor: Instructor }) => {
  const img = instructor?.img
    ? instructor.img
    : "/img/instructors/placeholder.png";

  return (
    <div className="m-8 flex flex-col space-y-3">
      <div className="flex justify-center">
        <Image
          src={img}
          width={500}
          height={500}
          alt="Instructor Avatar"
          className="h-32 w-32 rounded-full"
        />
      </div>

      <div>
        <h2 className="py-4 text-center text-2xl font-bold">
          {instructor?.name}
        </h2>
        <ScrollArea className="h-56">
          {instructor?.bio && <MarkDownComponent>{instructor?.bio} </MarkDownComponent>}
        </ScrollArea>
        <Separator className="my-4" />

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <InfoRow
            icon={<IoStar className="text-orange-500" size={18} />}
            text={`${instructor?.rating} (${instructor?.ratingCount})`}
          />
          {instructor?.certificate && (
            <InfoRow
              icon={<GrCertificate className="text-green-700" size={18} />}
              text={instructor?.certificate}
            />
          )}
          <InfoRow
            icon={<HiOutlineEnvelope className="text-blue-600" size={18} />}
            text={instructor?.email as string}
          />
          <InfoRow
            icon={<HiOutlinePhone size={18} />}
            text={instructor?.phone as string}
          />
        </div>
      </div>

      <div className="flex space-x-6 text-sm">
        <div>
          <h3 className="font-semibold">Experience</h3>
          <p>{instructor?.experience === "zero-to-one" && "0 - 1"} Years</p>
          <p>{instructor?.experience === "two-to-four" && "2 - 4"} Years</p>
          <p>{instructor?.experience === "five-and-above" && "5+"} Years</p>
        </div>
        <div>
          <h3 className="font-semibold">Transmission</h3>
          {instructor?.transmission === "manual" && manualTransmission()}
          {instructor?.transmission === "automatic" && automaticTransmission()}
          {instructor?.transmission === "both" && bothTransmissions()}
        </div>
      </div>
      <div className="my-5">
        {instructor?.dcost && (
          <p>
            Driving Cost per timeslot:{" "}
            <span className="text-lg font-bold">${instructor.dcost} </span>{" "}
          </p>
        )}
        {instructor?.lcost && (
          <p>
            Learners Cost per timeslot:{" "}
            <span className="text-lg font-bold">${instructor.lcost}</span>{" "}
          </p>
        )}
      </div>

      <div className="">
        <h3 className="font-semibold">Areas Served</h3>
        <ScrollArea className="w-sm whitespace-nowrap rounded-md border">
          <div className="flex space-x-2 p-4">
            {instructor?.areas.map((area, i) => (
              <Badge className="whitespace-nowrap" key={i}>
                {area}
              </Badge>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default InstructorInfo;
