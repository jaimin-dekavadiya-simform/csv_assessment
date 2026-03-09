import { downloadCsv, jsonToCsv } from "../utils/downloadFileHelpers.js";

function handleFileExport(app, e) {
  try {
    const data = app.state.filteredData;
    const csvData = jsonToCsv(data);
    downloadCsv(csvData, "myCsv");
  } catch (e) {
    app.handleError(e);
  }
}

export { handleFileExport };
