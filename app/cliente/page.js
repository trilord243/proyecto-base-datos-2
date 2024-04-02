"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";

export default function Client() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const pedidos = async () => {
      const res = await fetch("/api/mongo");
      const data = await res.json();
      setPedidos(data);
    };

    pedidos();
  }, []);

  return (
    <div
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-auto px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10"
    >
      {pedidos.map((pedido) => (
        <Link
          href={`/cliente/${pedido._id}`}
          key={pedido._id}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">
                  <strong> Numero de pedido:</strong> {pedido._id}
                </h3>
                <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {pedido.status}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500">
                Warehouse Macaracuay
              </p>
            </div>
            <img
              className="h-16 w-16 flex-shrink-0 rounded-full bg-gray-300"
              src="https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
