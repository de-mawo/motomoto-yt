import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import BookingItems from "./BookingItems";
import PaymentMethods from "./PaymentMethods";


const PayPage = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/pay");
  }
  return (
    <div className="m-auto my-10 max-w-3xl space-y-10">
      <BookingItems />
      <PaymentMethods />
    </div>
  );
};

export default PayPage;
