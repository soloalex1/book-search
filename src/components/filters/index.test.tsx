import { describe, expect, test, vi } from "vitest";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { renderHook, cleanup } from "@testing-library/react-hooks";

import useStore from "@/store";

import Filters from ".";

describe("components/Filters", () => {
  const store = useStore.getState();

  const priceSpy = vi.spyOn(store, "setPriceFilters");
  const formatSpy = vi.spyOn(store, "setFormatFilters");
  const availabilitySpy = vi.spyOn(store, "setAvailabilityFilters");

  beforeEach(() => {});

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    global.innerWidth = 1408;
  });

  test("it should render the component correctly", () => {
    const { container } = render(<Filters />);

    expect(container).toMatchSnapshot();

    const filterTitle = screen.getByText(/filtrar resultados/i);
    expect(filterTitle).toBeVisible();

    const priceLabel = screen.getByText(/preço/i);
    expect(priceLabel).toBeVisible();

    const formatLabel = screen.getByText(/formatos/i);
    expect(formatLabel).toBeVisible();

    const availabilityLabel = screen.getByText(/disponibilidade/i);
    expect(availabilityLabel).toBeVisible();
  });

  test("it should render the clear button when filters are applied", () => {
    render(<Filters />);

    const availabilityInput = screen.getByLabelText(/volumes disponíveis/i);

    fireEvent.click(availabilityInput);

    const clearButton = screen.getByText(/limpar filtros/i);
    expect(clearButton).toBeVisible();
    expect(clearButton).toBeEnabled();
  });

  test("it should clear filters correctly", () => {
    render(<Filters />);

    const moreThan100Input = screen.getByLabelText(/mais de/i);
    fireEvent.click(moreThan100Input);

    const pdfInput = screen.getByLabelText(/pdf/i);
    fireEvent.click(pdfInput);

    const availabilityInput = screen.getByLabelText(/volumes disponíveis/i);
    fireEvent.click(availabilityInput);

    const clearButton = screen.getByText(/limpar filtros/i);
    fireEvent.click(clearButton);

    expect(moreThan100Input).not.toBeChecked();
    expect(pdfInput).not.toBeChecked();
    expect(availabilityInput).not.toBeChecked();

    expect(clearButton).not.toBeVisible();
  });

  test("it should be hidden on tablet or mobile", () => {
    global.innerWidth = 700;
    render(<Filters />);

    const filtersButton = screen.getByText(/filtros/i);
    expect(filtersButton).toBeVisible();
    expect(filtersButton).toBeEnabled();

    const filterTitle = screen.queryByText(/filtrar resultados/i);
    expect(filterTitle).toBeNull();
  });

  test("it should slide to screen when filters button clicked, on tablet or mobile", () => {
    global.innerWidth = 700;
    render(<Filters />);

    const filtersButton = screen.getByText(/filtros/i);
    fireEvent.click(filtersButton);

    const filterTitle = screen.getByText(/filtrar resultados/i);
    expect(filterTitle).toBeVisible();
  });

  test("it should hide on blur, on tablet or mobile", async () => {
    global.innerWidth = 700;
    render(<Filters />);

    const filtersButton = screen.getByText(/filtros/i);
    fireEvent.click(filtersButton);

    const filterTitle = screen.getByText(/filtrar resultados/i);
    expect(filterTitle).toBeVisible();

    const sidePane = screen.getByLabelText(/side pane/i);
    const backdrop = screen.getByLabelText(/backdrop/i);
    fireEvent.click(backdrop);

    await waitFor(() => expect(sidePane).not.toBeVisible(), { timeout: 500 });
    await waitFor(() => expect(backdrop).not.toBeVisible(), { timeout: 500 });
  });

  test("it should apply and clear filters on store", () => {
    const { result } = renderHook(() => useStore());

    render(<Filters />);

    const priceLowInput = screen.getByLabelText(/de R\$0 até R\$30/i);
    fireEvent.click(priceLowInput);

    expect(priceSpy).toHaveBeenCalledOnce();
    expect(result.current.filters.price.min).toBeUndefined();
    expect(result.current.filters.price.max).toStrictEqual(30);

    const priceHighInput = screen.getByLabelText(/mais de R\$100/i);
    fireEvent.click(priceHighInput);

    expect(priceSpy).toHaveBeenCalledTimes(2);
    expect(result.current.filters.price.min).toStrictEqual(100);
    expect(result.current.filters.price.max).toBeUndefined();

    const pdfInput = screen.getByLabelText(/pdf/i);
    fireEvent.click(pdfInput);

    expect(formatSpy).toHaveBeenCalledOnce();
    expect(result.current.filters.availableFormats.pdf).toStrictEqual(true);
    expect(result.current.filters.availableFormats.epub).toStrictEqual(false);

    const availabilityInput = screen.getByLabelText(/volumes disponíveis/i);
    fireEvent.click(availabilityInput);

    expect(availabilitySpy).toHaveBeenCalledOnce();
    expect(result.current.filters.availableItems).toStrictEqual(true);

    const clearButton = screen.getByText(/limpar filtros/i);
    fireEvent.click(clearButton);

    expect(result.current.filters.price.min).toBeUndefined();
    expect(result.current.filters.price.max).toBeUndefined();
    expect(result.current.filters.availableFormats.pdf).toStrictEqual(false);
    expect(result.current.filters.availableFormats.epub).toStrictEqual(false);
    expect(result.current.filters.availableItems).toStrictEqual(false);
  });
});
