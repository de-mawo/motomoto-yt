"use client";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import NavItem from "./nav-item";

interface SideBarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ElementType;
  }[]
  showTooltip: boolean
  
}

export default function SideNavBar({
  className,
  items,
  showTooltip,
  ...props
}: SideBarProps) {
  return (
    <ScrollArea className="mt-8 h-[70vh]">
      <nav className={cn("flex flex-col space-y-6", className)} {...props}>
        {items.map((item) => (
          <NavItem key={item.href} {...item} showTooltip={showTooltip} />
        ))}
      </nav>
    </ScrollArea>
  );
}
