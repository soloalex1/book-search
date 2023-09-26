import React from "react";
import { Icon, InputSearch } from "./styles";
import { SearchProps } from "./types";

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <>
      <InputSearch
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Pesquisar..."
      />
      <Icon />
    </>
  );
};

export default Search;
