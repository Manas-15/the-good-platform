export const selectedCorporateActions = {
  selectedCorporate,
};

function selectedCorporate(view) {
  return { type: "GET_CORPORATE", view };
}
