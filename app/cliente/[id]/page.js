/* eslint-disable react-hooks/rules-of-hooks */
"use client";

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
  console.log(pedido);

  console.log(params.id);
  return <div>page</div>;
}
