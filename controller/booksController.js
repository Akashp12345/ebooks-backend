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

    return result.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Helper for fetching books from Google API
const Recommendation_Helper = async (query) => {
  try {
    console.log(query)
    const result = await axios.get(process.env.GOOGLE_API, {
      params: {
        q: query,
        maxResults: 12, // Limit the number of results per page to 12
        key: process.env.GOOGLE_API_KEY,
      },
    });

    return result.data;
  } catch (err) {
    
    throw new Error(err.message);
  }
};

// Generate recommandation search query
const transformArray = (arr) => {
  // Generate a random index
  const randomIndex = Math.floor(Math.random() * arr.length);

  // Get the value at the random index
  const randomValueObj = arr[randomIndex];
  const randomKey = Object.keys(randomValueObj)[0];
  const randomValue = randomValueObj[randomKey];

  // Append the random value to the transformed string
  const randomValueString = Array.isArray(randomValue)
    ? randomValue.map((item) => `${randomKey}:${item}`).join("+")
    : randomValue;

  return `${randomValueString}`;
};

// Fetch all books
const AllBooks = async (req, res) => {
  try {
    const { search, pageNumber } = req.query;

    // Fetch books from Google API
    const response = await GoogleAPI_Helper(search, pageNumber || 1);

    // Get user's books
    const mybooks = await Books.findOne({
      where: { userID: req.params.userid },
    });

    // Update user's recommendation if necessary
    if (
      req.params.userid &&
      search !== "*" &&
      (!mybooks?.recommend?.some((val) => val?.other === search) ||
        !mybooks?.recommend?.length)
    ) {
      const newRecommend = [...(mybooks?.recommend || []), { other: search }];
      await Books.update(
        { recommend: newRecommend },
        { where: { userID: req.params.userid } }
      );
    }
    
    // Retrieve recommendations if available
    let recommended = [];
    if (mybooks?.recommend?.length > 0) {
    
      const recommendation = transformArray(mybooks?.recommend);
     if(recommendation){
      const recommendationResponse = await Recommendation_Helper(
        recommendation
      );
      recommended = recommendationResponse?.items?.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        category: item.volumeInfo.categories,
        publishedDate: item.volumeInfo.publishedDate,
        previewLink: item.volumeInfo.previewLink,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || null,
        favourite:
          mybooks?.favourite?.some((book) => book.id === item.id) || false,
        readstatus:
          mybooks?.markedread?.some((book) => book.id === item.id) || false,
        price:
          item.saleInfo?.saleability === "FOR_SALE"
            ? item.saleInfo?.retailPrice?.amount
            : 0,
        rating: item.volumeInfo?.averageRating || 0,
      }));
     }
      
     
    }

  
    // Process fetched books
    let books = [];
    if (response?.totalItems > 0) {
      books = response?.items?.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        category: item.volumeInfo.categories,
        publishedDate: item.volumeInfo.publishedDate,
        previewLink: item.volumeInfo.previewLink,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || null,
        favourite:
          mybooks?.favourite?.some((book) => book.id === item.id) || false,
        readstatus:
          mybooks?.markedread?.some((book) => book.id === item.id) || false,
        price:
          item.saleInfo?.saleability === "FOR_SALE"
            ? item.saleInfo?.retailPrice?.amount
            : 0,
        rating: item.volumeInfo?.averageRating || 0,
      }));
    }

    res.status(200).json({
      books: books || [],
      recommended: recommended.slice(6),
      totalpages: response.totalItems, // Update with actual total pages
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message });
  }
};

const AddtoRecommandation = async (body, bookRecord, userid) => {
  // Destructure necessary values
  const { recommend = [] } = bookRecord;
  const { authors = [],category=[]} = body;

const newRecommend = [
  ...recommend,
  ...(authors.length > 0 ? [{ inauthor: authors }] : []),
  ...(category.length > 0 ? [{ subject: category }] : []),
];



  // Update the record
  await Books.update(
    { recommend: newRecommend },
    { where: { userID: userid } }
  );
};

// Add to favourite

const AddbookstoFavourite = async (req, res) => {
  try {
    const { userid } = req.params;
    const { body } = req;

    // Fetch or create the book record
    let [bookRecord] = await Books.findOrCreate({
      where: { userID: userid },
      defaults: { userID: userid, favourite: [] },
    });

    // Destructure the record and its favourite array
    let { favourite } = bookRecord;

    // Check if the book already exists in favourites
    const exists = favourite.some((book) => book.id === body.id);

    // Update the favourite list
    if (exists) {
      // Remove book from favourite list
      favourite = favourite.filter((book) => book.id !== body.id);
    } else {
      // Add book to favourite list
      favourite.push({ ...body, favourite: true });
    }

    // Update the record
    await Books.update({ favourite }, { where: { userID: userid } });

    // Call AddtoRecommandation function
    await AddtoRecommandation(body, bookRecord, userid);

    // Fetch updated favourite list
    const updatedFavourite = await Books.findOne({
      where: { userID: userid },
      attributes: ["favourite"],
    });

    res.status(200).json(updatedFavourite);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
    res.status(400).json({ error: err.message });
  }
};


// Mark As Read
const MarkasRead = async (req, res) => {
  try {
    const { userid } = req.params;
    const { body } = req;

    // Fetch or create the book record
    let [bookRecord] = await Books.findOrCreate({
      where: { userID: userid },
      defaults: { userID: userid, markedread: [] },
    });

    // Destructure the record and its marked read array
    let { markedread } = bookRecord;

    // Check if the book already exists in marked read
    const exists = markedread.some((book) => book.id === body.id);

    // Update the marked read list
    if (exists) {
      // Remove book from marked read list
      markedread = markedread.filter((book) => book.id !== body.id);
    } else {
      // Add book to marked read list
      markedread.push({ ...body, readstatus: true });
    }

    // Update the record
    await Books.update({ markedread }, { where: { userID: userid } });

    // Call AddtoRecommandation function
    await AddtoRecommandation(body, bookRecord, userid);

    // Fetch updated marked read list
    const updatedRead = await Books.findOne({
      where: { userID: userid },
      attributes: ["markedread"],
    });

    res.status(200).json(updatedRead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  AllBooks,
  AddbookstoFavourite,
  MyFavourite,
  MarkasRead,
};
