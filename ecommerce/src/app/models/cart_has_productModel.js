const connection=require("../../config/db/mySqlConnect")
const productModel=require("../models/productsModel")
var add=(product_id,category_id)=>{
    let promise= new Promise((resolve, reject)=>{
        try{
            let sql=`insert into products_has_category values (?,?)`
            connection.query(sql,[product_id,category_id],(err,result)=>{
                if(err) throw err;
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
    add,
}