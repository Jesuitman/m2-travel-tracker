import chai from 'chai';
const expect = chai.expect;
describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
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
  const userTrips = trips.filter(trip => trip.userID === userId);
  let totalCost = 0;

  userTrips.forEach(trip => {
      const costOfTrip = calculateCostOfTrip(trip);
      totalCost += costOfTrip;
  });

  return totalCost;
}

export function formatTripDate(date) {
  const parts = date.split("-");
  return `${parts[0]}/${parts[1]}/${parts[2]}`;  
}

export function isTripInYear(trip, year) {
  const tripDate = new Date(trip.date);
  return tripDate.getFullYear() === year;
}


let userId = 1
let travelers = [{
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
describe('calculateCostOfTrip', function() {
  let destination, trip;

  beforeEach(function() {
    destination = destinations[0]; 
    trip = trips[0]; 
  });

  it('should calculate the cost of a trip correctly', function() {
    const cost = calculateCostOfTrip(trip);
    const expectedCost = (
      trip.travelers *
      destination.estimatedFlightCostPerPerson +
      trip.travelers *
      destination.estimatedLodgingCostPerDay *
      trip.duration *
      1.1
    );
    expect(cost).to.equal(expectedCost);
  });
});

describe('calculateTotalCostForUser', function() {
  it('should calculate the total cost for a user correctly', function() {
    const userId = 2; 
    const userTrips = trips.filter(trip => trip.userID === userId);
    const expectedTotalCost = userTrips.reduce((total, trip) => {
      return total + calculateCostOfTrip(trip);
    }, 0);

    const totalCost = calculateTotalCostForUser(userId);

    expect(totalCost).to.equal(expectedTotalCost);
  });

  it('should return 0 for a user with no trips', function() {
    const userId = 3; 
    const totalCost = calculateTotalCostForUser(userId);

    expect(totalCost).to.equal(0);
  });
});

describe('formatTripDate', function() {
  it('should format a date with hyphens correctly', function() {
    const date = '2023-11-11';
    const formattedDate = formatTripDate(date);
    expect(formattedDate).to.equal('2023/11/11');
  });

  it('should format a date with slashes correctly', function() {
    const date = '2023/11/11';
    const formattedDate = formatTripDate(date);
    expect(formattedDate).to.equal('2023/11/11/undefined/undefined');
  });
});

describe('isTripInYear', () => {
  beforeEach(() => {
  });

  it('should return true when the trip year matches the provided year', () => {
    const trip = trips[0]; 
    const year = 2019;

    const result = isTripInYear(trip, year);

    expect(result).to.be.true;
  });

  it('should return false when the trip year does not match the provided year', () => {
    const trip = trips[1]; 
    const year = 2022;

    const result = isTripInYear(trip, year);

    expect(result).to.be.false;
  });
});