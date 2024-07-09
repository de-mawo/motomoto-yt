"use client";

import { useBookingStore } from "@/lib/store";
import { GiPayMoney } from "react-icons/gi";
import { addBookings } from "./actions";
import toast from "react-hot-toast";
import { useState } from "react";
import LoadingBtn from "@/components/common/LoadingBtn";

const CashPayment = ({ method }: { method: string }) => {
  const [loading, setLoading] = useState(false);

  const { bookings, resetBooking } = useBookingStore();

  const payMethod = method.toUpperCase();

  async function onSubmit() {
    try {
      setLoading(true);
      await addBookings({ bookings, payMethod });
      resetBooking();
      setLoading(false);
    } catch (error) {
      toast.error("An Unexpected error occured", { duration: 4000 });
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-center gap-3">
        <div className="h-16 w-16 rounded-full border border-orange-300 bg-slate-300 p-2 text-slate-700 md:h-24 md:w-24">
          <GiPayMoney className="h-12 w-12 md:h-16 md:w-16" />
        </div>
        <h3>Pay with Cash before the Lesson Starts</h3>
      </div>
      <form onSubmit={onSubmit}>
        <LoadingBtn type="submit" className="w-full" loading={loading}>
          Continue
        </LoadingBtn>
      </form>
    </div>
  );
};

export default CashPayment;
