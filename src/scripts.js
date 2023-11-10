// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import { getTravellers,getSingleTraveler,getAllTrips,getAllDestinations } from './api-calls';

// query Selectors
const loginForm = document.getElementById("loginForm");
const welcomeMessage = document.getElementById("welcomeMessage");

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let travelerId = 1
let travelers = []
let singleTravler = {}
let trips = []
let destinations = []

window.addEventListener("load", () =>{
    Promise.all([getTravellers(),()=>getSingleTraveler(travelerId),getAllTrips(),getAllDestinations()])
    .then((data) =>{
        travelers = data[0]
        singleTravler = data[1]()
        trips = data[2]
        destinations = data[3]
    })
})

document.addEventListener("DOMContentLoaded", function () {

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      const traveler = /^travel\d+$/;
      if (password === "travel" && traveler.test(username)) {
        const travelerId = username.replace("travel", "");
  
        getSingleTraveler(travelerId)
          .then((travelerData) => {
            if (travelerData) {
              welcomeMessage.textContent = `Welcome, ${travelerData.name}!`;
              console.log(travelerData);
            } else {
              alert("Traveler not found. Please try again.");
            }
          })
          .catch((error) => {
            console.error(error);
          });
  
        loginForm.style.display = "none";
      } else {
        alert("Invalid login credentials. Please try again.");
      }
    });
});
// console.log('This is the JavaScript entry file - your code begins here.');
// getTravellers()
