import { NextResponse } from "next/server";
import { read } from "@/lib/neo4j";
async function obtenerDistanciasPorAreas(empleadoNombre, areas) {
  const condicionesAreas = areas
    .map((area) => `"${area}" IN labels(a)`)
    .join(" OR ");

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

async function obtenerDistanciasEntreAreas(areaOrigen, otrasAreas) {
  const condicionesAreas = otrasAreas
    .map((area) => `"${area}" IN labels(destino)`)
    .join(" OR ");

  const cypherQuery = `
      MATCH (origen)-[r:DISTANCIA]->(destino)
      WHERE origen.name = $areaOrigen AND (${condicionesAreas})
      RETURN destino.name AS Area, r.metros AS Distancia
    `;

  try {
    const results = await read(cypherQuery, { areaOrigen });
    return results.map((record) => {
      return {
        Area: record["Area"],
        Distancia: record["Distancia"].low,
      };
    });
  } catch (error) {
    console.error("Error al obtener las distancias entre áreas:", error);
    throw error;
  }
}

async function encontrarRutasMasCortas(empleadoNombre, areas) {
  let rutas = [];
  let nodoActual = empleadoNombre;
  let esEmpleado = true;

  while (areas.length > 0) {
    let distancias;
    if (esEmpleado) {
      distancias = await obtenerDistanciasPorAreas(nodoActual, areas);
      esEmpleado = false;
    } else {
      distancias = await obtenerDistanciasEntreAreas(nodoActual, areas);
    }

    if (distancias.length === 0) {
      console.error("No se encontraron distancias para", nodoActual);
      break;
    }

    let distanciaMinima = distancias.reduce((min, current) => {
      return current.Distancia < min.Distancia ? current : min;
    }, distancias[0]);

    if (distanciaMinima === undefined) {
      console.error("No se encontró una distancia mínima para", nodoActual);
      break;
    }

    rutas.push({
      distancia: distanciaMinima.Distancia,
      nodo: distanciaMinima.Area,
    });

    nodoActual = distanciaMinima.Area;

    areas = areas.filter((area) => area !== nodoActual);
  }

  return rutas;
}

export async function GET(req) {
  const empleadoNombre = "empleado1";
  const areas = ["area_d", "area_b"];
  const areaC = "area_c";

  /*   try {
    const distancias = await obtenerDistanciasPorAreas(empleadoNombre, areas);
   

    return NextResponse.json(distancias);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
   */

  /*   try {
    const distancias = await obtenerDistanciasEntreAreas(areaC, areas);
    console.log(distancias);
    return NextResponse.json({ holda: "hola" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  } */

  try {
    const rutas = await encontrarRutasMasCortas(empleadoNombre, areas);
    console.log(rutas);
    return NextResponse.json(rutas);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
