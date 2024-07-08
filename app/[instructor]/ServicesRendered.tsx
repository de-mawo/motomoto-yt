import MarkDownComponent from "@/components/common/Markdown";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  services: string
}

const ServicesRendered = ({services}: Props) => {
  return (
    <ScrollArea className="m-auto my-10 h-96 max-w-6xl  ">
      <MarkDownComponent>
        {services && services}
      </MarkDownComponent>
    </ScrollArea>
  );
};

export default ServicesRendered;
