const jwt=require("jsonwebtoken");
const acountModel= require("../models/acccountModel");

const checkRoleAdmin=(req,res,next)=>{
    let token= req.cookies.token;
    console.log(token)
    let decode=jwt.verify(token,process.env.SECRETKEY);
    console.log(decode)
    if(decode){
        let role=decode.role;
        console.log(decode.role)
        if(role>1){
            console.log("dachay vào pha quyen")
            next();
        }
        else{
            res.send("bạn không đủ quyền")
            console.log("khong du quyen")
        }
    }
    else{
        res.send("phiên đăng nhập không hợp lệ ")
    }



}
module.exports={
    checkRoleAdmin,
}