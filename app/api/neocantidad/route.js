import { write } from "@/lib/neo4j";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const productos = await req.json();

    for (const producto of productos) {
      const productoId = Number(producto.id);
      const cantidadAActualizar = producto.cantidad;
      const tipoProducto = `productos_${producto.area.charAt(
        producto.area.length - 1
      )}`; // Convierte 'area_b' en 'productos_b'

      // Crear la consulta Cypher para actualizar la cantidad en el nodo correspondiente
      const cypherQuery = `
        MATCH (p:${tipoProducto})
        WHERE p.id = $productoId
        SET p.cantidad = p.cantidad - $cantidadAActualizar
        RETURN p
      `;

      const result = await write(cypherQuery, {
        productoId,
        cantidadAActualizar,
      });
    }

    console.log("Actualización completada.");
    return NextResponse.json({ message: "Actualización completada" });
  } catch (error) {
    console.error("Error al procesar la solicitud POST:", error);
    return NextResponse.error(error);
  }
}
