/**************************
Juan Nunez
Treehouse FSJS Techdegree
Project 5 - Public API Requests 
scripts.js
***************************/

//AJAX REQUEST TO DISPLAY 12 RANDOM EXPLOYEES
$.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us',                // API for generating random user data - requesting 12, only from US
    dataType: 'json',
    success: function(data) {
      jsonData = data.results;                                       // Storing data 
      data.results.forEach(user => {                                // Looping through each user and pulling all JSON info;
        const image = user.picture.large;
        const firstName = user.name.first;            
        const lastName = user.name.last;
        const email = user.email;
        const city = user.location.city;
        const state = user.location.state;
        // DYNAMICALLY ADDING HTML ELEMENTS CONTAINING EMPLOYEE GALLERY CARDS
        const galleryCard =                                                             // Storing HTML (From Gallery Markup in index.html)
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
         $('#gallery').append(galleryCard);                                     // Appending HTML to the 'gallery' id div
      })
    }
});
  