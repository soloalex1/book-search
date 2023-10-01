import * as zustand from "zustand";
import { act } from "@testing-library/react";

const { create: actualCreate, createStore: actualCreateStore } =
  jest.requireActual<typeof zustand>("zustand");

export const storeResetFunctions = new Set<() => void>();

// when creating a store, we get its initial state, create a reset function and add it in the set
export const create = (<T>() => {
  return (stateCreator: zustand.StateCreator<T>) => {
    const store = actualCreate(stateCreator);
    const initialState = store.getState();

    storeResetFunctions.add(() => {
      store.setState(initialState, true);
    });

    return store;
  };
}) as typeof zustand.create;

export const createStore = (<T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreateStore(stateCreator);
  const initialState = store.getState();

  storeResetFunctions.add(() => {
    store.setState(initialState, true);
  });

  return store;
}) as typeof zustand.createStore;

afterEach(() => {
  act(() => {
    storeResetFunctions.forEach((resetFn) => {
      resetFn();
    });
  });
});
