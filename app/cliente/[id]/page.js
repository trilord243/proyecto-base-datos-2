/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import ListaProducto from "@/components/ListaProductos";
import Loader from "@/components/Loader";
import Recorrido from "@/components/Recorrido";
import { set } from "mongoose";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pedido() {
  const [pedido, setPedido] = useState([]);
  const [pedidoArea, setPedidoArea] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchPedido = async () => {
      const res = await fetch(`/api/pedido/${params.id}`);
      const data = await res.json();
      setPedido(data);
    };
    fetchPedido();
  }, [params.id]);

  useEffect(() => {
    async function obtenerPedido() {
      setLoading(true);
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
        setLoading(false);
      } else {
        console.error("Error al obtener el pedido:", response.statusText);
      }
    }
    if (pedido.length > 0) {
      obtenerPedido();
    }
  }, [pedido]);

  useEffect(() => {
    setAreas([...new Set(pedidoArea.map((producto) => producto.area))]);
  }, [pedidoArea]);

  return (
    <div className="h-screen w-auto flex gap-9 flex-col justify-center items-center">
      {loading && <Loader mensaje="Cargando pedido" />}
      <ListaProducto products={pedidoArea} areas={areas} />
    </div>
  );
}
