const express = require("express");
const Pizza = require("../models/Pizza");
const router = express.Router();

// Buscar todas as pizzas
router.get("/", async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar pizzas." });
  }
});

// Buscar uma pizza específica por ID
router.get("/:id", async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) return res.status(404).json({ erro: "Pizza não encontrada." });

    res.json(pizza);
  } catch (err) {
    res.status(400).json({ erro: "ID inválido." });
  }
});

// Criar uma nova pizza
router.post("/", async (req, res) => {
  try {
    const novaPizza = new Pizza(req.body);
    await novaPizza.save();
    res.status(201).json(novaPizza);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao criar pizza." });
  }
});

// Atualizar uma pizza por ID
router.put("/:id", async (req, res) => {
  try {
    const pizzaAtualizada = await Pizza.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!pizzaAtualizada)
      return res.status(404).json({ erro: "Pizza não encontrada." });

    res.json(pizzaAtualizada);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao atualizar pizza." });
  }
});

// Remover uma pizza por ID
router.delete("/:id", async (req, res) => {
  try {
    const pizzaRemovida = await Pizza.findByIdAndDelete(req.params.id);
    if (!pizzaRemovida)
      return res.status(404).json({ erro: "Pizza não encontrada." });

    res.json({ mensagem: "Pizza removida com sucesso." });
  } catch (err) {
    res.status(400).json({ erro: "Erro ao remover pizza." });
  }
});

module.exports = router;
