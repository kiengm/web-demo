const { urlencoded } = require("body-parser");
const express=require("express")
const router=express.Router();
const accountController=require("../app/http/controllers/accountController")
router.get("/",accountController.login)
router.post("/",accountController.login1)
module.exports=router;