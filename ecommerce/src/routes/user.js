
const express=require("express")
const multer=require("multer")
const path=require("path")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../public/dist/img/profile'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

const router=express.Router();
const ordercontroller=require("../app/http/controllers/orderController")
const accountController=require("../app/http/controllers/accountController")
const orderController= require("../app/http/controllers/orderController")
const profileController=require("../app/http/controllers/profileController")
const checkOutController=require("../app/http/controllers/check-outController")
const checkLogin= require("../app/middleware/checkLogin");
router.get("/signup",accountController.signup)
router.post("/signup",accountController.signup1)
router.get("/order",checkLogin.checkLogin,ordercontroller.getAllOrdersByIdUser)
router.post("/order/add",checkLogin.checkLogin,orderController.insertOrder)
router.get("/order/delete/:id",checkLogin.checkLogin,orderController.deleteOrder)
router.get("/profile",checkLogin.checkLogin,profileController.getProfileByUserId)
router.get("/profile/avatar",checkLogin.checkLogin,profileController.getAvatar)

router.post("/profile",checkLogin.checkLogin,profileController.updateProfile)
router.post("/profile/upAvatar",checkLogin.checkLogin,upload.single("avatar"),profileController.updateAvatar)
router.get("/check-out",checkLogin.checkLogin,checkOutController.checkOut)
router.post("/check-out",checkLogin.checkLogin,checkOutController.checkOut1)
module.exports=router;
