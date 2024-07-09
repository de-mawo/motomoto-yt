import { z } from "zod";
import parsePhoneNumberFromString from "libphonenumber-js";

const zPhone = z.string().transform((arg, ctx) => {
  const phone = parsePhoneNumberFromString(arg, {
    // set this to use a default country when the phone number omits country code
    defaultCountry: "ZA",

    // set to false to require that the whole string is exactly a phone number,
    // otherwise, it will search for a phone number anywhere within the string
    extract: false,
  });

  // when it's good
  if (phone && phone.isValid()) {
    return phone.number;
  }

  // when it's not
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: "Invalid phone number",
  });
  return z.NEVER;
});

const requiredString = z.string().min(3, "Required");
const numericString = z
  .string()
  .regex(/^\d+$/, "Must be a number")
  .max(9, "Number must be less than 9 digits")
  .optional();

export const userAccountSchema = z.object({
  name: z.string().optional(),
  phone: zPhone,
  address: z.string().optional(),
});

const ImageSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Only Images Allowed",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

export const InstructorSchema = z.object({
  name: requiredString.max(50),
  phone: zPhone,
  email: z.string().email(),
  image: ImageSchema.optional(),
  certificate: z.string().optional(),
  experience: requiredString,
  bio: z.string().max(5000).optional(),
  services: z.string().max(5000).optional(),
  dcost: numericString,
  lcost: numericString,
  transmission: z.string(),
  location: z.string().optional(),
});

export const addTimeSlotsSchema = z.object({
  date: z.date(),
  type: z.string(),
  times: z.array(z.date()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one timeslot.",
  }),
})



export type UserAccountValues = z.infer<typeof userAccountSchema>;

export type InstructorValues = z.infer<typeof InstructorSchema>;

export type AddTimeSlotsValues = z.infer<typeof addTimeSlotsSchema>;