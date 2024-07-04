

import { redirect } from "next/navigation";
import ContactDetailsForm from "./ContactDetailsForm";
import getSession from "@/lib/getSession";

export default async function NewUserPage() {
  const session = await getSession();
  const currentUser = session?.user;
  const id = String(session?.user?.id);

  if (!currentUser) {
    redirect("/api/auth/signin?callbackUrl=/");
  }



  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 p-5 shadow-lg sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Add your details below
          </h1>
        </div>

        <ContactDetailsForm id={id} />
      </div>
    </div>
  );
}
