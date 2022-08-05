const SearchHelper = (data, searchText) => {
  return data?.filter((item) =>
    searchText
      ? item?.name?.toLowerCase()?.includes?.(searchText.toLowerCase())
      : item
  );
};

const SearchDonationPreferenceHelper = (data, searchText, selected) => {
  const lowerSearchText = searchText.toLowerCase();
  return data?.filter((item) =>
    searchText
      ? selected === "programName"
        ? item?.charityProgram?.toLowerCase()?.includes?.(lowerSearchText)
        : selected === "organizationName"
        ? item?.socialOrganization?.toLowerCase()?.includes?.(lowerSearchText)
        : selected === "amount" &&
          item?.donationAmount.toString() === lowerSearchText
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
