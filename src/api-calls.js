// export const getTravellers = () => {
//     return fetch("http://localhost:3001/api/v1/travelers")
//   .then((response) => {
//     if (response.ok) {
//       return response.json(); 
//     } else {
//       throw new Error(`Failed to retrieve data. Status code: ${response.status}`);
//     }
//   })
//   .then((data) => {
//     const travelers = data.travelers; 
//     console.log(travelers);
//   })
//   .catch((error) => {
//     console.error(error);
//   })
// }

// export const getSingleTraveler = (travelerId) => {
//   return fetch(`http://localhost:3001/api/v1/travelers/${travelerId}`)
// .then((response) => {
//   if (response.ok) {
//     return response.json(); 
//   } else {
//     throw new Error(`Failed to retrieve data. Status code: ${response.status}`);
//   }
// })
// .then((data) => {
//   console.log(data)
//   let traveler
//   if (traveler){
//     traveler = data
//     console.log(traveler) 
//   } else {
//     console.error(`Traveler with ID ${travelerId} not found`)
//   }
//   console.log(traveler);
// })
// .catch((error) => {
//   console.error(error);
// })
// }

// export const getAllTrips = () => {
//   return fetch("http://localhost:3001/api/v1/trips")
// .then((response) => {
//   if (response.ok) {
//     return response.json(); 
//   } else {
//     throw new Error(`Failed to retrieve data. Status code: ${response.status}`);
//   }
// })
// .then((data) => {
//   const trips = data.trips; 
//   console.log(trips);
// })
// .catch((error) => {
//   console.error(error);
// })
// }

// export const getAllDestinations = () => {
//   return fetch("http://localhost:3001/api/v1/destinations")
// .then((response) => {
//   if (response.ok) {
//     return response.json(); 
//   } else {
//     throw new Error(`Failed to retrieve data. Status code: ${response.status}`);
//   }
// })
// .then((data) => {
//   const destinations = data.destinations; 
//   console.log(destinations);
// })
// .catch((error) => {
//   console.error(error);
// })
// }

// document.addEventListener("DOMContentLoaded", function () {

//     loginForm.addEventListener("submit", function (event) {
//       event.preventDefault();
  
//       const username = document.getElementById("username").value;
//       const password = document.getElementById("password").value;
  
//       const traveler = /^travel\d+$/;
//       if (password === "travel" && traveler.test(username)) {
//         const travelerId = username.replace("travel", "");
  
//         getSingleTraveler(travelerId)
//           .then((travelerData) => {
//             if (travelerData) {
//               welcomeMessage.textContent = `Welcome, ${travelerData.name}!`;
//               console.log(travelerData);
//             } else {
//               alert("Traveler not found. Please try again.");
//             }
//           })
//           .catch((error) => {
//             console.error(error);
//           });
  
//         loginForm.style.display = "none";
//       } else {
//         alert("Invalid login credentials. Please try again.");
//       }
//     });
// });
// console.log('This is the JavaScript entry file - your code begins here.');
// getTravellers()

// window.addEventListener("load", () =>{
//   Promise.all([getTravellers(),()=>getSingleTraveler(travelerId),getAllTrips(),getAllDestinations()])
//   .then((data) =>{
//       travelers = data[0]
//       singleTravler = data[1]()
//       trips = data[2]
//       destinations = data[3]
//   })
// })

// function displayPendingTrips() {
//   // Filter trips with a status of "pending"
// const pendingTrips = trips.filter(trip => trip.status === 'pending');

// if (pendingTrips.length === 0) {
//     // No pending trips found
//   pendingTripsSection.innerHTML = '<p>No pending trips at the moment.</p>';
// } else {
//     // Create and append HTML elements for each pending trip
//   const tripList = document.createElement('ul');
//   tripList.classList.add('trip-list');

//   pendingTrips.forEach(trip => {
//   const tripItem = document.createElement('li');
//   tripItem.innerHTML = `
//       <h3>Trip to ${destinations.find(dest => dest.id === trip.destinationID).destination}</h3>
//       <p>Date: ${trip.date}</p>
//       <p>Duration: ${trip.duration} days</p>
//       <p>Number of Travelers: ${trip.travelers}</p>
//   `;

//   tripList.appendChild(tripItem);
//   });

//   pendingTripsSection.appendChild(tripList);
// }
// }