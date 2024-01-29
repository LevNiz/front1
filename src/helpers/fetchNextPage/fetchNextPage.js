export const fetchNextPage = async (
  page,
  setPage,
  totalPages,
  setItemsData,
  setScrollLoading,
  fetchMoreItems,
  category
) => {
  if (page < totalPages) {
    setScrollLoading(true);
    try {
      const { success, data } = await fetchMoreItems(category, page + 1);
      if (success) {
        setItemsData((prevItems) => [...prevItems, ...data]);
        setPage((prevPage) => prevPage + 1);
      }
    } finally {
      setScrollLoading(false);
    }
  }
};
