export const selectedCharityActions = {
  selectedCharity,
};

function selectedCharity(view) {
  return { type: "GET_CHARITY", view };
}