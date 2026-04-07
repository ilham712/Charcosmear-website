// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.classList.remove('text-gold');
        link.classList.add('text-gray-300');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-gray-300');
            link.classList.add('text-gold');
        }
    });
});

// Lazy loading images (optional - for performance)
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Console log untuk debugging (Updated)
console.log('Charcosmear Website Loaded Successfully! 🚀');

// Before/After Carousel
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('ba-prev');
    const nextBtn = document.getElementById('ba-next');
    const dots = document.querySelectorAll('.dot');
    const counter = document.getElementById('slide-counter');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    const goToSlide = (index) => {
        // Update track position
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.remove('active', 'bg-gold');
            dot.classList.add('bg-gray-600');
            if (i === index) {
                dot.classList.add('active', 'bg-gold');
                dot.classList.remove('bg-gray-600');
            }
        });
        
        // Update counter
        if (counter) {
            counter.textContent = index + 1;
        }
        
        currentSlide = index;
    };

    // Event Listeners
    prevBtn?.addEventListener('click', () => {
        const newSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
        goToSlide(newSlide);
    });

    nextBtn?.addEventListener('click', () => {
        const newSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
        goToSlide(newSlide);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Optional: Auto-play every 5 seconds (hapus kalau nggak mau)
    // setInterval(() => {
    //     const next = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
    //     goToSlide(next);
    // }, 5000);

    // Keyboard navigation (aksesibilitas)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            const prev = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
            goToSlide(prev);
        }
        if (e.key === 'ArrowRight') {
            const next = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
            goToSlide(next);
        }
    });

    // Touch swipe support (mobile)
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    const handleSwipe = () => {
        if (touchStartX - touchEndX > 50) {
            // Swipe left → next slide
            const next = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
            goToSlide(next);
        }
        if (touchEndX - touchStartX > 50) {
            // Swipe right → prev slide
            const prev = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
            goToSlide(prev);
        }
    };
});