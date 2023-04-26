const { resolve } = require("path")
const connection= require("../../config/db/mySqlConnect")
const { rejects } = require("assert")
const searchByCategory=(category_name)=>{
    var promise= new Promise((resolve,rejects)=>{
        try{
            let sql=`select * from products inner join products_has_category on products.products_id=
            products_has_category.products_product_id inner join category on products_has_category.category_category_id=
            category.category_id where category.name like '%?%'`;
            connection.query(sql,[category_name],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }catch(err){
            rejects(err)
        }
    })
    return promise;
}
const searchByProductName=(products_Name)=>{
    var promise= new Promise((resolve,rejects)=>{
        try{
            let sql=`select * from products where name like ?`;
            connection.query(sql,[`%${products_Name}%`],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }catch(err){
            rejects(err)
        }
    })
    return promise;
}
const searchUser=(name)=>{
    var promise= new Promise((resolve,rejects)=>{
        try{
            let sql=`select * from users where user_name like ?`;
            connection.query(sql,[`%${name}%`],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }catch(err){
            rejects(err)
        }
    })
    return promise;

}




module.exports={
    searchByCategory,
    searchByProductName,
    searchUser,
}