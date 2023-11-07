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

    // Validate Form 
    const form = document.getElementById("form");
    const fileInput = document.getElementById("image");
    const fileDescription = document.getElementById("fileDescription");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Get the values of the form fields.
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const surname = document.getElementById("surname").value;
        const mobile = document.getElementById("mobile").value;
        const message = document.getElementById("message").value;


        // Validate the name field.
        if (name === "") {
            // Display an error message.
            alert("Please enter your name.");
            // Focus on the name field.
            document.getElementById("name").focus();
            return false;
        }

        // Validate the email field.
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(email)) {
            // Display an error message.
            alert("Please enter a valid email address.");
            // Focus on the email field.
            document.getElementById("email").focus();
            return false;
        }

        // Validate the surname field.
        if (surname === "") {
            // Display an error message.
            alert("Please enter your surname.");
            // Focus on the surname field.
            document.getElementById("surname").focus();
            return false;
        }

        // Validate the mobile field.
        const mobileRegex = /^\d+$/;
        if (!mobileRegex.test(mobile)) {
            // Display an error message.
            alert("Please enter a valid mobile number.");
            // Focus on the mobile field.
            document.getElementById("mobile").focus();
            return false;
        }

        // Validate the message field.
        if (message === "") {
            // Display an error message.
            alert("Please enter a message.");
            // Focus on the message field.
            document.getElementById("message").focus();
            return false;
        }

        // Send simple form to server
        const formData = {
            name,
            email,
            surname,
            mobile,
            message
        };

         // Append the selected file, if any
        //  if (fileInput.files.length > 0) {
        //     formData.append("imageInput", fileInput.files[0]);
        // }

        try {
            const response = await fetch("http://localhost:3000/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                if (document.cookie.indexOf('cookieConsent=accepted') !== -1) {
                    alert("Message sent successfully!");
                }
            } else {
                alert('Something went wrong with retrieving users!');
            }
        } catch (error) {
            closePopupMessage();
            console.error('Error occurred:', error);
        }
         // Event listener to update the file description
    // fileInput.addEventListener("change", function () {
    //     if (fileInput.files.length > 0) {
    //         fileDescription.textContent = "Selected file: " + fileInput.files[0].name;
    //     } else {
    //         fileDescription.textContent = "No file selected";
    //     }
    // });
    });

    function displayModal(message) {
        const modal = document.getElementById("myModal");
        const modalMessage = document.getElementById("modalMessage");

        modalMessage.textContent = message;
        modal.style.display = "block";

        // Close the modal when the close button is clicked
        const closeModalButton = document.getElementById("closeModal");
        closeModalButton.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    // Function to show the cookie consent modal
    function showCookieConsentModal() {
        const modal = document.querySelector('.cookie-consent-modal');
        modal.style.display = 'block';
    }

    // Function to hide the cookie consent modal
    function hideCookieConsentModal() {
        const modal = document.querySelector('.cookie-consent-modal');
        modal.style.display = 'none';
    }

    // Event listener for cancelling the cookie policy
    // Event listener for cancelling the cookie policy
    document.querySelector('.button.cancel').addEventListener('click', function () {
        // Save the user's choice in local storage
        localStorage.setItem('cookieConsentAccepted', 'false');

        // Hide the cookie consent popup
        hideCookieConsentModal();
    });

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

    // Check if the user has already accepted the cookie policy in localStorage
    window.onload = function () {
        const cookieConsentAccepted = localStorage.getItem('cookieConsentAccepted');

        if (cookieConsentAccepted !== 'true') {
            // Show the cookie consent modal with a 2-second delay if not already accepted
            setTimeout(showCookieConsentModal, 2000);
        }
    };

    // Function to set a cookie
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
    }

    // Event listener for accepting the cookie policy
    document.querySelector('.button.accept').addEventListener('click', function () {
        // Set a cookie to remember the user's choice for a specified number of days (e.g., 365 days)
        setCookie('cookieConsent', 'accepted', 365);

        // Hide the cookie consent popup
        hideCookieConsentModal();

        // Set a flag in localStorage to remember that the user has accepted the cookie policy
        localStorage.setItem('cookieConsentAccepted', 'true');
    });

    // Check if the user has already accepted the cookie policy using cookies
    if (document.cookie.indexOf('cookieConsent=accepted') !== -1) {

        // Cookie policy has been accepted, hide the cookie consent popup
        hideCookieConsentModal();
    }


    // Sign Up  Form 

    // Get the elements
    const openSignUpButton = document.getElementById("openSignUp");
    const closeSignUpButton = document.getElementById("closeSignUp");
    const signUpOverlay = document.getElementById("signupOverlay");

    // Function to open the sign-up form
    function openSignUp() {
        signUpOverlay.style.display = "block";
    }

    // Function to close the sign-up form
    function closeSignUp() {
        signUpOverlay.style.display = "none";
    }

    // Event listeners
    openSignUpButton.addEventListener("click", openSignUp);
    closeSignUpButton.addEventListener("click", closeSignUp);

    // Optional: Close the form when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === signUpOverlay) {
            closeSignUp();
        }
    });

    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const closeButton = document.getElementById("closeSignUp");


        const username = document.getElementById("username").value;
        const email = document.getElementById("emails").value;
        const phone = document.getElementById("phone").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        // Validate form inputs
        if (!username || !email || !phone || !password || !confirmPassword) {
            alert("Please fill in all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Create FormData to send as a POST request
        const formData = {
            username,
            email,
            phone,
            password,
            confirmPassword
        };

        // Send POST request
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Sign-up successful!");
                signupForm.reset();
            } else {
                alert("Sign-up failed. Please try again later.");
            }
        } catch (error) {
            closePopupMessage();
            console.error("An error occurred:", error);
        }

        closeButton.addEventListener("click", function () {
            ///Close the sign-up form
            const signupOverlay = document.getElementById("signupOverlay");
            signupOverlay.style.display = "none";
        });
    });

    // Pop Function 

    // Function to open the popup message with a given text
    function openPopupMessage(message) {
        const popupMessage = document.getElementById("popupMessage");
        const popupMessageText = document.getElementById("popupMessageText");

        // Set the message text
        popupMessageText.textContent = message;

        // Display the popup message
        popupMessage.style.display = "block";
    }

    // Function to close the popup message
    function closePopupMessage() {
        const popupMessage = document.getElementById("popupMessage");

        // Hide the popup message
        popupMessage.style.display = "none";
    }

    // Event listener for closing the popup message
    const closePopupButton = document.getElementById("closePopup");
    closePopupButton.addEventListener("click", closePopupMessage);


});