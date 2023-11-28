import mongoose from 'mongoose';    
import values from  '../const/const.js'

const mongoosed = 'mongodb://localhost:27017/rutas';
//const urimongo = 'mongodb+srv://dbuser:Inf2020@cluster.suncpf8.mongodb.net/rutas'
//elegir cual de las dos les convenga
/*
//para conexion en la nube
mongoose.connect( urimongo, {
}).catch( error => 
   
    console.log(error) );

const connection = mongoose.connection;

connection.once( 'open', () => {
    console.log('Mongo Db conectado!');
});
*/

//para conexion local
mongoose.connect( mongoosed, {
}).catch( error => 
   
    console.log(error) );

const connection = mongoose.connection;

connection.once( 'open', () => {
    console.log('Mongo local Db conectado!');
});