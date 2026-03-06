import { createRecordViewer } from "../utils/domHelpers.js";

function handleRecordClick(app, e) {
  app.recordDialogueElement.style.display = "flex";
  const index = e.target.closest(".data-row").dataset.index;
  const dataRow = app.state.filteredData[Number(index)];
  const element = createRecordViewer(dataRow);
  const existingElement =
    app.recordDialogueElement.getElementsByClassName("record-content")[0];
  if (existingElement) {
    app.recordDialogueElement.firstElementChild.removeChild(existingElement);
  }
  app.recordDialogueElement.firstElementChild.appendChild(element);
}
function handleCloseRecordClick(app, e) {
  app.recordDialogueElement.style.display = "none";
}
export { handleRecordClick, handleCloseRecordClick };
