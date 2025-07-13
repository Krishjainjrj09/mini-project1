const calendar = document.getElementById("calendar");
const overlay = document.getElementById("overlay");
const moodPicker = document.getElementById("moodPicker");
const darkToggle = document.getElementById("darkToggle");
const resetBtn = document.getElementById("resetBtn");
const statsBtn = document.getElementById("statsBtn");
const statsModal = document.getElementById("statsModal");
const statsList = document.getElementById("statsList");
let selectedDayEl = null;

const daysInMonth = 31;
const startDay = 2;

for (let i = 0; i < startDay; i++) {
  const empty = document.createElement("div");
  calendar.appendChild(empty);
}

for (let i = 1; i <= daysInMonth; i++) {
  const day = document.createElement("div");
  day.className = "day";
  day.dataset.day = i;
  day.innerHTML = `<div>${i}</div><div class="mood"></div>`;
  const savedMood = localStorage.getItem(`mood-${i}`);
  if (savedMood) day.querySelector(".mood").textContent = savedMood;
  calendar.appendChild(day);
}

calendar.addEventListener("click", (e) => {
  const dayEl = e.target.closest(".day");
  if (!dayEl) return;
  selectedDayEl = dayEl;
  overlay.style.display = "block";
  moodPicker.style.display = "block";
});

document.querySelectorAll(".mood-picker span").forEach(span => {
  span.addEventListener("click", () => {
    const emoji = span.dataset.emoji;
    const day = selectedDayEl.dataset.day;
    selectedDayEl.querySelector(".mood").textContent = emoji;
    localStorage.setItem(`mood-${day}`, emoji);
    moodPicker.style.display = "none";
    overlay.style.display = "none";
  });
});

overlay.addEventListener("click", () => {
  moodPicker.style.display = "none";
  overlay.style.display = "none";
});

resetBtn.addEventListener("click", () => {
  if (confirm("Clear all moods?")) {
    for (let i = 1; i <= daysInMonth; i++) {
      localStorage.removeItem(`mood-${i}`);
      document.querySelector(`[data-day='${i}'] .mood`).textContent = "";
    }
  }
});

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

statsBtn.addEventListener("click", () => {
  const moodCount = {};
  for (let i = 1; i <= daysInMonth; i++) {
    const mood = localStorage.getItem(`mood-${i}`);
    if (mood) moodCount[mood] = (moodCount[mood] || 0) + 1;
  }
  statsList.innerHTML = Object.entries(moodCount)
    .map(([mood, count]) => `<li>${mood}: ${count} day(s)</li>`).join('');
  statsModal.style.display = "block";
  overlay.style.display = "block";
});

function closeStats() {
  statsModal.style.display = "none";
  overlay.style.display = "none";
}

