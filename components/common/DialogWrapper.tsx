import { Button } from "@/components/ui/button";
import { IconType } from "react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { ScrollArea } from "../ui/scroll-area";

type DialogProps = {
  children: ReactNode;
  btnTitle?: string;
  title?: string;
  descr?: string;
  isBtn: boolean;
  icon?: IconType;
  open?: boolean;
  setOpen?: () => void;
};

const DialogWrapper = ({
  children,
  btnTitle,
  title,
  descr,
  icon: Icon,
  isBtn,
  open,
  setOpen,
}: DialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isBtn ? (
          <Button> {btnTitle}</Button>
        ) : (
          Icon && (
            <Button variant="ghost">
              <Icon size={20} />
            </Button>
          )
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <ScrollArea className="max-h-[80vh]">
          <DialogHeader>
            <DialogTitle> {title}</DialogTitle>
            <DialogDescription>{descr}</DialogDescription>
          </DialogHeader>
          {children}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
