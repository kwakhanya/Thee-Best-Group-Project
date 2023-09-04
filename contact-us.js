
document.addEventListener('DOMContentLoaded', () => {
    // Declare form values for the contact us form
    const form = document.getElementById('form');
    // const name = document.getElementById('name').innerHTML= 'name';
    // const email = document.getElementById('email').innerHTML = 'email';
    // const message = document.getElementById('message').innerHTML = 'message';

    // Add an EventListener to get user inputs 
    form.addEventListener('submit', event => {
        event.preventDefault();

        //validateInputs();


    // Set Error message for invalid inputs
    // const setError = (element, message) => {
    //     let inputControl = element.parentElement;
    //     const errorDisplay = inputControl.querySelector('.error');

    //     errorDisplay.innerText = message;
    //     inputControl.classList.add('error');
    //     inputControl.classList.remove('success');
    // };

    // Set Succcess message for valid inputs
    // const setSuccess = element => {
    //     const inputControl = element.parentElement;
    //     const errorDisplay = inputControl.querySelector('.error');

    //     errorDisplay.innerText = '';
    //     inputControl.classList.add('success');
    //     inputControl.classList.remove('remove');
    // }


    //  Validate User Email 
    // const validateEmail = email => {
    //     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(String(email).toLowerCase());
    // }

    // Validate Form Inputs
    // const validateInputs = () => {

    //     const nameValue = name.valueOf.trim;
    //     const emailValue = email.valueOf.trim();
    //     const messageValue = message.valueOf.trim();

    //     if (nameValue === '') {
    //         setError(name, 'Name is required')

    //     } else {
    //         setSuccess(name);
    //     }

    //     if (emailValue === '') {
    //         setError(email, 'Email is required')
    //     } else if (!validateEmail(emailValue)) {
    //         setError(email, 'Provide a valid email address');
    //     } else {
    //         setSuccess(email);
    //     }

    //     if (messageValue === '') {
    //         setError(message, 'Message is required')

    //     } else {
    //         setSuccess(message);
    //     }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => console.log(response.json()))
            .then(obj => {
                console.log(obj);
            })
            .catch(error => {
                console.error('Something went wrong with retrieving users!');
                console.log(error);
                alertify.success("User saved");
            });
        });
    });



// });
