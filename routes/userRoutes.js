const { registration } = require("../controller/userController")

const userRoute=require("express").Router()

userRoute.post("/register",registration)

module.exports=userRoute
