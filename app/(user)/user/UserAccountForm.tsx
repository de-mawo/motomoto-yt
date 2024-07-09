"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import LoadingBtn from "@/components/common/LoadingBtn";
import { userAccountSchema, UserAccountValues } from "@/lib/zod-validations";
import { E164Number } from "libphonenumber-js";
import { UpdateUser } from "@/app/new-user/actions";
import { useRouter } from "next/navigation";

const UserAccountForm = ({ user, id }: { user: User; id: string }) => {
  const router = useRouter();

  const defaultValues: Partial<UserAccountValues> = {
    phone: user.phone as E164Number,
    name: user.name || "",
    address: user.address || "",
  };

  const form = useForm<UserAccountValues>({
    resolver: zodResolver(userAccountSchema),
    defaultValues,
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
      router.refresh();
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
              <FormLabel className="text-lg font-semibold tracking-tight">
                Name
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
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
              <FormLabel className="text-lg font-semibold tracking-tight">
                Phone
              </FormLabel>
              <FormControl>
                <Input placeholder="jajjs" {...field} />
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
              <FormLabel className="text-lg font-semibold tracking-tight">
                Physical Address
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your physical address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingBtn type="submit" loading={isSubmitting}>
          Update
        </LoadingBtn>
      </form>
    </Form>
  );
};

export default UserAccountForm;
