import { AccountType } from '@/config/enums';
import { z } from 'zod';

// Step 1: Point of Contact Details
export const pointOfContactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    email: z.string().email('Invalid email address'),
    designation: z.string().optional(), // Optional field
    password: z.string().min(6, 'Password must be at least 6 characters'),
    //     confirmPassword: z.string().min(1, 'Please confirm your password'),
    // }).refine((data) => data.password === data.confirmPassword, {
    //     message: "Passwords don't match",
    //     path: ["confirmPassword"],
});

// Step 2: Address Details
export const addressDetailsSchema = z.object({
    registeredAddress: z.object({
        addressLine1: z.string().min(1, 'Address is required'),
        city: z.string().min(1, 'City is required'),
        state: z.string().min(1, 'State is required'),
        postalCode: z.string().min(1, 'Postal code is required'),
        country: z.string().min(1, 'Country is required'),
    }),
    warehouseAddress: z.object({
        addressLine1: z.string().min(1, 'Address is required'),
        city: z.string().min(1, 'City is required'),
        state: z.string().min(1, 'State is required'),
        postalCode: z.string().min(1, 'Postal code is required'),
        country: z.string().min(1, 'Country is required'),
    }),
});

// Step 2: Company Details
export const companyDetailsSchema = z.object({
    companyName: z.string().min(1, 'Company name is required'),
    email: z.string().email('Invalid email address'),
    gstNumber: z.string().min(15, 'GST number must be 15 characters').max(15, 'GST number must be 15 characters'),
    panNumber: z.string().min(10, 'PAN card must be 10 characters').max(10, 'PAN card must be 10 characters'),
});

// Step 3: Bank Details (all optional)
export const bankDetailsSchema = z.object({
    bankName: z.string().min(1, 'Bank name is required'),
    accountName: z.string().min(1, 'Account name is required'),
    accountNumber: z.string().min(6, 'Account number must be 6 characters'),
    ifscCode: z.string().min(11, 'IFSC code must be 11 characters').max(11, 'IFSC code must be 11 characters'),
    accountType: z.enum([AccountType.SAVINGS, AccountType.CURRENT]).optional(),
    dealershipDocuments: z.string().optional(),
});

// Combined schema for complete sign-up
export const signUpSchema = z.object({
    pointOfContact: pointOfContactSchema,
    companyDetails: companyDetailsSchema,
    bankDetails: bankDetailsSchema,
    addressDetails: addressDetailsSchema,
});

// Generate form types from zod validation schemas
export type PointOfContactSchema = z.infer<typeof pointOfContactSchema>;
export type CompanyDetailsSchema = z.infer<typeof companyDetailsSchema>;
export type BankDetailsSchema = z.infer<typeof bankDetailsSchema>;
export type AddressDetailsSchema = z.infer<typeof addressDetailsSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;