import { handleFileSubmit } from "./handlers/fileSubmitHandler.js";
import AppError from "./error/appError.js";

class App {
  constructor() {
    this.state = {};
    this.file = null;
    this.loadDom();
    this.attachHandlers();
    this.setLoader(false);
    this.render();
    this.loaded = false;
  }
  attachHandlers() {
    this.submitBtnElement.addEventListener("click", (e) => {
      handleFileSubmit(e, this);
    });
  }

  loadDom() {
    this.loaderElement = document.getElementsByClassName("file-loader")[0];
    this.fileInputElement =
      this.loaderElement.getElementsByClassName("file-input")[0];
    this.submitBtnElement =
      this.loaderElement.getElementsByClassName("submit-btn")[0];
    this.loadingIconElement =
      document.getElementsByClassName("loading-icon")[0];
    this.dataContainerElement =
      document.getElementsByClassName("data-container")[0];
    this.dataTableElement =
      this.dataContainerElement.getElementsByClassName("data-table")[0];
  }
  handleError(e) {
    console.log(e);
  }
  setLoader(loading) {
    if (loading) {
      this.loadingIconElement.style.display = "block";
    } else {
      this.loadingIconElement.style.display = "none";
    }
  }
  render() {
    this.dataTableElement.innerHTML = "";
    if (!this.loaded) {
      this.dataTableElement.innerHTML = "<p>Please Load the Data</p>";
      return;
    }

    this.applyFilters();

    const tableHeaderElement = document.createElement("tr");
    tableHeaderElement.className = "table-header";

    for (const heading of this.state.filteredHeadings) {
      const headingEntryElement = document.createElement("th");
      headingEntryElement.innerHTML = heading.value;
      tableHeaderElement.appendChild(headingEntryElement);
    }
    this.dataTableElement.appendChild(tableHeaderElement);

    for (const dataRow of this.state.filteredData) {
      const tableRowElemnet = document.createElement("tr");
      for (const heading of this.state.headings) {
        const dataEntryElement = document.createElement("td");
        dataEntryElement.innerHTML = dataRow[heading.value];
        tableRowElemnet.appendChild(dataEntryElement);
      }
      this.dataTableElement.appendChild(tableRowElemnet);
    }
  }
  applyFilters() {}
}

const app = new App();

export default App;
