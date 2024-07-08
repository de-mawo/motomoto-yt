import Image from "next/image";
import { GrCertificate } from "react-icons/gr";
import { IoIosPin } from "react-icons/io";
import Link from "next/link";
import { Instructor } from "@prisma/client";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { automaticTransmission, bothTransmissions, manualTransmission } from "./transmissions";


const InstructorsCard = ({ instructor }: { instructor: Instructor }) => {
  const img = instructor.img
    ? instructor.img
    : "/img/instructors/placeholder.png";

  return (
    <Card className="w-60 border-transparent bg-slate-50 shadow-md dark:bg-black">
      <CardContent className="p-1">
        <div className="flex h-40 w-full justify-center overflow-hidden rounded-md">
          <Image
            src={img}
            alt={instructor.name}
            width={200}
            height={200}
            className="rounded-md object-contain transition-all hover:scale-105"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col p-1">
        <h3 className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
          {" "}
          {instructor.name}{" "}
        </h3>
        <p className="flex max-w-full items-center gap-3 text-sm">
          <IoIosPin className="text-red-600" />{" "}
          <span className="overflow-hidden text-ellipsis whitespace-nowrap capitalize">
            {instructor.location}{" "}
          </span>
        </p>
        <p className="flex max-w-full items-center gap-3 text-sm">
          {" "}
          <GrCertificate className="text-green-600" />{" "}
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {instructor.certificate}{" "}
          </span>
        </p>
        {instructor.transmission === "manual" && manualTransmission()}
        {instructor.transmission === "automatic" && automaticTransmission()}
        {instructor.transmission === "both" && bothTransmissions()}
        <Link
          className="w-full py-3"
          href={`/${instructor.slug}?id=${instructor.id}`}
        >
          <Button variant="outline" className="w-full">
            {" "}
            View
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default InstructorsCard;


