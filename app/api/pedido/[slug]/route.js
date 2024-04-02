import { Pedidos } from "@/connection/pedido";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { slug } = params;

  const data = await Pedidos.find({ _id: slug });

  return NextResponse.json(data);
}
