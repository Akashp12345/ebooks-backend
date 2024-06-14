const { AllBooks } = require("../controller/booksController")

const bookRoute=require("express").Router()

bookRoute.get("/searchbooks",AllBooks)


module.exports=bookRoute
