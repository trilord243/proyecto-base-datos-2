import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://trilord:Link420@cluster0.gtf2jn2.mongodb.net/warehouse"
);

const PedidoSchema = new mongoose.Schema({
  pedido: [
    {
      id: String,
      cantidad: Number,
    },
  ],
  status: String,
});

const Pedidos =
  mongoose.models.Pedido || mongoose.model("Pedido", PedidoSchema);

export { Pedidos };
