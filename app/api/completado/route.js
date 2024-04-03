import { Master } from "@/connection/pedido";

import { NextResponse } from "next/server";

export async function POST(req, res) {
  const productos = await req.json();

  try {
    for (const producto of productos) {
      const datalog = await Master.updateOne(
        { id: producto.id },
        { $inc: { cantidad: -producto.cantidad } }
      );
    }

    return NextResponse.json({ message: "Pedido completado" });
  } catch (error) {
    console.error("Error al procesar el pedido:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error al procesar el pedido" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function GET(req, res) {}
