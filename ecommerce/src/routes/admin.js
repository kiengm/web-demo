const express= require("express");
const router= express.Router();
const checkRole=require("../app/middleware/checkRole")
const productController= require("../app/http/controllers/productsController");
const orderController= require("../app/http/controllers/orderController")
router.get("/productOrder",checkRole.checkRoleAdmin,orderController.getAllProductByState)
router.get("/productOrder/update",checkRole.checkRoleAdmin,orderController.orderUp)
module.exports=router;