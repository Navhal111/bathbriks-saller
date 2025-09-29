import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from './common-rules';

export const productFormSchema = z.object({
  name: z.string().min(1, { message: messages.productNameIsRequired }),
  sku: z.string().optional(),
  type: z
    .string({ required_error: messages.productTypeIsRequired })
    .min(1, { message: messages.productTypeIsRequired }),
  category_id: z
    .string({ required_error: messages.categoryIsRequired })
    .min(1, { message: messages.categoryIsRequired }),
  subcategory_id: z.string().optional(),
  brand_id: z
    .string({ required_error: messages.brandIsRequired })
    .min(1, { message: messages.brandIsRequired }),
  description: z.string().optional(),
  productImages: z.array(fileSchema).optional(),
  price: z.coerce.number().min(1, { message: messages.priceIsRequired }),
  // costPrice: z.coerce.number().optional(),
  costPrice: z.coerce
    .number()
    .min(1, { message: messages.costPriceIsRequired }),
  mrp: z.coerce
    .number()
    .min(1, { message: messages.retailPriceIsRequired }),
  salePrice: z.coerce
    .number()
    .min(1, { message: messages.salePriceIsRequired }),
  inventoryTracking: z.string().optional(),
  // quantity: z.number().or(z.string()).optional(),
  // lowStock: z.number().or(z.string()).optional(),
  // quantity: z.coerce
  //   .number()
  //   .min(1, { message: messages.currentStockIsRequired }),
  // lowStock: z.coerce
  //   .number()
  //   .min(1, { message: messages.lowStockIsRequired }),
  quantity: z.coerce
    .number()
    .min(1, { message: messages.currentStockIsRequired }),
  lowStock: z.coerce
    .number()
    .min(1, { message: messages.lowStockIsRequired }),
  // productAvailability: z.string().optional(),
  productAvailability: z
    .string({ required_error: messages.productAvailabilityIsRequired })
    .min(1, { message: messages.productAvailabilityIsRequired }),
  tradeNumber: z.number().or(z.string()).optional(),
  manufacturerNumber: z.number().or(z.string()).optional(),
  upcEan: z.number().or(z.string()).optional(),
  customFields: z
    .array(
      z.object({
        label: z.string().optional(),
        value: z.string().optional(),
      })
    )
    .optional(),

  freeShipping: z.boolean().optional(),
  // shippingPrice: z.coerce
  //   .number()
  //   .min(1, { message: messages.shippingPriceIsRequired }),
  shippingPrice: z.coerce
    .number()
    .optional(),
  locationBasedShipping: z.boolean().optional(),
  locationShipping: z
    .array(
      z.object({
        name: z.string().optional(),
        shippingCharge: z.number().or(z.string()).optional(),
      })
    )
    .optional(),
  pageTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  productUrl: z.string().optional(),
  isPurchaseSpecifyDate: z.boolean().optional(),
  isLimitDate: z.boolean().optional(),
  dateFieldName: z.string().optional(),
  availableDate: z.date().min(new Date('1900-01-01')).optional(),
  endDate: z.date().min(new Date('1900-01-02')).optional(),
  // availableDate: z.date().min(new Date('1900-01-01'), {
  //   message: messages.availableDateIsRequired,
  // }),
  // endDate: z.date().min(new Date('1900-01-02'), {
  //   message: messages.endDateIsRequired,
  // }),
  productVariants: z
    .array(
      z.object({
        name: z.string().optional(),
        value: z.string().optional(),
      })
    )
    .optional(),
  tags: z.array(z.string()).optional(),
})
  .refine((data) => {
    const quantity = typeof data.quantity === 'string' ? Number(data.quantity) : data.quantity;
    const lowStock = typeof data.lowStock === 'string' ? Number(data.lowStock) : data.lowStock;

    if (typeof quantity === 'number' && typeof lowStock === 'number') {
      return lowStock <= quantity;
    }

    return true;
  }, {
    message: "Low stock cannot be greater than quantity",
    path: ["lowStock"],
  })
  .refine((data) => data.price > data.costPrice, {
    message: "Cost price must be less than price",
    path: ["costPrice"],
  })
  .refine((data) => data.price > data.mrp, {
    message: "Retail price must be less than price",
    path: ["mrp"],
  })
  .refine((data) => data.price > data.salePrice, {
    message: "Sale price must be less than price",
    path: ["salePrice"],
  })
  .refine((data) => data.salePrice < data.mrp, {
    message: "Sale price must be less than retail price",
    path: ["salePrice"],
  })
  .superRefine((data, ctx) => {
    // ✅ shippingPrice required when freeShipping is false
    if (!data.freeShipping && (data.shippingPrice === undefined || data.shippingPrice < 1)) {
      ctx.addIssue({
        path: ['shippingPrice'],
        code: z.ZodIssueCode.custom,
        message: 'Shipping price is required',
      });
    }

    // ✅ locationShipping required when locationBasedShipping is true
    if (data.locationBasedShipping) {
      if (!data.locationShipping || data.locationShipping.length === 0) {
        ctx.addIssue({
          path: ['locationShipping'],
          code: z.ZodIssueCode.custom,
          message: 'At least one location must be added',
        });
      } else {
        data.locationShipping.forEach((loc, index) => {
          if (!loc.name || loc.name.trim() === '') {
            ctx.addIssue({
              path: ['locationShipping', index, 'name'],
              code: z.ZodIssueCode.custom,
              message: 'Location name is required',
            });
          }

          const chargeRaw = loc.shippingCharge;
          const charge = typeof chargeRaw === 'string' ? Number(chargeRaw) : chargeRaw;
          if (charge === undefined || isNaN(charge) || charge < 1) {
            ctx.addIssue({
              path: ['locationShipping', index, 'shippingCharge'],
              code: z.ZodIssueCode.custom,
              message: 'Shipping charge is required',
            });
          }
        });
      }
    }
  });;

export type CreateProductInput = z.infer<typeof productFormSchema>;
