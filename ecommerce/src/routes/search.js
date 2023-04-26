const express= require("express");
const router=express.Router();
const searchController=require("../app/http/controllers/searchController");
const { route } = require("./login");
router.get("/",searchController.searchByProductName)
router.get("/user",searchController.searchUser)

module.exports=router;