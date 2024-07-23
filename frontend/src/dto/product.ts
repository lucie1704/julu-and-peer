import { Customer } from '~/dto/customer';

export interface PaginatedProducts {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  data: Array<Product>;
  facets: Record<string, Array<FacetItem>>;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  reviewCount?: number;
  discount: number;
  ProductGenre: Category;
  ProductFormat: Category;
  ProductArtist: Category;
  ProductCustomerEvaluation: Array<CustomerEvaluation>;
  Stocks: Array<Stock>;
  Images: Array<Image>;
}

export interface PaginatedCategories {
  page: number,
  limit: number,
  totalItems: number,
  totalPages: number,
  data: Array<Category>
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

type FacetItem = {
  _id: string;
  count: number;
};

type Image = {
  width: number,
  height: number,
  type: string,
  description: string,
  alt: string,
  path: string
};

type Stock = {
  type: string,
  quantity: number
};

type CustomerEvaluation = {
  _id: string,
  rating: number,
  comment: string,
  Customer: Customer,
  updatedAt: Date
};