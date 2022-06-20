import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";

const EditarCliente = () => {
    const { id } = useParams();
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);
    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
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
        <>
            {cliente?.nombre ? (
                <>
                    <h1 className="text-4xl font-black text-blue-700">Editar Cliente</h1>
                    <p className="mt-5 text-2xl">Utiliza este formulario para editar los datos de tus clientes</p>
                    <Formulario cliente={cliente} cargando={cargando} />
                </>
            ) : (
                <p className="mt-5 text-2xl">El ID del cliente enviado no se encuentra registrado en el sistema.</p>
            )}
        </>
    )
}

export default EditarCliente