import { z } from "zod";
import { messages } from "@/config/messages";
import { fileSchema, validateEmail } from "./common-rules";

// form zod validation schema
export const personalInfoFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: validateEmail,
  mobile: z.string().min(1, { message: "Mobile number is required" }),
  designation: z.string().optional(),
  companyName: z.string().min(1, 'Company name is required'),
  registeredAddress: z.string().min(1, 'Registered address is required'),
  warehouseAddress: z.string().optional(), // Optional field
  gstNo: z.string().min(15, 'GST number must be 15 characters').max(15, 'GST number must be 15 characters'),
  panCard: z.string().min(10, 'PAN card must be 10 characters').max(10, 'PAN card must be 10 characters'),
  bankName: z.string().optional(),
  accountName: z.string().optional(),
  accountNo: z.string().optional(),
  emailId: z.string().email('Invalid email address').optional().or(z.literal('')),
  ifscCode: z.string().optional(),
  accountType: z.enum(['savings', 'current']).optional(),
  dealershipDocuments: z.string().optional(),
});

// generate form types from zod validation schema
export type PersonalInfoFormTypes = z.infer<typeof personalInfoFormSchema>;

export const defaultValues = {
  // email: "",
  // mobile: "",
  name: '',
  mobile: '',
  email: '',
  designation: '',
  companyName: '',
  registeredAddress: '',
  warehouseAddress: '',
  gstNo: '',
  panCard: '',
  bankName: '',
  accountName: '',
  accountNo: '',
  emailId: '',
  ifscCode: '',
  accountType: 'savings' as const,
  dealershipDocuments: '',
};
