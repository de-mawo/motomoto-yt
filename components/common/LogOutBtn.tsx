import { signOut } from "@/auth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { LuLogOut } from "react-icons/lu";
import { redirect } from "next/navigation";

const LogOutButton = ({ withTooltip = false }) => {
  return withTooltip ? (
    <form
      action={async () => {
        "use server";
        await signOut();
        redirect('/')
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className=" rounded-full bg-slate-100 p-1 dark:bg-slate-300 dark:text-slate-700">
              <LuLogOut size={20} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <button type="submit">Log Out</button>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  ) : (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">LogOut</button>
    </form>
  );
};

export default LogOutButton;
