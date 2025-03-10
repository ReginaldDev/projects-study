const express = require("express");
const Pedido = require("../models/Pedido");
const router = express.Router();

// Função para atualizar status automaticamente
const atualizarStatusAutomaticamente = async (pedidoId) => {
  const statusList = ["Recebido", "Preparando", "Pronto", "Entregue"];

  for (let i = 1; i < statusList.length; i++) {
    setTimeout(async () => {
      try {
        const pedido = await Pedido.findByIdAndUpdate(
          pedidoId,
          { status: statusList[i] },
          { new: true }
        );
        console.log(`Pedido ${pedidoId} atualizado para: ${pedido.status}`);
      } catch (err) {
        console.error("Erro ao atualizar pedido:", err.message);
      }
    }, i * 15000); // Atualiza a cada 15 segundos (pode ajustar)
  }
};

// Buscar todos os pedidos, ordenados por data de criação (do mais recente para o mais antigo)
router.get("/", async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate("itens.pizzaId")
      .sort({ createdAt: -1 }); // Ordena do mais novo para o mais antigo
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar pedidos." });
  }
});

// Criar um novo pedido
router.post("/", async (req, res) => {
  try {
    const novoPedido = new Pedido(req.body);
    await novoPedido.save();

    // Iniciar atualização automática do status
    atualizarStatusAutomaticamente(novoPedido._id);

    res.status(201).json(novoPedido);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao criar pedido." });
  }
});

// Atualizar o status manualmente (caso necessário)
router.patch("/:id/status", async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(pedido);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao atualizar status do pedido." });
  }
});

module.exports = router;
