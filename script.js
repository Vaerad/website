// Onglets
document.querySelectorAll(".tab-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"))
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"))
    btn.classList.add("active")
    document.getElementById(btn.dataset.tab).classList.add("active")
  })
})

// Thèmes
const themeButtons=document.querySelectorAll(".theme-btn")
themeButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    themeButtons.forEach(b=>b.classList.remove("active"))
    btn.classList.add("active")
    document.documentElement.style.setProperty("--primary",btn.style.backgroundColor)
  })
})

// Ping simulation
function updatePing(){
  const ping=Math.floor(Math.random()*80)+20
  document.getElementById("ping-value").textContent=ping+" ms"
}
setInterval(updatePing,2000)

// Copier script
document.querySelectorAll(".copy-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    navigator.clipboard.writeText(btn.dataset.code).then(()=>{
      btn.textContent="✅ Copié !"
      setTimeout(()=>btn.textContent="Copier",1500)
    })
  })
})
