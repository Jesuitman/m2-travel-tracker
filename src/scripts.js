// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// import { getTravellers,getSingleTraveler,getAllTrips,getAllDestinations } from './api-calls';

// query Selectors
const loginForm = document.getElementById("loginForm");
const welcomeMessage = document.getElementById("welcomeMessage");

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let travelerId = 1
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
let singleTravler =  {
    id: 1,
    name: "Ham Leadbeater",
    travelerType: "relaxer"
    }
let trips = [{
    id: 89,
    userID: 2,
    destinationID: 1,
    travelers: 5,
    date: "2019/09/27",
    duration: 13,
    status: "approved",
    suggestedActivities: []
    },
    {
    id: 100,
    userID: 2,
    destinationID: 2,
    travelers: 6,
    date: "2020/3/28",
    duration: 10,
    status: "approved",
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



