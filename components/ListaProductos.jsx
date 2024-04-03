'use client'
import { useState } from "react";
import Recorrido from "./Recorrido";
import Loader from "./Loader";

export default function ListaProducto({ products = [], areas }) {
    const [recorrido, setRecorrido] = useState([]);
    const [mostrarRecorrido, setMostrarRecorrido] = useState(false);
    const [loading, setLoading] = useState(false);


    async function obtenerPedido() {
        setLoading(true);
        const response = await fetch(`/api/recorrido`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(areas),
        });
        if (response.ok) {
            const data = await response.json();
            setRecorrido(data.map((item, index) => ({
                ...item,
                status: index === 0 ? 'current' : 'upcoming'
            })));
            setMostrarRecorrido(true);
            setLoading(false);

        } else {
            console.error("Error al obtener el pedido:", response.statusText);
        }
    }

    function handleSiguiente() {
        const currentIndex = recorrido.findIndex(r => r.status === 'current');
        if (currentIndex < recorrido.length - 1) {

            const nuevoRecorrido = recorrido.map((item, index) => ({
                ...item,
                status: index === currentIndex + 1 ? 'current' : (index <= currentIndex ? 'complete' : 'upcoming')
            }));
            setRecorrido(nuevoRecorrido);
        } else {

            console.log('Recorrido completado');
            setMostrarRecorrido(false);
            console.log(products)
        }
    }

    const areaActual = recorrido.find(r => r.status === 'current')?.nodo;
    const productosFiltrados = products.filter(product => product.area === areaActual);


    return (
        <div className="px-4 sm:px-6 lg:px-8">
            {loading && <Loader mensaje="Calculando la mejor ruta...." />}
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Lista de productos</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Comience para hacer el recorrido para buscar los productos
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    {!mostrarRecorrido ? <button
                        onClick={obtenerPedido}
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Comenzar pedido
                    </button> : <button
                        onClick={handleSiguiente}
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Siguiente
                    </button>}
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        ID
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Cantidad
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Area
                                    </th>


                                </tr>
                            </thead>
                            {!mostrarRecorrido ? <tbody className="divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {product.id}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.cantidad}</td>

                                        <strong> {product.area.charAt(product.area.length - 1)} </strong>
                                    </tr>
                                ))}
                            </tbody> : <tbody className="divide-y divide-gray-200">
                                {productosFiltrados.map((product) => (
                                    <tr key={product.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {product.id}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.cantidad}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.area}</td>
                                    </tr>
                                ))}
                            </tbody>
                            }
                        </table>
                    </div>
                </div>
            </div>
            <div className=" bg-blue-200 rounded-lg w-full flex justify-center mt-11">

                {mostrarRecorrido && <Recorrido recorrido={recorrido} />}
            </div>



        </div>
    )
}
