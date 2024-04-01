"use client";
import { useState } from "react";
import Form from "../components/Form";

function Admin() {
  const [formularios, setFormularios] = useState([{ id: Date.now() }]);

  const agregarFormulario = () => {
    setFormularios([...formularios, { id: Date.now() }]);
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Realiza tu pedido
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Sirve como demo para realizar un pedido de productos
        </p>
      </div>
      {formularios.map((formulario) => (
        <Form key={formulario.id} id={formulario.id} />
      ))}
      <div className="mt-10">
        <button
          type="button"
          onClick={agregarFormulario}
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Admin;
