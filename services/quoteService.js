const axios = require('axios');
require("dotenv").config();
const category = 'happiness';

async function getRandomQuote() {
  try {
    const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
      params: { category: category },
      headers: {
        'X-Api-Key': process.env.xApiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Request failed:', error.message);
    throw new Error('Failed to fetch a random quote');
  }
}

module.exports = getRandomQuote;