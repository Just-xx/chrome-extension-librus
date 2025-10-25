document.querySelectorAll(".option").forEach(opt => {
  opt.addEventListener("click", e => {
    if (e.target.classList[0] !== "switchbox" && e.target.tagName !== "LABEL")
      e.currentTarget.querySelector(".switchbox").dispatchEvent(new Event("click"));
  });
});

document.querySelectorAll(".switchbox").forEach(sbox => {
  sbox.addEventListener("click", () => {
    const name = sbox.dataset.optId;
    const newState = !sbox.classList.contains("is-pressed");

    window.dispatchEvent(new CustomEvent("optionUpdate", { detail: { name, newState } }));
  });
});
