import { handleFileSubmit } from "./handlers/fileSubmitHandler.js";
import AppError from "./error/appError.js";

class App {
  constructor() {
    this.state = {};
    this.file = null;
    this.loadDom();
    this.attachHandlers();
    this.setLoader(false);
  }
  attachHandlers() {
    this.submitBtnElement.addEventListener("click", (e) => {
      handleFileSubmit(e, this);
    });
  }

  loadDom() {
    this.loaderElement = document.getElementsByClassName("file-loader")[0];
    this.fileInputElement =
      this.loaderElement.getElementsByClassName("file-input")[0];
    this.submitBtnElement =
      this.loaderElement.getElementsByClassName("submit-btn")[0];
    this.loadingIconElement =
      document.getElementsByClassName("loading-icon")[0];
  }
  handleError(e) {
    console.log(e);
  }
  setLoader(loading) {
    if (loading) {
      this.loadingIconElement.style.display = "block";
    } else {
      this.loadingIconElement.style.display = "none";
    }
  }
}

const app = new App();

export default App;
