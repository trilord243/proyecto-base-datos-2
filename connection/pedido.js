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

const MasterSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    longname: String,
    cantidad: Number,
  },
  { collection: "master" }
);

const Master = mongoose.models.Master || mongoose.model("Master", MasterSchema);

export { Pedidos, Master };
