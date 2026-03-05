import { debounce } from "../utils/debounce.js";
import { setPaginationParameters } from "../services/paginate.js";
const debouncedHandleSearch = debounce(handleSearchInput, 300);

function handleSearchInput(app, e) {
  const searchText = e.target.value;
  app.state.filter.searchText = searchText;
  app.render();
}

export { debouncedHandleSearch };
