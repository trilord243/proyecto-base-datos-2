/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { session } from "@/lib/neo4j";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pedido() {
  const [pedido, setPedido] = useState([]);
  const params = useParams();
  useEffect(() => {
    const pedidos = async () => {
      const res = await fetch(`/api/pedido/${params.id}`);
      const data = await res.json();
      setPedido(data);
    };
    pedidos();
  }, [params.id]);

  console.log(Number(pedido[0].pedido[0].id));
  async function obtenerPedido() {
    const response = await fetch(`/api/neo4j`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido[0].pedido),
    });
    const data = await response.json();
    console.log(data);
  }

  return <button onClick={obtenerPedido}>Probar </button>;
}
