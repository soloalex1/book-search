import { AccessInfo, Format, SaleInfo } from "@/types";

export const inPrice = (num: number, min: number, max: number) =>
  num >= min && num <= max;

export const isAvailable = ({ epub, pdf }: AccessInfo, filter: Format) =>
  epub.isAvailable === filter.epub && pdf.isAvailable === filter.pdf;

export const isForSale = (saleInfo: SaleInfo, filter: boolean) =>
  saleInfo.saleability === (filter ? "FOR_SALE" : "NOT_FOR_SALE");
