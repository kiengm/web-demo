const profileModel= require("../../models/profilesModel")
const acccountModel=require("../../models/acccountModel")
const accountModel=require("../../models/acccountModel")

const getProfileByUserId=async(req,res,next)=>{
    const user_id= req.cookies.iduser;
    //console.log(user_id);
    let data1=await profileModel.getProfilesByIdUser(user_id)
    //console.log(data1.data[0]);
    // res.json({profile:data1.data[0]})
    res.render("profile",data1.data[0]
    )


}
const updateProfile=(req,res,next)=>{
    let user_id= req.cookies.iduser;
    console.log("id user"+user_id)
    let fullname= req.body.fullname;
    console.log(fullname)
    
    let email=req.body.email;
    let phone_number= req.body.phone_number;
   // let password=req.body.password;
    let date_of_birth=req.body.date_of_birth;
    let gender=req.body.gender;
    let update_at= new Date();
    let address=req.body.address;
    
    console.log("add"+address)
    console.log(gender)
    if(email){
        let data1=acccountModel.getAccountByMail(email)
        if(!data1.data[0]){
            acccountModel.updateEmail(email)

        }
        

    }
    
    profileModel.updateProfile(fullname,address,date_of_birth,phone_number,gender,update_at,user_id)
    
    

}
const updateAvatar=async(req,res,next)=>{
    let user_id= req.cookies.iduser;
   
    console.log("id user"+user_id)
    let avatar= req.file.filename;
    console.log(avatar);
    let data1=await profileModel.updateAvatar(avatar,user_id);{
        if(data1.data){
            console.log("ok")
            res.redirect("../profile")
        }
        else{
            console.log("éo ok")
        }
    }


}
const getAvatar=async(req,res,next)=>{
    const user_id= req.cookies.iduser;
   // console.log(user_id)
    if(user_id){
        let data1=await profileModel.getProfilesByIdUser(user_id)
       // console.log(data1.data)
        let avatar1=data1.data[0].avatar;
       
        let role =data1.data[0].user_role;
        
        
        // res.json({profile:data1.data[0]})
        res.json({
            avatar:avatar1,
            role:role,
            user_id:user_id,
        })

    }
    else{
        res.send({avatar:""})
    }
    //console.log(user_id);
   
    


}

module.exports={
    getProfileByUserId,
    updateProfile,
    updateAvatar,
    getAvatar,
}