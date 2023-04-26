const express=require("express")

const app=express();
const path=require("path")
const cookie=require("cookie")
const cookieParser=require("cookie-parser")
const multer= require("multer")
const validator=require("validator")
//const dataTable=require("datatables.net-dt")
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname,'public/dist/img/product'))
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null,uniqueSuffix + file.originalname)
//     }
//   })
  
//   const upload = multer({ storage: storage })
// //const upload = multer({ dest: path.join(__dirname,'public/dist/img/product') })
// app.use(upload.any());
//app.use(upload.array("thumbnail",3));

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     }
//   });
  
//   // Create the Multer middleware function with maxCount option
//   const upload = multer({ 
//     storage: storage,
//     limits: { 
//       fileSize: 1024 * 1024 * 10, // 10 MB limit
//       files: 5 // Maximum 5 files per request
//     } 
//   });
  
  // Register the Multer middleware using app.use()
// app.use(upload.array('files', 5));
app.use(cookieParser());
const bodyParser=require("body-parser")
app.use(express.urlencoded({ extended: false }))
//app.use(express.json())
const routes=require("../src/routes")
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
require("dotenv").config();
const serverEvent=require("./socket.io/serverEvent")
routes(app);

//chat server
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on("connection", (socket) => {
  
  console.log(socket.id)
 
  serverEvent.serverEventListen(socket,io);
 
  
});
    server.listen(3000, () => {
  console.log(`Server started: http://localhost:3000`)
})

