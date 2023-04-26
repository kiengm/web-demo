const express=require("express");
const multer=require("multer");
const path=require("path");
const checkRole=require("../app/middleware/checkRole")
const router=express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../public/dist/img/product'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

const productsController=require("../app/http/controllers/productsController");
router.get("/add",checkRole.checkRoleAdmin,productsController.addProduct)
router.post("/add",upload.any(),checkRole.checkRoleAdmin,productsController.addProduct1)
router.get("/edit/:id",checkRole.checkRoleAdmin,productsController.edit)
router.post("/edit/:id",checkRole.checkRoleAdmin,upload.any(),productsController.edit1)
router.get("/detail/:id",productsController.detail)
router.get("/delete/:id",checkRole.checkRoleAdmin,productsController.deleteProduct)
router.get("/tablelist",checkRole.checkRoleAdmin,productsController.getListProduct)
router.get("/page/:page",productsController.getProduct)

module.exports=router;