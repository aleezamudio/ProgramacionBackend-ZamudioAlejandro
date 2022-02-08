const fs = require('fs');

/*
Schema
    user={
        title:String,
        price:Number,
        thumbmail:String,
        Id:Number
    }
*/

const pathToUsers='./files/Users.json'
class Contenedor{
    save= async (user)=>{
    //Validaciones
    if(!user.title||!user.price||!user.thumbmail) return {status:"error", error:"Faltan datos"}
        try{
            if(fs.existsSync(pathToUsers)){
                let data  = await fs.promises.readFile(pathToUsers, 'utf-8');
                let users = JSON.parse(data);
                let id    = users[users.length-1].id+1;
                user.id   = id;
                users.push(user);
                await fs.promises.writeFile(pathToUsers,JSON.stringify(users,null,2))
                return {status:"succes", message:"User created"}
            }else{//el archivo no existe
                user.id= 1
                await fs.promises.writeFile(pathToUsers,JSON.stringify([user],null,2))
                return {status:"succes", message:"User created"}
            }
        }catch(error){
            return {status:"error", massage:error}
        }
    }

    getAll = async () =>{
        if(fs.existsSync(pathToUsers)){
            let data  = await fs.promises.readFile(pathToUsers, 'utf-8');
            let users = JSON.parse(data);
            return {status:"success", payload:users}
        }
    }
    getById = async (id) =>{
        if(fs.existsSync(pathToUsers)){
            let data  = await fs.promises.readFile(pathToUsers, 'utf-8');
            let users = JSON.parse(data);
            let user  =users.find(u =>u.id===id);
            if(user) return {status:"success", payload:user} 
            else return {status:"error",error:"User not found"}
        }
    }
    updateUser = async (id,updatedUser) =>{
        if(!id) return {status:"error",error:"Id needed"}
        if(fs.existsSync(pathToUsers)){
            let data     = await fs.promises.readFile(pathToUsers, 'utf-8');
            let users    = JSON.parse(data);
            let newUsers = users.map((user)=>{
                if(user.id===id){
                    updatedUser.id=id;
                    return updatedUser;
                }
                else{
                    return user
                }
            }) 
            await fs.promises.writeFile(pathToUsers,JSON.stringify(newUsers,null,2))
            return{status:"succes", message:"User updated"}
        }
    }
    deleteById = async (id)=>{
        if(!id) return {status:"error",error:"Id needed"}
        if(fs.existsSync(pathToUsers)){
            let data     = await fs.promises.readFile(pathToUsers, 'utf-8');
            let users    = JSON.parse(data);
            let newUsers = users.filter(user=>user.id!==id)
            await fs.promises.writeFile(pathToUsers,JSON.stringify(newUsers,null,2))
            return{status:"succes", message:"User delete"}
        }
    }
    deleteAll = async (user)=>{
        if(!user) return {status:"error",error:"user needed"}
        if(fs.existsSync(pathToUsers)){
            let data     = await fs.promises.readFile(pathToUsers, 'utf-8');
            let users    = JSON.parse(data);
            let newUsers = users.filter(user=>user!==user)
            await fs.promises.writeFile(pathToUsers,JSON.stringify(newUsers,null,2))
            return{status:"succes", message:"User delete"}
        }
    }
}
module.exports = Contenedor;







