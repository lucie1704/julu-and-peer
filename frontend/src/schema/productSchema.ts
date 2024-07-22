import { z } from 'zod';
import { CustomerSchema } from '~/schema/customerSchema';

const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional()
});

const FacetItemSchema = z.object({
  _id: z.string(),
  count: z.number()
});

const ImageSchema = z.object({
  width: z.number(),
  height: z.number(),
  type: z.string(),
  description: z.string(),
  alt: z.string(),
  path: z.string()
});

const StockSchema = z.object({
  type: z.string(),
  quantity: z.number()
});

const CustomerEvaluationSchema = z.object({
  _id: z.string(),
  rating: z.number(),
  comment: z.string(),
  Customer: CustomerSchema,
  updatedAt: z.date()
});

const ProductSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
  reviewCount: z.number().nullable(),
  discount: z.number(),
  ProductGenre: CategorySchema,
  ProductFormat: CategorySchema,
  ProductArtist: CategorySchema,
  ProductCustomerEvaluation: z.array(CustomerEvaluationSchema),
  Stock: z.array(StockSchema),
  Image: z.array(ImageSchema)
});

const PaginatedProductsSchema = z.object({
  page: z.number(),
  limit: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  data: z.array(ProductSchema),
  facets: z.record(z.array(FacetItemSchema))
});

export {
  PaginatedProductsSchema,
  ProductSchema,
  CategorySchema,
  FacetItemSchema,
  ImageSchema,
  StockSchema,
  CustomerEvaluationSchema
};