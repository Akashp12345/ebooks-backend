const { AllBooks, AddbookstoFavourite, removeFavouriteBook } = require("../controller/booksController")

const bookRoute=require("express").Router()

bookRoute.get("/searchbooks/:userid",AllBooks)                       //get all books by search
bookRoute.post("/favourite/:userid",AddbookstoFavourite)             //add to favourite
bookRoute.delete("/removefromfav/:userid",removeFavouriteBook)       //remove from favourite


module.exports=bookRoute
