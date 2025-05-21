document.addEventListener('DOMContentLoaded', function() {
    // 1. Inisialisasi AOS (Animate On Scroll)
    AOS.init({
        duration: 1000, // Durasi animasi dalam milidetik
        once: true,    // Apakah animasi hanya terjadi sekali
        offset: 50,    // Offset (dalam px) dari trigger point asli
    });

    // 2. Inisialisasi Vanilla-tilt.js pada kartu proyek
    // Pastikan elemen .project-card memiliki atribut data-tilt
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 15,         // Kemiringan maksimal dalam derajat
        speed: 400,      // Kecepatan transisi
        glare: true,     // Apakah menggunakan efek glare
        "max-glare": 0.3 // Intensitas glare (0 sampai 1)
    });

    // 3. Inisialisasi Rellax.js untuk Parallax
    // Cek apakah elemen dengan class 'rellax' ada
    if (document.querySelector('.rellax')) {
        var rellax = new Rellax('.rellax', {
            // Opsi tambahan jika diperlukan, seperti:
            // speed: -2,
            // center: false,
            // wrapper: null,
            // round: true,
            // vertical: true,
            // horizontal: false
        });
    }

    // 4. Update tahun di footer secara otomatis
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 5. Smooth scroll untuk navigasi (jika belum sepenuhnya didukung oleh CSS `scroll-behavior`)
    // dan penandaan link aktif
    const navLinks = document.querySelectorAll('header nav ul li a');
    const sections = document.querySelectorAll('main section');

    function changeActiveLink() {
        let index = sections.length;

        while(--index && window.scrollY + 50 < sections[index].offsetTop) {} // 50 adalah offset
        
        navLinks.forEach((link) => link.classList.remove('active'));
        if (navLinks[index]) { // Pastikan link ada sebelum menambah kelas
             navLinks[index].classList.add('active');
        }
    }

    // Panggil saat scroll dan saat load awal
    changeActiveLink();
    window.addEventListener('scroll', changeActiveLink);

    // Navigasi smooth manual (jika diperlukan sebagai fallback atau untuk kontrol lebih)
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Cek apakah targetId adalah hash link internal
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            // Jika bukan hash link (misal link eksternal), biarkan perilaku default
        });
    });

});
