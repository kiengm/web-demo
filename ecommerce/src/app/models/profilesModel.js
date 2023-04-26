const { rejects } = require("assert")
const { resolve } = require("path")
const connection= require("../../config/db/mySqlConnect")

const getAllProfile=()=>{
    let promise= new Promise((resolve,rejects)=>{
        try{
            let sql=`select * from profiles `
            connection.query(sql,(err,result)=>{
                if(err) throw new Error("opp , lỗi ")
                resolve({data:result})
            })

        }
        catch(err){
            rejects(err);
        }
    })
    return promise;
}
const getProfilesByIdUser=(user_id)=>{
    let promise= new Promise((resolve,rejects)=>{
        try{
            let sql=`select * from profiles inner join users on profiles.users_user_id=users.user_id where users_user_id=? `
            connection.query(sql,[user_id],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }
        catch(err){
            rejects(err);
        }
    })
    return promise;


}
const insertProfile=(user_id)=>{
    let promise= new Promise((resolve,rejects)=>{
        try{
            let sql=`insert into profiles values(?,?,?,?,?,?,?,?,?,?) `
            connection.query(sql,["","","no_avatar","","","","","","",user_id],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }
        catch(err){
            rejects(err);
        }
    })
    return promise;

}
const updateProfile=(fullname,address,date_of_birth,phone_number,job,gender,update_at,user_id)=>{
    let promise= new Promise((resolve,rejects)=>{
        try{
            let sql=`update profiles set fullname=?,address=?,phone_number=?,gender=?,date_of_birth=?,updateted_at=? where users_user_id=? `
            connection.query(sql,[fullname,address,date_of_birth,phone_number,job,gender,update_at,user_id],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }
        catch(err){
            rejects(err);
        }
    })
    return promise;

}
const updateAvatar=(avatar,user_id)=>{
    let promise= new Promise((resolve,rejects)=>{
        try{
            let sql=`update profiles set avatar=? where users_user_id=? `
            connection.query(sql,[avatar,user_id],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }
        catch(err){
            rejects(err);
        }
    })
    return promise;

}

module.exports={
    getAllProfile,
    getProfilesByIdUser,
    insertProfile,
    updateProfile,
    updateAvatar,

}