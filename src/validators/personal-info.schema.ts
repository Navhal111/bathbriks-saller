import { z } from "zod";
import { messages } from "@/config/messages";
import { fileSchema, validateEmail } from "./common-rules";

// form zod validation schema
export const personalInfoFormSchema = z.object({
  email: validateEmail,
  mobile: z.string().min(1, { message: "Mobile number is required" }),
  designation: z.string().min(1, { message: "Designation is required" }).optional(),
});

// generate form types from zod validation schema
export type PersonalInfoFormTypes = z.infer<typeof personalInfoFormSchema>;

export const defaultValues = {
  email: "",
  mobile: "",
  designation: "",
};
