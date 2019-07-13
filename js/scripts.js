/**************************
Juan Nunez
Treehouse FSJS Techdegree
Project 5 - Public API Requests 
scripts.js
***************************/

//AJAX REQUEST TO DISPLAY 12 RANDOM EXPLOYEES
$.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us',         // API for generating random user data - requesting 12, only from US
    dataType: 'json',
    success: function(data) {
        jsonData = data.results;                              // Storing data 
        data.results.forEach(user => {                       // Looping through each employee and pulling all JSON info;
            const image = user.picture.large;
            const firstName = user.name.first;            
            const lastName = user.name.last;
            const email = user.email;
            const city = user.location.city;
            const state = user.location.state;
            // DYNAMICALLY ADDING HTML ELEMENTS CONTAINING EMPLOYEE GALLERY CARDS
            const galleryCard =                                                  // Storing HTML (From Gallery Markup in index.html)
            `<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${image}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                    <p class="card-text">${email}</p>
                    <p class="card-text cap">${city}, ${state}</p>
                </div>
            </div>`;
            $('#gallery').append(galleryCard);                        // Appending HTML to the 'gallery' id div
        })
    }
});

// CREATING MODAL WINDOW FOR EACH EMPLOYEE - TO BE CREATED ONLY WHEN EMPLOYEE CARD IS CLICKED ON
function modalWindow(i){                                                                          // Pulling JSON info and storing
    const image = jsonData[i].picture.large;
    const firstName = jsonData[i].name.first;
    const lastName = jsonData[i].name.last;
    const email = jsonData[i].email;
    const city = jsonData[i].location.city.toUpperCase();
    const phoneNumber = jsonData[i].phone;
    const street = jsonData[i].location.street.toUpperCase();
    const state = jsonData[i].location.state.toUpperCase();
    const postalCode = jsonData[i].location.postcode;
    const dob = jsonData[i].dob.date;
    let birthday = dob.slice(0, 10)                                                    // Slicing DOB to only include first 10 digits
    const modalContainer =                                                            // Storing HTML (From Modal Markup in index.html)
    `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${image}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${city}</p>
                <hr>
                <p class="modal-text">${phoneNumber}</p>
                <p class="modal-text">${street}, ${city}, ${state}, ${postalCode}</p>
                <p class="modal-text">BIRTHDAY: ${birthday}</p>
            </div>
        </div>
    </div>`;
    $('body').append(modalContainer);                                     // Appending HTML to the body
}

// LISTENING FOR EACH EMPLOYEE GALLERY CARD TO BE CLICKED, THEN OPENS MODAL WINDOW
$('#gallery').on('click', '.card', function(event) {
    console.log('hello');
    event.preventDefault();
    i = ($(this).index());                                        // Pointing to index value of which card was clicked on
    modalWindow(i);                                              // Calling function to open Modal Window of specific card
}); 

// LISTENING FOR MODAL WINDOW 'X' TO BE CLICKED, THEN CLOSES MODAL WINDOW
$('#modal-close-btn').on('click', function(){                 
    console.log('bye')
    $('.modal-container').hide();
    $('body').children().last().remove();
    i = 0;                                               // Clearing index value of card that was clicked on
  });