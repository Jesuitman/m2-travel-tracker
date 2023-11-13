export function fetchTravelers() {
  return fetch("http://localhost:3001/api/v1/travelers")
      .then((response) => response.json())
      .then((data) => data.travelers);
}

export function fetchTrips() {
  return fetch("http://localhost:3001/api/v1/trips")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        return data.trips});
}

export function fetchDestinations() {
  return fetch("http://localhost:3001/api/v1/destinations")
      .then((response) => response.json())
      .then((data) => data.destinations);
}

export function postNewTrip(newTrip) {
  return fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTrip),
  })
  .then((response) => {
    return response.json()})
    };
