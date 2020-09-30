const express = require('express');
const path = require('path');
require('dotenv').config();

///DB config
require('./database/config').dbConnection();


//APP EXPRESS
const app = express();

//LECTURA Y PARSE DEL BODY
app.use(express.json());

// ROUTES
app.use('/api/auth', require('./routes/auth')); //middleware

//NODE SERVER
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server); //init out
require('./sockets/socket');

//Path Public
const publicPath = path.resolve(__dirname, 'public'); ///__dirname directorio de nuestro servidor , 'public' carpeta
app.use(express.static(publicPath));

///Poner el puerto 3000 se utiliza en local, cuando se despliega en un servidor no se puede indicar el puerto es necesario instalar un package
///npm i dotenv
server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor activo en puerto!!!! ', process.env.PORT);
});