
// Delcare form values for contact us form
const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

// Add an EventListener to get user inputs 
form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});


// Set Error message for invalid inputs
const setError = (element, message) => {
    let inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

// Set Succcess message for valid inputs
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('remove');
}


//  Validate User Email 
const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Validate Form Inputs
const validateInputs = () => {

    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    if (nameValue === '') {
        setError(name, 'Name is required')

    } else {
        setSuccess(name);
    }

    if (emailValue === '') {
        setError(email, 'Email is requires')
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if (messageValue === '') {
        setError(message, 'Message is required')

    } else {
        setSuccess(message);
    }

}