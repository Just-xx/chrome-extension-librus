console.log("[Librus Plus] ✅ Content script loaded");

document.addEventListener("DOMContentLoaded", () => {
  loadAverageGrades();
});

function loadAverageGrades() {
  const tbody = document.querySelector(".container-background > table.decorated > tbody");
  const lastTRow = document.querySelector(".container-background > table.decorated > tbody > tr:nth-last-child(2)");
  const secondLastTRow = document.querySelector(
    ".container-background > table.decorated > tbody > tr:nth-last-child(4)"
  );

  const averageTRow = document.createElement("tr");
  const logoTd = document.createElement("td");
  const blankTd = document.createElement("td");
  const firstHalfTxtTd = document.createElement("td");
  const firstHalfAvgTd = document.createElement("td");
  const secondHalfTxtTd = document.createElement("td");
  const secondHalfAvgTd = document.createElement("td");
  const finalTxtTd = document.createElement("td");
  const finalAvgTd = document.createElement("td");

  const logo = document.createElement("img");
  logo.src = chrome.runtime.getURL("src/assets/librusplus.png");
  logo.width = 20;
  logo.classList.add("table-logo");
  logoTd.appendChild(logo);

  firstHalfTxtTd.textContent = "Średnia (okres 1):";
  firstHalfTxtTd.classList.add("table-text");

  firstHalfAvgTd.classList.add("table-avg");
  firstHalfAvgTd.textContent = "-";
  firstHalfAvgTd.colSpan = 2;

  secondHalfTxtTd.textContent = "Średnia (okres 2):";
  secondHalfTxtTd.classList.add("table-text");

  secondHalfAvgTd.classList.add("table-avg");
  secondHalfAvgTd.textContent = "-";
  secondHalfAvgTd.colSpan = 2;

  finalTxtTd.textContent = "Średnia:";
  finalTxtTd.classList.add("table-text");

  finalAvgTd.classList.add("table-avg");
  finalAvgTd.textContent = "-";

  finalAvgTd.classList.add("center");
  secondHalfAvgTd.classList.add("center");
  firstHalfAvgTd.classList.add("center");

  finalTxtTd.classList.add("right");
  secondHalfTxtTd.classList.add("right");
  firstHalfTxtTd.classList.add("right");

  const elements = [
    logoTd,
    blankTd,
    firstHalfTxtTd,
    firstHalfAvgTd,
    secondHalfTxtTd,
    secondHalfAvgTd,
    finalTxtTd,
    finalAvgTd,
  ];
  elements.forEach(td => {
    td.classList.add("librus-plus");
    averageTRow.appendChild(td);
  });

  const lineVaraint = secondLastTRow.classList.contains("line0") ? "line1" : "line0";
  averageTRow.classList.add(lineVaraint);
  averageTRow.classList.add("librus-plus");

  tbody.insertBefore(averageTRow, lastTRow);

  countAvg();
}

function countAvg() {
  let subjectRows = [...document.querySelectorAll(".container-background > table.decorated > tbody > tr")];

  // get rid of "Zachowanie" row, subTables rows, librusplus row and empty rows
  subjectRows = subjectRows.filter(tr => {
    if (tr.getAttribute("name") === "przedmioty_all") return false;
    if (tr.classList.contains("librus-plus")) return false;

    const subjectName = tr.querySelector("td:nth-child(2)").textContent;
    if (subjectName.includes("Zachowanie")) return false;

    return true;
  });

  const avgsFirstHalf = subjectRows.reduce((trA, trB) => Number(trA.querySelector("td:nth-child(3)").textContent) + Number(trB.querySelector("td:nth-child(3)").textContent));
  console.log(avgsFirstHalf);
}
