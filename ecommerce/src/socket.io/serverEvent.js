const chatModel= require("../app/models/chatModel")
const cookie=require("cookie")
const chatController=require("../socket.io/socket.io.controller")

const serverEventListen=(socket,io)=>{
    
  
 // let  iduser=cookies.iduser
//  console.log("user_id"+iduser)
       socket.on("check-room",async(idfriend)=>{     
       let roomData = await chatController.checkRoom(idfriend);
       var cookief = socket.handshake.headers.cookie; 
       console.log(cookief)
       var cookies = cookie.parse(socket.handshake.headers.cookie)
       let iduser=cookies.iduser
       if(roomData==-1){
        console.log("chưa room")
        let room=Math.random();
        chatController.createRoom(iduser,idfriend,room)
        //chatModel.createRoom(room)
        socket.join(room);
        socket.emit("send-room",{room:room,iduser:iduser})

       }
       else{
       // console.log(roomData)
        socket.join(roomData.room_name)
     //   console.log(socket.adapter.rooms);
       // console.log(roomData)
        socket.emit("send-room",{room:roomData.room_name,iduser:iduser,room_id:roomData.room_id})
        let data=await chatController.getMessage(roomData.room_id)
      // console.log(data)
        socket.emit("load-data-from-database",{data:data,user_id:iduser})

       }


    })
    socket.on("send-message",(data)=>{
        console.log(data)
       chatController.storeMessage(data.mess,data.iduser,data.room_id)
        socket.to(data.room).emit("send-mess-to-friend",data)
    })

}
module.exports={
    serverEventListen,
}