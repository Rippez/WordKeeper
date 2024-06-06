const axios = require("axios");
require("dotenv").config();

async function getRandomRiddle() {
  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/riddles", {
      headers: {
        "X-Api-Key": process.env.xApiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request failed:", error.message);
    throw new Error("Failed to fetch a random quote");
  }
}


module.exports = getRandomRiddle;