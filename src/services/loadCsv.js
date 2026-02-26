import AppError from "../error/appError.js";

export async function loadCsv(file) {
  if (!file) {
    throw new AppError("Please Select File", 200);
  }
  if (file.type !== "text/csv") {
    throw new AppError("Only CSV files are allowed", 200);
  }
  const text = await file.text();
  return text;
}
