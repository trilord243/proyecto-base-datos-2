import { NextResponse } from "next/server";
import { read } from "@/lib/neo4j";
async function obtenerDistanciasPorAreas(empleadoNombre, areas) {
  // Crear una cadena de condiciones 'OR' para la cláusula WHERE
  const condicionesAreas = areas
    .map((area) => `"${area}" IN labels(a)`)
    .join(" OR ");

  // La consulta Cypher con las condiciones de área
  const cypherQuery = `
      MATCH (e:empleado {nombre: $empleadoNombre})-[r:DISTANCIA]->(a)
      WHERE ${condicionesAreas}
      RETURN a.name AS Area, r.metros AS Distancia
    `;

  try {
    const results = await read(cypherQuery, { empleadoNombre });

    return results.map((record) => {
      return {
        Area: record["Area"],
        Distancia: record["Distancia"].low,
      };
    });
  } catch (error) {
    console.error("Error al obtener las distancias:", error);
    throw error;
  }
}
export async function GET(req) {
  const empleadoNombre = "empleado1";
  const areas = ["area_d", "area_a", "area_b"];

  try {
    const distancias = await obtenerDistanciasPorAreas(empleadoNombre, areas);
    console.log(distancias);

    return NextResponse.json(distancias);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
