document.addEventListener('DOMContentLoaded', function () {

    // --- Testimonial Slider Logic ---
    // A self-contained function to encapsulate all slider logic
    const initializeTestimonialSlider = () => {
        const testimonialContainer = document.querySelector('.testimonial-container');
        const slides = document.querySelectorAll('.testimonial-slide');
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');

        // Exit if essential elements are not found
        if (!testimonialContainer || slides.length === 0 || !prevButton || !nextButton) {
            console.warn('Testimonial slider elements not found. Slider not initialized.');
            return;
        }

        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;

        // Function to move the slider to a specific slide
        const goToSlide = (slideIndex) => {
            testimonialContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
        };

        // Function to show the next slide
        const showNextSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        };

        // Function to show the previous slide
        const showPrevSlide = () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlide);
        };

        // Function to restart the autoplay timer
        const restartInterval = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(showNextSlide, 5000);
        };

        // Event listeners for the navigation buttons
        nextButton.addEventListener('click', () => {
            showNextSlide();
            restartInterval();
        });

        prevButton.addEventListener('click', () => {
            showPrevSlide();
            restartInterval();
        });
        
        // Handle window resizing to prevent slider misalignment
        // This ensures the slider snaps to the correct position if the window size changes
        window.addEventListener('resize', () => {
            // Percentage-based transform handles resizing gracefully.
            // This simply re-applies the current position.
            goToSlide(currentSlide);
        });

        // Initialize the slider to the first slide and start autoplay
        goToSlide(0);
        slideInterval = setInterval(showNextSlide, 5000);
    };

    // --- Hamburger Menu Logic ---
    const initializeHamburgerMenu = () => {
        const hamburger = document.querySelector('.hamburger-menu');
        const navMenu = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.navbar a');

        if (!hamburger || !navMenu) {
            return;
        }

        // Toggle menu on hamburger click
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a navigation link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    };

    // Initialize all components
    initializeTestimonialSlider();
    initializeHamburgerMenu();
});

