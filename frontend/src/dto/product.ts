export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  reviewCount?: number;
  availableStock: number;
  imageSrc: string;
  imageAlt: string;
  ProductGenre: ProductGenre;
  ProductFormat: ProductFormat;
  ProductArtist: ProductArtist;
}

interface ProductGenre {
  id: string;
  name: string;
  description: string;
}

interface ProductFormat {
  id: string;
  name: string;
  description: string;
}

interface ProductArtist {
  id: string;
  name: string;
  description: string;
}
