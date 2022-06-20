import { useState, useEffect } from "react";
import Cliente from "../components/Cliente";

const Inicio = () => {
    const [clientes, setClientes] = useState([]);
    useEffect(() => {
        const obtenerClientesAPI = async () => {
            try {
                const url = import.meta.env.VITE_API_URL;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setClientes(resultado);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerClientesAPI();
    }, []);

    const handleEliminar = async id => {
        const confirmar = confirm('¿Estás seguro(a) que quiere eliminar este cliente?');
        if (confirmar) {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                await fetch(url, { method: 'DELETE' });
                const arrayClientes = clientes.filter( cliente => cliente.id !== id);
                setClientes(arrayClientes);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <h1 className="text-4xl font-black text-blue-700">Clientes Registrados</h1>
            <p className="mt-5 text-2xl">Administre cada uno de sus clientes Registrados.</p>
            <table className="w-full mt-5 bg-white shadow table-auto">
                <thead className="text-white bg-blue-800">
                    <tr>
                        <th className="p-2">Nombre completo</th>
                        <th className="p-2">Contacto</th>
                        <th className="p-2">Empresa</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        clientes.map(cliente => (
                            <Cliente
                                key={cliente.id}
                                cliente={cliente}
                                handleEliminar={handleEliminar}
                            />
                        ))
                    }
                </tbody>
            </table>

        </>
    )
}

export default Inicio