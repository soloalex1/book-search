export interface VolumeData {
  kind: "books#volume";
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: {
    saleability: string;
  };
  accessInfo: {
    epub: Availability;
    pdf: Availability;
  };
}

export type VolumeInfo = {
  title: string;
  subtitle: string;
  authors: string[];
  publishedDate: string;
  description: string;
  categories: string[];
  imageLinks: VolumeImages;
};

type Availability = {
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
