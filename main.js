document.addEventListener("DOMContentLoaded", function () {

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
            alert("User saved");
            console.log("Users:", formData);
        } else {
            // There was an error posting the form data.
            // You can display an error message to the user here.
            console.error('Something went wrong with retrieving users!');
            console.log(error);
        }
    });
});