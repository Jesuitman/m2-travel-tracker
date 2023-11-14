// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import { fetchTravelers,fetchTrips,fetchDestinations,postNewTrip } from './api-calls';
// query Selectors
const loginForm = document.getElementById("loginForm");
const costsTripsSection = document.querySelector('.costs-dashboard-section');
const dashboardTitle = document.querySelector('.dashboard-title')
const newTripButton = document.querySelector("#scheduleTripButton");
const tripForm = document.querySelector("#newTripForm");
const dashboard = document.querySelector(".dashboard")
import './css/styles.css';

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
    const tripsSection = document.querySelector(`.${status}-inner-dashboard-section`);
    
    const filteredTrips = trips.filter((trip) => trip.userID === userId && trip.status === status);
    
    if (filteredTrips.length === 0) {
        tripsSection.innerHTML = `<p>No ${status} trips at the moment.</p>`;
    } else {
        const tripContainer = document.createElement('div');
        tripContainer.classList.add('trip-container');
        filteredTrips.forEach((trip) => {
            const cost = calculateCostOfTrip(trip);
            const tripItem = document.createElement('div');
            tripItem.classList.add('trip-item');
            tripItem.innerHTML = `
                <h3>Trip to ${destinations.find(dest => dest.id === trip.destinationID).destination}</h3>
                <p>Date: ${trip.date}</p>
                <p>Duration: ${trip.duration} days</p>
                <p>Number of Travelers: ${trip.travelers}</p>
                <p>Cost of the Trip: $${cost}</p>
            `;
            tripContainer.appendChild(tripItem);
        });
    tripsSection.innerHTML = "";
    tripsSection.appendChild(tripContainer);
    }
};


document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

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
    
    let costOfTrip = (travelers * estimatedFlightCostPerPerson) + (travelers * estimatedLodgingCostPerDay * duration) * 1.1;
    costOfTrip = parseFloat(costOfTrip.toFixed(2));
    
    return costOfTrip;
}

export function calculateTotalCostForUser(userId) {
    const userTrips = trips.filter(trip => trip.userID === userId && isTripInYear(trip, 2023));
    let totalCost = 0;
  
    userTrips.forEach(trip => {
        const costOfTrip = calculateCostOfTrip(trip);
        totalCost += costOfTrip;
    });
    return totalCost;
}

export function isTripInYear(trip, year) {
    const tripDate = new Date(trip.date);
    return tripDate.getFullYear() === year;
}

function updateCostBox(userId) {
    const totalCost = calculateTotalCostForUser(userId);  
    costsTripsSection.innerHTML = `<h3>Projected Cost of Trips for the year: $${totalCost}</h3>`;
}

newTripButton.addEventListener("click", () => {
    showElement(tripForm);
    hideElement(dashboard) 
})

document.getElementById("newTripForm").addEventListener("submit", function (event) {
    let currentDate = new Date()
    event.preventDefault();
    const tripDateInput = document.getElementById("tripDate")
    let tripDateCompare = new Date(tripDateInput.value)
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
    if (tripDateCompare < currentDate){
        alert("Sorry! You can't schedule a trip in the past!")
        return
    }
        postNewTrip(newTrip)
        .then(() => {
            fetchTrips()
            .then((tripsData)=>{
                trips = tripsData
                displayAllTripData(userId)})
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

export function formatTripDate(date) {
    const parts = date.split("-");
    return `${parts[0]}/${parts[1]}/${parts[2]}`;  
}

function displayAllTripData(userId){
    displayTrips(userId,"approved")
    displayTrips(userId,"pending")
    displayTrips(userId,"past")
    updateCostBox(userId)
}