require("dotenv").config();
const axios = require("axios");

// Helper for fetch the books from Google API
const GoogleAPI_Helper = async (query, pagenumber) => {
  try {
    //      Fetching books based on query
    const result = await axios.get(process.env.GOOGLE_API, {
      params: {
        q: query || "*", // * is for all books
        startIndex: (pagenumber - 1) * 10 || 0, // Adjust startIndex based on the page number
        maxResults: 10, // Limit the number of results per page to 50
        key: process.env.GOOGLE_API_KEY,
      },
    });

    return result; // Return the data from the response
  } catch (err) {
    throw err; // Rethrow the error
  }
};

const AllBooks = async (req, res) => {
  try {
    const { search, pageNumber } = req.query;

    // Taking books from google
    const response = await GoogleAPI_Helper(search, pageNumber || 1);

    let books = [];
    if (response?.data?.totalItems > 0) {
      // Extract the list of books from the response
      books = response.data.items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        category: item.volumeInfo.categories,
        publishedDate: item.volumeInfo.publishedDate,
        previewLink: item.volumeInfo.previewLink,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail ?? false,
      }));
    }

    const totalpages = Math.round(response.data.totalItems / 10);

    res.status(200).json({ books: books, totalpages: totalpages });
  } catch (err) {
    res.status(401).json(err?.message);
  }
};






module.exports = { AllBooks };
