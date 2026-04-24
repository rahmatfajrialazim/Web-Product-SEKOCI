document.addEventListener('DOMContentLoaded', () => {
    // 1. Efek Bayangan Navbar saat Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
        }
    });

    // 2. ANIMASI MUNCUL CARD & SECTION MURNI VIA JAVASCRIPT (Web Animations API)
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                
                // Ambil data animasi dari HTML
                const animType = el.getAttribute('data-anim') || 'up';
                const delay = parseInt(el.getAttribute('data-delay')) || 0;

                // Tentukan arah elemen muncul
                let startTransform = 'translateY(60px)'; // Default dari bawah ke atas
                if (animType === 'left') startTransform = 'translateX(-60px)';
                if (animType === 'right') startTransform = 'translateX(60px)';

                // Jalankan animasi murni dari JS
                el.animate([
                    { opacity: 0, transform: startTransform },
                    { opacity: 1, transform: 'translate(0)' }
                ], {
                    duration: 800, // Kecepatan muncul 0.8 detik
                    delay: delay, // Jeda muncul antar elemen
                    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Efek mantul elegan
                    fill: 'forwards' // Menahan state terakhir setelah animasi selesai
                });

                // Hentikan pantauan agar animasi tidak berulang terus
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.15 }); // Animasi kepicu saat 15% elemen masuk layar

    // Set state awal elemen menjadi transparan sebelum di-scroll
    document.querySelectorAll('.js-anim').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});