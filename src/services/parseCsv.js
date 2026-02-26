import AppError from "../error/appError.js";

export function parseCsv(text) {
  if (!text) {
    throw new AppError("Can not parser Empty text", 200);
  }

  const rows = text.split(/\r?\n/);
  const headings = rows[0].split(",");
  const dataRows = rows.slice(1);

  const mappedHeadings = inferColumnTypes(headings, dataRows.slice(0, 4));
  console.log(mappedHeadings);
  const dataEntries = dataRows.map((row, index) => {
    const dataRow = row.split(",");
    if (dataRow.length !== headings.length) {
      throw new AppError("Column mismatch at row:" + index, 202);
    }
    return dataRow.map((element, index) => {
      let typedElement = element;
      switch (mappedHeadings[index].type) {
        case "number":
          typedElement = Number(element);
          break;
        case "boolean":
          typedElement = element.toLowerCase() === "true";
          break;
        case "date":
          typedElement = new Date(element);
          break;
      }
      return [mappedHeadings[index].value, typedElement];
    });
  });
  const data = dataEntries.map((entry) => Object.fromEntries(entry));
  console.log(mappedHeadings);
  return { data, mappedHeadings };
}

function inferColumnTypes(headings, dataRows) {
  const length = dataRows.length;
  const headingTypeMap = [];
  for (let i = 0; i < headings.length; i++) {
    const map = new Map();
    map.set("number", 0);
    map.set("string", 0);
    map.set("boolean", 0);
    map.set("date", 0);

    headingTypeMap.push(map);
  }
  dataRows.map((row, index) => {
    const splitRow = row.split(",");
    if (splitRow.length !== headings.length) {
      throw new AppError("Column mismatch at row:" + index, 202);
    }
    splitRow.map((element, ind) => {
      const type = getType(element);
      headingTypeMap[ind].set(type, headingTypeMap[ind].get(type) + 1);
    });
  });
  const mappedHeadings = headings.map((heading, index) => {
    let type = "string";
    const map = headingTypeMap[index];
    const [maxKey, maxCount] = [...map.entries()].reduce((max, current) =>
      current[1] > max[1] ? current : max,
    );
    const ratio = maxCount / length;
    if ((ratio > 0, 7)) {
      type = maxKey;
    }
    return { value: heading, type: type };
  });
  return mappedHeadings;
}

function getType(element) {
  let type = "string";
  if (element.match(/\d+-\d+-\d+/)) {
    type = "date";
  } else if (element.match(/^\d+(\.\d+)?$/)) {
    type = "number";
  } else if (element.toLowerCase().match(/^(true|false)$/)) {
    type = "boolean";
  }
  return type;
}
