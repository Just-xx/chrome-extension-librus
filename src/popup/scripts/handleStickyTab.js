
let visible = false;
function updateStickyTab() {

  const tabBtns = document.querySelector(".tab-btns")
  const tabBtnsBoundingClientRect = tabBtns.getBoundingClientRect();
  const tabBtnScrolledY = tabBtnsBoundingClientRect.y + tabBtnsBoundingClientRect.height;

  const stickyTab = document.querySelector(".sticky-tabs");
  

  if (tabBtnScrolledY < 0 && !visible) {
    showElem(stickyTab)
    visible = true;
    console.log("show")
  }
  else if (tabBtnScrolledY > 0 && visible) {
    hideElem(stickyTab)
    visible = false;
    console.log("hide")
  }

}

function showElem(elem) {
  elem.style.display = "flex"
  setTimeout(() => elem.style.opacity = 1, 1)
}

function hideElem(elem) {
  elem.style.opacity = 0;
  setTimeout(() => elem.style.display = "none", 200)
}

window.addEventListener('scroll', updateStickyTab);