export const currentViewActions = {
  currentView,
};

function currentView(view) {
  return { type: "CURRENT_VIEW", view };
}