import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Define your schema and model somewhere in your code
const MasterSchema = new mongoose.Schema({
  id: String,
  name: String,
  longname: String,
  cantidad: Number,
});

const Master = mongoose.models.Master || mongoose.model("Master", MasterSchema);

// API route to check if the model exists
export async function GET(req, res) {
  const modelExists = mongoose.modelNames().includes("Master");
  console.log("Model Master exists:", modelExists);

  // Debugging: List all model names
  console.log("All model names:", mongoose.modelNames());

  return NextResponse.json({ modelExists, allModels: mongoose.modelNames() });
}
