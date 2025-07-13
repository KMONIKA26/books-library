const {Router}=require("express")
const userControll = require("../controllers/user.controllers")
const authMiddleware = require("../middleware/auth.middleWare")

const userRouter=Router()

userRouter.post("/register", userControll.registerControllers)
userRouter.post("/login", userControll.loginControllers)
userRouter.get("/logout", userControll.logoutControllers)
userRouter.get("/me", authMiddleware, userControll.userInfoControllers)



module.exports=userRouter