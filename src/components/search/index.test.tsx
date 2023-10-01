import { beforeEach, describe, expect, test, vi } from "vitest";
import { cleanup, screen, render, fireEvent } from "@testing-library/react";
import { create } from "zustand";

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

  test("should apply changes correctly on the component", () => {
    render(<Search />);

    const searchField = screen.getByPlaceholderText(/pesquisar/i);
    fireEvent.change(searchField, { target: { value: "novo volume" } });

    const searchByValue = screen.getByDisplayValue(/novo volume/i);
    expect(searchByValue).toBeInTheDocument();
  });

  test("should render suggestions list when value is changed", async () => {
    render(<Search />);

    const searchField = screen.getByPlaceholderText(/pesquisar/i);
    fireEvent.change(searchField, { target: { value: "novo volume" } });

    const suggestions = await screen.findByLabelText(/lista de sugestões/i);
    expect(suggestions).toBeVisible();
    expect(suggestions).not.toBeEmptyDOMElement();
    expect(suggestions.children.length).toEqual(10);
  });

  test("should hide suggestions list on blur", async () => {
    render(<Search />);

    const searchField = screen.getByPlaceholderText(/pesquisar/i);
    fireEvent.change(searchField, { target: { value: "novo volume" } });

    const suggestions = await screen.findByLabelText(/lista de sugestões/i);

    fireEvent.blur(searchField);
    expect(suggestions).not.toBeInTheDocument();
  });
});
