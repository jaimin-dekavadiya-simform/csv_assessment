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
function createHeaderentry(app, value) {
  const headingEntryElement = document.createElement("th");
  const headingContainer = document.createElement("div");
  headingContainer.className = "th-content";

  const sortingButtons = createSortingButtons(app, value);
  const headerText = document.createElement("span");
  headerText.innerHTML = value;
  headingContainer.appendChild(headerText);
  headingContainer.appendChild(sortingButtons);
  headingEntryElement.appendChild(headingContainer);

  return headingEntryElement;
}

function createDataEntry(value) {
  let dataStringEntry;
  if (value instanceof Date) {
    dataStringEntry = value.toLocaleDateString();
  } else {
    dataStringEntry = value.toString();
  }
  const dataEntryElement = document.createElement("td");
  dataEntryElement.innerHTML = dataStringEntry;
  return dataEntryElement;
}
function createHighlightedDataEntry(value, indexes, length) {
  const dataEntryElement = document.createElement("td");
  let dataStringEntry;
  if (value instanceof Date) {
    dataStringEntry = value.toLocaleDateString();
  } else {
    dataStringEntry = value.toString();
  }
  let str = "";
  let i = 0;
  for (const ind in indexes) {
    let index = indexes[ind];
    str = str + dataStringEntry.slice(i, index);
    str =
      str +
      `<span class="highlighted-text">` +
      dataStringEntry.slice(index, index + length) +
      `</span>`;
    i = index + length;
  }

  str = str + dataStringEntry.slice(i, dataStringEntry.length);

  dataEntryElement.innerHTML = str;
  return dataEntryElement;
}

function createSortingButtons(app, heading) {
  const sortingButtonsElement = document.createElement("div");
  sortingButtonsElement.className = "sort-button-container";
  const sortigAscentingButton = document.createElement("div");
  sortigAscentingButton.className = "sort-up-button-container";
  sortigAscentingButton.innerHTML =
    '<i class="fa-solid fa-square-caret-up  sort-up-button sort-buttons" data-type="ASC" data-column = ' +
    heading +
    "></i>";
  const sortigDescendingButton = document.createElement("div");
  sortigDescendingButton.className = "sort-down-button-container";
  sortigDescendingButton.innerHTML =
    '<i class="fa-solid fa-square-caret-down  sort-down-button sort-buttons" data-type="DSC" data-column =' +
    heading +
    "></i>";

  if (app.state.sort.sortBy === heading) {
    if (app.state.sort.sortType === "ASC") {
      sortigAscentingButton.innerHTML =
        '<i class="fa-regular fa-square-caret-up sort-up-button sort-buttons" data-type="DEFAULT"></i>';
    } else {
      sortigDescendingButton.innerHTML =
        '<i class="fa-regular fa-square-caret-down sort-down-button sort-buttons" data-type="DEFAULT"></i>';
    }
  }
  sortingButtonsElement.appendChild(sortigAscentingButton);
  sortingButtonsElement.appendChild(sortigDescendingButton);

  return sortingButtonsElement;
}

function createRecordViewer(dataRow) {
  const recordContent = document.createElement("div");
  recordContent.className = "record-content";
  for (let key in dataRow) {
    const recordRow = document.createElement("div");
    recordRow.className = "record-row";
    const recordKey = document.createElement("span");
    recordKey.className = "record-key";
    recordKey.innerHTML = key;
    const recordValue = document.createElement("span");
    recordValue.className = "record-value";
    recordValue.innerHTML =
      dataRow[key] instanceof Date
        ? dataRow[key].toLocaleDateString()
        : dataRow[key].toString();
    recordRow.appendChild(recordKey);
    recordRow.appendChild(recordValue);
    recordContent.appendChild(recordRow);
  }
  return recordContent;
}

export {
  createPageButton,
  createDots,
  createTableHeader,
  createHeaderentry,
  createDataEntry,
  createSortingButtons,
  createHighlightedDataEntry,
  createRecordViewer,
};
