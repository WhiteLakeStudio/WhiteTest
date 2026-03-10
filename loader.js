document.addEventListener('DOMContentLoaded', () => {
    // 1. Створюємо HTML лоадера автоматично
    const loaderHTML = `
        <div id="whitelake-preloader">
            <div class="loader-container-inner">
                <div id="single-letter-loader"></div>
                <div id="full-logo-loader">WhiteLakeViz</div>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);

    const targetWord = "WhiteLakeViz";
    const scroller = document.getElementById('single-letter-loader');
    const fullLogo = document.getElementById('full-logo-loader');
    const preloader = document.getElementById('whitelake-preloader');
    let charIndex = 0;

    // 2. Функція послідовного перебору літер
    function playSequence() {
        if (charIndex < targetWord.length) {
            scroller.innerText = targetWord[charIndex];
            charIndex++;
            setTimeout(playSequence, 100); // Твоя швидкість 250мс
        } else {
            startReveal();
        }
    }

    // 3. Функція фінального розгортання
    function startReveal() {
        scroller.style.opacity = "0";
        setTimeout(() => {
            scroller.style.display = 'none';
            
            // Вимірюємо реальну ширину тексту
            const fullWidth = fullLogo.scrollWidth;
            fullLogo.classList.add('reveal');
            fullLogo.style.width = (fullWidth + 30) + "px";
            
            // Прибираємо екран лоадера після завершення анімації
            setTimeout(() => {
    preloader.classList.add('loaded');

    document.body.classList.add("loaded");

    if (typeof resizeImages === 'function') {
        resizeImages();
    }
}, 1800);
        }, 300);
    }

    playSequence();
});