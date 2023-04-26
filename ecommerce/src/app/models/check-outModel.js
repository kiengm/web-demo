const connection = require("../../config/db/mySqlConnect")
const checkOut=()=>{
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
module.exports={
    checkOut,
}