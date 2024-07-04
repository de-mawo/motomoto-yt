import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";


interface LoadingBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

export default function LoadingBtn({
  children,
  loading,
  ...props
}: LoadingBtnProps) {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      <span className="flex items-center justify-center gap-1">
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </span>
    </Button>
  );
}