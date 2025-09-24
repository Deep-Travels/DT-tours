document.addEventListener('DOMContentLoaded', function () {

    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.navbar');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.navbar a').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // --- Testimonial Carousel Logic ---
    const testimonialContainer = document.querySelector('.testimonial-container');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    // Exit if slider elements aren't on the page
    if (!testimonialContainer || slides.length === 0 || !prevButton || !nextButton) {
        return;
    }

    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;

    // Function to move to a specific slide
    function goToSlide(slideIndex) {
        // This percentage-based transform is the key to making it responsive
        testimonialContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
    }

    // Go to the next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    // Go to the previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }

    // Restart the autoplay interval
    function restartInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000); // Autoplay every 5 seconds
    }

    // Button event listeners
    nextButton.addEventListener('click', () => {
        nextSlide();
        restartInterval();
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        restartInterval();
    });

    // Start the autoplay
    restartInterval();
});

