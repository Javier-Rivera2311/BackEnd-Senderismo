import mongoose from 'mongoose';    
import values from  '../const/const.js'

//const mongoose = require('mongoose');
const urimongo = 'mongodb+srv://dbuser:Inf2020@cluster.suncpf8.mongodb.net/rutas'


mongoose.connect( urimongo, {
}).catch( error => 
   
    console.log(error) );

const connection = mongoose.connection;

connection.once( 'open', () => {
    console.log('Mongo Db conectado!');
});