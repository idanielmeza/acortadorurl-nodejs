const Url = require('../models/url');

const makeid = (length) =>{
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

const acortarURL = async(req,res)=>{

    const {url} = req.body;

    const existeUrl = await Url.findOne({url: url});

    if(existeUrl){
        return res.json(existeUrl);
    }

    let id = makeid(6);

    while( await Url.findOne({id})){
        id = makeid(6);
    }

    const nuevoEnlace = new Url({url,id});
    
    await nuevoEnlace.save();

    res.status(201).json(nuevoEnlace);

}

const redireccionar = async(req,res)=>{

    const {id} = req.params;

    const existe = await Url.findOne({id});

    if(!existe){
        return res.redirect('localhost:3000');
    }

    res.redirect(existe.url);

}

module.exports = {
    acortarURL,
    redireccionar
}