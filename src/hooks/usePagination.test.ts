import { renderHook, act } from "@testing-library/react-hooks";
import usePagination from "./usePagination";

const items = [
  { id: 1, name: "Bob 1" },
  { id: 2, name: "Bob 2" },
  { id: 3, name: "Bob 3" },
  { id: 4, name: "Bob 4" },
  { id: 5, name: "Bob 5" },
  { id: 6, name: "Bob 6" },
  { id: 7, name: "Bob 7" },
  { id: 8, name: "Bob 8" },
  { id: 9, name: "Bob 9" },
  { id: 10, name: "Bob 10" },
];

const itemsPerPage = 2;

describe("usePagination hook", () => {
  test("should return total number of items", () => {
    const initialPageNumber = 0;

    const { result } = renderHook(() =>
      usePagination(items, initialPageNumber, itemsPerPage)
    );

    expect(result.current.itemCount).toBe(10);
  });

  test("should return items relating to current page", () => {
    const initialPageNumber = 0;

    const { result } = renderHook(() =>
      usePagination(items, initialPageNumber, itemsPerPage)
    );

    expect(result.current.currentPageItems.length).toBe(2);
    expect(result.current.currentPageItems[0].id).toBe(1);
  });

  test("should return number of pages", () => {
    const initialPageNumber = 0;

    const { result } = renderHook(() =>
      usePagination(items, initialPageNumber, itemsPerPage)
    );

    expect(result.current.numberOfPages).toBe(5);
  });

  test("should be able to determine if there are more pages available after current page", () => {
    const initialPageNumber = 0;

    const { result } = renderHook(() =>
      usePagination(items, initialPageNumber, itemsPerPage)
    );

    expect(result.current.hasNextPage).toBe(true);
  });

  test("should be able to determine if there are any previous pages available before current page", () => {
    const initialPageNumber = 1;

    const { result } = renderHook(() =>
      usePagination(items, initialPageNumber, itemsPerPage)
    );

    expect(result.current.currentPageNumber).toBe(1);
    expect(result.current.hasPreviousPage).toBe(true);
  });

  test("should support moving to next page of items", () => {
    const initialPageNumber = 0;

    const { result } = renderHook(() =>
      usePagination(items, initialPageNumber, itemsPerPage)
    );

    act(() => {
      result.current.goToNextPage();
    });

    expect(result.current.currentPageItems.length).toBe(2);
    expect(result.current.currentPageItems[0].id).toBe(3);
  });

  test("should support moving to previous page of items", () => {
    const initialPageNumber = 2;

    const { result } = renderHook(() =>
      usePagination(items, initialPageNumber, itemsPerPage)
    );

    act(() => {
      result.current.goToPreviousPage();
    });

    expect(result.current.currentPageItems.length).toBe(2);
    expect(result.current.currentPageItems[0].id).toBe(3);
  });
});
