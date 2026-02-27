import App from "../main.js";
/**
 * @param {App} app
 */
function paginate(state) {
  const offset = state.pagination.offset;
  const startIndex = (state.pagination.pageNumber - 1) * offset;
  const lastIndex = startIndex + offset;
  console.log(startIndex, offset);
  state.paginatedData = state.filteredData.slice(startIndex, lastIndex);
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
    console.log(state);
    state.pagination.pages = Math.ceil(state.filteredData.length / offset);
  }
}

export { paginate, setPaginationParameters };
