export const selectedCharityTabActions = {
  selectedTabType,
};

function selectedTabType(view) {
  return { type: "GET_TAB_TYPE", view };
}
