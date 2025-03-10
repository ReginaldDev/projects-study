const express = require('express');
const Pedido = require('../models/Pedido');
const router = express.Router();

router.get('/', async (req, res) => {
  const pedidos = await Pedido.find().populate('itens.pizzaId');
  res.json(pedidos);
});

router.post('/', async (req, res) => {
  const novoPedido = new Pedido(req.body);
  await novoPedido.save();
  res.status(201).json(novoPedido);
});

router.patch('/:id/status', async (req, res) => {
  const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(pedido);
});

module.exports = router;