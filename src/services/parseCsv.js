import AppError from "../error/appError.js";

export function parseCsv(text) {
  if (!text) {
    throw new AppError("Can not parser Empty text", 200);
  }

  const rows = text.split(/\r?\n/);
  const headings = rows[0].split(",");
  const dataRows = rows.slice(1);
  const dataEntries = dataRows.map((row, index) => {
    const dataRow = row.split(",");
    if (dataRow.length !== headings.length) {
      throw new AppError("Column mismatch at row:" + index, 202);
    }
    return dataRow.map((element, index) => {
      return [headings[index], element];
    });
  });
  const data = dataEntries.map((entry) => Object.fromEntries(entry));

  return data;
}
