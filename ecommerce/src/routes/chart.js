const express= require("express")
const checkRole=require("../app/middleware/checkRole")
const router= express.Router();
const chartController= require("../app/http/controllers/chartcontroller")
router.get("/",checkRole.checkRoleAdmin,chartController.columnChartByCategory)
router.get("/data",checkRole.checkRoleAdmin,chartController.dataChart)
module.exports=router;