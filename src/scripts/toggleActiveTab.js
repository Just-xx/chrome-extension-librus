let tabId;
const allGroups = document.querySelectorAll('.options-wrapper');

document.querySelectorAll(".tab-btn").forEach(tBtn => {

  tBtn.addEventListener("click", e => {
    document.querySelectorAll(".tab-btn.active").forEach(activeTab => activeTab.classList.remove('active'));

    tabId = e.currentTarget.getAttribute("data-tab");
    document.querySelectorAll(`.tab-btn[data-tab=${tabId}]`).forEach(tab => tab.classList.add('active'))

  
    allGroups.forEach(g => g.classList.add('hidden'))
    document.querySelector(`.options-wrapper[data-opt-group-name="${tabId}"]`).classList.remove('hidden');
  });
 
});


