function sort(app) {
  const sortBy = app.state.sort.sortBy;
  if (!sortBy) {
    return;
  }
  let sortType = app.state.sort.sortType;
  if (!sortType) {
    sortType = "ASC";
  }
  const data = app.state.filteredData;
  const sortedData = [...data].sort((a, b) => {
    if (sortType === "ASC") {
      if (a[sortBy] > b[sortBy]) return 1;
      if (a[sortBy] < b[sortBy]) return -1;
      return 0;
    } else if (sortType === "DSC") {
      if (a[sortBy] < b[sortBy]) return 1;
      if (a[sortBy] > b[sortBy]) return -1;
      return 0;
    }
    return 0;
  });
  console.log(data);
  console.log(sortedData);
  app.state.sortedData = sortedData;
}

export { sort };
