const express =require('express')
const Pizza = require('../models/Pizza')
const router = express.Router()

router.get('/', async (req,res)=>{
    const pizzas = await Pizza.find()
    res.json(pizzas)
})

router.post('/', async (req, res)=>{
    const novaPizza = new Pizza(req.body)
    await novaPizza.save()
    res.status(201).json(novaPizza)
})

module.exports = router
