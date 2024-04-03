import { read } from "@/lib/neo4j";
import { NextResponse } from "next/server";

export async function findAreaByProductTypeId(productoId) {
  const cypherTipoProducto = `
      MATCH (p)
      WHERE p.id = $productoId
      RETURN labels(p) AS TipoProducto
    `;

  try {
    const resultTipoProducto = await read(cypherTipoProducto, { productoId });
    const tipoProducto = resultTipoProducto[0].TipoProducto[0];

    const cypherRelacion = `
        MATCH (p:${tipoProducto})-[r]->(area)
        WHERE p.id = $productoId
        RETURN type(r) AS TipoRelacion, area
      `;

    const resultsRelacion = await read(cypherRelacion, { productoId });
    const relacion = resultsRelacion.map((r) => ({
      TipoRelacion: r.TipoRelacion,
      Area: r.area,
    }));

    return relacion[0].Area.labels[0];
  } catch (error) {
    console.error("Error al buscar la relación del tipo de producto:", error);
    throw error;
  }
}

export async function POST(req) {
  try {
    const productos = await req.json();

    const productosConArea = await Promise.all(
      productos.map(async (producto) => {
        const productoIdNumerico = Number(producto.id);

        const area = await findAreaByProductTypeId(productoIdNumerico);

        return { ...producto, area };
      })
    );

    return NextResponse.json(productosConArea);
  } catch (error) {
    console.error("Error al procesar la solicitud POST:", error);
    return NextResponse.error(error);
  }
}
