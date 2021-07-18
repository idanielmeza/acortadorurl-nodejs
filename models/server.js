const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');
const rutas = require('../routes/acordador');

class Server{

    constructor(){
        this.app = express();
        this.port = 3000;
        //Conectar DB
        this.conectarDB();

        this.middlewares();

        this.router();
    }

    middlewares(){

        //cors
        this.app.use(cors());

        //Directorio Publico
        this.app.use(express.static('public'));

        //Lectura y parseo del body
        this.app.use(express.json());

    }

    async conectarDB(){
        await dbConnection();
    }

    router(){
        this.app.use('/',rutas)
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`corriendo en el puerto ${this.port}`);
        });
    }

}

module.exports= Server;

