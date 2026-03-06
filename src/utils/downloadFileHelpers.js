function jsonToCsv(data) {
  if (!data) {
    app.handleError(new Error("Please load the data before Exporting"));
    return;
  }
  let headers = Object.keys(data[0]);
  if (headers.includes("matchedIndexes")) {
    headers = headers.slice(0, headers.length - 1);
  }
  console.log(headers);
  const dataRows = data.map((obj) => {
    const row = headers.map((key) => {
      return obj[key];
    });
    return row;
  });
  const csvData = [headers.join(","), ...dataRows].join("\n");
  return csvData;
}

function downloadCsv(csvData, filename) {
  if (filename === "") {
    throw new Error("Filename cannot be empty");
  }
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export { jsonToCsv, downloadCsv };
