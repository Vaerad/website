// Gestion des onglets
const tabs = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".tab");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    sections.forEach((s) => s.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// Gestion du changement de thème
const themeButtons = document.querySelectorAll(".theme-btn");
const body = document.body;

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    themeButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const theme = btn.dataset.theme;
    if (theme === "default") {
      body.removeAttribute("data-theme");
    } else {
      body.setAttribute("data-theme", "dark"); // active le mode sombre
      body.style.setProperty("--primary", btn.style.backgroundColor);
    }
  });
});

// Simulation du ping
function updatePing() {
  const ping = Math.floor(Math.random() * 80) + 20; // 20 à 100 ms
  document.getElementById("ping-value").textContent = ping + " ms";
}
setInterval(updatePing, 2000);
