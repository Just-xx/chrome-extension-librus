import "../../../assets/librusplus.png";
import LibrusPlusOption from "../LibrusPlusOption";

class AverageGrades extends LibrusPlusOption {
  AverageGrades(name) {
    this.super(name);
  }

  load() {
    const tbody = document.querySelector(".container-background > table.decorated > tbody");
    const lastTRow = document.querySelector(".container-background > table.decorated > tbody > tr:nth-last-child(2)");
    const secondLastTRow = document.querySelector(
      ".container-background > table.decorated > tbody > tr:nth-last-child(4)"
    );

    this.averageTRow = document.createElement("tr");
    const logoTd = document.createElement("td");
    const blankTd = document.createElement("td");
    const firstHalfAvgTd = document.createElement("td");
    const secondHalfAvgTd = document.createElement("td");
    const finalAvgTd = document.createElement("td");

    const logo = document.createElement("img");
    logo.src = chrome.runtime.getURL("assets/librusplus.png");
    logo.width = 20;
    logo.classList.add("table-logo");
    logoTd.appendChild(logo);

    firstHalfAvgTd.classList.add("table-avg");
    firstHalfAvgTd.colSpan = 3;

    secondHalfAvgTd.classList.add("table-avg");
    secondHalfAvgTd.colSpan = 3;

    finalAvgTd.classList.add("table-avg");
    finalAvgTd.colSpan = 2;

    finalAvgTd.classList.add("center");
    secondHalfAvgTd.classList.add("center");
    firstHalfAvgTd.classList.add("center");

    const elements = [
      logoTd,
      blankTd,
      firstHalfAvgTd,
      secondHalfAvgTd,
      finalAvgTd,
    ];

    elements.forEach(td => {
      td.classList.add("librus-plus");
      this.averageTRow.appendChild(td);
    });

    const lineVaraint = secondLastTRow.classList.contains("line0") ? "line1" : "line0";
    this.averageTRow.classList.add(lineVaraint);
    this.averageTRow.classList.add("librus-plus");

    const firstHalfAvg = this.countAverage(4);
    const secondHalfAvg = this.countAverage(7);
    const finalAvg = this.countAverage(9);

    firstHalfAvgTd.innerHTML = "<div><span>Średnia (Okres 1):</span>" + firstHalfAvg + "</div>";
    secondHalfAvgTd.innerHTML = "<div><span>Średnia (Okres 2):</span>" + secondHalfAvg + "</div>";
    finalAvgTd.innerHTML = "<div><span>Średnia:</span>" + finalAvg + "</div>";

    tbody.insertBefore(this.averageTRow, lastTRow);
  }

  unload() {
    this.averageTRow.remove();
  }

  countAverage(rowNum) {
    let subjectTableRows = [...document.querySelectorAll(".container-background > table.decorated > tbody > tr")];

    // get rid of "Zachowanie" row, subTables rows, librusplus row and empty rows
    subjectTableRows = subjectTableRows.filter(tr => {
      if (tr.getAttribute("name") === "przedmioty_all") return false;
      if (tr.classList.contains("librus-plus")) return false;

      const subjectName = tr.querySelector("td:nth-child(2)").textContent;
      if (subjectName.includes("Zachowanie")) return false;

      return true;
    });

    // get base numbers to count the average of all grades
    let numbers = subjectTableRows.map(tr => parseFloat(tr.querySelector(`td:nth-child(${rowNum})`).textContent));
    numbers = numbers.filter(n => n);

    // returns '-' if there is nothing to calculate the avg from all grades
    if (numbers.length < 1) return "-";

    const avg = (numbers.reduce((acc, val) => acc + val, 0) / numbers.length).toFixed(2);
    return avg;
  }
}

export default AverageGrades;
