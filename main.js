document.addEventListener("DOMContentLoaded", function () {
  // Navigation and Toggle Menu

  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");
  hamburger.onclick = function () {
  nav.classList.toggle("active");
  };

  // Home Images
  const slider = document.querySelector(".slider");
  let currentIndex = 0;
  const slides = document.querySelectorAll(".slider img");
  const totalSlides = slides.length;

  function updateSlider() {
    const translateXValue = -currentIndex * 100 + "%";
    slider.style.transform = `translateX(${translateXValue})`;
  }

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

  // Automatically advance the slider every 3 seconds
  setInterval(() => {
    showSlide(currentIndex + 1);
  }, 3000);

  // Form Validation

  const form = document.getElementById("form");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  // Add an EventListener to get user inputs
  form.addEventListener("submit", (event) => {
    if (!validateForm()) {
      event.preventDefault(); // Prevent form submission if validation fails
    }
  });

  // Custom validation function for the form
  function validateForm() {
    const nameValue = username.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    let isValid = true;

    // Name validation
    if (nameValue === "") {
      showError(username, "Name is required");
      isValid = false;
    } else {
      hideError(username);
    }

    // Email validation
    const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (emailValue === "") {
      showError(email, "Email is required");
      isValid = false;
    } else if (!emailValue.match(emailRegex)) {
      showError(email, "Provide a valid email address");
      isValid = false;
    } else {
      hideError(email);
    }

    // Message validation
    if (messageValue === "") {
      showError(message, "Message is required");
      isValid = false;
    } else {
      hideError(message);
    }

    return isValid;
  }

  // Display error messages
  function showError(element, message) {
    const errorElement = element.nextElementSibling; // Assuming the error element follows the input element
    errorElement.innerText = message;
    errorElement.style.display = "block"; // Show the error message
  }

  // Hide error messages
  function hideError(element) {
    const errorElement = element.nextElementSibling; // Assuming the error element follows the input element
    errorElement.innerText = "";
    errorElement.style.display = "none"; // Hide the error message
  }

  // Get all the navigation links
  const navLinks = document.querySelectorAll("nav ul li a");

  // Add a scroll event listener to the window
  window.addEventListener("scroll", () => {
    // Get the current scroll position
    const scrollPosition = window.scrollY;

    // Loop through each navigation link
    navLinks.forEach((link) => {
      const sectionId = link.getAttribute("href").substring(1);
      const section = document.getElementById(sectionId);

      // Check if the section is in the viewport
      if (
        section.offsetTop <= scrollPosition + 100 &&
        section.offsetTop + section.offsetHeight > scrollPosition + 100
      ) {
        // Remove the "highlighted" class from all links
        navLinks.forEach((navLink) => {
          navLink.classList.remove("highlighted");
        });

        // Add the "highlighted" class to the current link
        link.classList.add("highlighted");
      }
    });
  });

  // Define the event dates (replace with your actual event dates)
  const eventWorkshopDate = new Date("2023-09-22"); // Workshop date (YYYY-MM-DD)
  const eventTeamBuildingDate = new Date("2023-10-06"); // Team Building date (YYYY-MM-DD)
  const eventFundraisingDate = new Date("2023-10-12"); // Fundraising date (YYYY-MM-DD)

  // Get the current date
  const currentDate = new Date();

  // Calculate the time differences in milliseconds
  const timeDifferenceWorkshop = eventWorkshopDate - currentDate;
  const timeDifferenceTeamBuilding = eventTeamBuildingDate - currentDate;
  const timeDifferenceFundraising = eventFundraisingDate - currentDate;

  // Function to format time remaining as a string
  function formatTimeRemaining(timeDifference) {
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
  }

  // Update the due date span elements for each event
  const dueDateElementWorkshop = document.getElementById("event-due-date-workshop");
  if (dueDateElementWorkshop) {
    dueDateElementWorkshop.textContent = formatTimeRemaining(timeDifferenceWorkshop);
  }

  const dueDateElementTeamBuilding = document.getElementById("event-due-date-teambuilding");
  if (dueDateElementTeamBuilding) {
    dueDateElementTeamBuilding.textContent = formatTimeRemaining(timeDifferenceTeamBuilding);
  }

  const dueDateElementFundraising = document.getElementById("event-due-date-fundraising");
  if (dueDateElementFundraising) {
    dueDateElementFundraising.textContent = formatTimeRemaining(timeDifferenceFundraising);
  }
});
