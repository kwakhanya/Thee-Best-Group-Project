
document.addEventListener('DOMContentLoaded', () => {
    // Declare form values for the contact us form
    const form = document.getElementById('form');

    // Add an EventListener to get user inputs 
    form.addEventListener('submit', event => {
        event.preventDefault();

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
            alertify.success("User saved");
        });
    });
});
