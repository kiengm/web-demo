const { connect } = require("../../config/db/mySqlConnect");
const connection=require("../../config/db/mySqlConnect");
var getImageByIdProduct=(idproduct)=>{
    let promise= new Promise((resolve,reject)=>{
       try{
        let sql=` select * from images where products_product_id=?`
        connection.query(sql,[idproduct],(err,result)=>{
            if(err) throw err;
            resolve({data:result})
        })

       }catch(err){
        reject(err)
       }
       
    })
    return promise;

}
var addImages=(file_name,product_id)=>{

    let promise= new Promise((resolve,reject)=>{
        try{
            let sql=`insert into images values(?,?,?)`
            connection.query(sql,["",file_name,product_id],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }catch(err){
            reject(err);
        }
    })
    return promise;

}
var editImages=(images_id,file_name)=>{

    let promise= new Promise((resolve,reject)=>{
        try{
            let sql=`update images set file_name=? where image_id=?`
            connection.query(sql,[file_name,images_id],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }catch(err){
            reject(err);
        }
    })
    return promise;

}
var deleteImages= (product_id)=>{
    
    let promise= new Promise((resolve,reject)=>{
        try{
            let sql=`delete from images where products_product_id=?`
            connection.query(sql,[product_id],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }catch(err){
            reject(err);
        }
    })
    return promise;

}
module.exports={
    addImages,
    editImages,
    getImageByIdProduct,
    deleteImages,
}