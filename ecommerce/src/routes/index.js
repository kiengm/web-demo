const express=require("express");
const app=express();
const loginRouter=require("./login");
const userRouter=require("./user");
const adminRouter= require("./admin")
const productsRouter=require("./products");
const searchRouter= require("./search")
const chartRouter=require("./chart")
const chatRouter= require("./chat")
var routes=(app)=>{
    app.use("/login",loginRouter);
    app.use("/user",userRouter);
    app.use("/admin",adminRouter)
    app.use("/products",productsRouter);
    app.use("/search",searchRouter)
    app.use("/chart",chartRouter)
    app.use("/chat",chatRouter)
    app.use((req,res,next)=>{
        res.render("404",{
            status:404,
            message:"not found"
        })
    })
    app.use((err,req,res,next)=>{
        if(next(err)){
            res.render("500")
        }
    })

    
}
module.exports=routes