import { Pedidos } from "@/connection/pedido";
import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = "AC93065707ac473a5d0469653f31c63f12";
const authToken = "8797cfef4b2a281ea43a7c1d3a848560";

const client = twilio(accountSid, authToken);

const numeros = ["+584242134753", "+584123951852"];

export async function POST(req, res) {
  const status = await req.json();

  try {
    const datalog = await Pedidos.updateOne(
      { _id: status },
      { status: "completado" }
    );

    numeros.forEach((numero) => {
      client.messages
        .create({
          body: `Pedido ${status} entregado`,
          from: "+18556860285",
          to: numero,
        })
        .then((message) => console.log(message.sid))
        .catch((error) => console.error("Error al enviar mensaje:", error));
    });
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error al actualizar el estado" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return NextResponse.json({ message: "Status actualizado" });
}
