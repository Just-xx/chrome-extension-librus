let options = new Array();

function readValues({ detail }) {
  if (detail) {
    const optIndex = options.findIndex(opt => opt.name === detail.name);
    options[optIndex].state = detail.newState;
  } else {
    options = new Array();
    document.querySelectorAll("button.switchbox").forEach(switchbox => {
      const optName = switchbox.id;
      const optState = switchbox.classList.contains("is-pressed");

      options.push({
        name: optName,
        state: optState,
      });
    });
  }
}

readValues(false);
window.addEventListener("optionUpdate", e => readValues(e));
