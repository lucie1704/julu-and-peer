import { z } from 'zod';

// Schema for a product
const ProductSchema = z.object({
  id: z.string(),
  priceWhenOrdered: z.number(),
  isReturned: z.boolean()
});

// Schema for a customer
const CustomerSchema = z.object({
  id: z.string(),
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  active: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable()
});

// Schema for the main customer order
const CustomerOrderSchema = z.object({
  id: z.string(),
  products: z.array(ProductSchema),
  price: z.string(),
  paymentStatus: z.string().nullable(),
  shippingInfo: z.string().nullable(),
  billingInfo: z.string().nullable(),
  deliveryStatus: z.string().nullable(),
  date: z.string().nullable(),
  customerId: z.string(),
  customerAddressId: z.string(),
  orderBillingId: z.string(),
  shippingId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Customer: CustomerSchema
});

export {
  ProductSchema,
  CustomerSchema,
  CustomerOrderSchema
};
