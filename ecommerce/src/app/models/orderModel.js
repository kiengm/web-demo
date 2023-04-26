const { resolve } = require("path")
const connection = require("../../config/db/mySqlConnect")
const { connect } = require("../../config/db/mySqlConnect")
var connnection= require("../../config/db/mySqlConnect")
var getAllOrdersByIdUser=(iduser)=>{
    let promise= new Promise((resovle,reject)=>{
        try{
            let sql=`select *from orders inner join products_has_orders on orders.order_id=
            products_has_orders.orders_order_id  inner join products on products.product_id=
            products_has_orders.products_product_id where orders.users_user_id=?`
            connection.query(sql,[iduser],(err,result)=>{
                if(err) throw err;
                resovle({data:result})
            })
        }
        catch(err){
            reject(err);
        } 
    })
    return promise;
}
var getAllProductByState=(state)=>{
    let promise= new Promise((resovle,reject)=>{
        try{
            let sql=`select * from users inner join orders on users.user_id = orders.users_user_id inner join products_has_orders on orders.order_id=
            products_has_orders.orders_order_id  inner join products on products.product_id=
            products_has_orders.products_product_id WHERE orders.state=?`
            connection.query(sql,[state],(err,result)=>{
                if(err) throw err;
                resovle({data:result})
            })
        }
        catch(err){
            reject(err);
        } 
    })
    return promise;



}
var getAllProductByStateAndUser=(state,user_id)=>{
    let promise= new Promise((resovle,reject)=>{
        try{
            let sql=`select * from users inner join orders on users.user_id = orders.users_user_id inner join products_has_orders on orders.order_id=
            products_has_orders.orders_order_id  inner join products on products.product_id=
            products_has_orders.products_product_id WHERE orders.state=? and orders.users_user_id=?`
            connection.query(sql,[state,user_id],(err,result)=>{
                if(err) throw err;
                resovle({data:result})
            })
        }
        catch(err){
            reject(err);
        } 
    })
    return promise;



}
var insertOrder=(create_at,user_id)=>{
    let promise= new Promise((resolve, reject)=>{
        try{
            let sql=`insert into orders values(?,?,?,?,?)`
            connnection.query(sql,["",0,create_at,"",user_id],(err,result)=>{
                console.log(result)
               // console.log(feild)
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
var editOrder=(state,update_at,user_id) =>{

    let promise= new Promise((resovle,reject)=>{
       try{
        let sql=`update orders set state=?, updated_at=? where order_id=? `
        connection.query(sql,[state,update_at,user_id],(err, result)=>{
            if(err) throw err;
            resovle({data:result})
        })
       }catch(err){
        reject(err)
       }
    })
    return promise;
}
var deleteOrder=(order_id)=>{
    let promise= new Promise((resovle,reject)=>{
        try{
         let sql=`delete from orders where order_id=? `
         connection.query(sql,[order_id],(err, result)=>{
            if(err) throw err;
             resovle({data:result})
         })
        }catch(err){
         reject(err)
        }
     })
     return promise;

}
const insertProducts_has_orders=(product_id,order_id,quantity)=>{
    let promise= new Promise((resolve, reject)=>{
        try{
            let sql=`insert into products_has_orders values(?,?,?)`
            connection.query(sql,[product_id,order_id,quantity],(err,result)=>{
           //     console.log("hello"+result)
                if(err) throw err;
                resolve({data:result});
            })

        }catch(err){
            reject(err);
        }
    })
    return promise;
}
const editProduct_has_category=(quantity)=>{
    let promise= new Promise((resolve,reject)=>{
        try{
            let sql=`update products_has_orders set quantity=?`
            connection.query(sql,[quantity],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }catch(err){
            reject(err);
        }
    })
    return promise;

}
const deleteProduct_has_order=(order_id)=>{
    let promise= new Promise((resolve,reject)=>{
        try{
            let sql=` delete from products_has_orders where orders_order_id=?`
            connection.query(sql,[order_id],(err,result)=>{
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
    insertOrder,
    editOrder,
    deleteOrder,
    getAllOrdersByIdUser,
    getAllProductByState,
    insertProducts_has_orders,
    editProduct_has_category,
    deleteProduct_has_order,
    getAllProductByStateAndUser
}