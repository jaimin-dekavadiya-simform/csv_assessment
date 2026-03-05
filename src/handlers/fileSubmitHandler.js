import App from "../main.js";
import AppError from "../error/appError.js";
import { loadCsv } from "../services/loadCsv.js";
import { parseCsv } from "../services/parseCsv.js";
import { setPaginationParameters } from "../services/paginate.js";
// async function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, ms);
//   });
// }
/**
 * @param {Event} event
 * @param {App} app
 */
async function handleFileSubmit(e, app) {
  try {
    app.setLoader(true);

    const file = app.fileInputElement.files[0];
    const text = await loadCsv(file);
    const { data, mappedHeadings } = parseCsv(text);

    app.state.data = data;
    app.state.headings = mappedHeadings;
    app.state.filteredData = data;
    app.state.filteredHeadings = mappedHeadings;
    app.state.sortedData = data;
    app.setLoader(false);
    app.loaded = true;
    setPaginationParameters(app.state, 1, 50);
    app.render();
  } catch (e) {
    app.handleError(e);
    app.setLoader(false);
  }
}

export { handleFileSubmit };
