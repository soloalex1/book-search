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

type VolumeInfo = {
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
