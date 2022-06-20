import Formulario from "../components/Formulario";

const NuevoCliente = () => {
    return (
        <>
            <h1 className="text-4xl font-black text-blue-700">Nuevo Cliente</h1>
            <p className="mt-5 text-2xl">Llena los siguientes campos para registrar un cliente.</p>
            
            <Formulario/>
        </>
    )
}

export default NuevoCliente