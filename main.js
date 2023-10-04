document.addEventListener("DOMContentLoaded", function () {

    // Window Scroll

    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section'); // Select all sections
    
        sections.forEach((section) => {
            const link = document.querySelector(`a[href="#${section.id}"]`);
            const linkRect = link.getBoundingClientRect();
            const sectionRect = section.getBoundingClientRect();
    
            // Check if the link is in the viewport
            if (
                linkRect.top >= sectionRect.top &&
                linkRect.bottom <= sectionRect.bottom
            ) {
                // Remove active class from all links
                document.querySelectorAll('a.nav-link').forEach((navLink) => {
                    navLink.classList.remove('active');
                });
    
                // Add active class to the current link
                link.classList.add('active');
            }
        });
    });
    
    // Image Slides 
    const slider = document.querySelector('.slider');
    const sliderImages = document.querySelectorAll('.slider img');
    const prevBtn = document.querySelector('#prevBtn');
    const nextBtn = document.querySelector('#nextBtn');
    const totalSlides = sliderImages.length;
    let currentIndex = 0;

    function updateSlider() {
        const translateXValue = -currentIndex * 100 + "%";
        slider.style.transform = `translateX(${translateXValue})`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % sliderImages.length;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
        updateSlider();
    });

    function showSlide(index) {
        if (index < 0) {
            currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        updateSlider();
    }

    setInterval(() => {
        showSlide(currentIndex + 1);
    }, 3000);

    // Events

    // Function to update the countdown for a specific event
    function updateCountdown(elementId, eventDate) {
        const eventElement = document.getElementById(elementId);
        const now = new Date().getTime();
        const distance = new Date(eventDate).getTime() - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            eventElement.innerText = countdownText;
        } else {
            eventElement.innerText = "Event ended";
        }
    }

    // Update the countdown for each event
    setInterval(() => {
        updateCountdown("event-due-date-workshop", "2023-10-16 10:00:00");
        updateCountdown("event-due-date-teambuilding", "2023-10-15 12:00:00");
        updateCountdown("event-due-date-fundraising", "2023-10-17 20:00:00");

        // Add similar lines for other events
    }, 1000); // Update every second

    // Back To Top Button

    // Get the button element
    var backToTopBtn = document.getElementById("backToTopBtn");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };

    // When the button is clicked, scroll to the top of the document
    backToTopBtn.onclick = function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    // Send simple form to server
    const form = document.querySelector('#form');

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });
        if (response.ok) {
            // The form data was successfully posted.
            // You can display a success message to the user here.
            alert("User saved Succefully");
            console.log("Users:", formData);
        } else {
            // There was an error posting the form data.
            // You can display an error message to the user here.
            console.error('Something went wrong with retrieving users!');
            console.log(error);
        }
    });

    // Cookies Function

    // Function to show the cookie consent modal
    function showCookieConsentModal() {
        const modal = document.querySelector('.cookie-consent-modal');
        modal.style.display = 'block';
    }

    // Function to hide the cookie consent modal when "Accept" or "Cancel" is clicked
    const acceptButton = document.querySelector('.button.accept');
    const cancelButton = document.querySelector('.button.cancel');

    acceptButton.addEventListener('click', function () {
        hideCookieConsentModal();
    });


    cancelButton.addEventListener('click', function () {
        hideCookieConsentModal();
    });

    function hideCookieConsentModal() {
        const modal = document.querySelector('.cookie-consent-modal');
        modal.style.display = 'none';
    }

    // Function to toggle "Read More" and "Read Less" text when clicked
    const readMoreLink = document.querySelector('.read-more-link');
    const expandedContent = document.querySelector('.expanded-content');

    readMoreLink.addEventListener('click', function () {
        if (expandedContent.style.display === 'none' || expandedContent.style.display === '') {
            expandedContent.style.display = 'block';
            readMoreLink.textContent = 'Read Less';
        } else {
            expandedContent.style.display = 'none';
            readMoreLink.textContent = 'Read More';
        }
    });
    // Show the cookie consent modal when the page loads (2-second delay)
    window.onload = function () {
        setTimeout(showCookieConsentModal, 2000);
    };
});