/**
 * @param {Event} event
 * @param {App} app
 */
function handleSortButtonClick(app, e) {
  const button = e.target.closest(".sort-buttons");
  if (!button) {
    return;
  }
}
export { handleSortButtonClick };
