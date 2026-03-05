function saveToLocalStorage(state) {
  localStorage.setItem("csv_parser", JSON.stringify(state));
}
function getFromLocalStorage(app) {
  const state = JSON.parse(localStorage.getItem("csv_parser"));
  if (state) {
    app.loaded = true;
  }
  app.dataOptionElement.getElementsByClassName("page-offset")[0].value =
    state.pagination.offset;
  state.filter.prevSearchText = "";
  app.dataOptionElement.getElementsByClassName("search-input")[0].value =
    state.filter.searchText;
  return state;
}
export { saveToLocalStorage, getFromLocalStorage };
