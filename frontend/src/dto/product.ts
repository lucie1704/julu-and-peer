export interface ProductI {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  reviewCount?: number;
  availableStock: number;
  imageSrc: string;
  imageAlt: string;
  ProductGenre: ProductGenreI;
  ProductFormat: ProductFormatI;
  ProductArtist: ProductArtistI;
}

interface ProductGenreI {
  id: string;
  name: string;
  description: string;
}

interface ProductFormatI {
  id: string;
  name: string;
  description: string;
}

interface ProductArtistI {
  id: string;
  name: string;
  description: string;
}
