function createPageButton(num, active) {
  const btn = document.createElement("button");
  btn.className = "page-number-btn";
  if (active) {
    btn.style.backgroundColor = "#CBCBCB";
    console.log(active);
  }
  btn.textContent = num;
  return btn;
}

function createDots() {
  const span = document.createElement("span");
  span.textContent = "...";
  return span;
}

function createTableHeader() {
  const tableHeaderElement = document.createElement("tr");
  tableHeaderElement.className = "table-header";
  return tableHeaderElement;
}
function createHeaderentry(value) {
  const headingEntryElement = document.createElement("th");
  const headingContainer = document.createElement("div");
  headingContainer.className = "header-cell-container";

  const sortingButtons = createSortingButtons(value);
  const headerText = document.createElement("span");
  headerText.innerHTML = value;
  headingContainer.appendChild(headerText);
  headingContainer.appendChild(sortingButtons);
  headingEntryElement.appendChild(headingContainer);

  return headingEntryElement;
}

function createDataEntry(value) {
  const dataEntryElement = document.createElement("td");
  dataEntryElement.innerHTML = value;
  return dataEntryElement;
}

function createSortingButtons(heading) {
  const sortingButtonsElement = document.createElement("div");
  sortingButtonsElement.className = "sort-button-container";
  const sortigAscentingButton = document.createElement("div");
  sortigAscentingButton.className = "sort-up-button-container";
  sortigAscentingButton.innerHTML =
    '<i class="fa-solid fa-sort-up  sort-up-button sort-buttons" data-type="ascending" data-column = ' +
    heading +
    "></i>";
  const sortigDescendingButton = document.createElement("div");
  sortigDescendingButton.className = "sort-down-button-container";
  sortigDescendingButton.innerHTML =
    '<i class="fa-solid fa-sort-down  sort-down-button sort-buttons" data-type="descending" data-column =' +
    heading +
    "></i>";
  sortingButtonsElement.appendChild(sortigAscentingButton);
  sortingButtonsElement.appendChild(sortigDescendingButton);
  return sortingButtonsElement;
}

export {
  createPageButton,
  createDots,
  createTableHeader,
  createHeaderentry,
  createDataEntry,
  createSortingButtons,
};
