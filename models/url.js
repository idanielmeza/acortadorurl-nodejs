const {Schema,model} = require('mongoose');

const urlSchema = Schema({
    url:{
        type: String,
        required: [true, 'El url es obligatorio'],
        unique: true
    },
    id:{
        type: String,
        required: [true, 'El id es obligatorio'],
        unique: true
    }
})

urlSchema.methods.toJSON = function(){
    const { __v,_id,...data } = this.toObject();    
    return data;
}

module.exports = model('Url', urlSchema)