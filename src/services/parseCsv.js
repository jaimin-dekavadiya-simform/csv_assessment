import AppError from "../error/appError.js";

export function parseCsv(text) {
  if (!text) {
    throw new AppError("Can not parser Empty text", 200);
  }

  const rows = text.split("\n");
  const headings = rows[0].split(",");
  const dataRows = rows.slice(1);
  const data = dataRows.map((row) => {
    return Object.fromEntries(
      row.split(",").map((element, index) => {
        return [headings[index], element];
      }),
    );
  });

  return data;
}
