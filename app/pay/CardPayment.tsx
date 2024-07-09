"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useBookingStore } from "@/lib/store";

import toast from "react-hot-toast";
import { CardDetailsSchema, CardDetailsValues } from "@/lib/zod-validations";
import LoadingBtn from "@/components/common/LoadingBtn";
import { months } from "@/lib/getTime";
import { addBookings } from "./actions";

const CardPayment = ({ method }: { method: string }) => {
  const { bookings, resetBooking } = useBookingStore();

  const payMethod = method.toUpperCase();

  const form = useForm<CardDetailsValues>({
    resolver: zodResolver(CardDetailsSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  async function onSubmit() {
    try {
      await addBookings({ bookings, payMethod });
      resetBooking();
    } catch (error) {
      toast.error("An Unexpected error occured", { duration: 4000 });
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Name</Label>
                  <FormControl>
                    <Input id="name" placeholder="First & Last" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="cardNumber">Card number</Label>
                  <FormControl>
                    <Input
                      id="cardNumber"
                      maxLength={16}
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="month">Expires</Label>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month, i) => (
                            <SelectItem key={i} value={month.toLowerCase()}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="year">Year</Label>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger id="year">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => (
                            <SelectItem
                              key={i}
                              value={`${new Date().getFullYear() + i}`}
                            >
                              {new Date().getFullYear() + i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="cvc">CVC</Label>
                    <FormControl>
                      <Input id="cvc" placeholder="CVC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <LoadingBtn type="submit" loading={isSubmitting}>
            Pay
          </LoadingBtn>
        </div>
      </form>
    </Form>
  );
};

export default CardPayment;
