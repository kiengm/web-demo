const connection= require("../../config/db/mySqlConnect");




const getMessageByRoomId=(room_id)=>{
    var promise= new Promise((resolve,rejects)=>{
        try{
            let sql=`select * from messages inner join users on messages.users_user_id = users.user_id inner join profiles on users.user_id=
            profiles.users_user_id where messages.room_room_id=? order by message_id ASC`;
            connection.query(sql,[room_id],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }catch(err){
            rejects(err)
        }
    })
    return promise;
}
const getRoomByIdUser=(user_id)=>{
    var promise= new Promise((resolve,rejects)=>{
        try{
            let sql=`select * from room where room`;
            connection.query(sql,[id],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }catch(err){
            rejects(err)
        }
    })
    return promise;

}
const getPaticipantByUsserId=(id)=>{
    var promise= new Promise((resolve,rejects)=>{
        try{
            let sql=`select * from paticipants where users_user_id=?`;
            connection.query(sql,[id],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }catch(err){
            rejects(err)
        }
    })
    return promise;

}
var getAllRoomByIdRoom = (idroom) => {
    var promise = new Promise((resolve, reject) => {
        try {
        //    let room = await getRoomByIdUser(iduser);
            let sql1 = `select * from paticipants inner join users on paticipants.users_user_id=users.user_id inner join
                  room on paticipants.room_room_id = room.room_id  where room_id=?`
            connection.query(sql1, [idroom], (err, result1) => {
                if(err) throw err;
                resolve({ data: result1 })
            })
        }
        catch (err) {
            reject(err);
        }
    })
    return promise;
}
const getRoomByIdRoom=(room_id)=>{
    var promise= new Promise((resolve,rejects)=>{
        try{
            let sql=`select * from room where room_id=? `;
            connection.query(sql,[room_id],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }catch(err){
            rejects(err)
        }
    })
    return promise;


}
const createRoom=(room_name)=>{
    var promise= new Promise((resolve,rejects)=>{
        try{
            let sql=`insert into room values(?,?)`;
            connection.query(sql,["",room_name],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }catch(err){
            rejects(err)
        }
    })
    return promise;

}
const getPaticipantsByRoomId=(room_id)=>{
    var promise= new Promise((resolve,rejects)=>{
        try{
            let sql=`select * from paticipants where room_room_id=?`;
            connection.query(sql,[room_id],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }catch(err){
            rejects(err)
        }
    })
    return promise;

}
const insertPaticipant=(user_id,room_id)=>{
    var promise= new Promise((resolve,rejects)=>{
        try{
            let sql=`insert into paticipants values(?,?,?)`;
            connection.query(sql,["",user_id,room_id],(err,result)=>{
                if(err) throw err;
                resolve({data:result})
            })

        }catch(err){
            rejects(err)
        }
    })
    return promise;

}
const storeMessage=(message,send_at,user_id,room_id)=>{
    var promise= new Promise((resolve,rejects)=>{
        try{
            let sql=`insert into messages values(?,?,?,?,?)`;
            connection.query(sql,["",message,send_at,user_id,room_id],(err,result)=>{
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
    getMessageByRoomId,
    getPaticipantByUsserId,
    getRoomByIdRoom,
    createRoom,
    getPaticipantsByRoomId,
    getAllRoomByIdRoom,
    storeMessage,
    insertPaticipant,
}