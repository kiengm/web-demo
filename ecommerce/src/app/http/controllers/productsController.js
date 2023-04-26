const productModel = require("../../models/productsModel")
const categoryModel = require("../../models/categoryModel")
const imageModel = require("../../models/imagesModel")

const validator= require("validator")

var getProduct = async (req, res, next) => {
    let page = req.params.page;
    console.log("page ne" + page)
    let size = 25;

    var start = (page - 1) * size;
    console.log(start)
    var productData = await productModel.getProduct(start, size);
    res.render("product", {
        productData: productData.data,

    })
}
var getListProduct = async (req, res, next) => {

    var productData = await productModel.getListproduct();
  //  console.log(productData.data)
    res.render("product-list", {
        listData: productData.data,

    })
}
var detail = async (req, res, next) => {
    var idproduct = req.params.id;
    console.log(idproduct)
    let data1 = await productModel.getProductById(idproduct);
    let dataImage = await imageModel.getImageByIdProduct(idproduct)
    console.log(dataImage.data)
   // console.log(data1.data)
    res.render("product-detail", {
        thumbnail: data1.data[0].thumbnails,
        detailData: data1.data,
        imageData: dataImage.data,
    })


}
var addProduct = async (req, res, next) => {
    var categoryData = await categoryModel.getAllCategory();
    res.render("add-products", {
        categoryData: categoryData.data,
        edit: 0,

    })
}
var addProduct1 = async (req, res, next) => {
    let productName = req.body.productName;
    if(validator.isEmpty(productName)){
        return res.send("productName required")
    }
    
    let thumbnail = req.files[0].filename;
    if(validator.isEmpty(thumbnail)){
       return res.send("thumbnail required")
    }
    let price = req.body.price;
    let content = req.body.description;
    let create_at = new Date();
    let category_id = req.body.category_id;
    let dataPro = await productModel.addProduct(productName, thumbnail, price, content, create_at);
    //console.log(dataPro)
    if (dataPro.data) {
        if(category_id){
            await productModel.addProductHasCategory(dataPro.data.insertId, category_id)

        }
       
        //  let data1 = await productModel.addProductHasCategory(productName, thumnail, price, content, create_at, category_id, file)
        //  console.log(data1.data)
        console.log("length ne"+req.files.length)
        if (req.files.length > 1) {
            for (let i = 1; i < req.files.length; i++) {
                var fileName = req.files[i].filename;
                console.log("hello" + fileName)
                var dataImg = await imageModel.addImages(fileName, dataPro.data.insertId)
                console.log(dataImg.data)

            }
        }
    }



    else {
        res.json({ message: "thêm thất bại" })
    }

    //  });


}
var edit = async (req, res, next) => {
    let product_id = req.params.id;
    console.log(product_id)
    var categoryData = await categoryModel.getAllCategory();
    var productData = await productModel.getProductById(product_id);
    console.log(productData);
    res.render("add-products", {
        categoryData: categoryData.data,
        productData: productData.data[0],

        edit: 1,

    })
}
var edit1 = async (req, res, next) => {
    let product_id = req.params.id;
    console.log(product_id);
    let productName = req.body.productName;
    let thumnail = req.files[0].filename;
    let status= req.body.radio;
    console.log("status nè"+status)
    let price = req.body.price;
    let content = req.body.description;
    let update_at = new Date();
    let category_id = req.body.category_id;
    console.log("category"+category_id)
    var data1 = await productModel.editProduct(product_id, productName, thumnail, price, content,status, update_at, category_id);
    if (req.files.length > 1) {
        let dataImg=await imageModel.getImageByIdProduct(product_id);
        console.log(dataImg.data)
        for(let i=0;i<dataImg.data.length;i++){
            for (let j = 1; j < req.files.length; j++) {
                var fileName = req.files[j].filename;
                console.log("hello" + fileName)
                let dataupdata=await imageModel.editImages(fileName, dataImg.data[i].product_id)
                console.log(dataupdata)
                if(dataupdata.data){
                    console.log("thêm thành công")

                }
                else {
                    console.log("thêm that bai")
                }
                
    
            }

        }
        
    }
   
    
    



}
const deleteProduct=async(req,res,next)=>{
    let product_id=req.params.id;
   let data1= await productModel.updateStatus(0,product_id)
   console.log(data1.data)
    
}
var productOrder = async (req, res, next) => {
    let data1 = await productModel.productOrder();
    console.log(data1.data)
    res.render("product-orders", {
        productOrder: data1.data,
    })

}


module.exports = {
    getProduct,
    getListProduct,
    addProduct,
    addProduct1,
    deleteProduct,
    edit,
    edit1,
    detail,
    productOrder,
}