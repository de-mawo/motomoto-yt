import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HiOutlinePhone } from "react-icons/hi2";
import { Booking } from "@prisma/client";
import { format } from "date-fns";
import DialogWrapper from "@/components/common/DialogWrapper";

type BookingCardProps = {
  booking: Booking;
  name: string;
  img: string;
  phone: string;
};

//TODO: Implement Booking Cancellation feature
const BookingCard = ({ booking, img, name, phone }: BookingCardProps) => {
  return (
    <Card className="p-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Badge variant="outline">{booking.type}</Badge>
          <p className="text-lg">${booking.cost}</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center py-1 sm:flex-row sm:justify-between">
        <p>
          Date:{" "}
          <span className="font-bold">
            {format(booking.date, "yyyy/MM/dd")}{" "}
          </span>{" "}
        </p>
        <DialogWrapper
          isBtn
          btnTitle="Sessions"
          title="Booking Times"
          descr="Time Slots Selected  & Instructor"
        >
          <div className="mt-2">
            {booking.times.map((time, index) => (
              <Badge key={index} variant="outline">
                {format(time, "HH:mm")}hrs
              </Badge>
            ))}
          </div>
          <Separator className="my-3" />
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={img as string} alt="demawo" />
              <AvatarFallback>I</AvatarFallback>
            </Avatar>
            <p className="font-bold">{name}</p>
            <p className="flex items-center gap-1">
              <HiOutlinePhone />
              <a href={`tel:${phone}`}>{phone} </a>{" "}
            </p>
          </div>
        </DialogWrapper>
      </CardContent>
      <CardFooter>
        <p className="font-mono">
          Booking Number:{" "}
          <span className="font-bold">{booking.bookingNumber} </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
