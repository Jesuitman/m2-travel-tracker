// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// import { getTravellers,getSingleTraveler,getAllTrips,getAllDestinations } from './api-calls';

// query Selectors
const loginForm = document.getElementById("loginForm");
const welcomeMessage = document.getElementById("welcomeMessage");
const pendingTripsSection = document.querySelector('.pending-dashboard-section');
const approvedTripsSection = document.querySelector('.approved-dashboard-section');
const pastTripsSection = document.querySelector('.past-dashboard-section');
const costsTripsSection = document.querySelector('.costs-dashboard-section');
const dashboardTitle = document.querySelector('.dashboard-title')
const destinationSelect = document.getElementById("destination");
const newTripButton = document.querySelector("#scheduleTripButton");
const tripForm = document.querySelector("#newTripForm");
const dashboard = document.querySelector(".dashboard")

function showElement(element) {
    element.classList.remove("hidden");
}

function hideElement(element) {
    element.classList.add("hidden");
}


// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let userId = 1
let travelers = [
    {
    id: 1,
    name: "Ham Leadbeater",
    travelerType: "relaxer"
    },
    {
    id: 2,
    name: "Rachael Vaughten",
    travelerType: "thrill-seeker"
}]

let singleTravler ={
    id: 2,
    name: "Rachael Vaughten",
    travelerType: "thrill-seeker"
}

let trips = [{
    id: 89,
    userID: 2,
    destinationID: 1,
    travelers: 5,
    date: "2019/09/27",
    duration: 13,
    status: "past",
    suggestedActivities: []
    },
    {
    id: 100,
    userID: 2,
    destinationID: 2,
    travelers: 6,
    date: "2020/3/28",
    duration: 10,
    status: "pending",
    suggestedActivities: []
    },
    {
    id: 116,
    userID: 2,
    destinationID: 3,
    travelers: 3,
    date: "2020/04/03",
    duration: 8,
    status: "approved",
    suggestedActivities: []
    },
    {
    id: 89,
    userID: 1,
    destinationID: 1,
    travelers: 5,
    date: "2019/09/27",
    duration: 13,
    status: "past",
    suggestedActivities: []
}]

let destinations = [{
    id: 1,
    destination: "Lima, Peru",
    estimatedLodgingCostPerDay: 70,
    estimatedFlightCostPerPerson: 400,
    image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    alt: "overview of city buildings with a clear sky"
    },
    {
    id: 2,
    destination: "Stockholm, Sweden",
    estimatedLodgingCostPerDay: 100,
    estimatedFlightCostPerPerson: 780,
    image: "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    alt: "city with boats on the water during the day time"
    },
    {
    id: 3,
    destination: "Sydney, Austrailia",
    estimatedLodgingCostPerDay: 130,
    estimatedFlightCostPerPerson: 950,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    alt: "opera house and city buildings on the water with boats"
}]


function displayTrips(userId,status) {
    const tripsSection = document.querySelector(`.${status}-inner-dashboard-section`);
    
    const filteredTrips = trips.filter(trip =>trip.userID === userId && trip.status === status);
    
    if (filteredTrips.length === 0) {
        tripsSection.innerHTML = `<p>No ${status} trips at the moment.</p>`;
    } else {
        const tripList = document.createElement('ul');
        tripList.classList.add('trip-list');
        
    filteredTrips.forEach(trip => {
        const cost = calculateCostOfTrip(trip)
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
    
    tripsSection.innerHTML = ""
    tripsSection.appendChild(tripList);
    }
}

document.getElementById("userId").addEventListener("input", function(){
    userId = parseInt(this.value)
    const userName = getUserNameById(userId)

    dashboardTitle.textContent = `Hello ${userName}`

    displayTrips(userId, "pending")
    displayTrips(userId, "past")
    displayTrips(userId, "approved")
    updateCostBox(userId)
})

function calculateCostOfTrip(trip) {
    const destination = destinations.find(dest => dest.id === trip.destinationID);
    const travelers = trip.travelers;
    const estimatedFlightCostPerPerson = destination.estimatedFlightCostPerPerson;
    const estimatedLodgingCostPerDay = destination.estimatedLodgingCostPerDay;
    const duration = trip.duration;
    
    const costOfTrip = (travelers * estimatedFlightCostPerPerson) + (travelers * estimatedLodgingCostPerDay * duration) * 1.1;
    
    return costOfTrip;
}

function calculateTotalCostForUser(userId) {
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
    const tripDate = document.getElementById("tripDate").value;
    const tripDuration = parseInt(document.getElementById("tripDuration").value);
    const numTravelers = parseInt(document.getElementById("travelers").value);
    const selectedDestinationId = parseInt(document.getElementById("destination").value);
    
    const newTrip = {
        id: trips.length + 1, 
        userID: userId,
        destinationID: selectedDestinationId,
        travelers: numTravelers,
        date: tripDate,
        duration: tripDuration,
        status: "pending",
        suggestedActivities: []
    };
    const estimatedCost = calculateCostOfTrip(newTrip)
    trips.push(newTrip);
  
    alert(`Estimated Cost for the Trip: $${estimatedCost}`);
    displayTrips(userId, "pending");
  
    event.target.reset();
    hideElement(tripForm)
    showElement(dashboard)
});
  
document.addEventListener("DOMContentLoaded", () => {
    const destinationSelect = document.getElementById("destination");
    destinationSelect.innerHTML = destinations
    .map((destination) => {
        return `<option value="${destination.id}">${destination.destination}</option>`;
    })
    .join("");
});