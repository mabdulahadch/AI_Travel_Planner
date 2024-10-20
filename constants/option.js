export const SelectTravelerList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo traveler on a personal adventure",
    icon: "🧑‍💼",
    people: " : 1",
  },
  {
    id: 2,
    title: "Couple",
    desc: "Two travelers exploring together",
    icon: "🥂",
    people: " : 2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A family on a shared adventure",
    icon: "🏡",
    people: " : 3-5",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A group of friends seeking excitement",
    icon: "😎",
    people: " : 5-10",
  },
];

export const SelectBudgetList = [
  {
    id: 1,
    title: "Economy",
    desc: "Essential services at\naffordable rates.",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Balanced choices offering\na good mix of comfort.",
    icon: "💶",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Premium experiences with\ntop-tier services.",
    
    icon: "💷",
  },
];
// next update {Travelling details} , Car, Bus, Airplane
//export const AI_PROMPT =  "Generate Travel Plan from {startLocation} to {destinationLocation}, for {totalDays} Day and {totalNights} Nights for {travelers} with a {budget} budget with a Flight details, Flight Price with booking URL,                                Hotels options list with Hotel Name, Hotel Address, Price in {startLocation} currency, Hotel Image URL, geo coordinates, rating, descriptions and Places to visit nearby with Place Name, Place Details, Place image URL, Geo coordinates, ticket Pricing, Time to travel each of the location for {totalDays} Days and {totalNights} Nights with each day plan with best time to visit in JSON format.";
export const AI_PROMPT =
  "Generate Travel Plan form {startLocation} to {destinationLocation}, for  {totalDays} Day and {totalNights} Nights for {travelers} with a {budget} budget with a Flight name, Arrival airport, departure airport, Flight Price with booking URL, Hotels options list with Hotel Name, Hotel Address, Price in {startLocation} currency, Hotel Image URL, geo coordinates, rating, descriptions. Daily plan to visit nearby locations with Name, Place Details, Place image URL, Geo coordinates, ticket Pricing for {totalDays} Days and  {totalNights} Nights with time stamp in JSON format.";