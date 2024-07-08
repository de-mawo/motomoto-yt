"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { draftToMarkdown } from "markdown-draft-js";

import { Button } from "@/components/ui/button";
import { PiCaretUpDown, PiCheck } from "react-icons/pi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addArrayItem, cn, removeArrayItem } from "@/lib/utils";

import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { drivingLocations } from "@/lib/dummy";
import TextEditor from "@/components/common/TextEditor";
import LoadingBtn from "@/components/common/LoadingBtn";
import { Badge } from "@/components/ui/badge";
import { AddInstructor } from "./actions";
import { InstructorSchema, InstructorValues } from "@/lib/zod-validations";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  userId: string;
};

//TODO: Fix the error that shows when you select 5+ years of experience when filling the form .

const AddInstructorForm = ({ userId }: Props) => {
  const [areas, setAreas] = useState<string[]>([]);
  const [areasInput, setAreasInput] = useState("");

  const handleAddArea = () => {
    const updatedAreas = addArrayItem(areas, areasInput);
    setAreas(updatedAreas);
    setAreasInput("");
  };
  const handleRemoveArea = (indexToRemove: number) => {
    const updatedAreas = removeArrayItem(areas, indexToRemove);
    setAreas(updatedAreas);
  };

  const form = useForm<InstructorValues>({
    resolver: zodResolver(InstructorSchema),
  });

  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: InstructorValues) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await AddInstructor({ formData, areas, userId });
    } catch (error) {
      toast.error("An Unexpected error occured", { duration: 4000 });
    }
  }

  return (
    <ScrollArea className="h-[60vh] px-5"> 
    <Form {...form} >
      <form className="space-y-6 p-2" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Experience</SelectLabel>
                      <SelectItem value="zero-to-one">0-1 Years</SelectItem>
                      <SelectItem value="two-to-four">2-4 Years</SelectItem>
                      <SelectItem value="five-and-above">
                        Over 5 Years
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <Label onClick={() => setFocus("bio")}>Biography</Label>
              <FormControl>
                <TextEditor
                  onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="certificate"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Certificate</FormLabel>
              <FormControl>
                <Input placeholder="certificate" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Location</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? drivingLocations.find(
                            (location) => location.value === field.value,
                          )?.label
                        : "Select a location"}
                      <PiCaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search location..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No location found.</CommandEmpty>
                      <CommandGroup>
                        {drivingLocations.map((location) => (
                          <CommandItem
                            value={location.label}
                            key={location.value}
                            onSelect={() => {
                              form.setValue("location", location.value);
                            }}
                          >
                            {location.label}
                            <PiCheck
                              className={cn(
                                "ml-auto h-4 w-4",
                                location.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="image"
          render={({ field: { value, ...fieldValues } }) => (
            <FormItem>
              <FormLabel>Professional Image</FormLabel>
              <FormControl>
                <Input
                  {...fieldValues}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    fieldValues.onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dcost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driving Lesson Cost (optional)</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="lcost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Learners Lesson Cost (optional)</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="transmission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transmision Type Offered</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select transmission type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Transmision Type Offered</SelectLabel>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="both">Both Manual & Auto</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <>
          <Label>Areas Served</Label>
          <div className="grid grid-cols-3">
            <FormItem className="col-span-2">
              <FormControl>
                <Input
                  placeholder="areas"
                  value={areasInput}
                  onChange={(e) => setAreasInput(e.target.value.toLowerCase())}
                />
              </FormControl>
              {areas.length ? (
                <ul className="flex list-none flex-wrap space-x-2">
                  {areas.map((value, index) => {
                    return (
                      <li key={index} className="relative">
                        <Badge>{value}</Badge>
                        <div className="absolute right-0 top-0 -mt-1 mr-[-8px] h-4 w-4 rounded-full bg-red-500">
                          <button
                            type="button"
                            className="absolute right-1 top-1 -mt-1 text-xs font-semibold text-black focus:outline-none"
                            onClick={() => handleRemoveArea(index)}
                          >
                            x
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </FormItem>

            <Button onClick={handleAddArea} type="button">
              Add areas
            </Button>
          </div>
        </>

        <FormField
          control={control}
          name="services"
          render={({ field }) => (
            <FormItem>
              <Label onClick={() => setFocus("services")}>
                Services Offered
              </Label>
              <FormControl>
                <TextEditor
                  onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingBtn type="submit" loading={isSubmitting}>
          Submit
        </LoadingBtn>
      </form>
    </Form>
    </ScrollArea>
  );
};

export default AddInstructorForm;
