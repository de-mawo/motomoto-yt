import InstructorsCard from "./InstructorsCard";
import { getInstructors } from "@/lib/getUserData";

const InstructorsList = async () => {
  const instructors = await getInstructors();
  return (
    <>
      <div className="z-5 relative mx-auto w-full text-center">
        <h1 className="mb-8 text-2xl font-bold leading-none tracking-normal md:text-3xl md:tracking-tight">
          Instructors near you
        </h1>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:py-16">
        <div className="grid grid-cols-1 place-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {instructors.map((instructor) => (
            <InstructorsCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
      </div>
    </>
  );
};

export default InstructorsList;
