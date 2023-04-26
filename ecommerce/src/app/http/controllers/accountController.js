const accountModel=require("../../models/acccountModel")
const jwt=require("jsonwebtoken")
const profileModel= require("../../models/profilesModel")
const crypto=require("crypto-js")
const validator= require("validator")
var signup=(req,res,next)=>{
    res.render("signup")
}
var signup1=async(req,res,next)=>{
    const regex = /^[a-zA-Z0-9]+$/
    var username=req.body.Username;
    if(!regex.test(username)){
        return res.status(400).json({ message: 'Invalid username not contain spcials character' });
    }

    
    var email=req.body.Email;
    if(!validator.isEmail(email)){
        return res.status(400).json({ message: 'email required' });

    }
    var password=req.body.Password;
    if(validator.isEmpty(password)){
        return res.status(400).json({ message: 'password required' });
    }
    var confirmPassword=req.body.confirmPassword;

    if(validator.isEmpty(confirmPassword)){
        return res.status(400).json({ message: 'confirmPassword required' });
    }
    var create_at= new Date();
  //  console.log(create_at)
    if(password!=confirmPassword){
        res.json({message:"password does not match"})
    }
    else{
        var data1= await accountModel.getAccountByMail(email)
           
        if(data1.data.length){
            res.json({message:"this name has existed already"})

        }
        else{
            let psw=crypto.HmacSHA256(password,process.env.SECRETKEY).toString();
          //  console.log(psw.toString());
            let dataCreate=await accountModel.creareAccount(username,email,psw,create_at)
            console.log(dataCreate)
         //   console.log("data inss"+dataCreate.insertId)
            if(dataCreate){
                await profileModel.insertProfile(dataCreate.data.insertId);
                
                res.json({message:"create account succcessfully"})
            }
            else{
                res.json({
                    message:"create account failure"
                })
            }

        }
    }

}
var login=(req,res,next)=>{
    res.render("login")
    
}
var login1=async (req,res,next)=>{
    let email=req.body.Email;
    if(!validator.isEmail(email)){
        return res.status(400).json({ message: 'email required' });

    }
    let password=req.body.Password;
    if(validator.isEmpty(password)){
        return res.status(400).json({ message: 'password required' });

    }
    if(email==""||password==""){
        res.json({
            message:"vui lòng nhập đủ trường"
        })
    }
    else{
        let psw=crypto.HmacSHA256(password,process.env.SECRETKEY).toString();
        let data1=await accountModel.login(email,psw);
        if(data1.data.length>0){
            let token=jwt.sign({token:data1.data[0].user_id,role:data1.data[0].user_role},process.env.SECRETKEY) 
            
            res.cookie("token",token)
            res.cookie("iduser",data1.data[0].user_id)          
            res.redirect("/products/page/1")
        }
        else{
            res.json({
                message:"thong tin tk mk k chinh xac"
            })
        }
    }

}
module.exports={
    signup,
    signup1,
    login,
    login1
}