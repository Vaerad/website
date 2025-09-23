// Tabs (boutons)
const tabs = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".tab");
function showTab(id){
  tabs.forEach(b=>b.classList.toggle("active", b.dataset.tab===id));
  sections.forEach(s=>s.classList.toggle("active", s.id===id));
  // sync le select mobile
  const sel = document.querySelector(".tabs-select");
  if (sel && sel.value !== id) sel.value = id;
}
tabs.forEach(btn=>{
  btn.addEventListener("click", ()=> showTab(btn.dataset.tab));
});

// Tabs (select mobile)
const tabsSelect = document.querySelector(".tabs-select");
if (tabsSelect){
  tabsSelect.addEventListener("change", e => showTab(e.target.value));
}

// Theme chips
const chips = document.querySelectorAll(".theme-chip");
chips.forEach(chip=>{
  chip.style.backgroundColor = chip.dataset.color;
  chip.addEventListener("click", ()=>{
    chips.forEach(c=>c.classList.remove("active"));
    chip.classList.add("active");
    document.documentElement.style.setProperty("--primary", chip.dataset.color);
  });
});

// Ping simulation
function updatePing(){
  const el = document.getElementById("ping-value");
  if (!el) return;
  const ping = Math.floor(Math.random()*60)+20; // 20–80 ms
  el.textContent = ping + " ms";
}
updatePing();
setInterval(updatePing, 2000);

// Copier le script PowerShell
document.querySelectorAll(".copy-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const targetSel = btn.getAttribute("data-target");
    const codeEl = document.querySelector(targetSel);
    if(!codeEl) return;
    const text = codeEl.textContent.replace(/\r?\n/g,"\r\n");
    navigator.clipboard.writeText(text).then(()=>{
      const old = btn.textContent;
      btn.textContent = "✅ Copié !";
      setTimeout(()=> btn.textContent = old, 1500);
    });
  });
});
