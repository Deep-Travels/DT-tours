document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const testimonialContainer = document.querySelector('.testimonial-container');

    // Add a window resize listener to adjust the slide width dynamically
    function getSlideWidth() {
        return slides[0].clientWidth + 20; // width of slide + margin
    }

    // Apply smooth transition to the testimonial container
    testimonialContainer.style.transition = 'transform 0.5s ease';

    // Function to show a slide
    function showSlide(index) {
        const slideWidth = getSlideWidth(); // dynamically get the width every time
        const offset = -index * slideWidth;
        testimonialContainer.style.transform = `translateX(${offset}px)`;
    }

    // Show next slide
    function showNextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Show previous slide
    function showPrevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Next button click event
    nextButton.addEventListener('click', function () {
        showNextSlide();
        restartInterval();
    });

    // Prev button click event
    prevButton.addEventListener('click', function () {
        showPrevSlide();
        restartInterval();
    });

    // Automatically advance the slides every 5 seconds
    let slideInterval = setInterval(showNextSlide, 5000);

    // Restart the interval after a manual slide change
    function restartInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(showNextSlide, 5000);
    }

    // Accessibility improvements for buttons
    prevButton.setAttribute('aria-label', 'Previous Testimonial');
    nextButton.setAttribute('aria-label', 'Next Testimonial');

    // Make sure the first slide shows correctly
    showSlide(currentSlide);

    // Handle resizing of the window to adjust the slide width accordingly
    window.addEventListener('resize', function () {
        showSlide(currentSlide); // Recalculate and show the correct slide
    });
});
