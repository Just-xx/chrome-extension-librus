import AverageGrades from "./options/averageGrades/AverageGrades";
import './styles.css'

document.addEventListener("DOMContentLoaded", () => {
  const avgGr = new AverageGrades();

  chrome.storage.onChanged.addListener((changes, area) => {

    chrome.storage.sync.get("options", ({ options }) => {
      const avgGradesTurnedOn = JSON.parse(options).COUNT_AVERAGE;
      console.log("avgGradesTurnedOn")

      if (avgGradesTurnedOn) avgGr.load();
      else if (!avgGradesTurnedOn) avgGr.unload();
    });
    
  });

  
  document.querySelector("#przedmioty_zachowanie_node").dispatchEvent(new Event("click"));
});


console.log("[Librus Plus] ✅ Content script loaded");
