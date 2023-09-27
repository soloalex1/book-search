import { ChangeEvent } from "react";

export type SearchProps = {
  value: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  onBlur(): void;
};
