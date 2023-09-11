document.addEventListener('DOMContentLoaded', () => {
    // Declare form values for the contact us form
    const form = document.getElementById('form');
    const username  = document.getElementById('username');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Add an EventListener to get user inputs
   form.addEventListener('submit', event => {
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
    if (nameValue === '') {
        showError(username, 'Name is required');
        isValid = false;
    } else {
        hideError(username);
    }

    // Email validation
    const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (emailValue === '') {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!emailValue.match(emailRegex)) {
        showError(email, 'Provide a valid email address');
        isValid = false;
    } else {
        hideError(email);
    }

    // Message validation
    if (messageValue === '') {
        showError(message, 'Message is required');
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
    errorElement.style.display = 'block'; // Show the error message
}

// Hide error messages
function hideError(element) {
    const errorElement = element.nextElementSibling; // Assuming the error element follows the input element
    errorElement.innerText = '';
    errorElement.style.display = 'none'; // Hide the error message
}

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(obj => {
                console.log(obj);
            })
            .catch(error => {
                console.error('Something went wrong with retrieving users!');
                console.log(error);
            });    
        });
