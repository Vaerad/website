document.addEventListener('DOMContentLoaded', () => {

    /* Navigation par onglets */
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    /* Sélecteur de thème */
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            document.body.classList.remove('theme-red', 'theme-purple', 'theme-orange', 'theme-cyan');
            themeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (theme !== 'default') document.body.classList.add(`theme-${theme}`);
        });
    });

    /* Effet machine à écrire */
    const typingText = document.querySelector('.typing-text');
    const fullTxt = 'Apprenti Technicien Système et Réseau • Infrastructure • Support';
    function typeWriter() {
        typingText.textContent = ''; let i = 0;
        (function type() {
            if (i < fullTxt.length) {
                typingText.textContent += fullTxt.charAt(i); i++; setTimeout(type, 80);
            } else setTimeout(typeWriter, 4000);
        })();
    }
    setTimeout(typeWriter, 1000);

    /* Effets visuels */
    const circuit = document.querySelector('.circuit-overlay');
    setInterval(() => {
        if (Math.random() > 0.97) {
            circuit.style.opacity = '0.3';
            setTimeout(() => circuit.style.opacity = '1', 150);
        }
    }, 200);

    const networkBg = document.querySelector('.network-bg');
    document.addEventListener('mousemove', e => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        networkBg.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
    });

    /* Fetch RSS IT Connect */
    async function fetchTechNews() {
        const spinner = document.getElementById('loading-spinner');
        const newsList = document.getElementById('tech-news-list');
        
        try {
            const proxyUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
            const rssUrl = 'https://www.it-connect.fr/feed/';
            
            const response = await fetch(proxyUrl + encodeURIComponent(rssUrl));
            const data = await response.json();
            
            spinner.style.display = 'none';
            newsList.innerHTML = '';
            
            data.items.slice(0, 5).forEach(item => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = item.link;
                a.target = '_blank';
                a.textContent = item.title;
                li.appendChild(a);
                newsList.appendChild(li);
            });
        } catch (error) {
            spinner.style.display = 'none';
            newsList.innerHTML = '<li style="color: #ff6b6b;">Erreur de chargement</li>';
            console.error('Erreur RSS:', error);
        }
    }
    
    fetchTechNews();
    // Actualise toutes les 10 minutes
    setInterval(fetchTechNews, 600000);

});

