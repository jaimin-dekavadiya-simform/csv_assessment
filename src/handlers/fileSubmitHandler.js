import App from "../main.js";
import AppError from "../error/appError.js";
import { loadCsv } from "../services/loadCsv.js";
import { parseCsv } from "../services/parseCsv.js";

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
    const data = parseCsv(text);
    app.state.data = data;

    app.setLoader(false);
  } catch (e) {
    app.handleError(e);
    app.setLoader(false);
  }
}

export { handleFileSubmit };
