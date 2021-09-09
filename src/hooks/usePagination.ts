import { useState, useCallback } from "react";

export default function usePagination(
  items: any[],
  initialPageNumber: number,
  itemsPerPage: number
) {
  const [currentPageNumber, setCurrentPageNumber] = useState(initialPageNumber);
  const offset = currentPageNumber * itemsPerPage;
  const itemCount = items.length;
  const currentPageItems = items.slice(offset, offset + itemsPerPage);
  const numberOfPages = Math.ceil(itemCount / itemsPerPage);
  const hasNextPage = currentPageNumber < numberOfPages - 1;
  const hasPreviousPage = currentPageNumber > 0;
  const goToNextPage = useCallback(
    () => setCurrentPageNumber((x) => x + 1),
    []
  );

  const goToPreviousPage = useCallback(
    () => setCurrentPageNumber((x) => x - 1),
    []
  );
  
  const goToPage = useCallback(
    (pageNumber: number) => setCurrentPageNumber((x) => pageNumber),
    []
  );

  return {
    itemCount,
    currentPageItems,
    currentPageNumber,
    numberOfPages,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  };
}
