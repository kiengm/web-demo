const searchModel= require("../../models/searchModel")

const searchByProductName= async(req,res,next)=>{
    let name= req.query.name;
   if(name){
    let data1= await searchModel.searchByProductName(name);
    res.render("product",{
        productData:data1.data

    })

   }
   else{
    res.render("product",{
        productData:[]

    })

   }
   
}
const searchUser=async (req,res,next)=>{
    let user_name= req.query.user_name;
    if(user_name){
        let data1= await searchModel.searchUser(user_name)
   res.json({data:data1.data})

    }
    else{
        res.json({data:[]})
    }
   

}
module.exports={
    searchByProductName,
    searchUser
}