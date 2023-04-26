const connection=require("../../config/db/mySqlConnect")
const sumByCategory=(category_id)=>{
    let promise= new Promise((resolve, reject)=>{
        try{
            let sql=`select sum(products_has_orders.quantity) as total from  products_has_orders inner join products on products.product_id= products_has_orders.products_product_id INNER JOIN products_has_category on products.product_id=products_has_category.products_product_id WHERE products_has_category.category_category_id=? `
            connection.query(sql,[category_id],(err,result)=>{
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
module.exports={
    sumByCategory,
}