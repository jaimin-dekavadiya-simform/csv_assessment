import { setPaginationParameters } from "./paginate.js";

function filter(app) {
  const searchText = app.state.filter.searchText;
  const prevSearchText = app.state.filter.prevSearchText;
  const regEx = new RegExp(searchText, "gi");
  const data = app.state.data;
  const searchMappings = [];
  if (searchText === prevSearchText) {
    return;
  }
  app.state.filter.prevSearchText = searchText;
  if (searchText === "") {
    app.state.filteredData = [...data];
    app.state.sortedData = [...data];
    app.state.sort.sortBy = undefined;
    app.state.sort.sortType = "DEFAULT";
    setPaginationParameters(app.state, 1, 50);
    return;
  }
  const filteredData = data.reduce((acc, row, index) => {
    let matched = false;
    const matchedIndexes = new Map();
    for (const entry in row) {
      let dataEntry = row[entry];
      let dataStringEntry = "";
      if (dataEntry instanceof Date) {
        dataStringEntry = dataEntry.toLocaleDateString();
      } else {
        dataStringEntry = dataEntry.toString();
      }
      const matches = [...dataStringEntry.matchAll(regEx)];
      if (matches.length === 0) {
        continue;
      }
      matched = true;
      const indexes = [];

      for (const match of matches) {
        indexes.push(match.index);
      }
      matchedIndexes.set(entry, indexes);
    }
    if (matched) {
      const newRow = { ...row };
      newRow.matchedIndexes = matchedIndexes;
      acc.push(newRow);
    }
    return acc;
  }, []);
  app.state.filteredData = filteredData;
  app.state.sortedData = filteredData;
  app.state.sort.sortBy = undefined;
  app.state.sort.sortType = "DEFAULT";
  setPaginationParameters(app.state, 1, 50);
  console.log(app.state.sortedData);
}

export { filter };
