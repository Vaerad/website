/* ------------------------------------------------------------------
   NAVIGATION ENTRE ONGLETS
------------------------------------------------------------------ */
document.querySelectorAll('.nav-tab').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.nav-tab').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

/* ------------------------------------------------------------------
   THÈME COLORÉ
------------------------------------------------------------------ */
document.querySelectorAll('.theme-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.body.className='';                     // reset classes
    document.querySelectorAll('.theme-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const theme=btn.dataset.theme;
    if(theme!=='default') document.body.classList.add(`theme-${theme}`);
  });
});

/* ------------------------------------------------------------------
   PING UTILISATEUR ↔︎ SITE
------------------------------------------------------------------ */
function measurePing(){
  const dot   = document.querySelector('.ping-dot');
  const value = document.getElementById('ping-value');
  const start = performance.now();

  fetch('/favicon.ico?cache=' + Date.now(), {cache:'no-store'})
    .then(()=> {
      const ms = Math.round(performance.now() - start);
      value.textContent = ms + ' ms';

      if(ms < 100){ dot.style.background='#00e676'; }
      else if(ms < 250){ dot.style.background='#ffb300'; }
      else{ dot.style.background='#ff1744'; }
      dot.style.boxShadow = `0 0 6px ${dot.style.background}`;
    })
    .catch(()=>{
      value.textContent = '∞ ms';
      dot.style.background='#ff1744';
      dot.style.boxShadow='0 0 6px #ff1744';
    });
}
measurePing();
setInterval(measurePing, 10000);

/* ------------------------------------------------------------------
   EFFET DE PARALLAXE LÉGER SUR LE FOND
------------------------------------------------------------------ */
const bg = document.querySelector('.network-bg');
document.addEventListener('mousemove',e=>{
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  bg.style.transform = `translate(${x*20}px,${y*20}px)`;
});

/* ------------------------------------------------------------------
   MACHINE À ÉCRIRE POUR LE SOUS-TITRE (une seule boucle)
------------------------------------------------------------------ */
const typingEl = document.querySelector('.subtitle');
const originalTxt = typingEl.textContent.trim();
typingEl.textContent='';
let idx=0;
const typer = setInterval(()=>{
  typingEl.textContent += originalTxt.charAt(idx++);
  if(idx===originalTxt.length) clearInterval(typer);
},70);

/* ------------------------------------------------------------------
   RÉCUPÉRATION RSS - ZATAZ & IT-CONNECT
------------------------------------------------------------------ */
async function loadFeed(url,target){
  const list   = document.getElementById(target);
  const parent = list.parentElement.querySelector('.loading-spinner');
  try{
    const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(url));
    const data= await res.json();
    parent.style.display='none';
    list.innerHTML='';
    data.items.slice(0,6).forEach(item=>{
      const li=document.createElement('li');
      li.innerHTML=`<a href="${item.link}" target="_blank">${item.title}</a>`;
      list.appendChild(li);
    });
  }catch(err){
    parent.style.display='none';
    list.innerHTML='<li style="color:#ff6b6b">Erreur de chargement</li>';
    console.error('RSS error →',err);
  }
}
function refreshFeeds(){
  loadFeed('https://www.zataz.com/feed/','cybersec-news-list');
  loadFeed('https://www.it-connect.fr/feed/','tech-news-list');
}
refreshFeeds();
setInterval(refreshFeeds,600000);    // toutes les 10 min


