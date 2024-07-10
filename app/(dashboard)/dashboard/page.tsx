import { BreadCrumbItem } from "@/components/common/bread-crumb-item";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

const DashBoardPage = async () => {
  const session = await getSession();
  const user = session?.user;
 
  if (!user || user.role !== "ADMIN") {
    redirect(user ? "/" : "/api/auth/signin?callbackUrl=/dashboard");
  }

  return (
    <>
      <BreadCrumbItem />
    </>
  );
};

export default DashBoardPage;
