function saveToLocalStorage(state) {
  localStorage.setItem("csv_pars", JSON.stringify(state));
  console.log("saved", state);
}
function getFromLocalStorage(app) {
  const state = JSON.parse(localStorage.getItem("csv_pars"));
  if (state) {
    app.loaded = true;
  }
  // app.dataOptionElement.getElementsByClassName("page-offset")[0].value =
  //   state.pagination.offset;
  // state.filter.prevSearchText = "";
  app.dataOptionElement.getElementsByClassName("search-input")[0].value =
    state.filter.searchText;
  console.log("return ", state);
  return state;
}
export { saveToLocalStorage, getFromLocalStorage };
