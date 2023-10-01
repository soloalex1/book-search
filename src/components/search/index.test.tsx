import { describe, expect, test } from "vitest";

import { screen, render } from "@testing-library/react";

import Search from ".";

describe("components/Search", () => {
  test("should render the component correctly", () => {
    const { container } = render(<Search />);

    expect(container).toMatchSnapshot();

    const searchField = screen.getByPlaceholderText(/pesquisar/i);
    expect(searchField).toBeVisible();
    expect(searchField).toBeEnabled();

    const searchIcon = screen.getByLabelText(/pesquisar/i);
    expect(searchIcon).toBeVisible();
  });
});
