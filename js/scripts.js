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
        <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`;
    $('body').append(modalContainer);                                            // Appending HTML to the body

    // LISTENING FOR MODAL WINDOW 'X' TO BE CLICKED, THEN CLOSES MODAL WINDOW
    $('#modal-close-btn').on('click', function(){                 
        $('.modal-container').remove();                                     // Removing Modal HTML from the body
  });
    // REMOVING 'PREV' BUTTON IF ON FIRST EMPLOYEE OR REMOVING 'NEXT' IF ON LAST EMPLOYEE
    if (x === 0){
        $(".modal-prev").remove();
    }  else if (x === 11){
           $(".modal-next").remove();   
        }
    // LISTENING FOR 'NEXT' BUTTON TO BE CLICKED, THEN REMOVES CURRENT MODAL AND OPENS NEXT EMPLOYEE MODAL
    $(".modal-next").on('click', function(){
        $('.modal-container').remove();
        x++                                                                           // Incrementing index of Employee Modal
        modalWindow(x);                                                              // Calling function to open Modal Window of specific card
    }); 
    // LISTENING FOR 'PREV' BUTTON TO BE CLICKED, THEN REMOVES CURRENT MODAL AND OPENS PREVIOUS EMPLOYEE MODAL
    $(".modal-prev").on('click', function(){
        $('.modal-container').remove();
        x--                                                                     // Decrementing index of Employee Modal
        modalWindow(x);                                                        // Calling function to open Modal Window of specific card
    }); 
}



// LISTENING FOR EACH EMPLOYEE GALLERY CARD TO BE CLICKED, THEN OPENS MODAL WINDOW
$('#gallery').on('click', '.card', function() {
    x = ($(this).index());                                        // Pointing to index value of which card was clicked on
    modalWindow(x);                                              // Calling function to open Modal Window of specific card
}); 



// DYNAMICALLY ADDING HTML ELEMENT CONTAINING SEARCH BAR
const searchBar =                                                                           // Storing HTML (From Modal Search in index.html)
`<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
$('.search-container').append(searchBar);                                              // Appending HTML to 'search-container' div

// ADDING LABEL THAT DISPLAYS 'NO RESULTS' MESSAGE IF SEARCH COMES BACK EMPTY
$('.search-container').before('<label class="noresult" id="noresult"><font color="red">No Search Results</font></label>');
$('.noresult').hide();  

let searchResults = [];                                                                  // Creating empty array for search results
//SEARCH FUNCTION THAT COMPARES THE INPUT WITH THE EMPLOYEE LIST, THEN DISPLAYS RESULTS
const searchInput = () => {
    searchResults = [];                                                               // Empties search results 
    // Looping through employee list
    for (let x = 0; x < $('#gallery .card').length; x++) {
        //Conditional statement to test Gallery Card field and see if it includes the search input value                                      
        if ($('#gallery .card')[x].textContent.toLowerCase().includes($('#search-input').val().toLowerCase())) {                        
            $('#gallery .card')[x].style.display = "flex";                                // Displays employee content if a match
            searchResults.push($('#gallery .card')[x]);                                   // Stores each employee in the searchResults array
        } else {
              $('#gallery .card')[x].style.display = "none";                            // Hides all students who do not match any input value
          }
    }
    // Showing or hiding 'no results' message
    if (searchResults.length === 0) {
        $('.noresult').show();;       // If the searchResults array is empty, show "no results" message
    } else {
          $('.noresult').hide();    // Otherwise, hide the "no results" message  
      }
}

// LISTENING FOR SEARCH BUTTON TO BE CLICKED, THEN RETURNS SEARCH RESULTS
    $('#search-submit').on('click', () => {
        searchInput();
    });

// LISTENING FOR SEARCH INPUT KEYUP, THEN RETURNS SEARCH RESULTS 
$('#search-input').on('keyup', (e) => {
    searchInput();
});   