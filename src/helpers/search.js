export const SearchHelper = (data, searchText) => {
  return data?.filter((item) =>
    searchText
      ? item?.name?.toLowerCase()?.includes?.(searchText.toLowerCase())
      : item
  );
};
