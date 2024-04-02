/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pedido() {
  const [pedido, setPedido] = useState([]);
  const [pedidoArea, setPedidoArea] = useState([]);
  const [areas, setAreas] = useState([]);

  const params = useParams();
  useEffect(() => {
    const pedidos = async () => {
      const res = await fetch(`/api/pedido/${params.id}`);
      const data = await res.json();
      setPedido(data);
    };
    pedidos();
  }, [params.id]);

  useEffect(() => {
    setAreas([...new Set(pedidoArea.map((producto) => producto.area))]);
  }, [pedidoArea]);

  async function obtenerPedido() {
    const response = await fetch(`/api/neo4j`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido[0]?.pedido),
    });
    if (response.ok) {
      const data = await response.json();
      setPedidoArea(data);
    } else {
      console.error("Error al obtener el pedido:", response.statusText);
    }
  }

  console.log(areas);
  console.log(pedidoArea);

  return <button onClick={obtenerPedido}>Probar </button>;
}
