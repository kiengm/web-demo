const connection=require("../../config/db/mySqlConnect")
const getAccountByMail=(email)=>{
    var promise=new Promise((resolve, reject)=>{
        try{
            let sql=`select * from users where email=?`;
            connection.query(sql,[email],(err,result)=>{
                // if(err){
                //     reject(err)
                // }
                //console.log(result)
                resolve({data:result})
            })

        }
        catch(err){
            reject(err)
            

        }
    })
    return promise;
}
//getAccountByMail("kiengmht@gmail.com")
var creareAccount=(username,email,password,create_at)=>{
    var promise= new Promise((resolve,reject)=>{
        try{
            let sql=`insert into users values(?,?,?,?,?,?,?)`
            connection.query(sql,["",username,email,password,create_at,"","1"],(err,result)=>{
                if(err){
                    reject(err)
                }
                //console.log(result)
                resolve({data:result})
            })

        }catch(err){
            reject(err)

        }
    })
    return promise;
}
const login=(email,password)=>{
    let promise= new Promise((resolve, reject)=>{
        try{
            let sql= `select * from users where email=? and password=?`;
            connection.query(sql,[email, password],(err, result)=>{
                if(err) throw err;
                resolve({data:result})
            })


        }
        catch(err){
            reject(err)

        }
    })
    return promise

}
const updateEmail=(email)=>{
    let promise= new Promise((resolve, reject)=>{
        try{
            let sql= `update users set email=?`;
            connection.query(sql,[email],(err, result)=>{
                if(err) throw err;
                resolve({data:result})
            })


        }
        catch(err){
            reject(err)

        }
    })
    return promise

}
const getRoleAdmin=()=>{
    let promise= new Promise((resolve, reject)=>{
        try{
            let sql= `select * from  users where role >?`;
            connection.query(sql,[0],(err, result)=>{
                if(err) throw err;
                resolve({data:result})
            })


        }
        catch(err){
            reject(err)

        }
    })
    return promise


}
module.exports={
    getAccountByMail,
    creareAccount,
    login,
    updateEmail,
    getRoleAdmin
}