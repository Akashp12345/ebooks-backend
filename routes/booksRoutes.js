const { AllBooks, AddbookstoFavourite, removeFavouriteBook, MyFavourite, MarkasRead } = require("../controller/booksController")

const bookRoute=require("express").Router()

bookRoute.get("/searchbooks/:userid",AllBooks)                       //get all books by search
bookRoute.post("/favourite/:userid",AddbookstoFavourite)             //add and remove from favourite
bookRoute.get("/myfavourite/:userid",MyFavourite)
bookRoute.post("/markasread/:userid",MarkasRead)
module.exports=bookRoute
