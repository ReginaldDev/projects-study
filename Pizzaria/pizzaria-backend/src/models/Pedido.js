const mongoose = require('mongoose')

const PedidoSchema = new mongoose.Schema({
    cliente: String,
    itens: [
        {
            pizzaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pizza' },
            quantidade: Number
        }
    ],
    total: Number,
    status: { type: String, default: 'pendente' },
    pagamentoConfirmado: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Pedido', PedidoSchema)

