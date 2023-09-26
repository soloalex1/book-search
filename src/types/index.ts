export interface VolumeData {
  kind: "books#volume";
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publishedDate: string;
    description: string;
  };
  saleInfo: {
    saleability: string;
  };
  accessInfo: {
    epub: Availability;
    pdf: Availability;
  };
}

type Availability = {
  isAvailable: boolean;
  acsTokenLink?: string;
};
