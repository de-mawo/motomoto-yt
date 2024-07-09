import getSession from "@/lib/getSession";
import { getUser } from "@/lib/getUserData";
import { redirect } from "next/navigation";
import UserAccountForm from "./UserAccountForm";
import { User } from "@prisma/client";

const UserPortal = async () => {
  const session = await getSession();
  const currentUser = session?.user;
  const email = session?.user?.email as string;
  const id = session?.user?.id as string;

  if (!currentUser) {
    redirect("/api/auth/signin?callbackUrl=/user");
  }

  const user = await getUser({ email });
  return (
    <div className="m-auto my-10 max-w-3xl space-y-10 rounded-md bg-white p-4 dark:bg-slate-800">
      <UserAccountForm user={user as User} id={id} />
    </div>
  );
};

export default UserPortal;
