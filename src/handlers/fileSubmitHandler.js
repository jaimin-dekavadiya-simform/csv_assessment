import App from "../main.js";
import AppError from "../error/appError.js";
import { loadCsv } from "../services/loadCsv.js";
/**
 * @param {Event} event
 * @param {App} app
 */

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function handleFileSubmit(e, app) {
  try {
    app.setLoader(true);
    const file = app.fileInputElement.files[0];
    const text = await loadCsv(file);
    await sleep(500);
    app.state.text = text;
    console.log(app.state);
    app.setLoader(false);
  } catch (e) {
    app.handleError(e);
    app.setLoader(false);
  }
}

export { handleFileSubmit };
