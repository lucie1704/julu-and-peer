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
  discount: z.number().optional(),
  ProductGenre: CategorySchema,
  ProductFormat: CategorySchema,
  ProductArtist: CategorySchema,
  ProductCustomerEvaluation: z.array(CustomerEvaluationSchema),
  Stock: z.array(StockSchema).optional(),
  Image: z.array(ImageSchema).optional(),
});

const PaginatedProductsSchema = z.object({
  page: z.number(),
  limit: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  data: z.array(ProductSchema),
  facets: z.record(z.array(FacetItemSchema))
});

const ProductForm = z.object({
  name: z.string(),
  description: z.string(),
  quantity: z.number(),
  price: z.number(),
  discount: z.number(),
  reviewCount: z.number().nullable(),
  genreId: z.string().optional(),
  formatId: z.string().optional(),
  artistId: z.string().optional(),
});

export {
  PaginatedProductsSchema,
  ProductSchema,
  CategorySchema,
  FacetItemSchema,
  ImageSchema,
  StockSchema,
  CustomerEvaluationSchema,
  ProductForm
};