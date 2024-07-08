"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBookingStore, useDateData, useLessonTypeStore } from "@/lib/store";
import { LessonType, TimeSlots } from "@prisma/client";
import { format } from "date-fns";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type TimeSelectorProps = {
  timeSlots: TimeSlots[];
  user: User;
  dcost: number;
  lcost: number;
  instructorId: string;
};
const TimeSelector = ({
  timeSlots,
  user,
  dcost,
  lcost,
  instructorId,
}: TimeSelectorProps) => {
  const [selectedTimes, setSelectedTimes] = useState<{ [key: string]: Date[] }>(
    {},
  );
  const { selectedDate } = useDateData();
  const { lessonType } = useLessonTypeStore();
  const { addToBooking } = useBookingStore();

  const timeSlotsByType = timeSlots?.filter((slot) => slot.type === lessonType);

  const formattedSelectedDate = format(selectedDate, "yyyy-MM-dd");
  const timesSlotsByDate = timeSlotsByType?.filter(
    (times) => format(times.date, "yyyy-MM-dd") === formattedSelectedDate,
  )[0];

  const timesToSelect = timesSlotsByDate?.times;

  const handleTimeClick = (time: Date) => {
    const dateKey = format(selectedDate as Date, "yyyy-MM-dd"); //String Date Key which is kept in format as 2024-04-26
    const selectedTimesForDate = selectedTimes[dateKey] || [];
    const index = selectedTimesForDate.findIndex(
      (selectedTime) => selectedTime.getTime() === time.getTime(),
    );

    const updatedTimes = [...selectedTimesForDate];
    if (index === -1) {
      updatedTimes.push(time);
    } else {
      updatedTimes.splice(index, 1);
    }

    setSelectedTimes({
      ...selectedTimes,
      [dateKey]: updatedTimes,
    });
  };

  const selectedTimesForDate = selectedDate
    ? selectedTimes[format(selectedDate as Date, "yyyy-MM-dd")] || []
    : [];

  const submitBooking = async () => {
    if (!user) {
      toast.error("Login First to book a lesson", { duration: 3000 });
      return;
    }

    let cost;
    if (lessonType === " DRIVING") {
      cost = dcost;
    } else {
      cost = lcost;
    }
    const selectedTimesArray = Object.values(selectedTimes).flat();
    const bookingDate = format(selectedDate, "yyyy-MM-dd");

    const item = {
      date: bookingDate,
      times: selectedTimesArray,
      cost,
      type: lessonType as LessonType,
      instructorId,
    };
    const result = addToBooking(item); // Capture the result from addToBooking
    if (result && result.message) {
      if (result.message === "success") {
        toast.success("Booking Added", { duration: 3000 });
      } else {
        toast.error("Process the current bookings in the basket first! ", {
          duration: 3000,
        });
      }
    }
  };

  useEffect(() => {
    useBookingStore.persist.rehydrate();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3">
      <div>
        <h3 className="text-center font-bold">Select your time slots </h3>
        <ScrollArea className="h-[350px] items-center gap-3">
          {timesToSelect?.map((time, i) => (
            <Button
              key={i}
              variant="outline"
              className={`m-1 w-32 border ${
                selectedTimesForDate.some(
                  (selectedTime) => selectedTime.getTime() === time.getTime(),
                )
                  ? "bg-orange-500 text-white"
                  : "border-orange-500"
              }`}
              onClick={() => handleTimeClick(time)}
            >
              {time.getHours().toString().padStart(2, "0")}:
              {time.getMinutes().toString().padStart(2, "0")} hrs
            </Button>
          ))}
        </ScrollArea>
      </div>

      <div className="space-y-5">
        <p className="font-bold">
          Your Selected Date and times are as follows:
          <br />
          <span className="text-orange-600">
            {" "}
            {format(selectedDate as Date, "PPP")}
          </span>
        </p>
        <div>
          {selectedTimesForDate.map((time, index) => (
            <Badge key={index} variant="outline">
              {format(time, "HH:mm")}
            </Badge>
          ))}
        </div>
        <Button
          disabled={selectedTimesForDate.length === 0}
          onClick={submitBooking}
        >
          Book {lessonType} Lessons
        </Button>
      </div>
    </div>
  );
};

export default TimeSelector;
