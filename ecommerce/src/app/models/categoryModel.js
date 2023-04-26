const { resolve } = require("path")
const connecttion=require("../../config/db/mySqlConnect")
var getAllCategory=()=>{
    let promise= new Promise((resolve,reject)=>{
        try{
            let sql=`select * from category`
            connecttion.query(sql,(err,result)=>{
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

var addCategory=(name)=>{
    let promise= new Promise((resolve,reject)=>{
        try{
            let sql=`insert into category values(?,?)`
            connecttion.query(sql,["",name],(err,result)=>{
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
var deleteCategory=(category_id)=>{
    let promise= new Promsise((resolve,reject)=>{
        try{
            let sql=`delete from category where category_id=?`;
            connecttion.query(sql,[category_id],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }
        catch(err){
            reject(err);
        }
    })
    return promise;
}
var editCategory=(name)=>{
    let promise= new Promsise((resolve,reject)=>{
        try{
            let sql=`update category set name=?`;
            connecttion.query(sql,[name],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }
        catch(err){
            reject(err);
        }
    })
    return promise;

}
var getCategoryById=(category_id)=>{
    let promise= new Promsise((resolve,reject)=>{
        try{
            let sql=`select * from category where category_id=?`;
            connecttion.query(sql,[category_id],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }
        catch(err){
            reject(err);
        }
    })
    return promise;

}
module.exports={
    addCategory,
    deleteCategory,
    editCategory,
    getCategoryById,
    getAllCategory,
}