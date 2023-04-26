const { Socket } = require("socket.io")
const chatModel = require("../app/models/chatModel")
const checkRoom = async (idfriend) => {
  console.log("chay vao check room");
  let paticipantData = await chatModel.getPaticipantByUsserId(idfriend);
  if (paticipantData.data.length > 0) {
    for (let i = 0; i < paticipantData.data.length; i++) {
      let paticipants = await chatModel.getAllRoomByIdRoom(paticipantData.data[i].room_room_id);
     console.log(paticipantData.data)
      if (paticipants.data.length > 1) {
        console.log("room này"+paticipants.data[0].room_name)
        return { room_name: paticipants.data[0].room_name, room_id: paticipants.data[0].room_id }
      }
    }

  }
  else {
    console.log("-1")
    return -1;
  }
}
const createRoom=async(user_id,idfriend,room_name)=>{
  let createRoomData= await chatModel.createRoom(room_name);
 // console.log(createRoomData)
  
 // console.log("id room ne"+room_id)
  if(createRoomData.data){
    let room_id=createRoomData.data.insertId;
  //  console.log("iduser"+user_id);
  //  console.log("id friend"+idfriend)
   await  chatModel.insertPaticipant(user_id,room_id)
   await chatModel.insertPaticipant(idfriend,room_id)
  }
  
}
const storeMessage=async(message,user_id,room_id)=>{
  let send_at= new Date();
  if(message){
    let data1=await chatModel.storeMessage(message,send_at,user_id,room_id)
   // console.log(data1.data)
  }
}
const getMessage=async (room_id)=>{
  let data1=await chatModel.getMessageByRoomId(room_id)
 // console.log(data1.data)
  if(data1.data.length>0){
    return data1.data;
  }
  else{
    return []
  }
}
module.exports = {
  checkRoom,
  storeMessage,
  getMessage,
  createRoom,
}