const express=require("express");
const app=express();
const path=require("path")
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"src/views"))
const axios = require('axios');
app.get("/test",(req,res)=>{
   // res.send("hello")
    res.render("test")
})
app.listen(5050)
