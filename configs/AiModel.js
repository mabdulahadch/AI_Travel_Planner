/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMENI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 2,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",

  };
  
    export const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan form Pakistan to Croatia, for 3 Day and 2 Nights for Just Me with a Economy budget with a Flight name, Arrival airport, departure airport, Flight Price with booking URL, Hotels options list with Hotel Name, Hotel Address, Price in Pakistan currency, Hotel Image URL, geo coordinates, rating, descriptions. Daily plan to visit nearby locations with Name, Place Details, Place image URL, Geo coordinates, ticket Pricing for 3 Days and 2 Nights with time stamp in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"flight\": {\n    \"name\": \"Turkish Airlines\",\n    \"arrivalAirport\": \"Zagreb Airport (ZAG)\",\n    \"departureAirport\": \"Jinnah International Airport (KHI)\",\n    \"price\": \"PKR 120,000 (approx.)\",\n    \"bookingURL\": \"https://www.turkishairlines.com/\"\n  },\n  \"hotels\": [\n    {\n      \"name\": \"Hostel Zagreb\",\n      \"address\": \"Vlaška 76, Zagreb, Croatia\",\n      \"price\": \"PKR 2,500 per night\",\n      \"imageURL\": \"https://www.hostelzagreb.com/images/hostel-zagreb-exterior.jpg\",\n      \"geoCoordinates\": \"45.8029, 15.9767\",\n      \"rating\": 4.5,\n      \"description\": \"A centrally located hostel with a vibrant atmosphere, offering shared dorms and private rooms.\"\n    },\n    {\n      \"name\": \"Rooms by the Park\",\n      \"address\": \"Ribnjak 1, Zagreb, Croatia\",\n      \"price\": \"PKR 4,000 per night\",\n      \"imageURL\": \"https://www.roomsbythepark.com/images/rooms-by-the-park-exterior.jpg\",\n      \"geoCoordinates\": \"45.8056, 15.9784\",\n      \"rating\": 4,\n      \"description\": \"A cozy guesthouse near the park, providing comfortable rooms and a friendly environment.\"\n    },\n    {\n      \"name\": \"The Urban Hotel\",\n      \"address\": \"Savska cesta 100, Zagreb, Croatia\",\n      \"price\": \"PKR 5,500 per night\",\n      \"imageURL\": \"https://www.theurbanhotel.com/images/the-urban-hotel-exterior.jpg\",\n      \"geoCoordinates\": \"45.8010, 15.9729\",\n      \"rating\": 4.2,\n      \"description\": \"A modern hotel with stylish rooms and amenities, located near the city center.\"\n    }\n  ],\n  \"dailyPlan\": [\n    {\n      \"day\": 1,\n      \"timestamp\": \"9:00 AM\",\n      \"location\": {\n        \"name\": \"Zagreb Cathedral\",\n        \"details\": \"The iconic Zagreb Cathedral, a beautiful example of Gothic architecture.\",\n        \"imageURL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Zagreb_Cathedral_2018.jpg/1200px-Zagreb_Cathedral_2018.jpg\",\n        \"geoCoordinates\": \"45.8141, 15.9767\",\n        \"ticketPrice\": \"Free\"\n      }\n    },\n    {\n      \"day\": 1,\n      \"timestamp\": \"11:00 AM\",\n      \"location\": {\n        \"name\": \"St. Mark's Church\",\n        \"details\": \"A historic church with a distinctive colorful tiled roof.\",\n        \"imageURL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/St._Marks_Church_Zagreb_Croatia.jpg/1200px-St._Marks_Church_Zagreb_Croatia.jpg\",\n        \"geoCoordinates\": \"45.8144, 15.9779\",\n        \"ticketPrice\": \"Free\"\n      }\n    },\n    {\n      \"day\": 1,\n      \"timestamp\": \"1:00 PM\",\n      \"location\": {\n        \"name\": \"Dolac Market\",\n        \"details\": \"A bustling open-air market with local produce and souvenirs.\",\n        \"imageURL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Zagreb_Dolac_Market.jpg/1200px-Zagreb_Dolac_Market.jpg\",\n        \"geoCoordinates\": \"45.8116, 15.9760\",\n        \"ticketPrice\": \"Free\"\n      }\n    },\n    {\n      \"day\": 2,\n      \"timestamp\": \"9:00 AM\",\n      \"location\": {\n        \"name\": \"Museum of Broken Relationships\",\n        \"details\": \"A unique museum showcasing the stories behind broken relationships.\",\n        \"imageURL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Muzej_prekinutih_veza_Zagreb.jpg/1200px-Muzej_prekinutih_veza_Zagreb.jpg\",\n        \"geoCoordinates\": \"45.8143, 15.9828\",\n        \"ticketPrice\": \"PKR 500\"\n      }\n    },\n    {\n      \"day\": 2,\n      \"timestamp\": \"12:00 PM\",\n      \"location\": {\n        \"name\": \"Zagreb Funicular\",\n        \"details\": \"A short but scenic funicular ride up to the Upper Town.\",\n        \"imageURL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Zagreb_funicular_%282011%29.jpg/1200px-Zagreb_funicular_%282011%29.jpg\",\n        \"geoCoordinates\": \"45.8134, 15.9751\",\n        \"ticketPrice\": \"PKR 150\"\n      }\n    },\n    {\n      \"day\": 2,\n      \"timestamp\": \"3:00 PM\",\n      \"location\": {\n        \"name\": \"Lotrscak Tower\",\n        \"details\": \"A historic tower offering panoramic views of Zagreb.\",\n        \"imageURL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Lotrscak_Tower_Zagreb_2009.jpg/1200px-Lotrscak_Tower_Zagreb_2009.jpg\",\n        \"geoCoordinates\": \"45.8141, 15.9762\",\n        \"ticketPrice\": \"PKR 200\"\n      }\n    },\n    {\n      \"day\": 3,\n      \"timestamp\": \"10:00 AM\",\n      \"location\": {\n        \"name\": \"Plitvice Lakes National Park\",\n        \"details\": \"A stunning natural wonder with cascading waterfalls and turquoise lakes.\",\n        \"imageURL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Plitvice_Lakes_National_Park_Croatia.jpg/1200px-Plitvice_Lakes_National_Park_Croatia.jpg\",\n        \"geoCoordinates\": \"44.8874, 15.5880\",\n        \"ticketPrice\": \"PKR 1,500\"\n      }\n    }\n  ]\n}\n```\n\n**Please note:**\n\n* This is a sample plan and can be adjusted based on your interests and preferences.\n* Flight prices and hotel prices are approximate and may vary depending on the time of year and availability.\n* Entry fees for attractions and transportation costs are also approximate and may change.\n* It's recommended to book flights and accommodation in advance, especially during peak season.\n* You can find more detailed information about attractions, restaurants, and other activities in Zagreb and Plitvice Lakes on travel websites like TripAdvisor, Lonely Planet, and Viator.\n* Ensure you have a valid passport and visa (if required) for entry into Croatia.\n\nEnjoy your trip to Croatia! \n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  