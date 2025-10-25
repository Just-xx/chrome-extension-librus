class OptionHandler {

  updateListener(detail) {
    this.options[detail.name] = detail.newState;
    chrome.storage.sync.set({ options: JSON.stringify(this.options) });
  }

  init() {
    chrome.storage.sync.get("options", ({ options }) => {
      this.options = JSON.parse(options);
      this.apply();
    });
  }

  apply() {
    const switchboxes = document.querySelectorAll(".switchbox");

    switchboxes.forEach(sb => {
      const sbOptionId = sb.dataset.optId;
      if (sbOptionId) {
        const optionState = this.options[sbOptionId];
        if (optionState) sb.classList.add("is-pressed");
      }
    });
  }

  OptionHandler() {
    this.options = new Array();
  }
}

const optionHandler = new OptionHandler();

optionHandler.init();

window.addEventListener("optionUpdate", ({ detail }) => optionHandler.updateListener(detail));
