// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import { fetchTravelers,fetchTrips,fetchDestinations,postNewTrip } from './api-calls';
import "./images/circus.wav"
// query Selectors
const loginForm = document.getElementById("loginForm");
const costsTripsSection = document.querySelector('.costs-dashboard-section');
const dashboardTitle = document.querySelector('.dashboard-title')
const newTripButton = document.querySelector("#scheduleTripButton");
const tripForm = document.querySelector("#newTripForm");
const dashboard = document.querySelector(".dashboard")
const clownMusic = new Audio("./images/circus.wav")

function showElement(element) {
    element.style.display = "block";
}

function showDashboard(){
    dashboard.style.display = "grid"
}

function hideElement(element) {
    element.style.display = "none";
}
let travelers
let userId
let trips
let destinations = []

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/red-dot-cursor.png'
function fetchAllData(){
    Promise.all([fetchTravelers(),fetchTrips(),fetchDestinations()])
    .then(([travelersData, tripsData, destinationsData]) =>{
        travelers = travelersData
        trips = tripsData
        destinations = destinationsData
    })
}
document.addEventListener("DOMContentLoaded", fetchAllData)


function displayTrips(userId, status) {
    fetchAllData()
    const tripsSection = document.querySelector(`.${status}-inner-dashboard-section`);
    
    
    const filteredTrips = trips.filter((trip) => trip.userID === userId && trip.status === status);
    
    if (filteredTrips.length === 0) {
        tripsSection.innerHTML = `<p>No ${status} trips at the moment.</p>`;
    } else {
        const tripList = document.createElement('ul');
        tripList.classList.add('trip-list');
        
                filteredTrips.forEach((trip) => {
                    const cost = calculateCostOfTrip(trip);
                    const tripItem = document.createElement('li');
                    tripItem.innerHTML = `
                        <h3>Trip to ${destinations.find(dest => dest.id === trip.destinationID).destination}</h3>
                        <p>Date: ${trip.date}</p>
                        <p>Duration: ${trip.duration} days</p>
                        <p>Number of Travelers: ${trip.travelers}</p>
                        <p>Cost of the Trip: ${cost} dollars</p>
                    `;

                    tripList.appendChild(tripItem);
                });

                tripsSection.innerHTML = "";
                tripsSection.appendChild(tripList);
            }
        };


document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === "clown") {
        return clownMode();
    }

    if (password !== "travel"){
        alert("Invalid password, please use 'travel' as your password to continue")
        return
    }
    userId = parseInt(username.match(/\d+/)[0]);
    fetch(`http://localhost:3001/api/v1/travelers/${userId}`, {
        method: "GET",
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Invalid username or password.");
            }
        })
        .then((data) => {
            userId = data.id;

            hideElement(loginForm);
            showDashboard();

            dashboardTitle.textContent = `Hello ${data.name}!`;

            displayAllTripData(userId)
        })
        .catch((error) => {
            console.log(error);
        });
});
export function calculateCostOfTrip(trip) {
    const destination = destinations.find(dest => dest.id === trip.destinationID);
    const travelers = trip.travelers;
    const estimatedFlightCostPerPerson = destination.estimatedFlightCostPerPerson;
    const estimatedLodgingCostPerDay = destination.estimatedLodgingCostPerDay;
    const duration = trip.duration;
    
    const costOfTrip = (travelers * estimatedFlightCostPerPerson) + (travelers * estimatedLodgingCostPerDay * duration) * 1.1;
    
    return costOfTrip;
}

export function calculateTotalCostForUser(userId) {
    const userTrips = trips.filter(trip => trip.userID === userId);
    let totalCost = 0;
  
    userTrips.forEach(trip => {
        const costOfTrip = calculateCostOfTrip(trip);
        totalCost += costOfTrip;
    });
  
    return totalCost;
}

function updateCostBox(userId) {
    const totalCost = calculateTotalCostForUser(userId);  

    costsTripsSection.innerHTML = `<h3>Total Cost of Trips: $${totalCost}</h3>`;
}
  
function getUserNameById(userId) {
    const user = travelers.find(traveler => traveler.id === userId)
    return user.name
}

newTripButton.addEventListener("click", () => {
    showElement(tripForm);
    hideElement(dashboard) 
})

document.getElementById("newTripForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const tripDateInput = document.getElementById("tripDate")
    const tripDate = formatTripDate(tripDateInput.value)
    const tripDuration = parseInt(document.getElementById("tripDuration").value);
    const numTravelers = parseInt(document.getElementById("travelers").value);
    const selectedDestinationId = parseInt(document.getElementById("destination").value);

    const newTrip = {
        id: trips.length+1,
        userID: userId,
        destinationID: selectedDestinationId,
        travelers: numTravelers,
        date: tripDate,
        duration: tripDuration,
        status: "pending",
        suggestedActivities: [],
    };

        postNewTrip(newTrip)
        .then((newTrip) => {
            trips.push(newTrip);
            displayAllTripData(userId)
            // const estimatedCost = calculateCostOfTrip(data);
    
            // alert(`Estimated Cost for the Trip: $${estimatedCost}`);
            event.target.reset();
            hideElement(tripForm);
            showDashboard();
        

        });
});

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3001/api/v1/destinations")
        .then((response) => response.json())
        .then((data) => {
            destinations = data.destinations;
            
            const destinationSelect = document.getElementById("destination");
            destinationSelect.innerHTML = destinations
                .map((destination) => {
                    return `<option value="${destination.id}">${destination.destination}</option>`;
                })
                .join("");
        })
        .catch((error) => {
            console.error("Failed to fetch destinations:", error);
        });
});

function formatTripDate(date) {
    const parts = date.split("-");
    return `${parts[0]}/${parts[1]}/${parts[2]}`;  
}

function displayAllTripData(userId){
    displayTrips(userId,"approved")
    displayTrips(userId,"pending")
    displayTrips(userId,"past")
    updateCostBox(userId)
}
let randomFontSize
function clownMode() {
    document.documentElement.style.cursor = 'wait';
    document.body.style.cursor = 'wait';
    // clownMusic.play(); 
    document.body.style.backgroundColor = 'purple';
    
    setRandomFontSize();
    playClownMusic()
    setInterval(playClownMusic, 1)

    setInterval(toggleColorSwap, 200);
    setInterval(setRandomFontSize, 200);
}

function toggleColorSwap() {
    const body = document.body;
    const allTextElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, a, li');
    
    if (body.style.backgroundColor === 'purple') {
        body.style.backgroundColor = 'hotpink';
        allTextElements.forEach((element) => {
            element.style.color = 'purple';
        });
    } else {
        body.style.backgroundColor = 'purple';
        allTextElements.forEach((element) => {
            element.style.color = 'hotpink';
        });
    }
}

function setRandomFontSize() {
    randomFontSize = Math.floor(Math.random() * 36) + 5;
    const allTextElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, a, li');
    allTextElements.forEach((element) => {
        element.style.fontSize = `${randomFontSize}px`;
    });
}
function playClownMusic(){
    clownMusic.play()
}