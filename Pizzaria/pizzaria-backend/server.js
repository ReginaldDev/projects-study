require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const pizzaRoutes =require('./src/routes/pizzaRoutes')
const pedidoRoutes = require('./src/routes/pedidoRoutes')

const app = express()
app.use(express.json())
app.use(cors())

//Rotas
app.use('/pizzas', pizzaRoutes)
app.use('/pedidos', pedidoRoutes)

//Conexao MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log('MongoDB conectado'))
    .catch(err => console.log(err))
  
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log(`Servidor rodando na porta ${PORT}`))

