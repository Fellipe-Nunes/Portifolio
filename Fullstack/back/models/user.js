const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true
    },
    telefone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    endereco:{
        type:String,
        required:true
    },
    descricao:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('usuario', UserSchema)