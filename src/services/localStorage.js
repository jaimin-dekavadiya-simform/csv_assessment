function saveToLocalStorage(state) {
  localStorage.setItem("csv_pars", JSON.stringify(state));
  console.log("saved", state);
}
function getFromLocalStorage(app) {
  const state = JSON.parse(localStorage.getItem("csv_pars"));
  if (state) {
    app.loaded = true;
  }
  app.dataOptionElement.getElementsByClassName("page-offset")[0].value =
    state.pagination.offset;

  app.dataOptionElement.getElementsByClassName("search-input")[0].value =
    state.filter.searchText;
  const headings = state.headings;
  state.data.map((obj) => {
    for (const heading of headings) {
      switch (heading.type) {
        case "number":
          obj[heading.value] = Number(obj[heading.value]);
          break;
        case "string":
          break;
        case "date":
          obj[heading.value] = new Date(obj[heading.value]);
          break;
        case "boolean":
          obj[heading.value] = Boolean(obj[heading.value]);
          break;
      }
    }
  });
  state.sortedData.map((obj) => {
    for (const heading of headings) {
      switch (heading.type) {
        case "number":
          obj[heading.value] = Number(obj[heading.value]);
          break;
        case "string":
          break;
        case "date":
          obj[heading.value] = new Date(obj[heading.value]);
          break;
        case "boolean":
          obj[heading.value] = Boolean(obj[heading.value]);
          break;
      }
    }
  });
  state.filteredData.map((obj) => {
    for (const heading of headings) {
      switch (heading.type) {
        case "number":
          obj[heading.value] = Number(obj[heading.value]);
          break;
        case "string":
          break;
        case "date":
          obj[heading.value] = new Date(obj[heading.value]);
          break;
        case "boolean":
          obj[heading.value] = Boolean(obj[heading.value]);
          break;
      }
    }
  });
  state.paginatedData.map((obj) => {
    for (const heading of headings) {
      switch (heading.type) {
        case "number":
          obj[heading.value] = Number(obj[heading.value]);
          break;
        case "string":
          break;
        case "date":
          obj[heading.value] = new Date(obj[heading.value]);
          break;
        case "boolean":
          obj[heading.value] = Boolean(obj[heading.value]);
          break;
      }
    }
  });
  console.log("return ", state);
  return state;
}
export { saveToLocalStorage, getFromLocalStorage };
