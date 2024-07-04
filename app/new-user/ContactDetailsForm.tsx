"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { userAccountSchema, UserAccountValues } from "@/lib/zod-validations";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { UpdateUser } from "./actions";
import LoadingBtn from "@/components/common/LoadingBtn";



export default function ContactDetailsForm({ id }: {id: string}) {
  const router = useRouter();
  const form = useForm<UserAccountValues>({
    resolver: zodResolver(userAccountSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: UserAccountValues) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await UpdateUser({ formData, id });
      toast.success(`Success`);
      router.push("/");
    } catch (error) {
      toast.error("An Unexpected error occured", { duration: 4000 });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormControl className="relative">
                <Input
                  className="appearance-none border-0 border-b-[1px] border-orange-300 bg-transparent focus:outline-none focus-visible:ring-0  focus-visible:ring-offset-0"
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormDescription>Your Name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormControl>
                <Input
                  placeholder=""
                  className="appearance-none border-0 border-b-[1px] border-orange-300 bg-transparent focus:outline-none focus-visible:ring-0  focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormDescription>Your phone number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormControl>
                <Input
                  placeholder=""
                  className="appearance-none border-0 border-b-[1px] border-orange-300 bg-transparent focus:outline-none focus-visible:ring-0  focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormDescription>Your pick-up address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingBtn type="submit" className="w-full" loading={isSubmitting}>
          Add
        </LoadingBtn>
      </form>
    </Form>
  );
}
