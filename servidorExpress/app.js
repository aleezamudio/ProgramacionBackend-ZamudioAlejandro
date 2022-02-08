const express = require('express');
const fs      = require('fs');
const app     = express();
const PORT    = 8080;
const {get}   = require('http');

const server  = app.listen(PORT,()=>{
    console.log("Listening on port 8080");
})

app.get('/',(req,res)=>{
    res.send('<h1 style="color:blue;">Desafio Entregable - Zamudio Alejandro </h1>')
})
app.get('/productos',(req,res)=>{
    const data           = fs.readFileSync('../src/files/Users.json', 'utf-8');
    const arrayProductos = JSON.parse(data);
    res.json({
        items   : arrayProductos,
        cantidad: arrayProductos.length,
    });
});
app.get('/productosRamdon',(req,res)=>{
    const data           = fs.readFileSync('../src/files/Users.json', 'utf-8');
    const arrayProductos = JSON.parse(data);
    let numAleatorio     = Math.floor(Math.random() * arrayProductos.length);
    let producto         = arrayProductos[numAleatorio];
    res.json({ producto: producto})
});
