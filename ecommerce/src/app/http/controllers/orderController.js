const orderModel = require("../../models/orderModel")
var getAllOrdersByIdUser = async (req, res, next) => {
    var iduser = req.cookies.iduser;
    let data1 = await orderModel.getAllOrdersByIdUser(iduser);
    // console.log(data1.data)
    res.render("product-cart", {
        ordersData: data1.data
    })
}
var getAllProductByState = async (req, res, next) => {

    var state = req.query.state;
    if (state) {
        let data1 = await orderModel.getAllProductByState(state);
        res.json({data:data1.data})
        // console.log(data1.data)
        
        
    }
    else {
        let data1 = await orderModel.getAllProductByState(0);
         console.log(data1.data)
        res.render("product-orders", {
            data: data1.data,
        })
    }




}
var insertOrder = async (req, res, next) => {
    let iduser = req.cookies.iduser;
    let product_id = req.body.product_id;
    let quantity = req.body.quantity;
    // console.log(req.body.quantity)
    //console.log("product ne"+product_id+"heko")

    // console.log(iduser);
    var create_at = new Date();
    var data1 = await orderModel.insertOrder(create_at, iduser)
    if (data1.data) {

        var data2 = await orderModel.insertProducts_has_orders(product_id, data1.data.insertId, quantity)
        // console.log("data2 đây"+data2)
        // console.log(data2.data)
        if (data2) {
            res.redirect("../../user/order")
        }
    }
    //console.log(data1.data.insertId)
}
var deleteOrder = async (req, res, next) => {
    var product_id = req.params.id;
    console.log("conso" + product_id)
    let data1 = await orderModel.deleteProduct_has_order(product_id)
    if (data1.data) {
        data2 = await orderModel.deleteOrder(product_id)
        console.log(data2)
        if (data2.data) {
            res.redirect("../../../user/order")
        }
    }

}
var orderUp=async(req,res,next)=>{
    var id= req.query.order_id;
   // console.log("user id"+id)
    var updated_at= new Date();
    var data1=await orderModel.editOrder(2,updated_at,id)
    console.log(data1)
    if(data1.data){
        console.log("thanh cong")

    }
    



}

module.exports = {
    getAllOrdersByIdUser,
    insertOrder,
    deleteOrder,
    getAllProductByState,
    orderUp,

}