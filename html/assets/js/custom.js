document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Swiper
    const heroSwiper = new Swiper('.heroSwiper', {
        speed: 1200,
        parallax: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '#heroNext',
            prevEl: '#heroPrev',
        },
        on: {
            init: function() {
                updateProgress(this);
            },
            autoplayTimeLeft(s, time, progress) {
                const progressBar = document.getElementById('heroProgressBar');
                if(progressBar) {
                    progressBar.style.width = ((1 - progress) * 100) + '%';
                }
            },
            slideChange: function() {
                updateProgress(this);
            }
        }
    });

    function updateProgress(swiper) {
        const currentNum = document.getElementById('heroCurrentNum');
        if(currentNum) {
            // realIndex is 0-based
            let realIndex = swiper.realIndex + 1;
            currentNum.innerHTML = `<div class="dot"></div> 0${realIndex}`;
        }
    }

    // ==========================================
    // Search Overlay Logic
    // ==========================================
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const searchInput = document.querySelector('.search-input');

    if(searchBtn && searchOverlay && searchCloseBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            searchOverlay.classList.add('active');
            setTimeout(() => {
                searchInput.focus();
            }, 300);
        });

        searchCloseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            searchOverlay.classList.remove('active');
        });

        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === "Escape" && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
            }
        });
    }

    // ==========================================
    // Mobile Menu Logic
    // ==========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    if(mobileMenuBtn && mobileMenuOverlay && mobileMenuClose) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
        
        mobileMenuClose.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

});
