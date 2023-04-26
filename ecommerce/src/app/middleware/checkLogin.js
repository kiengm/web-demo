const jwt=require("jsonwebtoken")
const checkLogin=(req,res,next)=>{
    let token=req.cookies.token;
    
    try{
        let decode = jwt.verify(token,process.env.SECRETKEY)
         if(decode){
            next();
         }
        

    }catch(err){
        res.status(401).send("not found")

    }



}
module.exports={
    checkLogin,
}