const { resolve } = require("path");
const connection= require("../../config/db/mySqlConnect")
const product_has_product=require("../models/cart_has_productModel")
var getProduct=(start,size)=>{
    let promise=new Promise((resolve,rejects)=>{
        try{
            let sql=`select * from products where status = 1 limit ?,?`;
            connection.query(sql,[start,size],(err,result)=>{
                if(err) throw err
                resolve({data:result})
            })

        }
        catch(err){
            rejects(err);
        }
    })
    return promise;
}
var getListproduct=()=>{
    let promise=new Promise((resolve,rejects)=>{
        try{
            let sql=`select * from products `;
            connection.query(sql,(err,result)=>{
                if(err) throw err
                resolve({data:result})
            })

        }
        catch(err){
            rejects(err);
        }
    })
    return promise;

}
var getProductById=(product_id)=>{
    let promise=new Promise((resolve,rejects)=>{
        try{
            let sql=`select * from products where product_id=?`;
            connection.query(sql,[product_id],(err,result)=>{
                if(err) throw err
                resolve({data:result})
            })

        }
        catch(err){
            rejects(err);
        }
    })
    return promise;
}
var addProduct=(name, thumbnail,price,content,create_at)=>{
    product_id="";
    let promise=new Promise((resolve,rejects)=>{
        try{
            let sql=`insert into products values(?,?,?,?,?,?,?,?)`;
            connection.query(sql,["",name,thumbnail,price,content,1,create_at,""],(err,result,filed)=>{
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
//addProduct=("kien", "logo1",12000,"xin chao","20:14")
var editProduct=(product_id,name, thumbnail,price,content,status,update_at)=>{
   
   
   
    let promise=new Promise((resolve,rejects)=>{
        try{
            let sql=`update products set name=?,thumbnails=?,price=?,contents=?,status=?,updated_at=? where product_id= ?`;
            connection.query(sql,[name,thumbnail,price,content,status,update_at,product_id],(err,result)=>{
                if(err) throw err
                resolve({data:result})
            })

        }
        catch(err){
            rejects(err);
        }
    })
    return promise;
    
}
var deleteProduct=async (product_id)=>{
   
    let promise=new Promise((resolve,rejects)=>{
        try{
            let sql=`delete from products where product_id=?`;
            connection.query(sql,[product_id],(err,result)=>{
                if(err) throw err
                resolve({data:result})
            })

        }
        catch(err){
            rejects(err);
        }
    })
    return promise;


}
var addProductHasCategory=async(product_id,category_id)=>{
    
    let promise= new Promise((resolve,reject)=>{
        try{
            category_id.forEach(element => {
                let sql=`insert into products_has_category values(?,?)`
            connection.query(sql,[product_id,element],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

                
            });
            

        }catch(err){
            reject(err)
        }
    })
    return promise;
}
var deleteProductHasCategory=(product_id)=>{
    let promise= new Promise((resolve,reject)=>{
        try{
            let sql= `delete from products_has_category where products_product_id=?`
            connection.query(sql,[product_id],(err,result)=>{
                if (err) throw err;
                resolve({data:result})
            })
        }
        catch(err){
            reject(err);
        }
    })
    return promise;
}
editProductHasCategory=(category_id,product_id)=>{
    let promise= new Promise((resolve,reject)=>{
        try{
            category_id.forEach(element => {
                let sql=`update products_has_category set category_category_id =? where products_product_id=?`
            connection.query(sql,[element,product_id],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })               
            });
            

        }catch(err){
            reject(err)
        }
    })
    return promise;

}
var productOrder=(req,res,next)=>{
    let promise= new Promise((resolve,reject)=>{
        try{
            sql=`select * from users inner join orders on users.user_id=orders.users_user_id inner join products_has_orders on orders.order_id=
            products_has_orders.orders_order_id  inner join products on products.product_id=
            products_has_orders.products_product_id `
            connection.query(sql,(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })
        }catch(err){
            reject(err)

        }
    })
    return promise;

}
const updateStatus=(status,product_id)=>{
    let promise=new Promise((resolve,rejects)=>{
        try{
            let sql=`update products set status = ? where product_id= ?`;
            connection.query(sql,[status,product_id],(err,result)=>{
                if(err) throw err
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
    getProduct,
    getListproduct,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct,
    addProductHasCategory,
    deleteProductHasCategory,
    productOrder,
    updateStatus,

}