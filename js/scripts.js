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
function modalWindow(x){                                                                          // Pulling JSON info and storing
    const image = jsonData[x].picture.large;
    const firstName = jsonData[x].name.first;
    const lastName = jsonData[x].name.last;
    const email = jsonData[x].email;
    const city = jsonData[x].location.city.toUpperCase();                                    // Capitalizing City
    const phone = jsonData[x].phone;
    const street = jsonData[x].location.street.toUpperCase();                              // Capitalizing Street Name
    const state = jsonData[x].location.state.toUpperCase();                               // Capitalizing State
    const postCode = jsonData[x].location.postcode;
    const dob = jsonData[x].dob.date.slice(0,10);                                       // Slicing DOB to only include first 10 digits                                                

    // DYNAMICALLY ADDING HTML ELEMENTS CONTAINING MODAL WINDOW
    const modalContainer =                                                           // Storing HTML (From Modal Markup in index.html)
    `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${image}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${city}</p>
                <hr>
                <p class="modal-text">${phone}</p>
                <p class="modal-text">${street}, ${city}, ${state}, ${postCode}</p>
                <p class="modal-text">BIRTHDAY: ${dob}</p>
            </div>
        </div>
    </div>`;
    $('body').append(modalContainer);                                            // Appending HTML to the body

    // LISTENING FOR MODAL WINDOW 'X' TO BE CLICKED, THEN CLOSES MODAL WINDOW
    $('#modal-close-btn').on('click', function(){                 
        console.log('goodbye')
        $('.modal-container').remove();                                     // Removing Modal HTML from the body
  });
}



// LISTENING FOR EACH EMPLOYEE GALLERY CARD TO BE CLICKED, THEN OPENS MODAL WINDOW
$('#gallery').on('click', '.card', function() {
    console.log('hello');
    x = ($(this).index());                                        // Pointing to index value of which card was clicked on
    modalWindow(x);                                              // Calling function to open Modal Window of specific card
}); 