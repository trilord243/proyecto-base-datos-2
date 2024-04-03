import { Pedidos } from "@/connection/pedido";
import { NextResponse } from "next/server";

export async function GET(req) {
  const data = await Pedidos.find({});

  const response = NextResponse.json(data);

  response.headers.set("Cache-Control", "no-store, max-age=0");

  return response;
}
