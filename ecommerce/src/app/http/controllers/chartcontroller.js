const chartModel= require("../..//models/chartModel")
const categoryModel= require("../../models/categoryModel")
let columnChartByCategory=async(req,res,next)=>{
   
   res.render("morris-chart")
    
}
let dataChart=async(req,res,next)=>{
    dataChart=[];
    let dataCategory= await categoryModel.getAllCategory();
    if(dataCategory.data.length>0){
        for(let i=0;i<dataCategory.data.length;i++){
            var name=dataCategory.data[i].name;
            var amount= await chartModel.sumByCategory(dataCategory.data[i].category_id)
           // amount1= amount.data[0].total;
            //console.log(amount1)

            dataChart.push({
               name:name,
               amount:amount.data[0].total,


                
            })


        }
    }
    console.log(dataChart)
    console.log(typeof(dataChart))
   res.json({barchart:dataChart})
   // let dataChart= chartModel.sumByCategory()
   
   
    
}

module.exports={
    columnChartByCategory,
    dataChart
}