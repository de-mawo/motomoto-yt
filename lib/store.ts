import {
  BookingAddActionTypes,
  BookingToAdd,
  BookingToAddType,
  DateStore,
  LessonTypeTypes,
} from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useDateData = create<DateStore>()(
  devtools(
    persist(
      (set, get) => ({
        selectedDate: new Date(),
        setDate: (value: Date) => {
          set({ selectedDate: value });
        },

        getDateData: () => {
          return get().selectedDate;
        },
      }),
      { name: "date_data", skipHydration: true },
    ),
  ),
);

export const useLessonTypeStore = create<LessonTypeTypes>()(
  devtools(
    persist(
      (set, get) => ({
        lessonType: "DRIVING", // Initial state

        setLessonType: (value) => {
          set({ lessonType: value });
        },

        getLessonType: () => {
          return get().lessonType;
        },
      }),
      { name: "lesson_Type", skipHydration: true },
    ),
  ),
);

const INITIAL_STATE = {
  bookings: [] as BookingToAdd[],
};

export const useBookingStore = create<
  BookingToAddType & BookingAddActionTypes
>()(
  devtools(
    persist(
      (set, get) => ({
        bookings: INITIAL_STATE.bookings,

        addToBooking(item) {
          const bookings = get().bookings;
          const checkItem = bookings.find(
            (booking) =>
              booking.date === item.date &&
              booking.instructorId === item.instructorId,
          );
          if (!checkItem) {
            set({ bookings: [...bookings, item] });
            return { message: `success` };
          } else {
            set({ bookings: [...bookings] });
            return { message: `exists` };
          }
        },
        deleteBooking(itemDate: string) {
          const bookings = get().bookings;
          const updatedBookings = bookings.filter(
            (booking) => booking.date !== itemDate,
          );
          set({ bookings: updatedBookings });
        },
        resetBooking() {
          set(INITIAL_STATE);
        },
      }),
      { name: "bookings", skipHydration: true },
    ),
  ),
);
