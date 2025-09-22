import { z } from "zod";
import { messages } from "@/config/messages";
import { validateEmail } from "./common-rules";

// form zod validation schema
export const addTeamMemberSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  userEmail: validateEmail,
  userMobile: z.string().min(1, { message: "Mobile number is required" }),
  userType: z.enum(["ADMIN", "SUPER_ADMIN", "MANAGER", "STAFF"], {
    required_error: "User type is required",
  }),
});

// generate form types from zod validation schema
export type AddTeamMemberInput = z.infer<typeof addTeamMemberSchema>;

// Edit team member schema (without password)
export const editTeamMemberSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  userEmail: validateEmail,
  userMobile: z.string().min(1, { message: "Mobile number is required" }),
  userType: z.enum(["ADMIN", "SUPER_ADMIN", "MANAGER", "STAFF"], {
    required_error: "User type is required",
  }),
});

// generate form types from zod validation schema
export type EditTeamMemberInput = z.infer<typeof editTeamMemberSchema>;
