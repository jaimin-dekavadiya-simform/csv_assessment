import { setPaginationParameters } from "../services/paginate.js";

function changeOffsetHandler(app, e) {
  const pageOffset = Number(e.target.value);
  setPaginationParameters(app.state, undefined, pageOffset);
  app.render();
}

function handlePageChange(app, type) {
  let pageNumber = app.state.pagination.pageNumber;
  let totalPages = app.state.pagination.pages;
  switch (type) {
    case "next":
      if (pageNumber == totalPages) {
        return;
      }
      pageNumber++;
      break;
    case "prev":
      if (pageNumber == 1) {
        return;
      }
      pageNumber--;
      break;
    case "number":
      break;
  }
  setPaginationParameters(app.state, pageNumber, undefined);
  app.render();
}
export { changeOffsetHandler, handlePageChange };
