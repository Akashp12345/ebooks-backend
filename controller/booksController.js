require("dotenv").config();
const axios = require("axios");
const Books = require("../models/booksModel");

// Helper for fetching books from Google API
const GoogleAPI_Helper = async (query, pageNumber) => {
  try {
    const result = await axios.get(process.env.GOOGLE_API, {
      params: {
        q: query || "*", // Default to all books
        startIndex: (pageNumber - 1) * 12 || 0, // Adjust startIndex based on the page number
        maxResults: 12, // Limit the number of results per page to 12
        key: process.env.GOOGLE_API_KEY,
      },
    });

    return result.data; // Return the data from the response
  } catch (err) {
    throw new Error(err.message);
  }
};

// Get all books with pagination
const AllBooks = async (req, res) => {
  try {
    const { search, pageNumber } = req.query;
    // Fetch books from Google API
    const response = await GoogleAPI_Helper(search, pageNumber || 1);

    // Get all favourite
    const mybooks = await Books.findOne({
      where: { userID: req.params.userid },
    });

    let books = [];
    if (response?.totalItems > 0) {
      books = response?.items?.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        category: item.volumeInfo.categories,
        publishedDate: item.volumeInfo.publishedDate,
        previewLink: item.volumeInfo.previewLink,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail ?? null,
        favourite:
          mybooks?.favourite?.some((books) => books.id === item.id) ?? false,
      }));
    }

    res
      .status(200)
      .json({ books: books || [], totalpages: response.totalItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add book to favourites
const AddbookstoFavourite = async (req, res) => {
  try {
    const { userid } = req.params;
    const { body } = req;

    // Fetch the existing record
    let bookRecord = await Books.findOne({ where: { userID: userid } });

    if (!bookRecord) {
      bookRecord = await Books.create({
        userID: id,
        favourite: [body],
      });

      return res.status(201).json("Added to favourite");
    }

    // Check if the book already exists in favourites
    const exists = bookRecord.favourite.some((book) => book.id === body.id);
    if (exists) {
      return res.status(409).json("Book already in favourites");
    }

    // Update the favourite array
    const updatedFavourites = [...bookRecord.favourite, body];

    // Update the record
    await Books.update(
      { favourite: updatedFavourites },
      { where: { userID: userid } }
    );

    const updatedFavourite = await Books.findOne({
      where: { userID: userid },
      attributes: ["favourite"],
    });

    res.status(200).json(updatedFavourite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove book from favourites
const removeFavouriteBook = async (req, res) => {
  try {
    const { bookid } = req.query;
    const { userid } = req.params;

    // Fetch the existing record
    const bookRecord = await Books.findByPk(userid);

    if (!bookRecord) {
      return res.status(404).json("No books added to favourite");
    }

    // Filter out the book with the specified id
    const remainingbooks = bookRecord.favourite.filter(
      (book) => book.id !== bookid
    );

    // Update the record
    await Books.update(
      { favourite: remainingbooks },
      { where: { userID: userid } }
    );

    const updatedFavourite = await Books.findOne({
      where: { userID: userid },
      attributes: ["favourite"],
    });

    res.status(200).json(updatedFavourite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const MyFavourite = async (req, res) => {
  try {
    const { userid } = req.params;

    const myfavourite = await Books.findOne({
      where: { userID: userid },
      attributes: ["favourite"],
    });

    if (!myfavourite) {
      return res.status(404).json({ error: "No favourite books found" });
    }

    return res.status(200).json({ books: myfavourite?.favourite ?? [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  AllBooks,
  AddbookstoFavourite,
  removeFavouriteBook,
  MyFavourite,
};
