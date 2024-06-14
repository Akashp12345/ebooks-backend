const { registration, signin } = require("../controller/userController")

const userRoute=require("express").Router()

userRoute.post("/register",registration)
userRoute.post("/signin",signin)


module.exports=userRoute
