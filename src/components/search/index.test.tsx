import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  screen,
  render,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { renderHook, cleanup } from "@testing-library/react-hooks";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import Search from ".";

import useStore from "@/store";
import * as api from "@/api";

import { queryMocks, volumeMocks } from "@/store/_mocks";

describe("components/Search", () => {
  const store = useStore.getState();
  const historyMock = createBrowserHistory({ basename: "/" });

  const querySpy = vi.spyOn(store, "setQuery");
  const suggestionSpy = vi.spyOn(store, "setSuggestions");
  const setVolumeSpy = vi.spyOn(store, "setVolumes");
  const getVolumeSpy = vi.spyOn(api, "getVolumes");

  beforeEach(() => {
    useStore.setState(store, true);
    historyMock.push("/");

    suggestionSpy.mockImplementation(() => {
      useStore.setState({ suggestions: volumeMocks });
    });

    setVolumeSpy.mockImplementation(() => {
      useStore.setState({ volumes: queryMocks });
    });

    getVolumeSpy.mockResolvedValue(queryMocks);

    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");

      return {
        // @ts-expect-error
        ...actual,
        push: vi.fn(),
      };
    });
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
    const history = createBrowserHistory();
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

    await waitFor(() => expect(setVolumeSpy).toHaveBeenCalledOnce());

    expect(result.current.volumes.items.length).toEqual(
      queryMocks.items.length
    );

    expect(result.current.query).toEqual("novo volume");
    expect(result.current.suggestions.length).toEqual(volumeMocks.length);
  });

  test("should render suggestions list on search change and focus", async () => {
    const { result } = renderHook(() => useStore());

    render(
      <Router history={historyMock}>
        <Search />
      </Router>
    );

    const searchField = screen.getByPlaceholderText(/pesquisar/i);
    fireEvent.change(searchField, { target: { value: "novo volume" } });

    expect(suggestionSpy).toHaveBeenCalledOnce();
    await waitFor(() => expect(getVolumeSpy).toHaveBeenCalledOnce());
    expect(result.current.suggestions.length).toEqual(volumeMocks.length);

    fireEvent.focus(searchField);
    const suggestionsList = await screen.findByLabelText(
      /Sugestões de pesquisa/i
    );

    expect(suggestionsList).toBeVisible();
    expect(suggestionsList).not.toBeEmptyDOMElement();

    const firstSuggestion = screen.queryAllByText(
      volumeMocks[0].volumeInfo.title
    );
    expect(firstSuggestion.length).not.toEqual(0);
  });

  test("should hide suggestions list on blur", () => {
    render(<Search />);

    const searchField = screen.getByPlaceholderText(/pesquisar/i);
    fireEvent.change(searchField, { target: { value: "novo volume" } });
    fireEvent.focus(searchField);

    const suggestionsList = screen.getByLabelText(/Sugestões de pesquisa/i);
    expect(suggestionsList).toBeVisible();
    expect(suggestionsList).not.toBeEmptyDOMElement();

    fireEvent.blur(searchField);

    expect(suggestionsList).not.toBeVisible();
  });

  test("should not render suggestions list without a query", () => {
    const suggestionsQuery = /Sugestões de pesquisa/i;

    suggestionSpy.mockImplementation(() => {
      useStore.setState({ suggestions: [] });
    });

    render(<Search />);

    const suggestionsList = screen.queryByLabelText(suggestionsQuery);
    expect(suggestionsList).toBeNull();

    const searchField = screen.getByPlaceholderText(/pesquisar/i);

    fireEvent.change(searchField, { target: { value: "" } });
    const suggestionsListAfterChange =
      screen.queryByLabelText(suggestionsQuery);
    expect(suggestionsListAfterChange).toBeNull();

    fireEvent.focus(searchField);
    const suggestionsListAfterFocus = screen.queryByLabelText(suggestionsQuery);
    expect(suggestionsListAfterFocus).toBeNull();
  });

  test("should redirect to search page on submit", async () => {
    const historySpy = vi.spyOn(historyMock, "push");

    render(
      <Router history={historyMock}>
        <Search />
      </Router>
    );

    const searchField = screen.getByPlaceholderText(/pesquisar/i);

    act(() => {
      fireEvent.change(searchField, { target: { value: "novo volume" } });
    });

    const searchForm = screen.getByRole("search");

    act(() => {
      fireEvent.submit(searchForm);
    });

    await waitFor(() => {
      expect(historySpy).toHaveBeenCalledOnce();
      expect(historyMock.location.pathname).toEqual("/search");
    });
  });
});
