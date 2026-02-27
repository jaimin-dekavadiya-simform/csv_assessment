import App from "../main.js";
/**
 * @param {App} app
 */
function paginate(state) {
  const startIndex = state.pagination.startIndex;
  const offset = state.pagination.offset;
  console.log(startIndex, offset);
  state.filteredData = state.filteredData.slice(startIndex, offset);
}

function setPaginationParameters(state, pageNumber, offset) {
  if (pageNumber) {
    const startIndex = offset * (pageNumber - 1);
    state.pagination.startIndex = startIndex;
  }
  if (offset) {
    state.pagination.offset = offset;
    console.log(state);
    state.pagination.pages = state.filteredData.length / offset;
  }
}

export { paginate, setPaginationParameters };
