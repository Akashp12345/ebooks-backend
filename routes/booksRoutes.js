const { SearchBooks } = require("../controller/booksController")

const bookRoute=require("express").Router()

bookRoute.get("/search",SearchBooks)


module.exports=bookRoute
