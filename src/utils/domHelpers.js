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
  headingEntryElement.innerHTML = value;
  return headingEntryElement;
}

function createDataEntry(value) {
  const dataEntryElement = document.createElement("td");
  dataEntryElement.innerHTML = value;
  return dataEntryElement;
}
export {
  createPageButton,
  createDots,
  createTableHeader,
  createHeaderentry,
  createDataEntry,
};
