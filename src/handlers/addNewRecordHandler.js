function handleAddButtonClick(app, e) {
  app.addDialogElement.style.display = "flex";
}
function handleCloseAddDialogClick(app, e) {
  app.addDialogElement.style.display = "none";
}
function handleSubmitRecord(app, e) {
  try {
    const inputElements = [
      ...app.addDialogElement.getElementsByClassName("form-data"),
    ].map((element) => element.value);
    const headings = app.state.headings;
    console.log(inputElements);
    const obj = {};
    inputElements.forEach((data, index) => {
      if (data === "") {
        throw new Error("Invalid Input");
      }
      switch (headings[index].type) {
        case "number":
          obj[headings[index].value] = Number(data);
          break;
        case "string":
          obj[headings[index].value] = data;
          break;
        case "date":
          obj[headings[index].value] = new Date(data);
          break;
        case "boolean":
          obj[headings[index].value] = Boolean(data);
          break;
      }
    });
    app.state.data.unshift(obj);
    app.modified = true;
    app.addDialogElement.style.display = "none";
    app.render();
  } catch (e) {
    app.handleError(e);
  }
}
export { handleAddButtonClick, handleCloseAddDialogClick, handleSubmitRecord };
