require("dotenv").config();
const axios = require("axios");
const GoogleAPI_Helper = async (query, pagenumber) => {
  try {
    const result = await axios.get(process.env.GOOGLE_API, {
      params: {
        q: query || "*",
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

const SearchBooks = async (req, res) => {
  try {
    const { query, pageNumber } = req.query;

    // Taking books from google
    const response = await GoogleAPI_Helper(query, pageNumber || 1);

    // Extract the list of books from the response
    const books = response.data.items.map((item) => ({
      id:item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      category:item.volumeInfo.categories,
      publishedDate: item.volumeInfo.publishedDate,
      previewLink: item.volumeInfo.previewLink,
      thumbnail:item.volumeInfo.imageLinks.thumbnail
    }));
 
    res.status(200).json({books:books,totalbooks:response.data.totalItems});
  } catch (err) {
    res.status(401).json(err?.message);
  }
};








module.exports = { SearchBooks };
