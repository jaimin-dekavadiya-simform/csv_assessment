/**
 * @param {Event} event
 * @param {App} app
 */
function handleSortButtonClick(app, e) {
  const button = e.target.closest(".sort-buttons");
  if (!button) {
    return;
  }
  console.log(button);
  const sortBy = button.dataset.column;
  const sortType = button.dataset.type;
  console.log(sortType);
  if (sortType === "DEFAULT") {
    app.state.sort.sortBy = "DEFAULT";
    app.state.sort.sortType = "DEFAULT";
  } else {
    app.state.sort.sortBy = sortBy;
    app.state.sort.sortType = sortType;
  }

  app.render();
}
export { handleSortButtonClick };
