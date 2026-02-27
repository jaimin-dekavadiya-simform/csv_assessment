import { handleFileSubmit } from "./handlers/fileSubmitHandler.js";
import AppError from "./error/appError.js";
import { paginate, setPaginationParameters } from "./services/paginate.js";
import { changeOffsetHandler } from "./handlers/paginationHandler.js";

class App {
  constructor() {
    this.state = {
      pagination: {},
    };
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
    this.dataOptionElement
      .getElementsByClassName("page-offset")[0]
      .addEventListener("change", (e) => {
        changeOffsetHandler(this, e);
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
    this.dataOptionElement = document.getElementsByClassName("data-options")[0];
    this.dataTableElement = document
      .getElementsByClassName("data-container")[0]
      .getElementsByClassName("data-table")[0];
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
  applyFilters() {
    this.state.filteredData = this.state.data;
    paginate(this.state);
  }
}

const app = new App();

export default App;
