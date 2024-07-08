import { LessonType } from "@prisma/client";

export type DateStore = {
    selectedDate: Date;
    setDate: (value: Date) => void;
    getDateData: () => Date;
  };
  
  export type LessonTypeTypes = {
    setLessonType: (value: string) => void;
    getLessonType: () => string;
    lessonType: string;
  };
  
  export type BookingToAdd = {
      date: string;
      times: Date[];
      cost: number;
      type: LessonType;
      instructorId: string;
    };
    
     export type BookingToAddType = {
      bookings: BookingToAdd[];
    };
    
    export type BookingAddActionTypes = {
      addToBooking: (item: BookingToAdd) => { message: string };
      deleteBooking: (date: string) => void;
      resetBooking: () => void;
    };