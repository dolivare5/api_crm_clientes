import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
const VerCliente = () => {
    const { id } = useParams();
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);
    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setCliente(resultado);
            } catch (error) {
                console.log(error);
            }
            setTimeout(() => {
                setCargando(!cargando);
            }, 3000);
        }
        obtenerClienteAPI();
    }, [])
    return (
        cargando ? <Spinner/> : Object.keys(cliente).length === 0 ?  <p>No Hay Resultados</p> : (
            <div>
                {cargando ? 'cargando' : (
                    <>
                        <h1 className="text-4xl font-black text-blue-700">Ver datos de {cliente.nombre}</h1>
                        <p className="mt-5 text-2xl">Información completa acerca del cliente</p>

                        {cliente.nombre && (
                            <p className="mt-10 text-4xl text-gray-600">
                                <span className="font-bold text-gray-800 uppercase">Cliente: </span>
                                {cliente.nombre}
                            </p>
                        )}

                        {cliente.email && (
                            <p className="mt-4 text-2xl text-gray-600">
                                <span className="font-bold text-gray-800 uppercase">Email: </span>
                                {cliente.email}
                            </p>
                        )}

                        {cliente.telefono && (
                            <p className="mt-4 text-2xl text-gray-600">
                                <span className="font-bold text-gray-800 uppercase">Teléfono: </span>
                                {cliente.telefono}
                            </p>
                        )}

                        {cliente.empresa && (
                            <p className="mt-4 text-2xl text-gray-600">
                                <span className="font-bold text-gray-800 uppercase">Empresa: </span>
                                {cliente.empresa}
                            </p>
                        )}

                        {cliente.observaciones && (
                            <p className="mt-4 text-2xl text-gray-600">
                                <span className="font-bold text-gray-800 uppercase">Observaciones: </span>
                                {cliente.observaciones}
                            </p>
                        )}
                    </>
                )}
            </div>
        )

    )
}

export default VerCliente