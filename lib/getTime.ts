import dayjs from "dayjs";

export const getDays = (month = dayjs().month(), year = dayjs().year()) => {
  const firstDayOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDayOfMonth = dayjs().year(year).month(month).endOf("month");

  const dateArray = [];

  // Get previous days

  for (let i = 0; i < firstDayOfMonth.day(); i++) {
    dateArray.push({ date: firstDayOfMonth.day(i), currentMonth: false });
  }

  // Get current month days
  for (let i = firstDayOfMonth.date(); i <= lastDayOfMonth.date(); i++) {
    const currentDate = firstDayOfMonth.date(i);
    dateArray.push({
      currentMonth: true,
      date: currentDate,
      today:
        currentDate.toDate().toDateString() === dayjs().toDate().toDateString(),
    });
  }

  // Get forward days
  const forwardDays = 42 - dateArray.length;
  for (
    let i = lastDayOfMonth.date() + 1;
    i <= lastDayOfMonth.date() + forwardDays;
    i++
  ) {
    dateArray.push({ date: lastDayOfMonth.date(i), currentMonth: false });
  }

  return dateArray;
};

export const daysOfTheWeek = ["S", "M", "T", "W", "T", "F", "S"];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const InstructorsTimes = [
  new Date(0, 0, 0, 0, 0), // 00:00 AM
  new Date(0, 0, 0, 0, 30), // 00:30 AM
  new Date(0, 0, 0, 1, 0), // 01:00 AM
  new Date(0, 0, 0, 1, 30), // 01:30 AM
  new Date(0, 0, 0, 2, 0), // 02:00 AM
  new Date(0, 0, 0, 2, 30), // 02:30 AM
  new Date(0, 0, 0, 3, 0), // 03:00 AM
  new Date(0, 0, 0, 3, 30), // 03:30 AM
  new Date(0, 0, 0, 4, 0), // 04:00 AM
  new Date(0, 0, 0, 4, 30), // 04:30 AM
  new Date(0, 0, 0, 5, 0), // 05:00 AM
  new Date(0, 0, 0, 5, 30), // 05:30 AM
  new Date(0, 0, 0, 6, 0), // 06:00 AM
  new Date(0, 0, 0, 6, 30), // 06:30 AM
  new Date(0, 0, 0, 7, 0), // 07:00 AM
  new Date(0, 0, 0, 7, 30), // 07:30 AM
  new Date(0, 0, 0, 8, 0), // 08:00 AM
  new Date(0, 0, 0, 8, 30), // 08:30 AM
  new Date(0, 0, 0, 9, 0), // 09:00 AM
  new Date(0, 0, 0, 9, 30), // 09:30 AM
  new Date(0, 0, 0, 10, 0), // 10:00 AM
  new Date(0, 0, 0, 10, 30), // 10:30 AM
  new Date(0, 0, 0, 11, 0), // 11:00 AM
  new Date(0, 0, 0, 11, 30), // 11:30 AM
  new Date(0, 0, 0, 12, 0), // 12:00 PM
  new Date(0, 0, 0, 12, 30), // 12:30 PM
  new Date(0, 0, 0, 13, 0), // 01:00 PM
  new Date(0, 0, 0, 13, 30), // 01:30 PM
  new Date(0, 0, 0, 14, 0), // 02:00 PM
  new Date(0, 0, 0, 14, 30), // 02:30 PM
  new Date(0, 0, 0, 15, 0), // 03:00 PM
  new Date(0, 0, 0, 15, 30), // 03:30 PM
  new Date(0, 0, 0, 16, 0), // 04:00 PM
  new Date(0, 0, 0, 16, 30), // 04:30 PM
  new Date(0, 0, 0, 17, 0), // 05:00 PM
  new Date(0, 0, 0, 17, 30), // 05:30 PM
  new Date(0, 0, 0, 18, 0), // 06:00 PM
  new Date(0, 0, 0, 18, 30), // 06:30 PM
  new Date(0, 0, 0, 19, 0), // 07:00 PM
  new Date(0, 0, 0, 19, 30), // 07:30 PM
  new Date(0, 0, 0, 20, 0), // 08:00 PM
  new Date(0, 0, 0, 20, 30), // 08:30 PM
  new Date(0, 0, 0, 21, 0), // 09:00 PM
  new Date(0, 0, 0, 21, 30), // 09:30 PM
  new Date(0, 0, 0, 22, 0), // 10:00 PM
  new Date(0, 0, 0, 22, 30), // 10:30 PM
  new Date(0, 0, 0, 23, 0), // 11:00 PM
  new Date(0, 0, 0, 23, 30), // 11:30 PM
];

export const DemoTimes = [
  new Date(0, 0, 0, 9, 0), // 09:00 AM
  new Date(0, 0, 0, 9, 30), // 09:30 AM
  new Date(0, 0, 0, 10, 0), // 10:00 AM
  new Date(0, 0, 0, 10, 30), // 10:30 AM
  new Date(0, 0, 0, 11, 0), // 11:00 AM
  new Date(0, 0, 0, 11, 30), // 11:30 AM
  new Date(0, 0, 0, 12, 0), // 12:00 PM
  new Date(0, 0, 0, 12, 30), // 12:30 PM
  new Date(0, 0, 0, 13, 0), // 01:00 PM
  new Date(0, 0, 0, 13, 30), // 01:30 PM
  new Date(0, 0, 0, 14, 0), // 02:00 PM
  new Date(0, 0, 0, 14, 30), // 02:30 PM
  new Date(0, 0, 0, 15, 0), // 03:00 PM
  new Date(0, 0, 0, 15, 30), // 03:30 PM
  new Date(0, 0, 0, 16, 0), // 04:00 PM
  new Date(0, 0, 0, 16, 30), // 04:30 PM
  new Date(0, 0, 0, 17, 0), // 05:00 PM
  new Date(0, 0, 0, 17, 30), // 05:30 PM
  new Date(0, 0, 0, 18, 0), // 06:00 PM
];
