const Contenedor = require('./Contenedor.js')

const userService= new Contenedor();

let user ={
    title:"borradores",
    price:28,
    thumbmail:'https//'
}

userService.save(user).then(result=>console.log(result))

// userService.getAll().then(result=>console.log(result))

// userService.getById(2).then(result=>console.log(result));

// userService.updateUser(1,user).then(result=>console.log(result))

// userService.deleteById(2).then(result=>console.log(result))

//userService.deleteAll(user).then(result=>console.log(result))