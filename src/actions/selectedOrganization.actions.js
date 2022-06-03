export const selectedOrganizationActions = {
  selectedOrganization,
};

function selectedOrganization(view) {
  return { type: "GET_ORGANIZATION", view };
}
