import { z } from 'zod';

// Step 1: Point of Contact Details
export const pointOfContactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
    email: z.string().email('Invalid email address'),
    designation: z.string().optional(), // Optional field
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

// Step 2: Company Details
export const companyDetailsSchema = z.object({
    companyName: z.string().min(1, 'Company name is required'),
    registeredAddress: z.string().min(1, 'Registered address is required'),
    warehouseAddress: z.string().optional(), // Optional field
    gstNo: z.string().min(15, 'GST number must be 15 characters').max(15, 'GST number must be 15 characters'),
    panCard: z.string().min(10, 'PAN card must be 10 characters').max(10, 'PAN card must be 10 characters'),
});

// Step 3: Bank Details (all optional)
export const bankDetailsSchema = z.object({
    bankName: z.string().optional(),
    accountName: z.string().optional(),
    accountNo: z.string().optional(),
    emailId: z.string().email('Invalid email address').optional().or(z.literal('')),
    ifscCode: z.string().optional(),
    accountType: z.enum(['savings', 'current']).optional(),
    dealershipDocuments: z.string().optional(),
});

// Combined schema for complete sign-up
export const signUpSchema = z.object({
    pointOfContact: pointOfContactSchema,
    companyDetails: companyDetailsSchema,
    bankDetails: bankDetailsSchema,
});

// Generate form types from zod validation schemas
export type PointOfContactSchema = z.infer<typeof pointOfContactSchema>;
export type CompanyDetailsSchema = z.infer<typeof companyDetailsSchema>;
export type BankDetailsSchema = z.infer<typeof bankDetailsSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;