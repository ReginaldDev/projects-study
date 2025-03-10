const mongoose = require('mongoose')

const PizzaSchema = new mongoose.Schema({
    nome: String,
    ingrediantes: [String],
    preco: Number,
    imagem: String,    
})

module.exports = mongoose.model('Pizza', PizzaSchema)

