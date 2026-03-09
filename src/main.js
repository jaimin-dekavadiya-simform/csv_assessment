import { handleFileSubmit } from "./handlers/fileSubmitHandler.js";
import AppError from "./error/appError.js";
import { paginate, setPaginationParameters } from "./services/paginate.js";
import {
  changeOffsetHandler,
  handlePageChange,
  handlePageNumberClick,
} from "./handlers/paginationHandler.js";
import {
  createDataEntry,
  createDots,
  createHeaderentry,
  createPageButton,
  createTableHeader,
  createHighlightedDataEntry,
  createFormElement,
} from "./utils/domHelpers.js";
import { handleSortButtonClick } from "./handlers/sortingButtonHandler.js";
import { sort } from "./services/sort.js";
import { filter } from "./services/filter.js";
import { debounce } from "./utils/debounce.js";
import { debouncedHandleSearch } from "./handlers/filterButtonHandler.js";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "./services/localStorage.js";
import { handleFileExport } from "./handlers/fileExporthandler.js";
import {
  handleCloseRecordClick,
  handleRecordClick,
} from "./handlers/recordViewhandler.js";
import {
  handleAddButtonClick,
  handleCloseAddDialogClick,
  handleSubmitRecord,
} from "./handlers/addNewRecordHandler.js";

class App {
  constructor() {
    this.state = {
      pagination: {
        pageNumber: 1,
        offset: 50,
        persistIndex: 0,
      },
      sort: {
        sortBy: undefined,
        sortType: "DEFAULT",
      },
      filter: {
        searchText: "",
        prevSearchText: "",
      },
    };
    this.modified = false;
    this.file = null;
    this.loaded = false;
    this.loadDom();
    const state = getFromLocalStorage(this);
    if (this.loaded) {
      this.state = state;
      createFormElement(this);
    }
    this.attachHandlers();
    this.setLoader(false);
    console.log(this.state);
    this.render();
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
    this.dataOptionElement
      .getElementsByClassName("next-page-btn")[0]
      .addEventListener("click", () => {
        handlePageChange(this, "next");
      });
    this.dataOptionElement
      .getElementsByClassName("prev-page-btn")[0]
      .addEventListener("click", () => {
        handlePageChange(this, "prev");
      });
    this.dataOptionElement
      .getElementsByClassName("page-numbers")[0]
      .addEventListener("click", (e) => {
        handlePageNumberClick(this, e);
      });
    this.dataOptionElement
      .getElementsByClassName("search-input")[0]
      .addEventListener("input", (e) => {
        debouncedHandleSearch(this, e);
      });
    document
      .getElementsByClassName("export-btn")[0]
      .addEventListener("click", (e) => {
        handleFileExport(this, e);
      });
    this.dataTableElement.addEventListener("click", (e) => {
      handleRecordClick(this, e);
    });
    this.recordDialogueElement
      .getElementsByClassName("close-btn")[0]
      .addEventListener("click", (e) => {
        handleCloseRecordClick(this, e);
      });
    this.dataOptionElement
      .getElementsByClassName("add-btn")[0]
      .addEventListener("click", (e) => {
        handleAddButtonClick(this, e);
      });
    this.addDialogElement
      .getElementsByClassName("close-btn")[0]
      .addEventListener("click", (e) => {
        handleCloseAddDialogClick(this, e);
      });

    this.addDialogElement
      .getElementsByClassName("add-submit-btn")[0]
      .addEventListener("click", (e) => {
        handleSubmitRecord(this, e);
      });
  }
  attachDataHandlers() {
    this.dataTableHeaderElement.addEventListener("click", (e) => {
      handleSortButtonClick(this, e);
    });
  }
  loadDataDom() {
    this.dataTableHeaderElement =
      this.dataTableElement.getElementsByClassName("table-header")[0];
  }
  clearFilters() {
    this.state.pagination = {
      pageNumber: 1,
      offset: 50,
      persistIndex: 0,
    };
    this.state.sort = {
      sortBy: undefined,
      sortType: "DEFAULT",
    };
    this.state.filter = {
      searchText: "",
      prevSearchText: "",
    };
    this.dataOptionElement.getElementsByClassName("page-offset")[0].value =
      this.state.pagination.offset;
    this.state.filter.prevSearchText = "";
    this.state.filter.searchText = "";
    this.dataOptionElement.getElementsByClassName("search-input")[0].value =
      this.state.filter.searchText;
    this.render();
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

    this.pageNumbersElement =
      this.dataOptionElement.getElementsByClassName("page-numbers")[0];
    this.recordDialogueElement = document.getElementsByClassName(
      "record-dialog-overlay",
    )[0];
    this.addDialogElement =
      document.getElementsByClassName("add-dialog-overlay")[0];
  }
  handleError(e) {
    alert(e.message);
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
    this.renderPageNumbers();
    this.renderHeaders();
    this.renderData();
    this.loadDataDom();
    this.attachDataHandlers();
    saveToLocalStorage(this.state);
  }

  applyFilters() {
    filter(this);
    sort(this);
    paginate(this);
  }

  renderHeaders() {
    const tableHeaderElement = createTableHeader();
    for (const heading of this.state.filteredHeadings) {
      tableHeaderElement.appendChild(createHeaderentry(this, heading.value));
    }
    this.dataTableElement.appendChild(tableHeaderElement);
  }

  renderData() {
    for (const index in this.state.paginatedData) {
      const dataRow = this.state.paginatedData[index];
      const tableRowElemnet = document.createElement("tr");
      tableRowElemnet.className = "data-row";
      tableRowElemnet.setAttribute("data-index", index);
      for (const heading of this.state.headings) {
        if (!dataRow.matchedIndexes) {
          tableRowElemnet.appendChild(createDataEntry(dataRow[heading.value]));
        } else {
          tableRowElemnet.appendChild(
            createHighlightedDataEntry(
              dataRow[heading.value],
              dataRow.matchedIndexes[heading.value],
              this.state.filter.searchText.length,
            ),
          );
        }
      }
      this.dataTableElement.appendChild(tableRowElemnet);
    }
  }

  renderPageNumbers() {
    const pageNumbers = this.state.pagination.pages;
    console.log("after" + pageNumbers);
    const pageNumber = this.state.pagination.pageNumber;
    this.pageNumbersElement.innerHTML = "";
    console.log(pageNumbers);
    if (pageNumbers <= 7) {
      for (let i = 0; i < pageNumbers; i++) {
        this.pageNumbersElement.appendChild(
          createPageButton(i + 1, pageNumber === i + 1),
        );
      }
    } else {
      if (pageNumber < 3) {
        for (let i = 0; i < 3; i++) {
          this.pageNumbersElement.appendChild(
            createPageButton(i + 1, i + 1 === pageNumber),
          );
        }
        this.pageNumbersElement.appendChild(createDots());
        this.pageNumbersElement.appendChild(createPageButton(pageNumbers));
      } else if (pageNumbers - pageNumber < 2) {
        this.pageNumbersElement.appendChild(createPageButton(1));
        this.pageNumbersElement.appendChild(createDots());
        for (let i = 2; i >= 0; i--) {
          this.pageNumbersElement.appendChild(
            createPageButton(pageNumbers - i, pageNumbers - i === pageNumber),
          );
        }
      } else {
        this.pageNumbersElement.appendChild(createPageButton(1));
        this.pageNumbersElement.appendChild(createDots());
        this.pageNumbersElement.appendChild(createPageButton(pageNumber - 1));
        this.pageNumbersElement.appendChild(createPageButton(pageNumber, true));
        this.pageNumbersElement.appendChild(createPageButton(pageNumber + 1));
        this.pageNumbersElement.appendChild(createDots());
        this.pageNumbersElement.appendChild(createPageButton(pageNumbers));
      }
    }
  }
  renderRecordView() {}
  closeRecordView() {}
}

const app = new App();

export default App;
