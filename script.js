document.addEventListener('DOMContentLoaded', () => {

    /* ----- Navigation par onglets ----- */
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

    /* ----- Sélecteur de thème étendu ----- */
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

    /* ----- Effet machine à écrire ----- */
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

    /* ----- Effet scintillement circuit ----- */
    const circuit = document.querySelector('.circuit-overlay');
    setInterval(() => {
        if (Math.random() > 0.97) {
            circuit.style.opacity = '0.3';
            setTimeout(() => circuit.style.opacity = '1', 150);
        }
    }, 200);

    /* ----- Parallax fond ----- */
    const networkBg = document.querySelector('.network-bg');
    document.addEventListener('mousemove', e => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        networkBg.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
    });

    /* ----- Animation des cartes de jeu ----- */
    const gameItems = document.querySelectorAll('.game-item');
    gameItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px) scale(1.02)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
        });
    });

});
