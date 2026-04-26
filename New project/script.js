const slots = [
  ["02", "занято", "booked"],
  ["04", "свободно", "free"],
  ["06", "свободно", "free"],
  ["09", "занято", "booked"],
  ["11", "свободно", "free"],
  ["13", "занято", "booked"],
  ["15", "свободно", "free"],
  ["18", "свободно", "free"],
  ["20", "занято", "booked"],
  ["22", "свободно", "free"],
  ["24", "свободно", "free"],
  ["27", "занято", "booked"],
  ["29", "свободно", "free"],
  ["30", "резерв", "booked"],
];

const grid = document.getElementById("calendar-grid");
const yearNode = document.getElementById("year");

if (grid) {
  slots.forEach(([day, label, state]) => {
    const cell = document.createElement("article");
    cell.className = `calendar-cell ${state}`;
    cell.innerHTML = `<span>${day}</span><span>${label}</span>`;
    grid.appendChild(cell);
  });
}

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
