import App from "../main.js";
/**
 * @param {App} app
 */
function paginate(app) {
  const offset = app.state.pagination.offset;
  const startIndex = (app.state.pagination.pageNumber - 1) * offset;
  const lastIndex = startIndex + offset;
  console.log(startIndex, offset);
  app.state.paginatedData = app.state.sortedData.slice(startIndex, lastIndex);
}

function setPaginationParameters(state, pageNumber, offset) {
  if (pageNumber) {
    state.pagination.pageNumber = pageNumber;
  }
  if (offset) {
    const startIndex =
      (state.pagination.pageNumber - 1) * (state.pagination.offset || offset);
    state.pagination.offset = offset;
    const pageNumber = Math.floor(startIndex / offset) + 1;
    state.pagination.pageNumber = pageNumber;
    state.pagination.pages = Math.ceil(state.sortedData.length / offset);
    document.getElementsByClassName("page-offset")[0].value = offset;
  }
}

export { paginate, setPaginationParameters };
