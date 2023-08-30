
// Delcare form values for contact us form
const formContact = document.querySelector('.form');
if(formContact){
    formContact.addEventListener('click', swapper, false);
}
// const name = document.getElementById('name');
// const email = document.getElementById('email');
// const message = document.getElementById('message');

// Add an EventListener to get user inputs 
formContact.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(formContact);
    const data = Object.fromEntries(formData)

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    fetch('http://localhost:3000/users').then(function (response) {
        return response.json();
    }).then(function (obj) {
        console.log(obj);
    }).catch(function (error) {
        console.error('Something went wrong with retrieving users!.');
        console.log(error);
    });
});



