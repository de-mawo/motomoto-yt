"use client";


import { daysOfTheWeek, getDays, months } from "@/lib/getTime";
import { useDateData } from "@/lib/store";
import { cn } from "@/lib/utils";

import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const CustomCalendar = () => {
  const currentDate = dayjs();
  const { setDate } = useDateData();
  const [today, setToday] = useState<Dayjs>(currentDate); // Specify Dayjs type
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  return (
    <div className="flex flex-col flex-1">
      <h3 className="text-center  font-bold">Click on a Date to show time slots</h3>
      <div className="flex flex-col sm:flex-row justify-between items-center bg-blue-100 py-5 px-10 rounded-t-md  dark:bg-slate-900">
        <h1 className=" font-semibold mr-4 ">
          {months[today.month()]}, {today.year()}
        </h1>
        <div className="flex gap-2 items-center ">
          <IoMdArrowDropleft
            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              setToday(today.month(today.month() - 1));
            }}
          />
          <h1
            className=" cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              setToday(currentDate);
            }}
          >
            Today
          </h1>
          <IoMdArrowDropright
            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              setToday(today.month(today.month() + 1));
            }}
          />
        </div>
      </div>
      <section className="bg-white py-5 rounded-b-md dark:border dark:bg-black">
        <div className="grid grid-cols-7">
          {daysOfTheWeek.map((day, index) => {
            return (
              <h1
                key={index}
                className="h-10 font-bold grid place-content-center"
              >
                {day}
              </h1>
            );
          })}
        </div>

        <div className="grid grid-cols-7">
          {getDays(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              const isPastDate = date.isBefore(currentDate, "day");
              return (
                <div key={index} className="h-10 grid place-content-center">
                  <button
                    className={cn(
                      !currentMonth && "text-slate-400 ",
                      today && "bg-rose-600 text-white ",
                      selectedDate &&
                        selectedDate.isSame(date, "day") &&
                        "bg-orange-500 text-white",
                      "h-8 w-8 p-1 grid place-content-center font rounded-full"
                    )}
                    onClick={() => {
                      setSelectedDate(date); // Update selected date
                      setDate(date.toDate());
                    }}
                    disabled={isPastDate} // Disable button for past dates
                  >
                    {date.date()}{" "}
                  </button>
                </div>
              );
            }
          )}
        </div>
      </section>
    </div>
  );
};

export default CustomCalendar;
