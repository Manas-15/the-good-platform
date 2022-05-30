const SearchHelper = (data, searchText) => {
  return data?.filter((item) =>
    searchText
      ? item?.name?.toLowerCase()?.includes?.(searchText.toLowerCase())
      : item
  );
};
const SearchDonationPreferenceHelper = (data, searchText) => {
  const lowerSearchText = searchText.toLowerCase();
  return data?.filter((item) =>
    searchText
      ? item?.employeeName?.toLowerCase()?.includes?.(lowerSearchText) ||
        item?.donationAmount.toString() === lowerSearchText ||
        item?.charityProgram?.toLowerCase()?.includes?.(lowerSearchText)
      : item
  );
};
const SearchCharityHelper = (data, searchText) => {
  return data?.filter((item) =>
    searchText
      ? item?.charityName?.toLowerCase()?.includes?.(searchText.toLowerCase())
      : item
  );
};

export { SearchHelper, SearchDonationPreferenceHelper, SearchCharityHelper };
