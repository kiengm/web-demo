const orderModel= require("../../models/orderModel")
const crypto=require("crypto-js")
const accountModel= require("../../models/acccountModel")
const checkOut=async(req,res,next)=>{
    let user_id=req.cookies.iduser;
    if(!user_id){
        res.render("product-checkout")
    }
    else{
        let data1=await orderModel.getAllProductByStateAndUser(2,user_id)
        res.render("product-checkout",{
            productOrder:data1.data,

        })

    }
    
}
const checkOut1=async(req,res,next)=>{
    let order_id=req.body.order_id;
    let email= req.body.email;
    let password=req.body.password;
    let psw=crypto.HmacSHA256(password,process.env.SECRETKEY).toString();
    let update_at=new Date();
    let dataLogin=await accountModel.login(email,psw);
   // console.log(dataLogin)
    if(dataLogin.data.length<=0){
        return res.json({mess:" vui lòng kiểm tra lại tài khoản"})
    }
    else{
        if(order_id.length>0){
            for(let i =0;i<order_id.length;i++){
              let data1=  await orderModel.editOrder(3,update_at,order_id[i])
              console.log(data1.data)
            }
    
        }
        else{
            return res.json({mess:"bạn chưa có sản phẩm nào"})
        }

    }
    
    


}
module.exports={
    checkOut,
    checkOut1,
}