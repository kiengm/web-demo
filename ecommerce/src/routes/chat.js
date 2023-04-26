const express= require("express");
const router= express.Router();
const chatController= require("../app/http/controllers/chatController")
router.get("/:id",chatController.chat)

module.exports=router;