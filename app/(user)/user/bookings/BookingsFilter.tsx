import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BookingsFilter() {
  return (
    <div className="m-auto my-10 max-w-3xl">
      <form>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger id="year">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 5 }, (_, i) => (
                <SelectItem key={i} value={`${new Date().getFullYear() - i}`}>
                  {new Date().getFullYear() - i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Select Lesson Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Lesson Type</SelectLabel>
                <SelectItem value="DRIVING">DRIVING</SelectItem>
                <SelectItem value="LEARNERS">LEARNERS</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button type="submit"> Search</Button>
        </div>
      </form>
    </div>
  );
}
