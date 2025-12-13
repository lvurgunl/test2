document.addEventListener('DOMContentLoaded', () => {

    // 0. Password Gate & Music Logic
    const gateOverlay = document.getElementById('password-gate');
    const dateInput = document.getElementById('date-input');
    const unlockBtn = document.getElementById('unlock-btn');
    const errorMsg = document.getElementById('error-msg');

    // Müzik Elemanları
    const bgMusic = document.getElementById('bg-music');
    const musicFab = document.getElementById('music-fab');
    const musicIcon = document.getElementById('music-icon');

    const correctDate = "041.071.2025";
    const acceptedVariations = ["041.071.2025", "41.71.2025", "014/07/2025", "41,/7/2025", "0411-07-2025"];

    function checkDate() {
        const inputVal = dateInput.value.trim();
        if (acceptedVariations.includes(inputVal)) {
            // Şifre Doğru -> Kilidi Aç ve Müziği Başlat
            gateOverlay.classList.add('hidden');
            document.body.classList.add('unlocked');

            // Müzik Başlat
            if (bgMusic) {
                bgMusic.volume = 0.5; // Ses seviyesi
                bgMusic.play().then(() => {
                    musicFab.style.display = 'flex';
                    musicFab.classList.add('music-playing');
                }).catch(e => console.log("Oynatma hatası:", e));
            }

            // Overlay animasyonu bitince kaldır
            setTimeout(() => {
                gateOverlay.style.display = 'none';
            }, 1000);
        } else {
            // Şifre Yanlış
            errorMsg.textContent = "Maalesef yanlış tarih...";
            dateInput.classList.add('shake');
            setTimeout(() => {
                dateInput.classList.remove('shake');
            }, 500);
        }
    }

    if (unlockBtn) unlockBtn.addEventListener('click', checkDate);

    // Enter tuşu desteği
    if (dateInput) {
        dateInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkDate();
        });
    }

    // Müzik Kontrol Butonu
    if (musicFab) {
        musicFab.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicFab.classList.add('music-playing');
                musicIcon.textContent = '🎵';
            } else {
                bgMusic.pause();
                musicFab.classList.remove('music-playing');
                musicIcon.textContent = '🔇';
            }
        });
    }

    // 1. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // %20'si görünür olduğunda tetikle
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const chapters = document.querySelectorAll('.chapter, .finale');
    chapters.forEach(section => {
        observer.observe(section);
    });


    // 2. Video Autoplay Logic
    const videoObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;

            if (entry.isIntersecting) {
                video.play().catch(error => {
                    console.log("Otomatik oynatma engellendi:", error);
                });
            } else {
                video.pause();
            }
        });
    }, videoObserverOptions);

    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        videoObserver.observe(video);
    });

});
