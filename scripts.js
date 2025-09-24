document.addEventListener('DOMContentLoaded', function () {
    // Existing Testimonial Carousel Logic
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial');
    const totalSlides = slides.length;
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const testimonialContainer = document.querySelector('.testimonial-container');

    // Function to dynamically get the slide width
    function getSlideWidth() {
        return slides[0].offsetWidth + 20; // Slide width + margin
    }

    // Function to show the correct slide
    function showSlide(index) {
        const slideWidth = getSlideWidth();
        const offset = -index * slideWidth;
        testimonialContainer.style.transform = `translateX(${offset}px)`;
    }

    // Move to the next slide
    function showNextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Move to the previous slide
    function showPrevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Event listeners for manual navigation
    nextButton.addEventListener('click', function () {
        showNextSlide();
        restartAutoSlide();
    });

    prevButton.addEventListener('click', function () {
        showPrevSlide();
        restartAutoSlide();
    });

    // Auto-slide every 5 seconds
    let autoSlide = setInterval(showNextSlide, 5000);

    // Restart auto-slide after manual navigation
    function restartAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(showNextSlide, 5000);
    }

    // Adjust slider when window resizes
    window.addEventListener('resize', function () {
        showSlide(currentSlide);
    });

    // Set accessibility attributes for navigation buttons
    prevButton.setAttribute('aria-label', 'Previous Testimonial');
    nextButton.setAttribute('aria-label', 'Next Testimonial');

    // Initialize the first slide
    showSlide(currentSlide);

    // Modal handling for Enquiry
    const modal = document.getElementById("enquiryModal");
    const enquiryBtn = document.querySelector(".enquiry-btn");
    const closeBtn = document.querySelector(".close");
    const enquiryForm = document.getElementById("enquiryForm");

    // Open modal when enquiry button is clicked
    enquiryBtn.addEventListener('click', function () {
        modal.style.display = "flex"; // Use flex to center the modal
    });

    // Close modal when "X" is clicked
    closeBtn.addEventListener('click', function () {
        modal.style.display = "none";
    });

    // Close modal if clicked outside the modal content
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Handle form submission (for demonstration purposes)
    enquiryForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        // Collect form data
        const name = document.getElementById("name").value;
        const phoneNumber = document.getElementById("number").value;
        const email = document.getElementById("email").value;
        const requirements = document.getElementById("requirements").value;

        // Display form data (you can replace this with an actual server request)
        console.log("Enquiry Submitted:", { name, phoneNumber, email, requirements });

        // Close the modal after submission
        modal.style.display = "none";

        // Optionally, reset the form fields
        enquiryForm.reset();

        // Show the success message
        const successMessage = document.createElement("div");
        successMessage.innerHTML = "<p>Request Submitted Successfully! ✓</p>";
        successMessage.style.position = "fixed";
        successMessage.style.top = "50%";
        successMessage.style.left = "50%";
        successMessage.style.transform = "translate(-50%, -50%)";
        successMessage.style.backgroundColor = "#28a745";
        successMessage.style.color = "white";
        successMessage.style.padding = "20px 40px";
        successMessage.style.borderRadius = "10px";
        successMessage.style.fontSize = "18px";
        successMessage.style.textAlign = "center";
        document.body.appendChild(successMessage);

        // Auto-hide the success message after 3 seconds
        setTimeout(function () {
            successMessage.style.display = "none";
        }, 3000);
    });

    // Draggable modal functionality
    const modalContent = document.querySelector('.modal-content');
    let isDragging = false;
    let offsetX, offsetY;

    // When the mouse is pressed down, start the drag
    modalContent.addEventListener('mousedown', function (event) {
        isDragging = true;
        offsetX = event.clientX - modalContent.getBoundingClientRect().left;
        offsetY = event.clientY - modalContent.getBoundingClientRect().top;
        modalContent.style.cursor = 'grabbing'; // Change cursor to grabbing
    });

    // When the mouse is moved, drag the modal
    window.addEventListener('mousemove', function (event) {
        if (isDragging) {
            modalContent.style.left = (event.clientX - offsetX) + 'px';
            modalContent.style.top = (event.clientY - offsetY) + 'px';
        }
    });

    // When the mouse is released, stop dragging
    window.addEventListener('mouseup', function () {
        isDragging = false;
        modalContent.style.cursor = 'move'; // Reset the cursor
    });

    // Ensuring modal stays visible after dragging
    window.addEventListener('mouseup', function () {
        isDragging = false;
        modalContent.style.cursor = 'move'; // Reset the cursor after dragging
    });
});
