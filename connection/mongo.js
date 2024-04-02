import mongoose from "mongoose";

dotenv.config();

export async function connectToDatabase() {
  const uri =
    "mongodb+srv://trilord:Link420@cluster0.gtf2jn2.mongodb.net/warehouse";
  try {
    await mongoose.connect(uri);
    console.log("Conectado exitosamente a la base de datos MongoDB");
  } catch (error) {
    console.error("Error al conectar a la base de datos MongoDB:", error);
  }
}
