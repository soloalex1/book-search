import { beforeEach, describe, expect, test, vi } from "vitest";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { renderHook, cleanup } from "@testing-library/react-hooks";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import Search from ".";

import useStore from "@/store";

import { queryMocks, volumeMocks } from "@/store/_mocks";

describe("components/Search", () => {
  const store = useStore.getState();

  const querySpy = vi.spyOn(store, "setQuery");
  const suggestionSpy = vi.spyOn(store, "setSuggestions");
  const volumeSpy = vi.spyOn(store, "setVolumes");

  beforeEach(() => {
    useStore.setState(store, true);

    suggestionSpy.mockImplementation(() => {
      useStore.setState({ suggestions: volumeMocks });
    });

    volumeSpy.mockImplementation(() => {
      useStore.setState({ volumes: queryMocks });
    });

    vi.mock("getVolumes", () => volumeMocks);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("should render the component correctly", () => {
    const { container } = render(<Search />);
    expect(container).toMatchSnapshot();

    const searchField = screen.getByPlaceholderText(/pesquisar/i);
    expect(searchField).toBeVisible();
    expect(searchField).toBeEnabled();

    const searchIcon = screen.getByLabelText(/pesquisar/i);
    expect(searchIcon).toBeVisible();
  });

  test("should apply changes correctly on the component and the store", async () => {
    const history = createMemoryHistory();
    const { result } = renderHook(() => useStore());

    render(
      <Router history={history}>
        <Search />
      </Router>
    );

    const searchField = screen.getByPlaceholderText(/pesquisar/i);
    fireEvent.change(searchField, { target: { value: "novo volume" } });

    const searchByValue = screen.getByDisplayValue(/novo volume/i);
    expect(searchByValue).toBeInTheDocument();

    expect(querySpy).toHaveBeenCalledOnce();
    expect(suggestionSpy).toHaveBeenCalledOnce();

    const form = screen.getByRole("search");
    fireEvent.submit(form);

    await waitFor(() => expect(volumeSpy).toHaveBeenCalledOnce());

    expect(result.current.volumes.items.length).toEqual(
      queryMocks.items.length
    );

    expect(result.current.query).toEqual("novo volume");
    expect(result.current.suggestions.length).toEqual(volumeMocks.length);
  });

  test("should render suggestions list when value is changed", async () => {
    const history = createMemoryHistory();
    const { result } = renderHook(() => useStore());

    render(
      <Router history={history}>
        <Search />
      </Router>
    );

    const searchField = screen.getByPlaceholderText(/pesquisar/i);
    fireEvent.change(searchField, { target: { value: "novo volume" } });

    // todo ver se a lista de sugestões foi renderizada
  });

  test("should hide suggestions list on blur", async () => {
    //   render(<Search />);
    //   const searchField = screen.getByPlaceholderText(/pesquisar/i);
    //   fireEvent.change(searchField, { target: { value: "novo volume" } });
    //   fireEvent.blur(searchField);
    //   expect(suggestions).not.toBeInTheDocument();
  });
});
