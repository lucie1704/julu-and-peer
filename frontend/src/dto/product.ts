export interface PaginatedProducts {
  page: 1,
  limit: 20,
  totalItems: 6,
  totalPages: number,
  data: Array<Product>
  facets: Record<string, Array<FacetItem>>
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  reviewCount?: number;
  availableStock: number;
  imageSrc: string;
  imageAlt: string;
  ProductGenre: Category;
  ProductFormat: Category;
  ProductArtist: Category;
}

export interface PaginatedCategories {
  page: 1,
  limit: 20,
  totalItems: 6,
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
