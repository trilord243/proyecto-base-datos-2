import { Pedidos } from "@/connection/pedido";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const data = await Pedidos.find({});

  return NextResponse.json(data);
}
