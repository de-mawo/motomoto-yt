import { redirect } from "next/navigation";
import { BreadCrumbItem } from "@/components/common/bread-crumb-item";
import { getUser } from "@/lib/getUserData";
import AddInstructorForm from "./AddInstructorForm";

export default async function AddInstructorPage({
  params,
  searchParams,
}: {
  params: { user: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = params.user;
  const currentName = searchParams.name; // User's curent name to be changed to instructor

  const getIsInstructor = await getUser({ id });
  const isInstructor = getIsInstructor?.instructor;

  if (isInstructor) {
    redirect("/dashboard/instructors");
  }

  return (
    <>
      <BreadCrumbItem />
      <main className="m-auto my-10 max-w-3xl space-y-10 rounded-md bg-white dark:bg-black">
        <div className="space-y-5 text-center">
          <h1 className="py-3 text-xl font-semibold">
            Add an Instructor&apos;s Profile to the user: {currentName}
          </h1>
        </div>
        <div className="space-y-6 rounded-lg p-4">
          <AddInstructorForm userId={id} />
        </div>
      </main>
    </>
  );
}
