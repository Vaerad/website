/* ---------- TAB NAVIGATION ---------- */
const tabs    = document.querySelectorAll('.tab');
const buttons = document.querySelectorAll('.tab-btn');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

/* ---------- THEME SELECTOR ---------- */
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.body.className = '';                                     // reset
    if (btn.classList.contains('red'))    document.body.classList.add('theme-red');
    if (btn.classList.contains('purple')) document.body.classList.add('theme-purple');
    if (btn.classList.contains('orange')) document.body.classList.add('theme-orange');
    if (btn.classList.contains('cyan'))   document.body.classList.add('theme-cyan');
  });
});

/* ---------- PING MEASUREMENT ---------- */
const pingDot   = document.querySelector('.ping-dot');
const pingValue = document.getElementById('ping-value');

function measurePing(){
  const start = performance.now();
  fetch('/favicon.ico', {cache:'no-store'})
    .then(() => {
      const ping = Math.round(performance.now() - start);
      pingValue.textContent = `${ping} ms`;
      if (ping <  50) { pingDot.style.background='#22c55e'; pingDot.style.boxShadow='0 0 15px #22c55e'; }
      else if (ping < 150){ pingDot.style.background='#fbbf24'; pingDot.style.boxShadow='0 0 15px #fbbf24'; }
      else               { pingDot.style.background='#ef4444'; pingDot.style.boxShadow='0 0 15px #ef4444'; }
    })
    .catch(() => {
      pingValue.textContent = '∞ ms';
      pingDot.style.background='#6b7280';
      pingDot.style.boxShadow='0 0 15px #6b7280';
    });
}
measurePing(); setInterval(measurePing, 15000);

/* ---------- RSS FEEDS ---------- */
async function fetchFeed(url, elementId){
  const container = document.getElementById(elementId);
  container.innerHTML='<li style="opacity:.6">⏳ Chargement…</li>';
  try{
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
    const data = await res.json();
    container.innerHTML='';
    data.items.slice(0,6).forEach((item,i) => {
      const li=document.createElement('li');
      li.innerHTML=`<a href="${item.link}" target="_blank">${item.title}</a>`;
      li.style.opacity='0';li.style.transform='translateY(20px)';
      container.appendChild(li);
      setTimeout(() => {li.style.transition='all .4s';li.style.opacity='1';li.style.transform='translateY(0)';}, i*100);
    });
  }catch(e){container.innerHTML='<li style="color:#ef4444">❌ Erreur</li>';console.error(e);}
}
fetchFeed('https://www.zataz.com/feed/','cybersec-feed');
fetchFeed('https://www.it-connect.fr/feed/','tech-feed');
setInterval(()=>{fetchFeed('https://www.zataz.com/feed/','cybersec-feed');fetchFeed('https://www.it-connect.fr/feed/','tech-feed');},600000);

/* ---------- TYPING EFFECT ---------- */
const subtitle = document.querySelector('.subtitle');
const fullText = subtitle.textContent;
subtitle.textContent='';
[...fullText].forEach((ch,i)=>setTimeout(()=>subtitle.textContent+=ch,50*i));

/* ---------- FORM HANDLING ---------- */
const form = document.querySelector('form');
if(form){
  form.addEventListener('submit', e => {
    const btn   = form.querySelector('button[type="submit"]');
    const start = btn.innerHTML;
    btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Envoi…';
    btn.disabled=true;
    setTimeout(()=>{btn.innerHTML=start;btn.disabled=false;},3000);
  });
}

/* ---------- PARALLAX BACKGROUND ---------- */
document.addEventListener('mousemove', e => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  document.body.style.backgroundPosition = `${50 + x*5}% ${50 + y*5}%`;
});
