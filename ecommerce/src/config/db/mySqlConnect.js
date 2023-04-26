const mysql=require("mysql");
var connection=mysql.createConnection({
    localhost:"127.0.0.1",
        port:"3306",
        user:"root",
        password:"",
        database:"ecommerce"
    
})
connection.connect((err)=>{
    if(err){
        console.log("connect database failure ")
    }
    else{
        console.log("connect database successfully")
    }
})
module.exports=connection;
