export const getTravellers = () => {
    return fetch("http://localhost:3001/api/v1/travelers")
  .then((response) => {
    if (response.ok) {
      return response.json(); 
    } else {
      throw new Error(`Failed to retrieve data. Status code: ${response.status}`);
    }
  })
  .then((data) => {
    const travelers = data.travelers; 
    console.log(travelers);
  })
  .catch((error) => {
    console.error(error);
  })
}

export const getSingleTraveler = (travelerId) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${travelerId}`)
.then((response) => {
  if (response.ok) {
    return response.json(); 
  } else {
    throw new Error(`Failed to retrieve data. Status code: ${response.status}`);
  }
})
.then((data) => {
  console.log(data)
  let traveler
  if (traveler){
    traveler = data
    console.log(traveler) 
  } else {
    console.error(`Traveler with ID ${travelerId} not found`)
  }
  console.log(traveler);
})
.catch((error) => {
  console.error(error);
})
}

export const getAllTrips = () => {
  return fetch("http://localhost:3001/api/v1/trips")
.then((response) => {
  if (response.ok) {
    return response.json(); 
  } else {
    throw new Error(`Failed to retrieve data. Status code: ${response.status}`);
  }
})
.then((data) => {
  const trips = data.trips; 
  console.log(trips);
})
.catch((error) => {
  console.error(error);
})
}

export const getAllDestinations = () => {
  return fetch("http://localhost:3001/api/v1/destinations")
.then((response) => {
  if (response.ok) {
    return response.json(); 
  } else {
    throw new Error(`Failed to retrieve data. Status code: ${response.status}`);
  }
})
.then((data) => {
  const destinations = data.destinations; 
  console.log(destinations);
})
.catch((error) => {
  console.error(error);
})
}