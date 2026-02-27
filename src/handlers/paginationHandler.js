import { setPaginationParameters } from "../services/paginate.js";

function changeOffsetHandler(app, e) {
  const pageOffset = Number(e.target.value);
  setPaginationParameters(app.state, undefined, pageOffset);
  app.render();
}

export { changeOffsetHandler };
