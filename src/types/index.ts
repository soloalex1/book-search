export interface VolumeData {
  kind: "books#volume";
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
}

export type VolumeQuery = {
  totalItems: number;
  items: VolumeData[];
};

export type SaleInfo = {
  saleability: string;
  retailPrice: {
    amount: number;
  };
};

export type VolumeInfo = {
  title: string;
  subtitle: string;
  authors: string[];
  publishedDate: string;
  description: string;
  categories: string[];
  imageLinks: VolumeImages;
};

export type AccessInfo = {
  epub: Availability;
  pdf: Availability;
};

export type Availability = {
  isAvailable: boolean;
  acsTokenLink?: string;
};

type VolumeImages = {
  smallThumbnail?: string;
  thumbnail?: string;
};

export type SearchFilters = {
  price: Price;
  availableFormats: Format;
  availableItems: boolean;
};

export type Price = {
  id?: number;
  min?: number;
  max?: number;
};

export type Format = {
  pdf: boolean;
  epub: boolean;
};

export type JSONResponse = {
  kind: string;
  totalItems: number;
  items: VolumeData[];
};
