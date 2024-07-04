
import React, { createElement } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { usePathname } from "next/navigation";

interface NavItemProps {
    href: string;
    title: string;
    icon: React.ElementType;
    showTooltip: boolean;
  }

export default function NavItem({href, title, icon, showTooltip}:NavItemProps) {
    const pathname = usePathname();
  
    return (
      <Link
        key={href}
        href={href}
        className={cn(
          pathname === href
            ? " text-orange-500  "
            : "hover:bg-transparent hover:underline",
          "flex items-center justify-start gap-2",
        )}
      >
        {showTooltip ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  {createElement(icon, {
                    size: 20,
                  })}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <>
            <span>
              {createElement(icon, {
                size: 20,
              })}
            </span>
            <p className="text-sm font-semibold">{title}</p>
          </>
        )}
      </Link>
    );
  };
