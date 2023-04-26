const { Socket } = require("socket.io")
const jwt=require("jsonwebtoken")
const chatModel= require("../../models/chatModel")
const chat=(req,res,next)=>{
    let token= req.cookies.token;
    let decode=jwt.verify(token,process.env.SECRETKEY)
    let role=decode.role;
    console.log("role ne"+role);
    let idfriend=req.params.id;
    res.render("chats",{
        idfriend:idfriend,
        role:role,
    })
}

//checkRoom(40)

module.exports={
    chat,
   
}